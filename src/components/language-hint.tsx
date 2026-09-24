"use client";

import { useState, useSyncExternalStore } from "react";
import { LANG_KEY } from "@/components/prefs";
import { setLang, useSite } from "@/components/providers";

const DISMISSED = "lat-lang-hint";

/** Si hay que ofrecer el inglés: no eligió idioma, no cerró el aviso y su navegador no está en español. */
function shouldOffer(): boolean {
  try {
    if (localStorage.getItem(DISMISSED) || localStorage.getItem(LANG_KEY)) return false;
  } catch {
    return false; // Storage bloqueado: mejor no insistir con el aviso.
  }
  return !navigator.languages?.some((l) => l.toLowerCase().startsWith("es"));
}

const noopSubscribe = () => () => {};

/**
 * Aviso único para quien no llega en español: buena parte de quien abre el
 * sitio viene de programas y bounties en inglés, y si no ve la píldora "EN"
 * se va sin saber que existe la traducción.
 *
 * Flota abajo en vez de insertarse arriba: aparece después de hidratar, y
 * arriba empujaba toda la página.
 */
export function LanguageHint() {
  const { lang } = useSite();
  // Se decide una vez en el navegador; en el servidor nunca se muestra.
  const offer = useSyncExternalStore(noopSubscribe, shouldOffer, () => false);
  const [dismissed, setDismissed] = useState(false);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED, "1");
    } catch {
      // No persiste, pero ya desapareció de la vista.
    }
  };

  // Si cambia a inglés por cualquier camino (el aviso o la píldora), el aviso sobra.
  if (!offer || dismissed || lang !== "es") return null;

  return (
    <div
      role="region"
      aria-label="Language"
      lang="en"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-md flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-border bg-surface px-4 py-3 shadow-lg sm:inset-x-auto sm:right-5"
    >
      <p className="font-mono text-xs text-muted">This site is also available in English.</p>
      <button
        type="button"
        onClick={() => {
          setLang("en");
          dismiss();
        }}
        className="font-mono text-xs font-semibold text-accent hover:underline"
      >
        Switch to English →
      </button>
      <button type="button" onClick={dismiss} className="ml-auto font-mono text-xs text-muted hover:text-text">
        Dismiss
      </button>
    </div>
  );
}
