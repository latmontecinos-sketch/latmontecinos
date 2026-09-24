import type { ReactNode } from "react";
import type { Lang, T } from "@/content/ui";

/**
 * Un texto bilingüe. Se renderizan los dos idiomas en el servidor y el CSS
 * (globals.css) muestra el activo según `<html lang>`, que el script inicial
 * de layout.tsx fija antes del primer pintado: no hay destello de idioma ni
 * hace falta JavaScript para leer la página en inglés.
 */
export function Tr({ value }: { value: T }) {
  if (value.es === value.en) return <>{value.es}</>;
  return (
    <>
      <span data-lang="es">{value.es}</span>
      <span data-lang="en" lang="en">
        {value.en}
      </span>
    </>
  );
}

/** Lo mismo para bloques que cambian entero con el idioma (párrafos, enlaces con otro href). */
export function ForLang({ lang, children, className }: { lang: Lang; children: ReactNode; className?: string }) {
  return (
    <div data-lang={lang} lang={lang} className={className}>
      {children}
    </div>
  );
}
