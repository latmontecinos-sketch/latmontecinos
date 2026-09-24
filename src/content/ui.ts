// Tipos de los textos bilingües y textos de la interfaz (navegación, títulos,
// etiquetas). Van aparte del contenido para que los componentes de cliente
// que los usan no arrastren todo site.ts al JavaScript del navegador.

export type Lang = "es" | "en";

/** Un texto en los dos idiomas del sitio. */
export type T = Record<Lang, string>;

export const both = (text: string): T => ({ es: text, en: text });

export const nav: { id: string; label: T }[] = [
  { id: "about", label: { es: "Sobre mí", en: "About" } },
  { id: "projects", label: { es: "Proyectos", en: "Projects" } },
  { id: "community", label: { es: "Comunidad", en: "Community" } },
  { id: "stack", label: { es: "Stack", en: "Stack" } },
  { id: "contact", label: { es: "Contacto", en: "Contact" } },
];

export const ui = {
  skipToContent: { es: "Ir al contenido", en: "Skip to content" } satisfies T,
  aboutTitle: { es: "Sobre mí", en: "About" } satisfies T,
  projectsTitle: { es: "Proyectos", en: "Projects" } satisfies T,
  communityTitle: { es: "Comunidad y charlas", en: "Community & talks" } satisfies T,
  stackTitle: both("Stack"),
  techTitle: { es: "Habilidades técnicas", en: "Technical skills" } satisfies T,
  howIWorkLabel: { es: "Cómo trabajo", en: "How I work" } satisfies T,
  stackLearningLabel: { es: "Aprendiendo ahora", en: "Learning right now" } satisfies T,
  softSkillsLabel: { es: "Habilidades blandas", en: "Soft skills" } satisfies T,
  caseStudyOpen: { es: "Leer el caso", en: "Read the case" } satisfies T,
  caseStudyClose: { es: "Ocultar el caso", en: "Hide the case" } satisfies T,
  contactTitle: { es: "Hablemos", en: "Let's talk" } satisfies T,
  contactBody: {
    es: "Estoy disponible para desarrollar tu aplicación web o tu proyecto blockchain, colaboraciones, bounties y programas de builders. La forma más rápida de llegarme es por correo.",
    en: "I'm available to build your web application or blockchain project, and for collaborations, bounties and builder programs. Email is the fastest way to reach me.",
  } satisfies T,
  contactWhatsAppHint: {
    es: "O escríbeme por WhatsApp con un mensaje listo:",
    en: "Or message me on WhatsApp with a ready-made note:",
  } satisfies T,
  themeLabel: { es: "Cambiar tema", en: "Toggle theme" } satisfies T,
  langLabel: { es: "Cambiar idioma", en: "Switch language" } satisfies T,
  menuLabel: { es: "Menú", en: "Menu" } satisfies T,
  builtWith: {
    es: "Hecho con Next.js y Tailwind. Desplegado en Vercel.",
    en: "Built with Next.js and Tailwind. Deployed on Vercel.",
  } satisfies T,
};
