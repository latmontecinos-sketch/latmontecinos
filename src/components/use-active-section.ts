"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la seccion que se esta leyendo.
 *
 * Con la navegacion fija a la izquierda, marcar donde estas parado es
 * orientacion real y no adorno. Se elige la seccion visible mas cercana al
 * borde superior en vez de la primera que intersecta: al hacer scroll rapido
 * suele haber dos o tres en pantalla a la vez.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const pick = () => {
      // 25% de la altura: el punto donde el ojo suele estar leyendo.
      const line = window.innerHeight * 0.25;
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      // Al final de la pagina la ultima seccion puede no llegar a cruzar la
      // linea; si estamos abajo del todo, es esa la que se esta mirando.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      setActive(atBottom ? sections[sections.length - 1].id : current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [ids]);

  return active;
}
