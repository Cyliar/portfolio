"""Prépare le portrait du hero à partir de la photo source.

    python scripts/process-photo.py

Écrit `public/rania.webp` et `public/rania.png`.

La source `scripts/photo-source.png` est un portrait posé sur un disque blanc
uniforme, lui-même sur un fond gris sombre, le disque étant rogné de 28 px en
haut.

Le traitement enchaîne trois étapes : retirer le fond de studio blanc, le
remplacer par un fond nuit bleuté avec un contre-jour derrière la tête, puis
éclairer le portrait en violet à gauche et en cyan à droite — les couleurs du
site. Le visage garde ses teintes naturelles ; la photo cesse de ressembler à
une photo d'identité posée sur une page sombre.

Dépendances : `pip install pillow numpy scipy`
"""

from PIL import Image, ImageEnhance, ImageFilter
from scipy import ndimage
import numpy as np
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'photo-source.png')
OUT_DIR = os.path.join(HERE, '..', 'public')

# Géométrie du disque blanc dans l'image source, relevée à la mesure.
CX, CY, R = 323, 233, 261
PAD_TOP = 40      # les 28 premières lignes du disque sont du blanc pur : on le prolonge
SS = 4            # suréchantillonnage du masque circulaire
OUTPUT = 640      # côté de l'image produite
TIGHT = 0.86      # resserrement du cadre autour du sujet


def load_padded():
    """Complète le haut du disque sur du blanc pur et renvoie le centre corrigé."""
    src = Image.open(SRC).convert('RGB')
    canvas = Image.new('RGB', (src.width, src.height + PAD_TOP), (255, 255, 255))
    canvas.paste(src, (0, PAD_TOP))
    return canvas, CY + PAD_TOP


def circle_alpha(size: int) -> Image.Image:
    """Masque circulaire anticrénelé, calculé en suréchantillonnage."""
    yy, xx = np.mgrid[0 : size * SS, 0 : size * SS]
    c = size * SS / 2.0 - 0.5
    r = size * SS / 2.0 - SS
    disc = ((xx - c) ** 2 + (yy - c) ** 2 <= r**2).astype(np.uint8) * 255
    return Image.fromarray(disc, 'L').resize((size, size), Image.LANCZOS)


def radial(size: int, cx: float, cy: float, radius: float) -> np.ndarray:
    """Champ radial dans [0,1] : 1 au centre, 0 au-delà du rayon."""
    yy, xx = np.mgrid[0:size, 0:size]
    d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / radius
    return np.clip(1.0 - d, 0.0, 1.0) ** 1.6


def subject_alpha(rgb: np.ndarray, inside: np.ndarray) -> np.ndarray:
    """Opacité du sujet dans [0,1] : 0 sur le fond de studio, 1 sur le sujet.

    Le fond est trouvé par composantes connexes depuis le bord du disque, et non
    par simple seuillage : les hautes lumières du visage sont claires elles
    aussi, un seuil les percerait.
    """
    lum = rgb.mean(axis=2)
    near_white = (lum > 236) & inside

    # Amorce : anneau juste à l'intérieur du disque, toujours du fond.
    seed = ~ndimage.binary_erosion(inside, iterations=4) & inside

    labels, _ = ndimage.label(near_white)
    background_labels = set(labels[seed & near_white].ravel()) - {0}
    background = np.isin(labels, list(background_labels))

    # La transition cheveux/studio s'étale sur une dizaine de pixels : la bande
    # traitée doit la couvrir entièrement, sinon un liseré clair subsiste.
    # Dans cette bande, l'opacité suit la clarté du pixel — les cheveux, très
    # sombres, restent pleinement opaques ; seuls les pixels clairs s'effacent.
    band = ndimage.binary_dilation(background, iterations=10)
    whiteness = np.clip((lum - 188.0) / 67.0, 0.0, 1.0)

    alpha = np.ones_like(lum)
    alpha[band] = 1.0 - whiteness[band]
    alpha[background] = 0.0
    alpha[~inside] = 0.0

    # Adoucit l'escalier laissé par le seuillage, sans ronger la silhouette.
    return np.clip(ndimage.gaussian_filter(alpha, 0.8), 0.0, 1.0)


def unmix_white(rgb: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    """Retire la contribution du fond blanc dans les pixels semi-transparents.

    Un pixel de bord observé vaut O = F·a + 255·(1−a), où F est la vraie couleur
    du sujet. Sans cette inversion, les mèches gardent le blanc du studio et
    dessinent un halo clair dès qu'on les pose sur un fond sombre.
    """
    a = np.clip(alpha, 0.0, 1.0)[:, :, None]
    unmixed = (rgb - 255.0 * (1.0 - a)) / np.maximum(a, 0.12)

    # Les pixels quasi opaques n'ont rien à corriger : on les laisse intacts.
    blend = np.clip((0.985 - a) / 0.985, 0.0, 1.0)
    return np.clip(rgb * (1.0 - blend) + unmixed * blend, 0.0, 255.0)


def vignette(strength=0.34, radius=0.78):
    """Assombrissement progressif des bords, dans [1-strength, 1]."""
    yy, xx = np.mgrid[0:OUTPUT, 0:OUTPUT]
    c = OUTPUT / 2 - 0.5
    d = np.sqrt((xx - c) ** 2 + (yy - c) ** 2) / (OUTPUT / 2)
    falloff = np.clip((d - radius) / (1 - radius), 0.0, 1.0) ** 1.5
    return (1.0 - strength * falloff)[:, :, None]


def bicolor_light(rgb: np.ndarray) -> np.ndarray:
    """Éclaire le portrait en violet à gauche et en cyan à droite.

    La lumière est ajoutée en mode écran plutôt qu'additionnée : les tons moyens
    prennent la couleur sans que les hautes lumières brûlent.
    """
    ramp = np.linspace(-1.0, 1.0, OUTPUT, dtype=np.float32)[None, :, None]
    left = np.clip(-ramp, 0, 1) ** 1.7
    right = np.clip(ramp, 0, 1) ** 1.7

    violet = np.array([96, 62, 210], dtype=np.float32)
    cyan = np.array([24, 190, 220], dtype=np.float32)
    light = (violet * left + cyan * right) * 0.85

    screened = 255.0 - (255.0 - rgb) * (255.0 - light) / 255.0

    # Mélange avec l'original : l'effet reste lisible sans écraser les couleurs
    # naturelles de la peau.
    return rgb * 0.42 + screened * 0.58


def build_portrait() -> Image.Image:
    canvas, cy = load_padded()

    r = int(R * TIGHT)
    box = (CX - r, cy - r - int(R * 0.05), CX + r, cy + r - int(R * 0.05))
    crop = canvas.crop(box).resize((OUTPUT, OUTPUT), Image.LANCZOS)

    rgb = np.asarray(crop).astype(np.float32)
    inside = radial(OUTPUT, OUTPUT / 2 - 0.5, OUTPUT / 2 - 0.5, OUTPUT / 2 - 1) > 0

    alpha = subject_alpha(rgb, inside)
    rgb = unmix_white(rgb, alpha)

    # Fond de studio : nuit bleutée, éclaircie derrière la tête pour détacher
    # les cheveux sombres — l'équivalent d'un contre-jour.
    ramp = np.linspace(0, 1, OUTPUT, dtype=np.float32)[:, None, None]
    background = (
        np.array([26, 30, 58], dtype=np.float32) * (1 - ramp)
        + np.array([7, 9, 20], dtype=np.float32) * ramp
    )
    rim = radial(OUTPUT, OUTPUT * 0.5, OUTPUT * 0.34, OUTPUT * 0.46)[:, :, None]
    background = background + rim * np.array([92, 76, 168], dtype=np.float32)

    a = alpha[:, :, None]
    composed = rgb * a + background * (1 - a)

    # Étalonnage : éclairage bicolore aux couleurs du site, puis vignettage.
    composed = bicolor_light(composed) * vignette()

    img = Image.fromarray(np.clip(composed, 0, 255).astype(np.uint8), 'RGB')
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = ImageEnhance.Color(img).enhance(1.05)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.6, percent=62, threshold=3))

    out = img.convert('RGBA')
    out.putalpha(circle_alpha(OUTPUT))
    return out


def main():
    portrait = build_portrait()
    os.makedirs(OUT_DIR, exist_ok=True)

    portrait.save(os.path.join(OUT_DIR, 'rania.webp'), 'WEBP', quality=90, method=6)
    portrait.save(os.path.join(OUT_DIR, 'rania.png'), 'PNG', optimize=True)

    for name in ('rania.webp', 'rania.png'):
        path = os.path.join(OUT_DIR, name)
        print(f'{name}: {portrait.size[0]}x{portrait.size[1]}, {os.path.getsize(path) / 1024:.0f} Ko')


if __name__ == '__main__':
    main()
