# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single-file `index.html` portfolio with a React + Vite + Tailwind CSS + Framer Motion project using a "Dark AI / Glassmorphism" design, deployed via GitHub Actions to the same GitHub Pages URL, with the real contact email and the TastyleTrans experience added.

**Architecture:** A single-page React app (`src/App.tsx`) renders one component per section (Rail, Hero, Timeline, Projects, Skills, Certifications, Contact) over a fixed animated background. All copy (French + English) lives in one typed data file (`src/data/content.ts`); a small context/hook (`src/i18n/useLang.tsx`) drives the FR/EN toggle and exposes a `t()` translator plus an `<Html>` helper for the few strings that embed inline markup (`<em>`, `<b>`). Framer Motion handles scroll-reveal (`whileInView`) and the project-card hover tilt. Tailwind CSS (with tokens matching the approved dark palette) replaces the old hand-written CSS.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS 3, Framer Motion (`framer-motion` package), GitHub Actions (`actions/upload-pages-artifact` + `actions/deploy-pages`).

## Global Constraints

- Site stays a single scrolling page (no router) with the sections `#intro`, `#parcours`, `#projets`, `#stack`, `#certifs`, `#contact`, and keeps the FR/EN toggle.
- Fonts unchanged: Bricolage Grotesque (display), IBM Plex Sans (body), IBM Plex Mono (mono/labels), loaded from Google Fonts.
- Color tokens (exact hex from the approved spec): background `#0A0F1E` → `#131B33` → `#1B1440`; accent violet `#7C5CFF`; accent cyan `#22D3EE`; text `#E8ECFB`; secondary text `#8B93B8`; glass surface `rgba(255,255,255,0.05)` with border `rgba(255,255,255,0.12)`.
- Deployment stays on GitHub Pages at `https://cyliar.github.io/portfolio/` — `vite.config.ts` must set `base: '/portfolio/'`.
- Contact email is `rania.lasfar.ai@gmail.com` (replaces the old placeholder).
- Timeline order (most recent first): Crédit du Maroc (current, "Depuis janvier 2025") → **TastyleTrans** (Ingénieure IA, 09/2025 – 06/2026) → CBI (2024) → SRM (2023) → HEM diploma.
- TastyleTrans missions (verbatim, French — English translations provided in Task 3 must preserve this meaning):
  1. Développer des modèles de Machine Learning pour prédire les délais de livraison et optimiser les opérations logistiques.
  2. Analyser les données de transit afin d'identifier des axes d'amélioration et de soutenir la prise de décision.
  3. Concevoir des tableaux de bord et des KPI pour le suivi des performances logistiques.
  4. Automatiser le traitement et l'analyse des données pour améliorer l'efficacité opérationnelle.
  5. Collaborer avec les équipes métiers pour mettre en œuvre des solutions data à forte valeur ajoutée.
- No automated test suite (per approved spec — this is a static portfolio, not an app with business logic). Verification per task is `npm run build` (catches TypeScript errors) plus a manual visual check in `npm run dev`, as the spec's "Build & vérification" section prescribes.
- Respect `prefers-reduced-motion: reduce` (disable/shorten animations).
- All animations, colors, and copy defined in a task must be reused with the exact same names in later tasks (see each task's Interfaces block).

---

### Task 1: Scaffold the Vite + React + TypeScript project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx` (placeholder, replaced fully in Task 13)
- Modify: `index.html` (replace the current static single-file site with the Vite HTML entry point)
- Modify: `.gitignore` (add `node_modules` and `dist`)

**Interfaces:**
- Produces: `src/App.tsx` default-exports a React component `App`, mounted by `src/main.tsx` into `#root`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.11.17",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.10"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: Write `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
```

- [ ] **Step 5: Replace `index.html` with the Vite entry point**

This overwrites the old static single-file site. Its content is being ported to React components in later tasks.

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rania Lasfar — Ingénieure IA & Automatisation</title>
    <meta
      name="description"
      content="Portfolio de Rania Lasfar, ingénieure en intelligence artificielle et automatisation à Casablanca."
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Write `src/App.tsx` (placeholder)**

```tsx
export default function App() {
  return <div className="min-h-screen" />
}
```

- [ ] **Step 7: Write `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 8: Add `node_modules` and `dist` to `.gitignore`**

Append to the existing `.gitignore` (which currently only has `.superpowers/`):

```
node_modules/
dist/
```

- [ ] **Step 9: Install dependencies and verify the build**

Run: `npm install`
Then run: `npm run build`
Expected: both commands succeed with no errors (build emits `dist/index.html` and JS/CSS assets).

- [ ] **Step 10: Commit**

```bash
git add package.json tsconfig.json tsconfig.node.json vite.config.ts index.html src/main.tsx src/App.tsx .gitignore package-lock.json
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

---

### Task 2: Configure Tailwind CSS with the Dark AI design tokens

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/styles/index.css`
- Modify: `src/main.tsx:1-10` (import the new stylesheet)

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind utility classes `bg-ink`, `bg-ink-2`, `bg-ink-3`, `text-paper`, `text-paper-2`, `text-signal`, `bg-signal`, `border-signal`, `text-pulse`, `bg-pulse`, `bg-glass`, `border-glass-border`, font families `font-display`, `font-body`, `font-mono`, the animation utility `animate-ping-slow`, and the custom breakpoint `rail:` (880px, matching the original site's rail/mobile breakpoint) — all used by every component task from here on. Layout-critical rail/main breakpoints (Task 6, Task 13) must use `rail:`, not the Tailwind-default `md:` (768px), so the sidebar and the main grid switch to the mobile layout at the same width.

- [ ] **Step 1: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        rail: '880px',
      },
      colors: {
        ink: '#0A0F1E',
        'ink-2': '#131B33',
        'ink-3': '#1B1440',
        paper: '#E8ECFB',
        'paper-2': '#8B93B8',
        signal: '#7C5CFF',
        pulse: '#22D3EE',
        glass: 'rgba(255,255,255,0.05)',
        'glass-border': 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(34,211,238,0.45)' },
          '70%': { boxShadow: '0 0 0 9px rgba(34,211,238,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34,211,238,0)' },
        },
      },
      animation: {
        'ping-slow': 'pulseGlow 2.6s ease-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 2: Write `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 3: Write `src/styles/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-ink font-body text-paper antialiased;
}

a {
  color: inherit;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid #7c5cff;
  outline-offset: 3px;
  border-radius: 3px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Import the stylesheet in `src/main.tsx`**

Add `import './styles/index.css'` as the last import at the top of `src/main.tsx`, so the file reads:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: succeeds with no errors.
Run: `npm run dev`, open the printed local URL.
Expected: blank page with a dark navy background (`#0A0F1E`) — confirms Tailwind and the fonts are wired up. Stop the dev server (Ctrl+C) after checking.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts postcss.config.js src/styles/index.css src/main.tsx
git commit -m "feat: add Tailwind CSS with dark glassmorphism design tokens"
```

---

### Task 3: Content data model (French + English copy, including TastyleTrans and the real email)

**Files:**
- Create: `src/data/content.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: the type `Lang = 'fr' | 'en'`, the interface `LocalizedText { fr: string; en: string }`, the interfaces `StatusRow`, `TimelineStep`, `Project`, `SkillGroup`, `Certification`, `SiteContent`, and the exported constant `content: SiteContent`. Every later component task imports `content` and these types from `../data/content`.

- [ ] **Step 1: Write `src/data/content.ts`**

```ts
export type Lang = 'fr' | 'en'

export interface LocalizedText {
  fr: string
  en: string
}

export interface StatusRow {
  dotVariant: 'active' | 'idle'
  text: LocalizedText
}

export interface TimelineStep {
  date: LocalizedText
  title: LocalizedText
  org: string
  description?: LocalizedText
  missions?: LocalizedText[]
}

export interface Project {
  label: LocalizedText
  title: LocalizedText
  description: LocalizedText
  tags: string[]
  sparkPoints: string
}

export interface SkillGroup {
  title: LocalizedText
  items: LocalizedText[]
}

export interface Certification {
  title: LocalizedText
  issuer: string
}

export interface SiteContent {
  name: string
  role: LocalizedText
  eyebrow: string
  thesis: LocalizedText
  lede: LocalizedText
  status: StatusRow[]
  timeline: TimelineStep[]
  projects: Project[]
  skills: SkillGroup[]
  certifications: Certification[]
  contact: {
    email: string
    linkedin: string
    github: string
    text: LocalizedText
  }
}

export const content: SiteContent = {
  name: 'Rania Lasfar',
  role: {
    fr: 'Ingénieure IA & Automatisation',
    en: 'AI & Automation Engineer',
  },
  eyebrow: 'Casablanca, Maroc',
  thesis: {
    fr: 'Lire les signaux <em>avant</em> la panne.',
    en: 'Reading the signals <em>before</em> things break.',
  },
  lede: {
    fr: "Ingénieure en intelligence artificielle et automatisation. Je construis des modèles qui anticipent — pannes de guichets, consommation d'eau, embouteillages — et des robots logiciels qui prennent en charge le travail répétitif.",
    en: 'AI and automation engineer. I build models that anticipate — ATM failures, water demand, traffic jams — and software robots that take over repetitive work.',
  },
  status: [
    {
      dotVariant: 'active',
      text: {
        fr: 'En poste — <b>Crédit du Maroc</b>, depuis janvier 2025',
        en: 'Currently at — <b>Crédit du Maroc</b>, since January 2025',
      },
    },
    {
      dotVariant: 'idle',
      text: {
        fr: 'Mobilité <b>nationale</b> — ouverte aux échanges',
        en: 'Open to roles <b>across Morocco</b> — happy to talk',
      },
    },
  ],
  timeline: [
    {
      date: { fr: 'Depuis janvier 2025', en: 'Since January 2025' },
      title: {
        fr: 'Ingénieure IA & Automatisation',
        en: 'AI & Automation Engineer',
      },
      org: 'Crédit du Maroc — Casablanca',
      description: {
        fr: "Conception et mise en production de cas d'usage IA et RPA pour la banque. Modèle de prédiction des pannes de guichets automatiques, automatisation de processus métier, tableaux de bord de suivi.",
        en: 'Designing and shipping AI and RPA use cases for the bank. Predictive model for ATM failures, business-process automation, monitoring dashboards.',
      },
    },
    {
      date: { fr: 'Septembre 2025 – Juin 2026', en: 'September 2025 – June 2026' },
      title: { fr: 'Ingénieure IA', en: 'AI Engineer' },
      org: 'TastyleTrans',
      missions: [
        {
          fr: 'Développer des modèles de Machine Learning pour prédire les délais de livraison et optimiser les opérations logistiques.',
          en: 'Building machine learning models to predict delivery times and optimize logistics operations.',
        },
        {
          fr: "Analyser les données de transit afin d'identifier des axes d'amélioration et de soutenir la prise de décision.",
          en: 'Analyzing transit data to identify improvement opportunities and support decision-making.',
        },
        {
          fr: 'Concevoir des tableaux de bord et des KPI pour le suivi des performances logistiques.',
          en: 'Designing dashboards and KPIs to track logistics performance.',
        },
        {
          fr: "Automatiser le traitement et l'analyse des données pour améliorer l'efficacité opérationnelle.",
          en: 'Automating data processing and analysis to improve operational efficiency.',
        },
        {
          fr: 'Collaborer avec les équipes métiers pour mettre en œuvre des solutions data à forte valeur ajoutée.',
          en: 'Collaborating with business teams to implement high-value data solutions.',
        },
      ],
    },
    {
      date: { fr: '2024', en: '2024' },
      title: {
        fr: 'Développeuse Microsoft Power Platform',
        en: 'Microsoft Power Platform Developer',
      },
      org: 'CBI — Casablanca',
      description: {
        fr: "Développement d'applications métier sur Power Apps et Power Automate, restitution des données sous Power BI.",
        en: 'Built internal business apps with Power Apps and Power Automate, with reporting in Power BI.',
      },
    },
    {
      date: { fr: '2023', en: '2023' },
      title: { fr: 'Data Scientist', en: 'Data Scientist' },
      org: 'SRM',
      description: {
        fr: "Modèle prédictif de consommation d'eau : préparation des données, entraînement et évaluation, restitution aux équipes métier.",
        en: 'Predictive model for water consumption: data preparation, training and evaluation, hand-off to business teams.',
      },
    },
    {
      date: { fr: 'Diplôme', en: 'Degree' },
      title: {
        fr: 'Master en Intelligence Artificielle & Data Science',
        en: 'MSc in Artificial Intelligence & Data Science',
      },
      org: 'HEM École d\'Ingénieurs — Bac+5',
    },
  ],
  projects: [
    {
      label: { fr: 'Prédiction · Banque', en: 'Prediction · Banking' },
      title: {
        fr: 'Prédiction des pannes de guichets',
        en: 'ATM failure prediction',
      },
      description: {
        fr: "Anticiper la défaillance d'un GAB à partir de ses journaux techniques, pour déclencher la maintenance avant l'arrêt de service.",
        en: 'Forecasting ATM breakdowns from device logs, so maintenance is triggered before the machine goes down.',
      },
      tags: ['Python', 'scikit-learn', 'SQL', 'Power BI'],
      sparkPoints: '0,12 14,14 28,11 42,15 56,13 66,26 78,29 92,30 108,30',
    },
    {
      label: { fr: 'Vision · Santé', en: 'Vision · Healthcare' },
      title: {
        fr: 'Détection de pneumonie par deep learning',
        en: 'Pneumonia detection with deep learning',
      },
      description: {
        fr: "Classification d'images radiographiques thoraciques par réseau de neurones convolutif, avec évaluation sur les métriques cliniquement utiles.",
        en: 'Convolutional neural network classifying chest X-rays, evaluated on the metrics that actually matter clinically.',
      },
      tags: ['TensorFlow', 'PyTorch', 'CNN', 'Python'],
      sparkPoints: '0,31 12,29 24,24 36,17 48,11 60,8 74,6 90,5 108,5',
    },
    {
      label: { fr: 'Temps réel · Mobilité', en: 'Real time · Mobility' },
      title: {
        fr: "Prédiction d'embouteillages en temps réel",
        en: 'Real-time traffic congestion prediction',
      },
      description: {
        fr: "Modèle de machine learning alimenté en flux continu, capable de rendre une décision à l'instant plutôt qu'en traitement différé.",
        en: 'Streaming machine-learning model that returns a decision on the spot rather than in a nightly batch.',
      },
      tags: ['Python', 'Streaming', 'Hadoop / Hive'],
      sparkPoints: '0,24 10,8 20,26 30,12 40,28 50,7 60,25 70,10 80,27 90,14 100,22 108,9',
    },
    {
      label: { fr: 'Prévision · Services publics', en: 'Forecasting · Utilities' },
      title: {
        fr: "Prévision de la consommation d'eau",
        en: 'Water consumption forecasting',
      },
      description: {
        fr: 'Modèle de série temporelle pour estimer la demande à venir et appuyer la planification des ressources.',
        en: 'Time-series model estimating upcoming demand to support resource planning.',
      },
      tags: ['Python', 'scikit-learn', 'SQL'],
      sparkPoints: '0,22 12,10 24,24 36,12 48,26 60,13 72,27 84,15 96,28 108,17',
    },
    {
      label: { fr: 'Automatisation · Métier', en: 'Automation · Operations' },
      title: {
        fr: 'Robots RPA & applications Power Platform',
        en: 'RPA robots & Power Platform apps',
      },
      description: {
        fr: "Automatisation de tâches manuelles répétitives et applications internes livrées aux équipes métier, du besoin au déploiement.",
        en: 'Automating repetitive manual tasks and shipping internal apps to business teams, from need to deployment.',
      },
      tags: ['Automation Anywhere', 'Power Apps', 'Power Automate', 'Power BI'],
      sparkPoints: '0,28 18,28 18,21 44,21 44,14 70,14 70,7 108,7',
    },
  ],
  skills: [
    {
      title: { fr: 'Machine learning & IA', en: 'Machine learning & AI' },
      items: [
        { fr: 'Python', en: 'Python' },
        { fr: 'scikit-learn', en: 'scikit-learn' },
        { fr: 'TensorFlow', en: 'TensorFlow' },
        { fr: 'PyTorch', en: 'PyTorch' },
        { fr: 'NLP', en: 'NLP' },
        { fr: 'LLM', en: 'LLM' },
      ],
    },
    {
      title: { fr: 'Données', en: 'Data' },
      items: [
        { fr: 'SQL', en: 'SQL' },
        { fr: 'Hadoop', en: 'Hadoop' },
        { fr: 'Hive', en: 'Hive' },
        { fr: 'Power BI', en: 'Power BI' },
      ],
    },
    {
      title: {
        fr: 'Automatisation & développement',
        en: 'Automation & development',
      },
      items: [
        { fr: 'Automation Anywhere (RPA)', en: 'Automation Anywhere (RPA)' },
        { fr: 'Power Apps', en: 'Power Apps' },
        { fr: 'Power Automate', en: 'Power Automate' },
        { fr: 'C#', en: 'C#' },
        { fr: '.NET MAUI', en: '.NET MAUI' },
      ],
    },
    {
      title: { fr: 'Langues', en: 'Languages' },
      items: [
        { fr: 'Arabe — C2', en: 'Arabic — C2' },
        { fr: 'Français — C1', en: 'French — C1' },
        { fr: 'Anglais — C1', en: 'English — C1' },
      ],
    },
  ],
  certifications: [
    {
      title: { fr: 'Data Science Professional', en: 'Data Science Professional' },
      issuer: 'IBM',
    },
    {
      title: { fr: 'Intelligence artificielle générative', en: 'Generative AI' },
      issuer: 'IBM',
    },
    { title: { fr: 'Scrum', en: 'Scrum' }, issuer: 'IBM' },
    {
      title: {
        fr: 'Automatisation robotisée des processus',
        en: 'Robotic Process Automation',
      },
      issuer: 'Automation Anywhere',
    },
    {
      title: { fr: "L'IA en entreprise", en: 'AI for Business' },
      issuer: 'Columbia',
    },
  ],
  contact: {
    email: 'rania.lasfar.ai@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rania-lasfar-681977265/',
    github: 'https://github.com/Cyliar',
    text: {
      fr: "Basée à Casablanca, mobile partout au Maroc. Le plus simple est de m'écrire sur LinkedIn.",
      en: 'Based in Casablanca, available across Morocco. LinkedIn is the easiest way to reach me.',
    },
  },
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds (the file isn't imported anywhere yet, but `tsc` must still type-check it without errors).

- [ ] **Step 3: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: add bilingual content data model with TastyleTrans experience"
```

---

### Task 4: Language context and translation helpers

**Files:**
- Create: `src/i18n/useLang.tsx`

**Interfaces:**
- Consumes: `Lang`, `LocalizedText` from `../data/content` (Task 3).
- Produces: `LangProvider` (component wrapping the app), `useLang()` hook returning `{ lang: Lang; setLang: (lang: Lang) => void; t: (text: LocalizedText) => string }`, and the `Html` component (`<Html text={someLocalizedText} />`) for strings containing inline markup. All component tasks from here on import from `../i18n/useLang`.

- [ ] **Step 1: Write `src/i18n/useLang.tsx`**

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Lang, LocalizedText } from '../data/content'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (text: LocalizedText) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr')
  const t = (text: LocalizedText) => text[lang]

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) {
    throw new Error('useLang must be used within a LangProvider')
  }
  return ctx
}

export function Html({ text }: { text: LocalizedText }) {
  const { t } = useLang()
  return <span dangerouslySetInnerHTML={{ __html: t(text) }} />
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/i18n/useLang.tsx
git commit -m "feat: add FR/EN language context and translation helpers"
```

---

### Task 5: Animated background

**Files:**
- Create: `src/components/AnimatedBackground.tsx`

**Interfaces:**
- Consumes: `motion` from `framer-motion`.
- Produces: default export `AnimatedBackground`, a fixed, non-interactive component rendered once in `App.tsx` (Task 13).

- [ ] **Step 1: Write `src/components/AnimatedBackground.tsx`**

```tsx
import { motion } from 'framer-motion'

const blobs = [
  { className: 'bg-signal/30 w-[420px] h-[420px] -top-32 -right-24', duration: 22 },
  { className: 'bg-pulse/25 w-[380px] h-[380px] top-1/3 -left-32', duration: 26 },
  { className: 'bg-ink-3 w-[320px] h-[320px] bottom-0 right-1/4', duration: 30 },
]

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-ink via-ink-2 to-ink-3">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/AnimatedBackground.tsx
git commit -m "feat: add animated gradient background"
```

---

### Task 6: Rail navigation component

**Files:**
- Create: `src/components/Rail.tsx`

**Interfaces:**
- Consumes: `content` from `../data/content` (Task 3), `useLang` from `../i18n/useLang` (Task 4).
- Produces: default export `Rail`, rendered once in `App.tsx` (Task 13). No props.

- [ ] **Step 1: Write `src/components/Rail.tsx`**

```tsx
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

const navItems = [
  { href: '#intro', fr: 'Profil', en: 'Profile' },
  { href: '#parcours', fr: 'Parcours', en: 'Experience' },
  { href: '#projets', fr: 'Projets', en: 'Projects' },
  { href: '#stack', fr: 'Compétences', en: 'Skills' },
  { href: '#certifs', fr: 'Certifications', en: 'Certifications' },
  { href: '#contact', fr: 'Contact', en: 'Contact' },
]

export default function Rail() {
  const { lang, setLang, t } = useLang()
  const [firstName, lastName] = content.name.split(' ')

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-7 border-glass-border bg-ink/60 p-7 backdrop-blur-md rail:sticky rail:top-0 rail:h-screen rail:w-[300px] rail:border-r"
    >
      <div>
        <div className="font-display text-3xl font-extrabold leading-tight tracking-tight">
          {firstName}
          <br />
          {lastName}
        </div>
        <div className="mt-2.5 font-mono text-[11.5px] uppercase tracking-widest text-paper-2">
          {t(content.role)}
        </div>
      </div>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="border-l-2 border-glass-border py-1.5 pl-4 font-mono text-[12.5px] text-paper-2 transition-all hover:border-signal hover:pl-6 hover:text-signal"
          >
            {lang === 'fr' ? item.fr : item.en}
          </a>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-3.5">
        <div className="flex w-max overflow-hidden rounded-full border border-glass-border bg-glass">
          {(['fr', 'en'] as const).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className={`px-3.5 py-1.5 font-mono text-[11.5px] tracking-wider transition-colors ${
                lang === l ? 'bg-signal text-white' : 'text-paper-2'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1.5 font-mono text-xs">
          <a
            href="https://www.linkedin.com/in/rania-lasfar-681977265/"
            target="_blank"
            rel="noopener"
            className="text-paper-2 transition-colors hover:text-signal"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/Cyliar"
            target="_blank"
            rel="noopener"
            className="text-paper-2 transition-colors hover:text-signal"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </motion.aside>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Rail.tsx
git commit -m "feat: add Rail navigation component"
```

---

### Task 7: Hero section

**Files:**
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `content` from `../data/content` (Task 3), `Html`, `useLang` from `../i18n/useLang` (Task 4), `animate-ping-slow` Tailwind utility (Task 2).
- Produces: default export `Hero`, rendered once in `App.tsx` (Task 13). No props.

- [ ] **Step 1: Write `src/components/Hero.tsx`**

```tsx
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { Html, useLang } from '../i18n/useLang'

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="intro" className="pb-16 pt-8 md:pb-20 md:pt-10">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal"
      >
        {content.eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6 max-w-[16ch] font-display text-[clamp(34px,5.6vw,60px)] font-extrabold leading-[1.02] tracking-[-0.035em] [&_em]:not-italic [&_em]:text-signal"
      >
        <Html text={content.thesis} />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-[56ch] text-[17px] text-paper-2"
      >
        {t(content.lede)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 max-w-[520px] rounded-xl border border-glass-border bg-glass py-1 backdrop-blur-md"
      >
        {content.status.map((row, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-[18px] py-3 font-mono text-[12.5px] text-paper-2 ${
              i > 0 ? 'border-t border-glass-border' : ''
            }`}
          >
            <span
              className={`h-2 w-2 flex-none rounded-full ${
                row.dotVariant === 'active' ? 'animate-ping-slow bg-pulse' : 'bg-signal'
              }`}
            />
            <Html text={row.text} />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with entrance animation"
```

---

### Task 8: Timeline (Parcours) section

**Files:**
- Create: `src/components/Timeline.tsx`

**Interfaces:**
- Consumes: `content`, `TimelineStep` from `../data/content` (Task 3), `useLang` from `../i18n/useLang` (Task 4).
- Produces: default export `Timeline`, rendered once in `App.tsx` (Task 13). No props. Renders `step.missions` as a bullet list when present (TastyleTrans), otherwise `step.description` as a paragraph.

- [ ] **Step 1: Write `src/components/Timeline.tsx`**

```tsx
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function Timeline() {
  const { t } = useLang()

  return (
    <section id="parcours" className="border-t border-glass-border py-16 md:py-20">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        01 — {t({ fr: 'Parcours', en: 'Experience' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: "Là où j'ai travaillé", en: "Where I've worked" })}
      </h2>

      <div className="relative pl-7">
        <div className="absolute bottom-1.5 left-[3px] top-1.5 w-px bg-glass-border" />
        {content.timeline.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative py-4"
          >
            <div className="absolute -left-7 top-6 h-1.5 w-1.5 rounded-full border-2 border-signal bg-ink" />
            <div className="font-mono text-xs tracking-wide text-signal">{t(step.date)}</div>
            <div className="mt-1 text-[17px] font-semibold">{t(step.title)}</div>
            <div className="mt-0.5 font-mono text-[12.5px] text-paper-2">{step.org}</div>
            {step.missions ? (
              <ul className="mt-2 max-w-[62ch] list-disc space-y-1 pl-4 text-[15px] text-paper-2">
                {step.missions.map((mission, j) => (
                  <li key={j}>{t(mission)}</li>
                ))}
              </ul>
            ) : step.description ? (
              <p className="mt-2 max-w-[62ch] text-[15px] text-paper-2">{t(step.description)}</p>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Timeline.tsx
git commit -m "feat: add Timeline section with TastyleTrans experience"
```

---

### Task 9: Project card and Projects section (hover tilt + scroll reveal)

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/Projects.tsx`

**Interfaces:**
- Consumes: `Project` type from `../data/content` (Task 3), `useLang` from `../i18n/useLang` (Task 4).
- Produces: `ProjectCard` (default export, prop `project: Project`) used by `Projects` (default export, no props), which is rendered once in `App.tsx` (Task 13).

- [ ] **Step 1: Write `src/components/ProjectCard.tsx`**

```tsx
import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { Project } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-40, 40], [6, -6])
  const rotateY = useTransform(x, [-40, 40], [-6, 6])

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(event.clientX - rect.left - rect.width / 2)
    y.set(event.clientY - rect.top - rect.height / 2)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -20px rgba(124,92,255,0.35)' }}
      className="grid grid-cols-1 gap-5 rounded-xl border border-glass-border bg-glass p-6 backdrop-blur-md sm:grid-cols-[1fr_108px]"
    >
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper-2">
          {t(project.label)}
        </div>
        <h3 className="mb-2 mt-2 font-display text-[19px] font-bold tracking-[-0.01em]">
          {t(project.title)}
        </h3>
        <p className="max-w-[52ch] text-[14.5px] text-paper-2">{t(project.description)}</p>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-glass-border bg-ink-2/60 px-2.5 py-1 font-mono text-[11px] text-paper-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 108 34" className="h-[34px] w-[108px] self-start sm:w-full" aria-hidden="true">
        <polyline points="0,17 108,17" fill="none" stroke="#8B93B8" strokeWidth={1} strokeDasharray="2 3" />
        <polyline
          points={project.sparkPoints}
          fill="none"
          stroke="#7C5CFF"
          strokeWidth={1.6}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </motion.article>
  )
}
```

- [ ] **Step 2: Write `src/components/Projects.tsx`**

```tsx
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const { t } = useLang()

  return (
    <section id="projets" className="border-t border-glass-border py-16 md:py-20">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        02 — {t({ fr: 'Projets', en: 'Projects' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: "Ce que j'ai construit", en: "What I've built" })}
      </h2>

      <div className="grid gap-4">
        {content.projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/Projects.tsx
git commit -m "feat: add Projects section with hover-tilt cards"
```

---

### Task 10: Skills section

**Files:**
- Create: `src/components/Skills.tsx`

**Interfaces:**
- Consumes: `content` from `../data/content` (Task 3), `useLang` from `../i18n/useLang` (Task 4).
- Produces: default export `Skills`, rendered once in `App.tsx` (Task 13). No props.

- [ ] **Step 1: Write `src/components/Skills.tsx`**

```tsx
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function Skills() {
  const { t } = useLang()

  return (
    <section id="stack" className="border-t border-glass-border py-16 md:py-20">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        03 — {t({ fr: 'Compétences', en: 'Skills' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: 'Mes outils', en: 'My toolkit' })}
      </h2>

      {content.skills.map((group, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="mb-6"
        >
          <h3 className="mb-2.5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-paper-2">
            {t(group.title)}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item, j) => (
              <span key={j} className="rounded-lg border border-glass-border bg-glass px-3.5 py-1.5 text-sm">
                {t(item)}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.tsx
git commit -m "feat: add Skills section"
```

---

### Task 11: Certifications section

**Files:**
- Create: `src/components/Certifications.tsx`

**Interfaces:**
- Consumes: `content` from `../data/content` (Task 3), `useLang` from `../i18n/useLang` (Task 4).
- Produces: default export `Certifications`, rendered once in `App.tsx` (Task 13). No props.

- [ ] **Step 1: Write `src/components/Certifications.tsx`**

```tsx
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function Certifications() {
  const { t } = useLang()

  return (
    <section id="certifs" className="border-t border-glass-border py-16 md:py-20">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        04 — {t({ fr: 'Certifications', en: 'Certifications' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: "Ce que j'ai validé", en: "What I've certified" })}
      </h2>

      <ul className="overflow-hidden rounded-xl border border-glass-border">
        {content.certifications.map((cert, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className={`flex flex-wrap items-baseline justify-between gap-4 bg-glass px-5 py-4 ${
              i > 0 ? 'border-t border-glass-border' : ''
            }`}
          >
            <span>{t(cert.title)}</span>
            <span className="font-mono text-xs text-paper-2">{cert.issuer}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Certifications.tsx
git commit -m "feat: add Certifications section"
```

---

### Task 12: Contact section

**Files:**
- Create: `src/components/Contact.tsx`

**Interfaces:**
- Consumes: `content` from `../data/content` (Task 3, including the real `contact.email`), `useLang` from `../i18n/useLang` (Task 4).
- Produces: default export `Contact`, rendered once in `App.tsx` (Task 13). No props.

- [ ] **Step 1: Write `src/components/Contact.tsx`**

```tsx
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function Contact() {
  const { t } = useLang()

  return (
    <section id="contact" className="border-t border-glass-border py-16 md:py-24">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        05 — {t({ fr: 'Contact', en: 'Contact' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: 'Parlons-en', en: "Let's talk" })}
      </h2>
      <p className="max-w-[62ch] text-paper-2">{t(content.contact.text)}</p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-6 flex flex-wrap gap-2.5"
      >
        <a
          href={`mailto:${content.contact.email}`}
          className="rounded-lg border border-signal bg-signal px-5 py-2.5 font-mono text-[13px] text-white transition-colors hover:bg-[#6a4ee0]"
        >
          {content.contact.email}
        </a>
        <a
          href={content.contact.linkedin}
          target="_blank"
          rel="noopener"
          className="rounded-lg border border-glass-border px-5 py-2.5 font-mono text-[13px] transition-colors hover:border-signal hover:text-signal"
        >
          LinkedIn
        </a>
        <a
          href={content.contact.github}
          target="_blank"
          rel="noopener"
          className="rounded-lg border border-glass-border px-5 py-2.5 font-mono text-[13px] transition-colors hover:border-signal hover:text-signal"
        >
          GitHub
        </a>
      </motion.div>

      <footer className="mt-10 border-t border-glass-border pt-8 font-mono text-[11.5px] text-paper-2">
        © {new Date().getFullYear()} {content.name} — Casablanca
      </footer>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: add Contact section with real email"
```

---

### Task 13: Wire everything together in App.tsx

**Files:**
- Modify: `src/App.tsx` (replace the Task 1 placeholder entirely)

**Interfaces:**
- Consumes: `LangProvider` (Task 4), `AnimatedBackground` (Task 5), `Rail` (Task 6), `Hero` (Task 7), `Timeline` (Task 8), `Projects` (Task 9), `Skills` (Task 10), `Certifications` (Task 11), `Contact` (Task 12).
- Produces: default export `App`, mounted by `src/main.tsx` (Task 1).

- [ ] **Step 1: Replace `src/App.tsx`**

```tsx
import AnimatedBackground from './components/AnimatedBackground'
import Rail from './components/Rail'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import { LangProvider } from './i18n/useLang'

export default function App() {
  return (
    <LangProvider>
      <AnimatedBackground />
      <div className="grid min-h-screen rail:grid-cols-[300px_1fr]">
        <Rail />
        <main className="px-6 pb-24 pt-10 rail:px-[clamp(24px,5vw,72px)]">
          <Hero />
          <Timeline />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
      </div>
    </LangProvider>
  )
}
```

- [ ] **Step 2: Verify with a full manual pass**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

Run: `npm run dev`, open the printed local URL, and check:
- The rail (name, nav, language buttons, social links) shows on the left on a wide window and reflows above the content on a narrow one (< 880px).
- Every section (Profil, Parcours, Projets, Compétences, Certifications, Contact) renders with the dark glass styling and fades in as you scroll to it.
- The Parcours timeline shows Crédit du Maroc, then **TastyleTrans** with its 5 missions as bullets, then CBI, SRM, and the HEM diploma, in that order.
- Clicking **EN** switches all text (including the TastyleTrans missions) to English; clicking **FR** switches back.
- Hovering a project card tilts it slightly and lifts it.
- The Contact section's email button points to `rania.lasfar.ai@gmail.com`.
- In your OS/browser's reduced-motion setting, animations are effectively disabled.

Stop the dev server (Ctrl+C) after checking.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire all sections together in App"
```

---

### Task 14: GitHub Actions deployment workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `npm run build` (Task 1) producing `dist/`.
- Produces: a GitHub Pages deployment triggered on every push to `main`.

- [ ] **Step 1: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify the workflow syntax**

Run: `npm run build` one more time locally to confirm `dist/` is produced (the workflow relies on the same command).
There is no local GitHub Actions runner, so full verification only happens after this is pushed — note this for the user in the final task (Task 15) as a manual follow-up: after pushing to `main`, check the **Actions** tab on GitHub for a successful run, and switch **Settings → Pages → Source** to **GitHub Actions** if it isn't already (one-time change).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy to GitHub Pages via GitHub Actions"
```

---

### Task 15: Update README and final verification

**Files:**
- Modify: `README.md` (replace the old single-file instructions entirely)

**Interfaces:**
- Consumes: nothing (documentation only).

- [ ] **Step 1: Replace `README.md`**

```markdown
# Portfolio — Rania Lasfar

Site personnel construit avec React, Vite, Tailwind CSS et Framer Motion.

## Développement local

\`\`\`bash
npm install
npm run dev
\`\`\`

Le site est servi sur http://localhost:5173 avec rechargement à chaud.

## Build de production

\`\`\`bash
npm run build
\`\`\`

Génère le site statique dans \`dist/\`.

## Déploiement

Chaque push sur \`main\` déclenche le workflow GitHub Actions (\`.github/workflows/deploy.yml\`) qui build le projet et publie \`dist/\` sur GitHub Pages. Le site est en ligne sur https://cyliar.github.io/portfolio/.

**Pré-requis (une seule fois)** : dans GitHub → Settings → Pages, régler *Source* sur **GitHub Actions** (au lieu de "Deploy from a branch").

## Structure du projet

| Dossier / fichier | Rôle |
|---|---|
| \`src/data/content.ts\` | Tout le contenu du site (parcours, projets, compétences, certifications), en français et en anglais |
| \`src/i18n/useLang.tsx\` | Contexte et hook pour la bascule de langue FR/EN |
| \`src/components/\` | Un composant par section du site |
| \`tailwind.config.ts\` | Palette de couleurs et typographies |

### Ajouter un projet

Ajouter une entrée dans le tableau \`projects\` de \`src/data/content.ts\` (voir les entrées existantes comme modèle), avec un \`sparkPoints\` (liste de points SVG) représentant la forme du mini-graphique.

### Ajouter une expérience

Ajouter une entrée dans le tableau \`timeline\` de \`src/data/content.ts\` — utiliser \`description\` pour un paragraphe unique, ou \`missions\` pour une liste à puces (comme pour TastyleTrans).
```

- [ ] **Step 2: Final verification pass**

Run: `npm run build`
Expected: succeeds with no errors.

Run: `git status`
Expected: working tree clean after the commit below (no leftover untracked build artifacts — `dist/` and `node_modules/` must be ignored per Task 1's `.gitignore` update).

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README for the React/Vite portfolio"
```
