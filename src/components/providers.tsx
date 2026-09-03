"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Lang, T } from "@/content/site";

type Theme = "light" | "dark";

type SiteState = {
  lang: Lang;
  theme: Theme;
  toggleLang: () => void;
  toggleTheme: () => void;
  /** Resuelve un texto bilingüe al idioma activo. */
  t: (value: T) => string;
};

const SiteContext = createContext<SiteState | null>(null);

export const LANG_KEY = "lat-lang";
export const THEME_KEY = "lat-theme";

export function Providers({ children }: { children: ReactNode }) {
  // El script inline de layout.tsx ya aplicó lo guardado al <html> antes de
  // pintar; aquí solo leemos ese estado para que React quede sincronizado.
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    setLang(root.lang === "en" ? "en" : "es");
    setTheme(root.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next: Lang = current === "es" ? "en" : "es";
      document.documentElement.lang = next;
      try {
        localStorage.setItem(LANG_KEY, next);
      } catch {
        // Modo privado o storage bloqueado: el sitio sigue funcionando.
      }
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Igual que arriba: la preferencia simplemente no persiste.
      }
      return next;
    });
  }, []);

  const t = useCallback((value: T) => value[lang], [lang]);

  return (
    <SiteContext.Provider value={{ lang, theme, toggleLang, toggleTheme, t }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite(): SiteState {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite debe usarse dentro de <Providers>");
  }
  return context;
}
