"""Prépare le portrait du hero à partir de la photo source.

    python scripts/process-photo.py

Écrit `public/rania.webp` et `public/rania.png`.

La source `scripts/photo-source.png` est le portrait du CV : buste en tailleur
sur fond de studio gris clair uniforme, inscrit dans un cercle bordé d'un
anneau bleu marine tracé par la mise en page du CV.

Le traitement enchaîne quatre étapes : écarter l'anneau décoratif, détacher le
sujet du fond de studio, le recomposer sur un fond nuit avec un contre-jour
derrière la tête, puis l'éclairer en violet à gauche et en cyan à droite — les
couleurs du site. Le visage garde ses teintes naturelles ; la photo cesse de
ressembler à une vignette de CV posée sur une page sombre.

Dépendances : `pip install pillow numpy scipy`
"""

from PIL import Image, ImageEnhance, ImageFilter
from scipy import ndimage
import numpy as np
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'photo-source.png')
OUT_DIR = os.path.join(HERE, '..', 'public')

# Géométrie du portrait dans l'image source, relevée à la mesure. R est le rayon
# utile, pris juste à l'intérieur de l'anneau bleu marine pour l'exclure.
CX, CY, R = 154, 154, 144

# Niveau du fond de studio. Il sert de seuil de détourage et de couleur à
# retirer des pixels de bord ; ce fond est gris clair, pas blanc pur.
BACKDROP = 240.0

SS = 4            # suréchantillonnage du masque circulaire
OUTPUT = 576      # côté de l'image produite


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

    Le fond se reconnaît à deux traits simultanés : il est clair *et* neutre. Ce
    second critère est ce qui le sépare de la chemise, claire mais franchement
    bleue, et de la peau, claire mais chaude. Un seuil sur la seule clarté
    percerait l'une et l'autre.

    La neutralité vaut aussi dans les zones de fond enclavées — le triangle
    entre le bras replié et le buste — qu'une recherche par connexité depuis le
    bord du disque laisserait au contraire intactes.
    """
    lum = rgb.mean(axis=2)
    neutral = rgb.max(axis=2) - rgb.min(axis=2) < 14
    candidate = (lum > BACKDROP - 14) & neutral & inside

    # Ne retenir que les plages étendues : un pixel neutre clair isolé, sur une
    # dent ou un reflet d'œil, n'est pas du fond.
    labels, count = ndimage.label(candidate)
    if count:
        sizes = np.bincount(labels.ravel())
        keep = {i for i in range(1, count + 1) if sizes[i] >= 30}
        background = np.isin(labels, list(keep))
    else:
        background = np.zeros_like(candidate)

    # Les pixels du contour mélangent le sujet et le fond. Sur un tailleur bleu
    # marine, ce mélange donne un gris-bleu clair : le garder opaque trace un
    # liseré net sur le fond nuit, et estimer sa composition demanderait de
    # connaître la couleur du sujet en chaque point du bord.
    #
    # Plus simple et plus sûr : reculer la frontière à l'intérieur du sujet, de
    # sorte que seuls des pixels franchement intérieurs subsistent. Le flou qui
    # suit redonne un bord anticrénelé. On perd deux pixels de silhouette, ce
    # qui ne se voit pas ; l'érosion élimine au passage les îlots de bruit que
    # le filtrage par taille avait laissés dans le fond.
    subject = ~background & inside
    core = ndimage.binary_erosion(subject, iterations=6)
    alpha = ndimage.gaussian_filter(core.astype(np.float32), 1.6)

    alpha[~inside] = 0.0
    return np.clip(alpha, 0.0, 1.0)


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
    src = Image.open(SRC).convert('RGB')

    # Recadrage carré sur le disque utile, anneau décoratif exclu, puis mise à
    # l'échelle. La source du CV est petite : l'agrandissement est assumé, la
    # netteté est rattrapée au masque flou en fin de chaîne.
    crop = src.crop((CX - R, CY - R, CX + R, CY + R))
    crop = crop.resize((OUTPUT, OUTPUT), Image.LANCZOS)

    rgb = np.asarray(crop).astype(np.float32)
    inside = radial(OUTPUT, OUTPUT / 2 - 0.5, OUTPUT / 2 - 0.5, OUTPUT / 2 - 1) > 0

    alpha = subject_alpha(rgb, inside)

    # Fond de studio : nuit bleutée, éclaircie derrière la tête pour détacher
    # les cheveux sombres — l'équivalent d'un contre-jour.
    ramp = np.linspace(0, 1, OUTPUT, dtype=np.float32)[:, None, None]
    background = (
        np.array([26, 30, 58], dtype=np.float32) * (1 - ramp)
        + np.array([7, 9, 20], dtype=np.float32) * ramp
    )
    rim = radial(OUTPUT, OUTPUT * 0.5, OUTPUT * 0.30, OUTPUT * 0.44)[:, :, None]
    background = background + rim * np.array([92, 76, 168], dtype=np.float32)

    a = alpha[:, :, None]
    composed = rgb * a + background * (1 - a)
    composed = bicolor_light(composed) * vignette()

    img = Image.fromarray(np.clip(composed, 0, 255).astype(np.uint8), 'RGB')
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = ImageEnhance.Color(img).enhance(1.05)
    # Rayon et dose relevés : la source est agrandie, il faut redonner du mordant.
    img = img.filter(ImageFilter.UnsharpMask(radius=2.0, percent=78, threshold=2))

    out = img.convert('RGBA')
    out.putalpha(circle_alpha(OUTPUT))
    return out


def main():
    portrait = build_portrait()
    os.makedirs(OUT_DIR, exist_ok=True)

    portrait.save(os.path.join(OUT_DIR, 'rania.webp'), 'WEBP', quality=92, method=6)
    portrait.save(os.path.join(OUT_DIR, 'rania.png'), 'PNG', optimize=True)

    for name in ('rania.webp', 'rania.png'):
        path = os.path.join(OUT_DIR, name)
        print(f'{name}: {portrait.size[0]}x{portrait.size[1]}, {os.path.getsize(path) / 1024:.0f} Ko')


if __name__ == '__main__':
    main()
