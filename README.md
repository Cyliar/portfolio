# Portfolio — Rania Lasfar

Site personnel en un seul fichier : `index.html` (HTML + CSS + JS, aucune dépendance à installer).

## Mettre le fichier au bon endroit

Dépose `index.html` et ce `README.md` dans :

```
C:\Users\Lenovo\OneDrive\Documents\code\portfolio
```

Puis double-clique sur `index.html` : le site s'ouvre dans ton navigateur.

## À modifier avant de publier

1. **Ton adresse e-mail** — cherche `ton.email@exemple.com` dans `index.html` (Ctrl+F) et remplace les deux occurrences.
2. **Les couleurs** — tout est en haut du fichier, dans le bloc `:root`. Change `--signal` pour changer l'accent du site partout.
3. **Les projets** — chaque projet est un bloc `<article class="card">`. Copie-colle un bloc existant pour en ajouter un.

## Mettre en ligne avec GitHub Pages

Depuis PowerShell, dans le dossier `portfolio` :

```bash
git init
git add .
git commit -m "Premier portfolio"
git branch -M main
git remote add origin https://github.com/Cyliar/portfolio.git
git push -u origin main
```

Crée d'abord le dépôt vide `portfolio` sur github.com/Cyliar.

Ensuite sur GitHub : **Settings → Pages → Source : `main` / `root` → Save**.
Le site sera en ligne sur `https://cyliar.github.io/portfolio/` après une ou deux minutes.

## Structure du fichier

| Bloc | Ce qu'il contient |
|---|---|
| `:root` | Couleurs, polices, espacements — les « réglages » du site |
| `.rail` | Colonne de gauche : nom, navigation, langue, liens |
| `#intro` | Accroche et bandeau d'état |
| `#parcours` | Ligne temporelle des expériences |
| `#projets` | Cartes de projets avec mini-courbes |
| `#stack` | Compétences par catégorie |
| `#certifs` | Certifications |
| `#contact` | Liens de contact |
| `<script>` | Bascule FR / EN |

La traduction fonctionne par attributs : chaque élément traduisible porte `data-fr="..."` et `data-en="..."`. Pour traduire un nouvel élément, ajoute-lui ces deux attributs.
