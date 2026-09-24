"use client";

import { useSyncExternalStore } from "react";
import type { Lang, T } from "@/content/ui";
import { LANG_KEY, THEME_KEY } from "@/components/prefs";

type Theme = "light" | "dark";

// La fuente de verdad es el <html>: `lang` y la clase `dark`. El script
// inicial los fija antes de pintar y los controles solo los cambian; los
// componentes que necesitan saberlo (etiquetas accesibles de los botones) se
// suscriben a esos atributos.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "class"] });
  return () => observer.disconnect();
}

const readLang = (): Lang => (document.documentElement.lang === "en" ? "en" : "es");
const readTheme = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");

function remember(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Modo privado o storage bloqueado: el cambio se aplica, solo no persiste.
  }
}

export function setLang(lang: Lang) {
  document.documentElement.lang = lang;
  remember(LANG_KEY, lang);
}

export function useSite() {
  const lang = useSyncExternalStore(subscribe, readLang, () => "es" as Lang);
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);
  return {
    lang,
    theme,
    toggleLang: () => setLang(lang === "es" ? "en" : "es"),
    toggleTheme: () => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      remember(THEME_KEY, next);
    },
    /** Para atributos (aria-label, title), donde no se puede usar <Tr>. */
    t: (value: T) => value[lang],
  };
}
