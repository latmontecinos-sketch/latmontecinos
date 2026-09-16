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
  role: {
    es: "Desarrollador de aplicaciones web, blockchain e IA",
    en: "Web, Blockchain & AI Application Developer",
  } as T,
  location: both("La Paz, Bolivia"),
  tagline: {
    es: "Construyo aplicaciones web completas, de la pantalla a la base de datos: plataformas, bots, herramientas con inteligencia artificial y proyectos con pagos y activos digitales.",
    en: "I build complete web applications, from the screen to the database: platforms, bots, AI-powered tools and projects with payments and digital assets.",
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
  // Contacto directo por WhatsApp (+591 73259109): wa.me pide el numero con
  // codigo de pais, sin "+" ni espacios.
  whatsapp: "https://wa.me/59173259109",
};

/**
 * Los dos atajos del final de Contacto. Cada uno abre WhatsApp con el mensaje
 * ya escrito (`?text=` de wa.me), asi quien llega no tiene que pensar como
 * empezar y el ya sabe de que va antes de responder.
 */
export const contactIntents: { label: T; message: T }[] = [
  {
    label: { es: "Quiero trabajar contigo", en: "I want to work with you" },
    message: {
      es: "Hola Alejandro, vi tu portafolio y estoy interesado en trabajar contigo.",
      en: "Hi Alejandro, I saw your portfolio and I'm interested in working with you.",
    },
  },
  {
    label: { es: "Quiero que desarrolles para mí", en: "I want you to build for me" },
    message: {
      es: "Hola Alejandro, vi tu portafolio y quiero que desarrolles un proyecto para mí.",
      en: "Hi Alejandro, I saw your portfolio and I'd like you to build a project for me.",
    },
  },
];

/**
 * Cifras duras del hero. Dos reglas mandan.
 *
 * Cada una lleva a su prueba: una afirmacion que no se puede verificar en un
 * clic pesa mucho menos que una que si.
 *
 * Y ninguna es de audiencia. Los suscriptores se ganaron enseñando airdrops y
 * DeFi, no construyendo, asi que arriba de todo dirian "creador de contenido"
 * justo donde la pagina tiene que decir "desarrollador". Esas cifras no se
 * borraron: viven en `community`, que es donde son recorrido y no logro.
 */
export const proof: { value: T; label: T; href?: string }[] = [
  {
    // Lo que ya funciona y lo que esta en curso (Pollar Pass, Kosmovia), contado solo
    // sobre lo listado en Proyectos para que se pueda comprobar ahi mismo.
    value: { es: "4 en vivo", en: "4 live" },
    label: {
      es: "+2 en desarrollo · proyectos desplegados",
      en: "+2 in development · deployed projects",
    },
    // ancla interna: la prueba de esta cifra esta en la misma pagina
    href: "#projects",
  },
  {
    value: { es: "3 años", en: "3 years" },
    label: { es: "core team en Ethereum Bolivia", en: "on the Ethereum Bolivia core team" },
    href: "https://www.linkedin.com/company/ethereumbo/",
  },
  {
    value: both("2026"),
    label: { es: "builder en Stellar Elite Bolivia", en: "builder at Stellar Elite Bolivia" },
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7501454699527684096/",
  },
  {
    value: { es: "6ª ed.", en: "6th ed." },
    label: {
      es: "taller de DeFi en Cripto Conferencia",
      en: "DeFi workshop at Cripto Conferencia",
    },
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
  es: `Construyo productos web de punta a punta: interfaz con React y Next.js, backend con Node y una base de datos detrás. Hago tanto apps convencionales (sitios, paneles, bots, herramientas internas) como proyectos sobre blockchain (pagos en cripto, tokens, contratos). También integro inteligencia artificial cuando ahorra trabajo real. La base técnica es la misma; lo que cambia es el problema que resuelve.

Mi terreno fuerte es cripto. Llevo años ahí, la mayor parte como usuario metido en EVM todos los días: DeFi, airdrops, trading. Hace unos meses empecé a construir mis propias herramientas — screeners, bots y contratos — casi siempre en comunidad.

Construyo con vibe coding: me apoyo en IA para escribir el código. Lo que pongo yo es el criterio — años operando y moviéndome en comunidad me dicen qué hace falta de verdad, y por eso lo que sale termina siendo útil y enfocado en mi trabajo, no una demo más.

Hoy también construyo sobre Stellar: como builder de Stellar Elite Bolivia desarrollo proyectos en su red, uno de ellos con mi equipo.

Soy parte del core team de Ethereum Bolivia desde 2023, doy talleres sobre finanzas descentralizadas y charlas universitarias sobre DeFi e IA aplicada.`,
  en: `I build web products end to end: the interface with React and Next.js, the backend with Node and a database behind it. I do both conventional apps (websites, dashboards, bots, internal tools) and blockchain projects (crypto payments, tokens, contracts). I also build in AI when it saves real work. The technical foundation is the same; what changes is the problem it solves.

Crypto is where I go deep. Years in it, mostly as a heavy day-to-day EVM user: DeFi, airdrops, trading. A few months ago I started building my own tools — screeners, bots and contracts — mostly in community.

I build with vibe coding: I lean on AI to write the code. What I bring is the judgment — years trading and moving in community tell me what is actually needed, which is why what comes out is useful and aimed at my own work rather than one more demo.

Today I also build on Stellar: as a Stellar Elite Bolivia builder I'm developing projects on its network, one of them with my team.

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
          es: "Lo uso todos los días. Encima construí un bot de Telegram, @Aex_Gold_Silver_bot, que vigila el ratio Oro/Plata con RSI en cuatro temporalidades y avisa solo cuando hay algo: así la comunidad recibe la señal sin tener que entrar a mirar.",
          en: "I use it every day. On top of it I built a Telegram bot, @Aex_Gold_Silver_bot, that watches the gold/silver ratio with RSI across four timeframes and only pings when there is something: the community gets the signal without having to come and look.",
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
    name: "AexApuntes",
    summary: {
      es: "Convierte videos de YouTube, archivos de video y transcripciones en apuntes de estudio con IA, exportables a HTML y PDF. Corre entero en el navegador con las claves gratis de cada usuario: sin servidor y sin costos.",
      en: "Turns YouTube videos, video files and transcripts into AI study notes, exportable to HTML and PDF. It runs entirely in the browser on each user's free API keys: no server and no running costs.",
    },
    tags: ["JavaScript", "Gemini API", "ffmpeg.wasm"],
    links: [
      {
        label: { es: "Ver en vivo", en: "View live" },
        href: "https://aexapuntes.vercel.app",
      },
    ],
  },
  {
    name: "AexBOB",
    summary: {
      es: "Comparador en tiempo real del dólar digital (USD/USDT) a bolivianos. Reúne P2P, billeteras y remesas, calcula el precio efectivo con comisiones, lo compara con el tipo de cambio oficial del BCB y marca la mejor opción para comprar y para vender.",
      en: "Real-time comparator for digital dollars (USD/USDT) to Bolivian bolivianos. It gathers P2P markets, wallets and remittances, works out the effective price after fees, compares it with the Central Bank's official rate and flags the best option to buy and to sell.",
    },
    tags: ["TypeScript", "Next.js", "React"],
    links: [
      {
        label: { es: "Ver en vivo", en: "View live" },
        href: "https://aexbob.vercel.app",
      },
    ],
  },
  {
    name: "Aex Gold/Silver bot",
    // Sin "abre y cierra por su cuenta": el bot dejo de decirlo el 2026-09-10,
    // sus entradas son un diario simulado, no operaciones reales.
    summary: {
      es: "Bot de Telegram que sigue el ratio Oro/Plata con RSI en 15m, 1h, 4h y 1d. Alerta ante terceros toques de zona clave, divergencias precio/RSI y confluencia entre temporalidades, y lleva un diario numerado de cada entrada.",
      en: "Telegram bot tracking the gold/silver ratio with RSI on 15m, 1h, 4h and 1d. It alerts on third touches of key levels, price/RSI divergences and cross-timeframe confluence, and keeps a numbered journal of every entry.",
    },
    tags: ["TypeScript", "Node", "Telegraf"],
    links: [
      {
        label: { es: "Abrir en Telegram", en: "Open in Telegram" },
        href: "https://t.me/Aex_Gold_Silver_bot",
      },
    ],
  },
  {
    // Proyecto de equipo en Stellar Elite Bolivia; landing y repo ya son publicos.
    name: "Kosmovia",
    status: { es: "En desarrollo", en: "In development" },
    summary: {
      es: "Red social para el ecosistema Stellar, construida con mi equipo en Stellar Elite Bolivia: comunidades, un muro y una billetera integrada. En desarrollo, sobre testnet.",
      en: "A social network for the Stellar ecosystem, built with my team at Stellar Elite Bolivia: communities, a feed and a built-in wallet. In development, on testnet.",
    },
    tags: ["Stellar", "Next.js", "Supabase"],
    links: [
      {
        label: { es: "Ver sitio", en: "View site" },
        href: "https://kosmovia.vercel.app",
      },
    ],
  },
  {
    // Solo el nombre y que esta en curso: el detalle se publica cuando se
    // entregue, no antes.
    name: "Pollar Pass",
    status: { es: "En desarrollo", en: "In development" },
    summary: {
      es: "Proyecto en desarrollo sobre Stellar. Más detalles pronto.",
      en: "A project in development on Stellar. More details soon.",
    },
    tags: ["Stellar", "TypeScript"],
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
    title: { es: "Builder seleccionado", en: "Selected builder" },
    org: both("Stellar Elite Bolivia"),
    period: { es: "2026 — actualidad", en: "2026 — present" },
    detail: {
      es: "Seleccionado para el programa de builders de Stellar en Bolivia. Ahí desarrollo proyectos sobre la red Stellar junto a mi equipo.",
      en: "Selected for Stellar's builder program in Bolivia, where I develop projects on the Stellar network with my team.",
    },
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7501454699527684096/",
  },
  {
    title: both("Core team"),
    org: both("Ethereum Bolivia"),
    period: { es: "2023 — actualidad", en: "2023 — present" },
    detail: {
      es: "Comunidad Ethereum en Bolivia: eventos, ideathons y formación de nuevos builders.",
      en: "The Ethereum community in Bolivia: events, ideathons and onboarding new builders.",
    },
    href: "https://www.linkedin.com/company/ethereumbo/",
  },
  {
    title: { es: "Creador de contenido", en: "Content creator" },
    org: both("Alex Criptomonedas"),
    period: { es: "2020 — actualidad", en: "2020 — present" },
    // Las cifras de audiencia van aca y no en el hero: son reales, pero se
    // ganaron enseñando airdrops y DeFi, no construyendo. La ultima frase es la
    // que las hace pertinentes — explican para quien son las herramientas.
    detail: {
      es: "4.650 suscriptores en YouTube, 1.100 en el canal de Telegram, 700 en la comunidad y +900 en X. Airdrops, DeFi e inversión en cripto. De ahí salió la comunidad para la que después construí las herramientas.",
      en: "4,650 YouTube subscribers, 1,100 on the Telegram channel, 700 in the community and 900+ on X. Airdrops, DeFi and crypto investing. That's where the community I later built the tools for came from.",
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
      es: "DeFi e inteligencia artificial aplicada, para estudiantes que recién se acercan a blockchain.",
      en: "DeFi and applied AI, for students taking their first steps into blockchain.",
    },
  },
];

export const stackLearning: string[] = ["Stellar", "Soroban"];

export const howIWork: T[] = [
  { es: "Vibe coding — IA para escribir el código", en: "Vibe coding — AI to write the code" },
  { es: "Criterio propio para decidir qué construir", en: "My own judgment on what to build" },
  {
    es: "Demo cuando alcanza con una demo; producción cuando no",
    en: "A demo when a demo is enough; production when it isn't",
  },
];

export const softSkills: T[] = [
  { es: "Hiperenfoque", en: "Hyperfocus" },
  { es: "Comunicación efectiva", en: "Effective communication" },
  { es: "Resolución de problemas", en: "Problem solving" },
  { es: "Pensamiento crítico", en: "Critical thinking" },
  { es: "Trabajo en equipo", en: "Teamwork" },
  { es: "Versatilidad y aprendizaje rápido", en: "Versatility and fast learning" },
  { es: "Autodidacta", en: "Self-taught" },
  { es: "Integridad", en: "Integrity" },
];

export const ui = {
  skipToContent: { es: "Ir al contenido", en: "Skip to content" } as T,
  aboutTitle: { es: "Sobre mí", en: "About" } as T,
  projectsTitle: { es: "Proyectos", en: "Projects" } as T,
  communityTitle: { es: "Comunidad y charlas", en: "Community & talks" } as T,
  stackTitle: both("Stack"),
  techTitle: { es: "Habilidades técnicas", en: "Technical skills" } as T,
  howIWorkLabel: { es: "Cómo trabajo", en: "How I work" } as T,
  stackLearningLabel: { es: "Aprendiendo ahora", en: "Learning right now" } as T,
  softSkillsLabel: { es: "Habilidades blandas", en: "Soft skills" } as T,
  caseStudyOpen: { es: "Leer el caso", en: "Read the case" } as T,
  caseStudyClose: { es: "Ocultar el caso", en: "Hide the case" } as T,
  contactTitle: { es: "Hablemos", en: "Let's talk" } as T,
  contactBody: {
    es: "Estoy disponible para desarrollar tu aplicación web o tu proyecto blockchain, colaboraciones, bounties y programas de builders. La forma más rápida de llegarme es por correo.",
    en: "I'm available to build your web application or blockchain project, and for collaborations, bounties and builder programs. Email is the fastest way to reach me.",
  } as T,
  contactWhatsAppHint: {
    es: "O escríbeme por WhatsApp con un mensaje listo:",
    en: "Or message me on WhatsApp with a ready-made note:",
  } as T,
  themeLabel: { es: "Cambiar tema", en: "Toggle theme" } as T,
  langLabel: { es: "Cambiar idioma", en: "Switch language" } as T,
  menuLabel: { es: "Menú", en: "Menu" } as T,
  builtWith: {
    es: "Hecho con Next.js y Tailwind. Desplegado en Vercel.",
    en: "Built with Next.js and Tailwind. Deployed on Vercel.",
  } as T,
};
