"use client";

import { useEffect, useState } from "react";
import { nav, ui } from "@/content/ui";
import { useSite } from "@/components/providers";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "@/components/icons";
import { Tr } from "@/components/tr";

// 44px es el minimo tactil de Apple HIG / 48dp de Material: por debajo de eso
// los controles se fallan con el pulgar en movil.
const controlClass =
  "inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-3 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent";

/**
 * Idioma, tema y (en pantallas chicas) menu. Ya no hay barra superior: los
 * controles viven junto al logo, al inicio de la columna de identidad. En
 * escritorio la navegacion ya esta en esa columna, asi que el menu se oculta.
 */
export function SiteControls() {
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
    <div className="relative">
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
          className={`${controlClass} px-0 lg:hidden`}
          aria-label={t(ui.menuLabel)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t(ui.menuLabel)}
        hidden={!menuOpen}
        className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-border bg-bg p-2 shadow-lg lg:hidden"
      >
        <ul>
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex h-11 items-center rounded-xl px-3 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:bg-surface hover:text-text"
              >
                <Tr value={item.label} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-bg"
    >
      <Tr value={ui.skipToContent} />
    </a>
  );
}
