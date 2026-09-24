@AGENTS.md

# Reglas del proyecto

Salen de la auditoría del 2026-09-23. Casi todo el código lo escribe Claude Code: estas reglas evitan que se repitan los problemas que encontró.

## Antes de cada commit
- `pnpm check` (lint + typecheck + build) en verde. Si se tocó `package.json`, correr `pnpm install` y confirmar que `pnpm install --frozen-lockfile` pasa: Vercel instala así y rechaza un lockfile desfasado.
- Versiones exactas en `package.json` (sin `^`) y `next` en el último parche: revisar `pnpm audit`.
- Al mover o borrar código, en el mismo commit se borran las dependencias, configs, comentarios y partes del README que quedan sobrando.

## Idioma y contenido
- Todo texto visible es bilingüe (`T` de `src/content/ui.ts`) y se renderiza con `<Tr>` en componentes de servidor. `t()` de `useSite()` solo para atributos (`aria-label`, `alt`, `title`).
- `"use client"` solo en componentes interactivos pequeños. Un componente de cliente no importa `src/content/site.ts` (arrastra todo el contenido al navegador): los textos de interfaz van en `ui.ts`.
- Una sola fuente por dato: la URL del sitio es `SITE_URL`, los colores fijos están en `theme.ts`, las claves de localStorage en `prefs.ts`, y las cifras del inicio se calculan de `projects`. Antes de escribir un literal, buscarlo con grep.
- Textos bilingües con `satisfies T`, nunca `as T`: una traducción faltante tiene que fallar al compilar.

## Código
- Nada de `any`, `as` para callar al compilador, `!` ni `@ts-ignore`. Nada de `catch {}` sin un comentario que explique por qué ignorar el error es correcto.
- Nada de `setState` síncrono en efectos ni de leer refs durante el render: el lint de React lo marca como error. Para estado que viene del navegador (localStorage, `<html>`), `useSyncExternalStore`.
- Los comentarios explican el código actual, no su historia ("antes era X"): la historia va en los commits.

## Rendimiento y seguridad
- Nada de más de 200 KB en `public/`: las imágenes se exportan al doble del tamaño en que se muestran.
- Las animaciones de canvas tienen tope de fps, avanzan por tiempo y se pausan con la pestaña oculta. Nada de ocultar al hidratar contenido que ya está a la vista.
- `next.config.ts` mantiene la CSP y `frame-ancestors 'none'`. El servidor de desarrollo escucha solo en `127.0.0.1`.
- `.claude/launch.json` no se versiona: tiene rutas de esta computadora.
