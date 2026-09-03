export type Lang = "es" | "en";

/** Un texto en los dos idiomas del sitio. */
export type T = Record<Lang, string>;

export type Link = { label: T; href: string };

export type Project = {
  name: string;
  summary: T;
  tags: string[];
  status?: T;
  links: Link[];
};

export type CommunityItem = {
  title: T;
  org: T;
  period: T;
  detail: T;
  href?: string;
};

const both = (text: string): T => ({ es: text, en: text });

export const profile = {
  name: "Alejandro Tintaya Montecinos",
  role: both("Web3 Builder & Developer"),
  location: both("La Paz, Bolivia"),
  tagline: {
    es: "Construyo herramientas cripto en TypeScript y le explico a 4.600 personas cómo usarlas.",
    en: "I build crypto tools in TypeScript and teach 4,600 people how to use them.",
  } as T,
  email: "latmontecinos@gmail.com",
};

export const socials = {
  github: "https://github.com/latmontecinos-sketch",
  linkedin:
    "https://www.linkedin.com/in/alejandro-tintaya-montecinos-381ba2235/",
  x: "https://x.com/AlexCriptoPro",
  youtube: "https://www.youtube.com/@AlexCriptomonedas",
  telegramChannel: "https://t.me/AlexCriptoAnuncios",
  telegramCommunity: "https://t.me/+SpY76r8P0s9BhgtO",
};

export const nav: { id: string; label: T }[] = [
  { id: "about", label: { es: "Sobre mí", en: "About" } },
  { id: "projects", label: { es: "Proyectos", en: "Projects" } },
  { id: "community", label: { es: "Comunidad", en: "Community" } },
  { id: "stack", label: { es: "Stack", en: "Stack" } },
  { id: "contact", label: { es: "Contacto", en: "Contact" } },
];

export const about: T = {
  es: `Llevo seis años en blockchain y mercados financieros. Empecé explicando cripto en video y terminé construyendo las herramientas que a mí me hacían falta: screeners de arbitraje, bots y, ahora, pagos onchain.

Vengo de EVM. Stellar es nuevo para mí y lo estoy aprendiendo construyendo — un sistema de entradas con pagos en USDC, no un tutorial.

Soy parte del core team de Ethereum Bolivia desde 2023, doy talleres sobre finanzas descentralizadas y charlas universitarias sobre DeFi e IA aplicada.`,
  en: `Six years in blockchain and financial markets. I started out explaining crypto on video and ended up building the tools I was missing: arbitrage screeners, bots and, now, onchain payments.

My background is EVM. Stellar is new to me and I am learning it by building — a ticketing system with USDC payments, not a tutorial.

I have been on the Ethereum Bolivia core team since 2023, I run workshops on decentralized finance and give university talks on DeFi and applied AI.`,
};

export const projects: Project[] = [
  {
    name: "aexbitrage",
    summary: {
      es: "Comparador de costo real y screener de arbitraje delta-neutral para 14 exchanges de perpetuos. Compara comisión, slippage y funding en vivo sobre 176 activos, incluidas acciones apalancadas.",
      en: "Real-cost comparator and delta-neutral arbitrage screener across 14 perpetual futures exchanges. Compares fees, slippage and funding live over 176 assets, leveraged equities included.",
    },
    tags: ["TypeScript", "Next.js", "Tailwind"],
    links: [
      {
        label: { es: "Ver en vivo", en: "View live" },
        href: "https://aexbitrage.vercel.app",
      },
      {
        label: both("GitHub"),
        href: "https://github.com/latmontecinos-sketch/aexbitrage",
      },
    ],
  },
  {
    name: "Pollar Pass",
    status: { es: "En curso", en: "In progress" },
    summary: {
      es: "Preventa de entradas y control de puerta para eventos en Bolivia, pagadas por QR en USDC sobre Stellar. Autenticación por firma SEP-53 verificada en el servidor y conciliación de pagos contra Horizon.",
      en: "Ticket presale and door check-in for events in Bolivia, paid by QR in USDC on Stellar. Server-verified SEP-53 signature auth and payment reconciliation against Horizon.",
    },
    tags: ["Next.js", "Stellar", "libSQL / Turso"],
    links: [
      {
        label: { es: "Pull request", en: "Pull request" },
        href: "https://github.com/pollar-xyz/pollar-apps/pull/32",
      },
    ],
  },
  {
    name: "perp-dex-tracker",
    status: { es: "Privado", en: "Private" },
    summary: {
      es: "Screener de funding rates y arbitraje cross-asset para DEX de perpetuos.",
      en: "Funding-rate and cross-asset arbitrage screener for perpetual DEXs.",
    },
    tags: ["TypeScript", "Node"],
    links: [],
  },
  {
    name: "impetu-docs",
    summary: {
      es: "Documentación técnica de un producto web: arquitectura, sistema de diseño, accesibilidad, contenido y despliegue.",
      en: "Technical documentation for a web product: architecture, design system, accessibility, content and deployment.",
    },
    tags: ["Docs", "Design system", "A11y"],
    links: [
      {
        label: both("GitHub"),
        href: "https://github.com/latmontecinos-sketch/impetu-docs",
      },
    ],
  },
];

export const community: CommunityItem[] = [
  {
    title: both("Core team"),
    org: both("Ethereum Bolivia"),
    period: { es: "2023 — actualidad", en: "2023 — present" },
    detail: {
      es: "Comunidad Ethereum en Bolivia: eventos, ideathons y formación de nuevos builders.",
      en: "The Ethereum community in Bolivia: events, ideathons and onboarding new builders.",
    },
  },
  {
    title: { es: "Creador de contenido", en: "Content creator" },
    org: both("Alex Criptomonedas"),
    period: { es: "2020 — actualidad", en: "2020 — present" },
    detail: {
      es: "4.650 suscriptores y 262 videos sobre uso práctico de herramientas cripto: DeFi, airdrops, análisis y seguridad.",
      en: "4,650 subscribers and 262 videos on the practical use of crypto tools: DeFi, airdrops, analysis and security.",
    },
    href: socials.youtube,
  },
  {
    title: {
      es: "Taller avanzado de Finanzas Descentralizadas",
      en: "Advanced Decentralized Finance workshop",
    },
    org: { es: "Cripto Conferencia — 6ª edición", en: "Cripto Conferencia — 6th edition" },
    period: { es: "La Paz, dic 2025", en: "La Paz, Dec 2025" },
    detail: {
      es: "Expositor y tallerista en la conferencia cripto más grande de Bolivia.",
      en: "Speaker and workshop lead at Bolivia's largest crypto conference.",
    },
    href: "https://criptoconferencia.net",
  },
  {
    title: { es: "Charlas universitarias", en: "University talks" },
    org: { es: "Universidades de La Paz", en: "Universities in La Paz" },
    period: { es: "2023 — actualidad", en: "2023 — present" },
    detail: {
      es: "DeFi e inteligencia artificial aplicada, para estudiantes que recién se acercan a Web3.",
      en: "DeFi and applied AI, for students taking their first steps into Web3.",
    },
  },
];

export const stack: { group: T; items: string[] }[] = [
  {
    group: { es: "Lenguajes y frameworks", en: "Languages & frameworks" },
    items: ["TypeScript", "React", "Next.js", "Node", "Tailwind CSS"],
  },
  {
    group: { es: "Datos", en: "Data" },
    items: ["PostgreSQL", "libSQL / Turso", "SQL"],
  },
  {
    group: both("Web3"),
    items: ["EVM tooling", "Bots", "DeFi", "Stellar", "Wallets"],
  },
  {
    group: both("Infra"),
    items: ["Vercel", "Git", "GitHub"],
  },
];

export const ui = {
  skipToContent: { es: "Ir al contenido", en: "Skip to content" } as T,
  aboutTitle: { es: "Sobre mí", en: "About" } as T,
  projectsTitle: { es: "Proyectos", en: "Projects" } as T,
  communityTitle: { es: "Comunidad y charlas", en: "Community & talks" } as T,
  stackTitle: both("Stack"),
  contactTitle: { es: "Hablemos", en: "Let's talk" } as T,
  contactBody: {
    es: "Estoy abierto a colaborar en proyectos Web3, bounties y programas de builders. La forma más rápida de llegarme es por correo.",
    en: "I'm open to collaborating on Web3 projects, bounties and builder programs. Email is the fastest way to reach me.",
  } as T,
  themeLabel: { es: "Cambiar tema", en: "Toggle theme" } as T,
  langLabel: { es: "Cambiar idioma", en: "Switch language" } as T,
  menuLabel: { es: "Menú", en: "Menu" } as T,
  builtWith: {
    es: "Hecho con Next.js y Tailwind. Desplegado en Vercel.",
    en: "Built with Next.js and Tailwind. Deployed on Vercel.",
  } as T,
};
