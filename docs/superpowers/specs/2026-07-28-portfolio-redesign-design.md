# Refonte du portfolio — design "Dark AI / Glassmorphism"

## Contexte

Le portfolio actuel de Rania Lasfar est un fichier unique `index.html` (HTML + CSS + JS inline, sans dépendances), déployé sur GitHub Pages (`Cyliar/portfolio`, source `main` / `root`). L'objectif est de le refaire avec une stack moderne, un design "pro 2026" plus dynamique et visuellement marquant, tout en intégrant du contenu manquant (email réel, nouvelle expérience professionnelle).

## Objectifs

- Remplacer le HTML statique par un projet React + Vite + Tailwind CSS, animé avec Framer Motion.
- Adopter une direction visuelle **Dark AI / Glassmorphism** : fond sombre, halos dégradés, cartes en verre dépoli.
- Garder le même contenu fonctionnel que l'existant (sections, bascule FR/EN, liens sociaux) mais avec une architecture en composants et un contenu piloté par les données plutôt que du HTML dupliqué.
- Intégrer l'email de contact réel et la nouvelle expérience TastyleTrans.
- Rendre le site plus "vivant" via des animations au scroll et au survol, sans sacrifier la lisibilité ni les performances.
- Garder le déploiement gratuit sur GitHub Pages, à la même URL (`cyliar.github.io/portfolio`).

## Non-objectifs

- Pas de CMS ni de backend : le contenu reste dans le code source (fichier de données TypeScript), pas de base de données.
- Pas de multi-pages / routing : le site reste une seule page à défilement, comme l'existant.
- Pas de refonte du contenu texte des projets/compétences/certifications déjà présents — ils sont repris tels quels, seul TastyleTrans et l'email sont ajoutés/corrigés.

## Stack technique

- **Build** : Vite (React + TypeScript).
- **Styling** : Tailwind CSS (design tokens définis dans `tailwind.config.ts` : couleurs, polices, rayons).
- **Animations** : Framer Motion (`motion` package) pour les apparitions au scroll (`whileInView`), le hover des cartes, et les halos animés en arrière-plan.
- **Polices** : conservées à l'identique — Bricolage Grotesque (titres), IBM Plex Sans (texte courant), IBM Plex Mono (étiquettes), chargées via Google Fonts comme aujourd'hui.
- **Pas de framework i18n externe** : la bascule FR/EN reste gérée maison, mais via un objet de traduction central et un hook React (`useLang`), plutôt que des attributs `data-fr`/`data-en` dupliqués sur chaque élément.

## Déploiement

- Le repo GitHub reste `Cyliar/portfolio`, branche `main`.
- Un workflow GitHub Actions (`.github/workflows/deploy.yml`) se déclenche sur chaque push vers `main` : installe les dépendances, build via `npm run build` (sortie dans `dist/`), publie avec `actions/upload-pages-artifact` + `actions/deploy-pages`.
- `vite.config.ts` définit `base: '/portfolio/'` pour que les assets se résolvent correctement sous `cyliar.github.io/portfolio/`.
- **Action manuelle unique requise côté utilisateur** : dans GitHub → Settings → Pages, changer la source de "Deploy from a branch (`main`/`root`)" à "GitHub Actions". Ce n'est pas automatisable depuis le code.
- L'URL finale ne change pas : `https://cyliar.github.io/portfolio/`.

## Structure du projet

```
portfolio/
├── .github/workflows/deploy.yml
├── index.html                  (point d'entrée Vite, remplace l'actuel)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── data/
│   │   └── content.ts          (parcours, projets, compétences, certifs — FR + EN)
│   ├── i18n/
│   │   └── useLang.tsx         (contexte + hook de langue)
│   ├── components/
│   │   ├── Rail.tsx            (nom, nav par ancres, sélecteur de langue, liens sociaux)
│   │   ├── Hero.tsx            (accroche + bandeau de statut)
│   │   ├── Timeline.tsx        (section Parcours)
│   │   ├── ProjectCard.tsx     (carte projet avec mini-graphique + tilt au survol)
│   │   ├── Skills.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   └── AnimatedBackground.tsx (halos dégradés en mouvement)
│   └── styles/
│       └── index.css           (import Tailwind + styles globaux)
└── README.md                   (mis à jour : nouvelles commandes de dev/déploiement)
```

## Contenu à intégrer

- **Email de contact** : `rania.lasfar.ai@gmail.com` (remplace le placeholder `ton.email@exemple.com`).
- **Nouvelle expérience — TastyleTrans** (Ingénieure IA, 09/2025 – 06/2026), insérée dans la timeline juste après Crédit du Maroc et avant CBI (2024), avec les missions suivantes :
  - Développer des modèles de Machine Learning pour prédire les délais de livraison et optimiser les opérations logistiques.
  - Analyser les données de transit afin d'identifier des axes d'amélioration et de soutenir la prise de décision.
  - Concevoir des tableaux de bord et des KPI pour le suivi des performances logistiques.
  - Automatiser le traitement et l'analyse des données pour améliorer l'efficacité opérationnelle.
  - Collaborer avec les équipes métiers pour mettre en œuvre des solutions data à forte valeur ajoutée.
- Tout le reste du contenu (statut Crédit du Maroc, CBI, SRM, diplôme HEM, 5 projets, compétences, certifications, liens LinkedIn/GitHub) est repris à l'identique du site actuel, migré vers `src/data/content.ts` avec ses deux variantes FR/EN.

## Design visuel

- **Fond** : dégradé bleu nuit très sombre (`#0A0F1E` → `#131B33` → touche violette `#1B1440`), avec 2-3 halos radiaux flous (violet `#7C5CFF`, cyan `#22D3EE`) qui dérivent lentement en arrière-plan (`AnimatedBackground`), en respectant `prefers-reduced-motion`.
- **Cartes / rail** : effet verre dépoli — fond semi-transparent blanc (~5-8 % d'opacité), bordure fine claire (~12 % d'opacité), `backdrop-filter: blur()`.
- **Texte** : clair (`#E8ECFB`) sur fond sombre, texte secondaire atténué (`#8B93B8`).
- **Accent** : violet `#7C5CFF` comme couleur signal principale (liens actifs, bordures de nav au survol, accent du texte d'accroche), cyan `#22D3EE` en accent secondaire (indicateurs de statut, mini-graphiques).
- **Typographie** : inchangée (Bricolage Grotesque / IBM Plex Sans / IBM Plex Mono).
- Les mini-graphiques SVG des cartes projets sont conservés, recolorés pour la palette sombre.

## Animations (niveau "riche")

- **Au chargement** : le texte d'accroche (thesis) et le bandeau de statut apparaissent avec un léger décalage/fondu, comme aujourd'hui mais via Framer Motion (`initial`/`animate`).
- **Au scroll** : chaque section (Parcours, Projets, Compétences, Certifications, Contact) apparaît en fondu + léger déplacement vertical quand elle entre dans le viewport (`whileInView`, `once: true`).
- **Cartes projets** : légère bascule 3D (`rotateX`/`rotateY` proportionnels à la position du curseur) + élévation (ombre, translation Y) au survol.
- **Arrière-plan** : halos dégradés en mouvement continu, lent, en boucle (CSS ou Framer Motion `animate` avec `repeat: Infinity`).
- **Nav / liens** : transitions de couleur/bordure au survol, comme sur le site actuel.
- Toutes les animations doivent être désactivées ou réduites si `prefers-reduced-motion: reduce` est actif (repris du comportement déjà présent dans le site actuel).

## Accessibilité & responsive

- Contraste texte/fond vérifié pour le thème sombre (texte clair sur fond très sombre — ratio à valider WCAG AA).
- Focus clavier toujours visible (`:focus-visible`), comme sur le site actuel.
- Layout responsive : rail à gauche en colonne fixe sur desktop, empilé en haut sur mobile (< 880px), repris du comportement actuel.

## Build & vérification

Pas de suite de tests automatisés prévue (site vitrine, pas de logique métier complexe). Vérification manuelle :
- `npm run dev` pour développement local avec rechargement à chaud.
- `npm run build` doit réussir sans erreur TypeScript/ESLint avant tout déploiement.
- Vérification visuelle manuelle des deux langues (FR/EN), du responsive (desktop/mobile), et de `prefers-reduced-motion`.
