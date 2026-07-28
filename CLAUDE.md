# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Vue d'ensemble

Portfolio personnel de Rania Lasfar : un site statique en un seul fichier `index.html` (HTML + CSS + JS inline, aucune dépendance, aucun build). `README.md` contient les instructions de déploiement en français destinées à l'utilisatrice.

## Commandes

Pas de build, lint ou tests — le site s'ouvre directement dans un navigateur.

- **Prévisualiser** : double-cliquer sur `index.html`, ou servir le dossier (`python -m http.server`) si un rechargement via serveur local est nécessaire.
- **Déployer** : push sur `main` du repo `Cyliar/portfolio` sur GitHub, avec GitHub Pages configuré sur `main` / `root`. Le site est servi sur `https://cyliar.github.io/portfolio/`.

## Architecture

Tout vit dans `index.html`, organisé en 4 blocs commentés dans le `<style>` :

1. **Jetons de design** (`:root`) — couleurs, polices, espacements. Modifier ces variables change l'identité visuelle du site entier (ex. `--signal` = couleur d'accent unique).
2. **Rail de gauche** (`.rail`) — colonne fixe (nom, nav par ancres, sélecteur de langue, liens sociaux).
3. **Colonne principale** (`main`) — sections empilées : `#intro`, `#parcours`, `#projets`, `#stack`, `#certifs`, `#contact`.
4. **Apparition au chargement + responsive** — animations `.reveal`, media queries.

En dessous de 880px, le layout passe d'une grille 2 colonnes à 1 colonne (rail en haut, nav horizontale).

### Système de traduction FR/EN

Pas de framework i18n : chaque élément traduisible porte `data-fr="..."` et `data-en="..."`. Le script en fin de fichier (`appliquerLangue`) lit l'attribut correspondant à la langue active et remplace `innerHTML`. Pour ajouter du contenu traduisible, toujours poser les deux attributs sur l'élément — sans `data-en`, le texte FR reste affiché même en mode EN.

### Ajouter un projet

Copier un bloc `<article class="card">` existant dans `#projets`. Chaque carte a un mini-graphique SVG (`.spark`) dont les `points` de la `<polyline>` dessinent une forme représentative du projet (ex. courbe descendante pour une prédiction de panne).

## À savoir

- L'adresse e-mail de contact dans `#contact` est encore un placeholder (`ton.email@exemple.com`, deux occurrences) — à remplacer avant publication.
- Email de contact de Rania : `rania.lasfar.ai@gmail.com`.
- Dernière expérience non encore intégrée au site (`#parcours`) : **Ingénieure IA — TastyleTrans**.
  - Développer des modèles de Machine Learning pour prédire les délais de livraison et optimiser les opérations logistiques.
  - Analyser les données de transit afin d'identifier des axes d'amélioration et de soutenir la prise de décision.
  - Concevoir des tableaux de bord et des KPI pour le suivi des performances logistiques.
  - Automatiser le traitement et l'analyse des données pour améliorer l'efficacité opérationnelle.
  - Collaborer avec les équipes métiers pour mettre en œuvre des solutions data à forte valeur ajoutée.
