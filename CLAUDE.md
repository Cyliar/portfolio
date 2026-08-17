# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Vue d'ensemble

Portfolio personnel de Rania Lasfar, construit en React + Vite + TypeScript, stylé avec Tailwind CSS et animé avec Framer Motion. Direction visuelle sombre et cinématique : fond « aurore » animé, scroll narratif plein écran, sections révélées à l'apparition, bilingue FR/EN. `README.md` contient les instructions de développement et de déploiement en français destinées à l'utilisatrice.

## Commandes

- **Installer les dépendances** : `npm install`
- **Développement local** : `npm run dev` — sert le site sur http://localhost:5173 avec rechargement à chaud (Vite).
- **Build de production** : `npm run build` — exécute `tsc -b` (vérification des types) puis `vite build`, génère le site statique dans `dist/`.
- **Prévisualiser le build** : `npm run preview`.
- **Regénérer le portrait du hero** : `python scripts/process-photo.py` (nécessite `pillow`, `numpy`, `scipy`).

Pas de suite de tests ni de linter configurés dans ce dépôt.

## Architecture

- **`src/main.tsx`** — point d'entrée, monte `<App />` dans `index.html`.
- **`src/App.tsx`** — compose la page : `MotionConfig` (respect de `prefers-reduced-motion`) → `LangProvider` → `Aurora` (fond animé fixe) + `Header` (nav collante) + Hero, Stats, Marquee, puis les sections dans `<main>`.
- **`src/components/`** — un composant par section, plus trois composants transverses :
  - `Header` — nav collante, barre de progression de scroll, section active, sélecteur FR/EN, bouton CV, menu plein écran sur mobile.
  - `Aurora` — fond décoratif : trois halos en mouvement, grille ténue, dégradé de fond.
  - `Section` — enveloppe commune : ancre, en-tête numérotée, révélation au scroll. **Toute nouvelle section doit passer par elle** pour rester cohérente.
  - Sections : `Hero`, `Stats`, `Marquee`, `About`, `Projects` / `ProjectCard`, `Timeline`, `Skills`, `Certifications`, `Contact` / `ContactForm`, `Footer`.
- **`src/data/content.ts`** — **source unique de tout le contenu du site** (nom, rôle, thèse, chiffres clés, à propos, parcours, projets, compétences, certifications, coordonnées), en français et en anglais. Toujours modifier le contenu ici plutôt que dans les composants.
- **`src/i18n/useLang.tsx`** — système de traduction FR/EN : `LangProvider` (état `lang` persisté dans `localStorage`, français par défaut — la langue du navigateur est volontairement ignorée), le hook `useLang()` (expose `lang`, `setLang`, et `t()`), et le composant `<Html>` pour injecter du texte traduit contenant du HTML inline (ex. `<em>`, `<b>`).
- **`src/styles/index.css`** — styles globaux Tailwind et classes composées réutilisées (`.text-gradient`, `.glass`, `.ring-gradient`, `.grain`), plus le bloc `@media (prefers-reduced-motion: reduce)` qui neutralise les animations CSS pures.
- **`tailwind.config.ts`** — palette, typographies, et le breakpoint personnalisé **`nav:` (860px)** utilisé à la place de `md:` pour basculer entre le layout mobile (menu plein écran) et le layout desktop (nav horizontale). Toujours utiliser `nav:` — pas `md:` ou `lg:` — pour ce point de rupture.
- **`scripts/process-photo.py`** — prépare `public/rania.webp` et `public/rania.png` à partir de `scripts/photo-source.png`. Les constantes `CX`, `CY`, `R` décrivent la géométrie du disque blanc de la photo source et sont à réajuster si la photo change.
- **`public/`** — fichiers servis tels quels : portrait et `CV-Rania-Lasfar.pdf`.

### Ajouter un projet

Ajouter une entrée dans le tableau `projects` de `src/data/content.ts`, avec un `sparkPoints` (liste de points SVG dans une boîte de 108 × 36) qui dessine le mini-graphique de la carte.

### Ajouter une expérience

Ajouter une entrée dans le tableau `timeline` de `src/data/content.ts` — `description` pour un paragraphe unique, `missions` pour une liste à puces. `current: true` marque le poste en cours (puce ambre animée et badge « en cours »).

### Formulaire de contact

`src/components/ContactForm.tsx` expose une constante `FORMSPREE_ID`. Renseignée, le formulaire poste vers Formspree ; vide — le cas actuel — il retombe sur un `mailto` pré-rempli. Ne pas retirer ce repli : il garantit que le formulaire fonctionne sans compte tiers.

### Animations et accessibilité

Les animations Framer Motion (`motion.*`, `whileInView`, `whileHover`) sont pilotées par `MotionConfig reducedMotion="user"` dans `App.tsx`, qui désactive automatiquement les animations de transform quand l'utilisateur a activé la réduction de mouvement au niveau OS/navigateur, tout en conservant les fondus en opacité. `Aurora` vérifie en plus explicitement `useReducedMotion()` pour ne pas planifier ses boucles infinies, et `Stats` affiche directement la valeur finale au lieu de l'incrémenter.

## Déploiement

Chaque push sur `main` déclenche le workflow GitHub Actions (`.github/workflows/deploy.yml`) qui build le projet (`npm ci` puis `npm run build`) et publie `dist/` sur GitHub Pages. `vite.config.ts` fixe `base: '/portfolio/'` pour que les chemins résolvent sous https://cyliar.github.io/portfolio/ — ne pas retirer cette option.

**Pré-requis (une seule fois)** : dans GitHub → Settings → Pages, régler *Source* sur **GitHub Actions** (au lieu de "Deploy from a branch").
