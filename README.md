# Portfolio — Rania Lasfar

Site personnel construit avec React, Vite, Tailwind CSS et Framer Motion.

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

Chaque push sur `main` déclenche le workflow GitHub Actions (`.github/workflows/deploy.yml`) qui build le projet et publie `dist/` sur GitHub Pages. Le site est en ligne sur https://cyliar.github.io/portfolio/.

**Pré-requis (une seule fois)** : dans GitHub → Settings → Pages, régler *Source* sur **GitHub Actions** (au lieu de "Deploy from a branch").

## Structure du projet

| Dossier / fichier | Rôle |
|---|---|
| `src/data/content.ts` | Tout le contenu du site (parcours, projets, compétences, certifications), en français et en anglais |
| `src/i18n/useLang.tsx` | Contexte et hook pour la bascule de langue FR/EN |
| `src/components/` | Un composant par section du site |
| `tailwind.config.ts` | Palette de couleurs et typographies |

### Ajouter un projet

Ajouter une entrée dans le tableau `projects` de `src/data/content.ts` (voir les entrées existantes comme modèle), avec un `sparkPoints` (liste de points SVG) représentant la forme du mini-graphique.

### Ajouter une expérience

Ajouter une entrée dans le tableau `timeline` de `src/data/content.ts` — utiliser `description` pour un paragraphe unique, ou `missions` pour une liste à puces (comme pour TastyleTrans).
