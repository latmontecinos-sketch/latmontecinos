// Colores fijos que se usan fuera de las variables CSS de globals.css: la
// imagen de Open Graph, el color de la barra del navegador y las fichas del
// Stack (que van sobre fondo oscuro en los dos temas). Si cambia la paleta de
// globals.css, cambia aquí también.
export const palette = {
  dark: {
    bg: "#0b0a08",
    text: "#f3f0e8",
    muted: "#9c9385",
    border: "#2a251e",
    accent: "#e8b84b",
  },
  light: {
    bg: "#fbfaf7",
  },
  /** Fondo de las fichas de tecnologías. */
  chip: "#17150f",
} as const;
