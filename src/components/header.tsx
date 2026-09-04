"use client";

import { useEffect, useState } from "react";
import { nav, ui } from "@/content/site";
import { useSite } from "@/components/providers";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "@/components/icons";

// 44px es el minimo tactil de Apple HIG / 48dp de Material: por debajo de eso
// los controles del header se fallan con el pulgar en movil.
const controlClass =
  "inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent";

export function Header() {
  const { lang, theme, toggleLang, toggleTheme, t } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-10 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-bg"
      >
        {t(ui.skipToContent)}
      </a>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-sm font-bold tracking-tight text-text"
        >
          A<span className="text-accent">.</span>Tintaya
        </a>

        <nav aria-label={t(ui.menuLabel)} className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="transition-colors hover:text-text"
                >
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className={controlClass}
            aria-label={t(ui.langLabel)}
          >
            <span aria-hidden>{lang === "es" ? "EN" : "ES"}</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className={`${controlClass} px-0`}
            aria-label={t(ui.themeLabel)}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`${controlClass} px-0 md:hidden`}
            aria-label={t(ui.menuLabel)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t(ui.menuLabel)}
        hidden={!menuOpen}
        className="border-t border-border bg-bg md:hidden"
      >
        <ul className="mx-auto max-w-5xl px-5 py-2">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex h-12 items-center text-sm text-muted transition-colors hover:text-text"
              >
                {t(item.label)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
