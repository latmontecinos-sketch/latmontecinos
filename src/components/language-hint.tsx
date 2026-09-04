"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/components/providers";

const DISMISSED = "lat-lang-hint";

/**
 * Aviso unico para quien no llega en español.
 *
 * El sitio arranca en español, y buena parte de quien lo abre viene de
 * programas y bounties que se manejan en ingles: si no ve la pildora "EN"
 * arriba a la derecha, se va sin saber que existe la traduccion.
 */
export function LanguageHint() {
  const { lang, toggleLang } = useSite();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lang !== "es") return;
    try {
      if (localStorage.getItem(DISMISSED)) return;
      if (localStorage.getItem("lat-lang")) return; // ya eligio idioma
    } catch {
      // storage bloqueado: mejor no insistir con el aviso
      return;
    }
    const prefersSpanish = navigator.languages?.some((l) =>
      l.toLowerCase().startsWith("es"),
    );
    if (!prefersSpanish) setVisible(true);
  }, [lang]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED, "1");
    } catch {
      // no persiste, pero ya desaparecio de la vista
    }
  };

  if (!visible) return null;

  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2.5 sm:px-8 lg:px-10">
        <p className="font-mono text-xs text-muted">
          This site is also available in English.
        </p>
        <button
          type="button"
          onClick={() => {
            toggleLang();
            dismiss();
          }}
          className="font-mono text-xs font-semibold text-accent hover:underline"
        >
          Switch to English →
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="ml-auto font-mono text-xs text-muted hover:text-text"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
