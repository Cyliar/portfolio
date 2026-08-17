# Portfolio v2 — refonte cinématique

Date : 2026-08-17
Statut : validé par Rania Lasfar

## Objectif

Refaire intégralement le portfolio pour le rendre nettement plus attractif :
direction visuelle cinématique sombre, scroll narratif plein écran, photo de
profil et CV téléchargeable. Le contenu existant (parcours, projets,
compétences, certifications, contact) est conservé intégralement et enrichi.

## Contexte de départ

- Le dossier local contient un portfolio React fonctionnel mais sobre :
  sidebar `Rail` fixe + sections empilées, palette bleu nuit discrète.
- `origin/main` sur GitHub a divergé : il porte l'ancien portfolio écrit à la
  main (`index.html`, 25 Ko), plus deux fichiers ajoutés par Rania via
  l'interface web — `RANIA_LASFAR.pdf` (son CV) et `2.PNG` (sa photo).
- Le local est 22 commits en avance, le remote 1 commit en avance. La fusion
  doit conserver le CV et la photo, et remplacer l'ancien `index.html`.

## Décisions de design

### Structure : scroll narratif plein écran

La sidebar est supprimée. Elle immobilisait 300 px et empêchait l'impact plein
écran attendu d'une direction cinématique. Elle est remplacée par :

- un header flottant fin et collant : nom, navigation par ancres, sélecteur
  FR/EN, bouton « Télécharger mon CV » ;
- une barre de progression de scroll en haut de page ;
- un menu plein écran sur mobile.

### Système visuel

- **Fond** : `#05060B`, trois halos « aurore » (violet, cyan, magenta) en
  mouvement lent, voile de grain fin par-dessus pour casser l'aspect dégradé
  plastique.
- **Accents** : dégradé violet `#7C5CFF` → cyan `#22D3EE`. Ambre `#FFB86B`
  en troisième accent, réservé aux éléments à faire ressortir (badge de
  disponibilité, chiffres clés).
- **Typographies** : *Space Grotesk* en display (large, serré, dégradé sur le
  nom), *Inter* en texte courant, *JetBrains Mono* pour les étiquettes
  techniques.
- **Micro-interactions** : lueur qui suit le curseur sur les cartes projet,
  révélation des sections au scroll, chiffres qui s'incrémentent, bandeau
  défilant de technologies, boutons réactifs au survol.

### Sections

1. **Hero** — plein écran : photo traitée dans un anneau dégradé, nom en très
   grand, rôle, badge « en recherche d'un poste », boutons *Voir mes projets*
   et *Télécharger mon CV*.
2. **Chiffres clés** — expérience, projets IA, certifications, langues ;
   animés à l'apparition.
3. **À propos** — la thèse « Lire les signaux avant la panne » développée.
4. **Projets** — 5 cartes larges : mini-graphique, tags, lueur au survol.
5. **Parcours** — timeline verticale : TastyleTrans, Crédit du Maroc, CBI,
   SRM, Master HEM.
6. **Compétences** — 5 groupes en grille bento.
7. **Certifications** — IBM ×3, Automation Anywhere, Columbia.
8. **Contact** — formulaire, e-mail, téléphone, LinkedIn, GitHub.

## Architecture technique

Le socle est conservé — React 18, Vite, TypeScript, Tailwind, Framer Motion —
parce que le workflow de déploiement GitHub Pages existe et fonctionne. Tous
les composants sont réécrits de zéro.

| Unité | Rôle | Dépend de |
|---|---|---|
| `data/content.ts` | source unique du contenu FR/EN, enrichie (chiffres clés, à propos, libellés de nav) | — |
| `i18n/useLang.tsx` | état de langue, `t()`, composant `<Html>` pour le HTML inline | `content.ts` |
| `components/Aurora.tsx` | fond animé : halos + grain | `useReducedMotion` |
| `components/Header.tsx` | nav collante, progression de scroll, FR/EN, CV, menu mobile | `content.ts`, `useLang` |
| `components/Section.tsx` | enveloppe partagée : ancre, titre, révélation au scroll | `useLang` |
| `components/Hero.tsx` | écran d'ouverture, photo, appels à l'action | `content.ts`, `useLang` |
| `components/Stats.tsx` | chiffres clés incrémentés | `content.ts` |
| `components/About.tsx` | thèse développée | `content.ts` |
| `components/Projects.tsx` / `ProjectCard.tsx` | grille de projets, lueur au curseur | `content.ts`, `Section` |
| `components/Timeline.tsx` | parcours vertical | `content.ts`, `Section` |
| `components/Skills.tsx` | grille bento des compétences | `content.ts`, `Section` |
| `components/Certifications.tsx` | liste des certifications | `content.ts`, `Section` |
| `components/Contact.tsx` / `ContactForm.tsx` | coordonnées et formulaire | `content.ts`, `Section` |
| `components/Marquee.tsx` | bandeau défilant de technologies | `content.ts` |

`Rail.tsx` et `AnimatedBackground.tsx` sont supprimés.

## Traitement de la photo

La photo fournie (`2.PNG`) est un portrait posé sur un disque blanc, dans un
cadre carré transparent, non centré. Elle est retraitée avec Pillow, pas
seulement habillée en CSS :

- recadrage carré sur le disque, visage centré ;
- fond hors du disque rendu transparent ;
- contraste et netteté ajustés ;
- export WebP optimisé, avec PNG de repli.

Le résultat est placé dans `public/` et affiché dans un anneau dégradé
lumineux.

## Formulaire de contact

Une constante `FORMSPREE_ID` pilote le comportement. Renseignée, le formulaire
poste vers Formspree et affiche un état de succès ou d'erreur. Laissée vide —
le cas au moment de la livraison — le formulaire retombe sur un `mailto`
pré-rempli. Aucun compte n'est requis pour que le site fonctionne.

## Accessibilité

- `MotionConfig reducedMotion="user"` neutralise les animations de transform
  quand le système le demande ; les fondus d'opacité subsistent.
- `Aurora` vérifie `useReducedMotion()` et ne planifie alors aucune boucle.
- Contrastes vérifiés sur fond sombre, focus visible sur tous les éléments
  interactifs, navigation au clavier dans le menu mobile, libellés `aria` sur
  les liens porteurs d'icône seule.

## Critères de réussite

- `npm run build` passe sans erreur TypeScript.
- Rendu correct de 360 px à 1920 px de large, sans défilement horizontal.
- Le CV se télécharge, la photo s'affiche, le formulaire envoie.
- Le bascule FR/EN traduit toutes les sections.
- L'historique local et distant est fusionné, puis poussé sur `main`.

## Hors périmètre

- Aucun compte Formspree créé à cette étape.
- Pas de blog, pas de pages projet dédiées, pas de CMS.
- Pas de suite de tests automatisés : le dépôt n'en a pas et en introduire une
  déborde du cadre de la refonte visuelle.
