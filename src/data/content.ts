export type Lang = 'fr' | 'en'

export interface LocalizedText {
  fr: string
  en: string
}

export interface NavItem {
  /** Identifiant de la section, utilisé comme ancre et comme clé React. */
  id: string
  label: LocalizedText
}

export interface StatusRow {
  dotVariant: 'active' | 'idle'
  text: LocalizedText
}

export interface Stat {
  value: number
  label: LocalizedText
}

export interface TimelineStep {
  date: LocalizedText
  title: LocalizedText
  org: string
  /** Marque le poste en cours : puce animée et filet mis en avant. */
  current?: boolean
  description?: LocalizedText
  missions?: LocalizedText[]
}

export interface Project {
  label: LocalizedText
  title: LocalizedText
  description: LocalizedText
  tags: string[]
  /** Points du mini-graphique SVG, dans une boîte de 108 × 36. */
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
  /** Chemins servis depuis `public/`, relatifs pour tenir sous un sous-dossier. */
  photo: string
  cv: string
  nav: NavItem[]
  status: StatusRow[]
  stats: Stat[]
  about: LocalizedText[]
  marquee: string[]
  timeline: TimelineStep[]
  projects: Project[]
  skills: SkillGroup[]
  certifications: Certification[]
  contact: {
    email: string
    phone: string
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
    fr: "Je construis des modèles qui anticipent — pannes de guichets, consommation d'eau, embouteillages — et des robots logiciels qui prennent en charge le travail répétitif.",
    en: 'I build models that anticipate — ATM failures, water demand, traffic jams — and software robots that take over repetitive work.',
  },
  photo: './rania.webp',
  cv: './CV-Rania-Lasfar.pdf',
  nav: [
    { id: 'about', label: { fr: 'À propos', en: 'About' } },
    { id: 'projects', label: { fr: 'Projets', en: 'Projects' } },
    { id: 'timeline', label: { fr: 'Parcours', en: 'Experience' } },
    { id: 'skills', label: { fr: 'Compétences', en: 'Skills' } },
    { id: 'certifications', label: { fr: 'Certifications', en: 'Certifications' } },
    { id: 'contact', label: { fr: 'Contact', en: 'Contact' } },
  ],
  status: [
    {
      dotVariant: 'active',
      text: {
        fr: "En recherche d'un nouveau poste",
        en: 'Looking for a new role',
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
  stats: [
    {
      value: 4,
      label: { fr: 'expériences en entreprise', en: 'roles in industry' },
    },
    {
      value: 5,
      label: { fr: 'projets IA & data livrés', en: 'AI & data projects shipped' },
    },
    {
      value: 5,
      label: { fr: 'certifications professionnelles', en: 'professional certifications' },
    },
    {
      value: 3,
      label: { fr: 'langues de travail', en: 'working languages' },
    },
  ],
  about: [
    {
      fr: "Ingénieure en intelligence artificielle et data science, diplômée major de promotion de HEM École d'Ingénieurs. Mon travail tient en une idée : la plupart des pannes, des ruptures et des engorgements laissent une trace dans les données bien avant de se produire. Reste à savoir la lire.",
      en: "AI and data science engineer, top of my class at HEM École d'Ingénieurs. My work comes down to one idea: most breakdowns, shortages and bottlenecks leave a trace in the data long before they happen. The job is learning to read it.",
    },
    {
      fr: "En banque, cela donne un modèle qui signale le guichet automatique sur le point de tomber, pour envoyer la maintenance avant l'arrêt de service. Dans les services publics, une prévision de la demande en eau qui appuie la planification. En logistique, des délais de livraison estimés à l'avance et des tableaux de bord qui rendent la performance lisible.",
      en: 'In banking, that becomes a model flagging the ATM about to fail, so maintenance goes out before the machine stops. In utilities, a water-demand forecast that supports planning. In logistics, delivery times estimated ahead of the fact, and dashboards that make performance legible.',
    },
    {
      fr: "L'autre moitié de mon métier, c'est l'automatisation : robots RPA et applications Power Platform qui reprennent les tâches répétitives, pour que les équipes passent leur temps sur les décisions plutôt que sur la saisie.",
      en: 'The other half of my work is automation: RPA robots and Power Platform apps that absorb repetitive tasks, so teams spend their time on decisions instead of data entry.',
    },
  ],
  marquee: [
    'Python',
    'Machine Learning',
    'Deep Learning',
    'TensorFlow',
    'PyTorch',
    'scikit-learn',
    'NLP',
    'LLM',
    'SQL',
    'Hadoop',
    'Hive',
    'Power BI',
    'Automation Anywhere',
    'Power Apps',
    'Power Automate',
    'C#',
    '.NET MAUI',
  ],
  timeline: [
    {
      date: { fr: 'Septembre 2025 – Juin 2026', en: 'September 2025 – June 2026' },
      title: { fr: 'Ingénieure IA', en: 'AI Engineer' },
      org: 'TastyleTrans',
      current: true,
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
      date: { fr: 'Janvier 2025 – Septembre 2025', en: 'January 2025 – September 2025' },
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
      org: "HEM École d'Ingénieurs — Bac+5",
      description: {
        fr: 'Lauréate, major de promotion.',
        en: 'Graduated with honors, top of the class.',
      },
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
        fr: 'Automatisation de tâches manuelles répétitives et applications internes livrées aux équipes métier, du besoin au déploiement.',
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
        { fr: 'Machine Learning', en: 'Machine Learning' },
        { fr: 'Deep Learning', en: 'Deep Learning' },
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
    {
      title: { fr: 'Savoir-être', en: 'Soft skills' },
      items: [
        { fr: 'Communication', en: 'Communication' },
        { fr: 'Travail en équipe', en: 'Teamwork' },
        { fr: 'Créativité', en: 'Creativity' },
        { fr: 'Adaptabilité', en: 'Adaptability' },
        { fr: 'Résolution de problèmes', en: 'Problem solving' },
        { fr: 'Gestion du temps', en: 'Time management' },
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
    phone: '+212 6 61 77 17 35',
    linkedin: 'https://www.linkedin.com/in/rania-lasfar-681977265/',
    github: 'https://github.com/Cyliar',
    text: {
      fr: "Basée à Casablanca, mobile partout au Maroc. Écris-moi ici, ou directement sur LinkedIn — c'est le plus rapide.",
      en: 'Based in Casablanca, available across Morocco. Write to me here, or on LinkedIn — that is the fastest route.',
    },
  },
}
