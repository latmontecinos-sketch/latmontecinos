"use client";

import { nav, ui } from "@/content/ui";
import { useSite } from "@/components/providers";
import { Tr } from "@/components/tr";
import { useActiveSection } from "@/components/use-active-section";

const NAV_IDS = nav.map((item) => item.id);

/** La navegación de la columna fija en escritorio, marcando la sección que se está leyendo. */
export function DesktopNav() {
  const { t } = useSite();
  const active = useActiveSection(NAV_IDS);

  return (
    <nav aria-label={t(ui.menuLabel)}>
      <ul className="space-y-1">
        {nav.map((item, i) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                className={`group flex items-center gap-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  current ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-px transition-all ${
                    current ? "w-10 bg-accent" : "w-6 bg-border group-hover:w-10 group-hover:bg-accent"
                  }`}
                />
                <span className="text-accent/70">{String(i + 1).padStart(2, "0")}</span>
                <Tr value={item.label} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
