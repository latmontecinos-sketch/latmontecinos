# latmontecinos

Portafolio personal de Alejandro Tintaya Montecinos: desarrollador de aplicaciones web, blockchain e IA en La Paz, Bolivia.

**Sitio:** https://latmontecinos.vercel.app

Una sola página, bilingüe (ES/EN) y con tema claro/oscuro. Sin CMS ni base de datos: el contenido vive en `src/content/`.

## Desarrollo

```bash
pnpm install
pnpm dev      # http://127.0.0.1:3000
pnpm check    # lint + typecheck + build: lo mismo que corre CI
```

## Editar el contenido

| Archivo | Qué hay |
|---|---|
| `src/content/site.ts` | Perfil, redes, proyectos, comunidad, habilidades y las cifras del inicio |
| `src/content/ui.ts` | Tipos bilingües, la navegación y los textos de la interfaz (títulos, botones) |
| `src/content/tech.ts` | Las tecnologías del Stack, con sus logos de `simple-icons` |
| `src/content/theme.ts` | Colores fijos fuera del CSS (imagen para redes, fichas del Stack) |

Cada texto se escribe una vez por idioma:

```ts
tagline: {
  es: "Construyo aplicaciones web completas…",
  en: "I build complete web applications…",
} satisfies T,
```

Para agregar un proyecto, se suma un objeto a `projects`; con `live: true` cuenta en la cifra «en vivo» del inicio y con `status` en «en desarrollo». Para una charla o evento, uno a `community`.

## Cómo funciona el idioma

Los componentes de las secciones son de servidor y renderizan los dos idiomas (`<Tr>` en `src/components/tr.tsx`). Un script en `layout.tsx` fija `<html lang>` y el tema antes del primer pintado, y el CSS muestra solo el idioma activo: no hay destello y el contenido no viaja en el JavaScript. Los botones de idioma y tema cambian esos atributos del `<html>`, y `providers.tsx` se suscribe a ellos.

## Estructura

```
src/
  app/
    layout.tsx            metadata, fuentes, script inicial de tema e idioma
    page.tsx              orden de las secciones
    globals.css           tokens de color, Tailwind y la regla de idioma
    opengraph-image.tsx   imagen para compartir en redes
  components/
    sections.tsx          secciones (servidor)
    tr.tsx                textos bilingües
    providers.tsx         idioma y tema leídos del <html> (cliente)
    header.tsx            controles de idioma, tema y menú móvil
    desktop-nav.tsx       navegación de escritorio con la sección activa
    language-hint.tsx     aviso para quien no llega en español
    reveal.tsx            animación de entrada
    code-backdrop.tsx     lluvia de código de fondo (24 fps, se pausa oculta)
    icons.tsx             iconos de interfaz y logos de marca
  content/                el contenido (ver arriba)
```

## Stack

Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · desplegado en Vercel.
