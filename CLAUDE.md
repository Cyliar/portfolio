# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Vue d'ensemble

Portfolio personnel de Rania Lasfar, construit en React + Vite + TypeScript, stylé avec Tailwind CSS et animé avec Framer Motion. `README.md` contient les instructions de développement et de déploiement en français destinées à l'utilisatrice.

## Commandes

- **Installer les dépendances** : `npm install`
- **Développement local** : `npm run dev` — sert le site sur http://localhost:5173 avec rechargement à chaud (Vite).
- **Build de production** : `npm run build` — exécute `tsc -b` (vérification des types) puis `vite build`, génère le site statique dans `dist/`.
- **Prévisualiser le build** : `npm run preview`.

Pas de suite de tests ni de linter configurés dans ce dépôt.

## Architecture

- **`src/main.tsx`** — point d'entrée, monte `<App />` dans `index.html`.
- **`src/App.tsx`** — compose la page : `MotionConfig` (respect de `prefers-reduced-motion`) → `LangProvider` → `AnimatedBackground` (fond animé fixe) + grille deux colonnes (`Rail` en sidebar, `main` avec les sections empilées).
- **`src/components/`** — un composant par section du site : `Rail` (sidebar : nom, nav par ancres, sélecteur de langue, liens sociaux), `Hero`, `Timeline` (parcours), `Projects` / `ProjectCard`, `Skills`, `Certifications`, `Contact`.
- **`src/data/content.ts`** — **source unique de tout le contenu du site** (nom, rôle, thèse, parcours, projets, compétences, certifications, coordonnées de contact), en français et en anglais. Toujours modifier le contenu ici plutôt que dans les composants.
- **`src/i18n/useLang.tsx`** — système de traduction FR/EN : `LangProvider` (état `lang` + `setLang`, synchronise `document.documentElement.lang` via un `useEffect`), le hook `useLang()` (expose `lang`, `setLang`, et `t()` pour traduire un objet `LocalizedText`), et le composant `<Html>` pour injecter du texte traduit contenant du HTML inline (ex. `<em>`, `<b>`).
- **`src/styles/index.css`** — styles globaux Tailwind (`@tailwind base/components/utilities`) et règles CSS non couvertes par les classes utilitaires (dont `@media (prefers-reduced-motion: reduce)` pour les animations CSS pures).
- **`tailwind.config.ts`** — palette de couleurs, typographies, et le breakpoint personnalisé **`rail:` (880px)** utilisé à la place de `md:` pour basculer entre le layout mobile (nav horizontale empilée en haut de page) et le layout desktop (sidebar verticale sticky + grille deux colonnes). Toujours utiliser `rail:` — pas `md:` ou `lg:` — pour ce point de rupture spécifique au layout sidebar/contenu.

### Ajouter un projet

Ajouter une entrée dans le tableau `projects` de `src/data/content.ts` (voir les entrées existantes comme modèle), avec un `sparkPoints` (liste de points SVG) représentant la forme du mini-graphique affiché par `ProjectCard`.

### Ajouter une expérience

Ajouter une entrée dans le tableau `timeline` de `src/data/content.ts` — utiliser `description` pour un paragraphe unique, ou `missions` pour une liste à puces.

### Animations et accessibilité

Les animations Framer Motion (`motion.*`, `whileInView`, `whileHover`) sont pilotées par `MotionConfig reducedMotion="user"` dans `App.tsx`, qui désactive automatiquement les animations de transform (x/y/rotate/scale) quand l'utilisateur a activé la réduction de mouvement au niveau OS/navigateur, tout en conservant les fondus en opacité. Le fond animé (`AnimatedBackground`) applique en plus une vérification explicite via `useReducedMotion()` pour ne pas planifier son animation en boucle infinie.

## Déploiement

Chaque push sur `main` déclenche le workflow GitHub Actions (`.github/workflows/deploy.yml`) qui build le projet (`npm ci` puis `npm run build`) et publie `dist/` sur GitHub Pages.

**Pré-requis (une seule fois)** : dans GitHub → Settings → Pages, régler *Source* sur **GitHub Actions** (au lieu de "Deploy from a branch").
