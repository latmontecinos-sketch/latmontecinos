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
  /** Captura del producto en vivo; solo la lleva el proyecto destacado. */
  image?: { src: string; alt: T; width: number; height: number };
  /** Problema, dificultad y uso real: lo que un revisor lee para juzgar criterio. */
  caseStudy?: { heading: T; body: T }[];
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
  // Sin la cifra (ya esta en la barra de prueba) y sin mezclar el canal con
  // las herramientas: los videos son de airdrops, DeFi e inversion, no
  // tutoriales de estas herramientas.
  tagline: {
    es: "Construyo herramientas cripto en TypeScript para mí y para mi comunidad.",
    en: "I build crypto tools in TypeScript for myself and for my community.",
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

/**
 * Cifras duras del hero. Cada una lleva a su prueba: una afirmacion que no se
 * puede verificar en un clic pesa mucho menos que una que si.
 */
export const proof: { value: T; label: T; href?: string }[] = [
  {
    // el separador de miles cambia con el idioma: 4.650 en es, 4,650 en en
    value: { es: "4.650", en: "4,650" },
    label: { es: "suscriptores en YouTube", en: "YouTube subscribers" },
    href: "https://www.youtube.com/@AlexCriptomonedas",
  },
  {
    value: both("262"),
    label: { es: "videos publicados", en: "videos published" },
    href: "https://www.youtube.com/@AlexCriptomonedas",
  },
  {
    value: { es: "3 años", en: "3 years" },
    label: { es: "core team en Ethereum Bolivia", en: "on the Ethereum Bolivia core team" },
  },
  {
    value: { es: "6ª ed.", en: "6th ed." },
    label: { es: "expositor en Cripto Conferencia", en: "speaker at Cripto Conferencia" },
    href: "https://criptoconferencia.net",
  },
];

export const nav: { id: string; label: T }[] = [
  { id: "about", label: { es: "Sobre mí", en: "About" } },
  { id: "projects", label: { es: "Proyectos", en: "Projects" } },
  { id: "community", label: { es: "Comunidad", en: "Community" } },
  { id: "stack", label: { es: "Stack", en: "Stack" } },
  { id: "contact", label: { es: "Contacto", en: "Contact" } },
];

export const about: T = {
  es: `Llevo años en cripto, la mayor parte como usuario metido en EVM todos los días: DeFi, airdrops, trading. Hace unos meses empecé a construir mis propias herramientas — screeners de arbitraje, bots — casi siempre en comunidad, aprendiendo con otros.

Stellar es nuevo para mí y lo estoy aprendiendo de la misma forma: construyendo.

Soy parte del core team de Ethereum Bolivia desde 2023, doy talleres sobre finanzas descentralizadas y charlas universitarias sobre DeFi e IA aplicada.`,
  en: `Years in crypto, mostly as a heavy day-to-day EVM user: DeFi, airdrops, trading. A few months ago I started building my own tools — arbitrage screeners, bots — mostly in community, learning alongside others.

Stellar is new to me and I'm learning it the same way: by building.

I've been on the Ethereum Bolivia core team since 2023, I run workshops on decentralized finance and give university talks on DeFi and applied AI.`,
};

export const projects: Project[] = [
  {
    name: "aexbitrage",
    summary: {
      es: "Comparador de costo real y screener de arbitraje delta-neutral para 14 exchanges de perpetuos. Compara comisión, slippage y funding en vivo sobre 176 activos, incluidas acciones apalancadas.",
      en: "Real-cost comparator and delta-neutral arbitrage screener across 14 perpetual futures exchanges. Compares fees, slippage and funding live over 176 assets, leveraged equities included.",
    },
    tags: ["TypeScript", "Next.js", "Tailwind"],
    image: {
      src: "/aexbitrage.png",
      alt: {
        es: "Portada de Aexbitrage: comparador de comisión, slippage y funding en 14 exchanges de perpetuos.",
        en: "Aexbitrage home page: comparator of fees, slippage and funding across 14 perpetual futures exchanges.",
      },
      width: 1280,
      height: 800,
    },
    caseStudy: [
      {
        heading: { es: "Por qué existe", en: "Why it exists" },
        body: {
          es: "Operando me topé con una necesidad concreta: saber dónde convenía entrar de verdad, contando comisión, slippage y funding, no solo la comisión que cada exchange publica. No encontré con qué hacerlo rápido, así que lo construí — primero para mí, después para la comunidad de Telegram con la que ya venía siguiendo estos temas.",
          en: "Trading, I ran into a concrete need: knowing where it actually pays to enter once you count fees, slippage and funding — not just the fee each exchange advertises. I couldn't find a quick way to do it, so I built one: first for myself, then for the Telegram community I'd already been following these markets with.",
        },
      },
      {
        heading: { es: "Lo más difícil", en: "The hard part" },
        body: {
          es: "Que todo conectara. Catorce exchanges, cada uno con su API, su formato y sus límites — las llamadas fueron con diferencia lo más complicado: no es traer un dato, es traerlo de catorce fuentes distintas y que los números queden comparables entre sí. A partir de ahí fue iterar e iterar.",
          en: "Getting everything to connect. Fourteen exchanges, each with its own API, format and limits — the calls were by far the hardest part: it isn't fetching one number, it's fetching it from fourteen different sources and leaving them comparable. From there it was iterate and iterate.",
        },
      },
      {
        heading: { es: "En qué quedó", en: "Where it stands" },
        body: {
          es: "Lo uso todos los días. La comunidad lo consume sobre todo por el bot de Telegram que construí encima, que entrega lo mismo sin abrir la web.",
          en: "I use it every day. The community mostly consumes it through the Telegram bot I built on top, which delivers the same thing without opening the site.",
        },
      },
    ],
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
      es: "4.650 suscriptores y 262 videos sobre airdrops, DeFi e inversión en cripto.",
      en: "4,650 subscribers and 262 videos on airdrops, DeFi and crypto investing.",
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

/**
 * Dos niveles a proposito. Meter "Stellar" entre los chips de uso diario
 * borraria justo lo que diferencia el perfil: saber donde termina lo que
 * dominas y donde empieza lo que estas aprendiendo.
 */
export const stackDaily: { group: T; items: string[] }[] = [
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
    items: ["EVM tooling", "Bots", "DeFi", "Wallets"],
  },
  {
    group: both("Infra"),
    items: ["Vercel", "Git", "GitHub"],
  },
];

export const stackLearning: string[] = ["Stellar", "Soroban"];

export const softSkills: T[] = [
  { es: "Comunicación efectiva", en: "Effective communication" },
  { es: "Trabajo en equipo", en: "Teamwork" },
  { es: "Resolución de problemas", en: "Problem solving" },
  { es: "Adaptabilidad", en: "Adaptability" },
  { es: "Pensamiento crítico", en: "Critical thinking" },
  { es: "Integridad", en: "Integrity" },
];

export const ui = {
  skipToContent: { es: "Ir al contenido", en: "Skip to content" } as T,
  aboutTitle: { es: "Sobre mí", en: "About" } as T,
  projectsTitle: { es: "Proyectos", en: "Projects" } as T,
  communityTitle: { es: "Comunidad y charlas", en: "Community & talks" } as T,
  stackTitle: both("Stack"),
  stackDailyLabel: { es: "Uso a diario", en: "Daily driver" } as T,
  stackLearningLabel: { es: "Aprendiendo ahora", en: "Learning right now" } as T,
  softSkillsLabel: { es: "Habilidades blandas", en: "Soft skills" } as T,
  caseStudyOpen: { es: "Leer el caso", en: "Read the case" } as T,
  caseStudyClose: { es: "Ocultar el caso", en: "Hide the case" } as T,
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
