# Portfolio — Rania Lasfar

Site personnel construit avec React, Vite, Tailwind CSS et Framer Motion.
Direction visuelle sombre et cinématique : fond aurore animé, scroll narratif,
sections révélées à l'apparition, bilingue français / anglais.

En ligne sur https://cyliar.github.io/portfolio/

## Développement local

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:5173 avec rechargement à chaud.

## Build de production

```bash
npm run build
```

Génère le site statique dans `dist/`.

## Déploiement

Chaque push sur `main` déclenche le workflow GitHub Actions
(`.github/workflows/deploy.yml`) qui build le projet et publie `dist/` sur
GitHub Pages.

**Pré-requis (une seule fois)** : dans GitHub → Settings → Pages, régler
*Source* sur **GitHub Actions** (au lieu de « Deploy from a branch »).

## Structure du projet

| Dossier / fichier | Rôle |
|---|---|
| `src/data/content.ts` | Tout le contenu du site (parcours, projets, compétences, certifications, chiffres clés), en français et en anglais |
| `src/i18n/useLang.tsx` | Contexte et hook pour la bascule de langue FR/EN |
| `src/components/` | Un composant par section, plus `Header`, `Aurora` (fond animé) et `Section` (enveloppe commune) |
| `tailwind.config.ts` | Palette, typographies, animations |
| `scripts/process-photo.py` | Prépare le portrait du hero à partir de `scripts/photo-source.png` |
| `public/` | Fichiers servis tels quels : portrait et CV |

## Modifier le contenu

Tout se passe dans `src/data/content.ts`, jamais dans les composants.

- **Ajouter un projet** : une entrée dans le tableau `projects`, avec un
  `sparkPoints` (liste de points SVG dans une boîte de 108 × 36) qui dessine le
  mini-graphique de la carte.
- **Ajouter une expérience** : une entrée dans `timeline` — `description` pour
  un paragraphe unique, `missions` pour une liste à puces. `current: true`
  marque le poste en cours.
- **Mettre à jour les chiffres clés** : le tableau `stats`.

## Remplacer le CV

Déposer le nouveau PDF sous `public/CV-Rania-Lasfar.pdf` — c'est ce fichier que
servent les boutons « Mon CV » et « Télécharger mon CV ».

La racine du dépôt ne contient que les fichiers de configuration. Les deux
fichiers envoyés depuis l'interface GitHub y ont été rangés : le CV sous
`public/CV-Rania-Lasfar.pdf`, la photo d'origine sous
`scripts/photo-source.png`.

## Remplacer la photo

Déposer le nouveau portrait sous `scripts/photo-source.png`, puis :

```bash
pip install pillow numpy scipy
python scripts/process-photo.py
```

Le script détache le sujet du fond de studio blanc, le recompose sur un fond
nuit avec un contre-jour, et écrit `public/rania.webp` et `public/rania.png`.
Les constantes de géométrie en tête du script (`CX`, `CY`, `R`) décrivent le
disque blanc de la photo d'origine : elles sont à réajuster si le cadrage de la
nouvelle photo diffère.

## Activer l'envoi du formulaire de contact

Par défaut, le formulaire ouvre le client mail avec un message pré-rempli.
Pour recevoir les messages directement par e-mail, créer un formulaire sur
[Formspree](https://formspree.io) et reporter son identifiant dans la constante
`FORMSPREE_ID` en tête de `src/components/ContactForm.tsx`.
