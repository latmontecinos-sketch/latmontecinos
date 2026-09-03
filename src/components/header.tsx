"use client";

import { nav, ui } from "@/content/site";
import { useSite } from "@/components/providers";
import { MoonIcon, SunIcon } from "@/components/icons";

const controlClass =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent";

export function Header() {
  const { lang, theme, toggleLang, toggleTheme, t } = useSite();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-md">
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
            className={`${controlClass} w-9 px-0`}
            aria-label={t(ui.themeLabel)}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
