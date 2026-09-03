# latmontecinos

Portafolio personal de Alejandro Tintaya Montecinos — Web3 builder y developer en La Paz, Bolivia.

Sitio de una sola página, bilingüe (ES/EN) y con tema claro/oscuro. Sin CMS ni base de datos: **todo el contenido vive en un solo archivo**.

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000

## Editar el contenido

Todo el texto, los proyectos, la comunidad y el stack están en:

```
src/content/site.ts
```

Cada texto se escribe una vez por idioma:

```ts
tagline: {
  es: "Construyo herramientas cripto...",
  en: "I build crypto tools...",
}
```

No hay que tocar los componentes para actualizar el sitio. Para agregar un proyecto,
añade un objeto al array `projects`; para una charla o evento, uno a `community`.

## Estructura

```
src/
  app/
    layout.tsx              metadata, fuentes, script anti-destello de tema
    page.tsx                orden de las secciones
    globals.css             tokens de color (claro/oscuro) y Tailwind
    opengraph-image.tsx     imagen para compartir en redes
  components/
    providers.tsx           estado de idioma y tema (localStorage)
    header.tsx              navegación y toggles
    sections.tsx            Hero, About, Projects, Community, Stack, Contact, Footer
    icons.tsx               iconos SVG inline (sin dependencias)
  content/
    site.ts                 TODO el contenido
```

## Stack

Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · desplegado en Vercel.
