"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Aparece al entrar en pantalla.
 *
 * El estado se aplica con estilos inline y no con clases: aqui el modo de
 * fallo es contenido invisible, y con reglas en la hoja de estilos basta un
 * conflicto de orden o especificidad para dejar la pagina en blanco. Ademas
 * arranca visible y solo se oculta si hay JS y el usuario no pidio menos
 * movimiento, asi que sin JS todo se lee igual.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    node.style.opacity = "0";
    node.style.transform = "translateY(14px)";

    let timer = 0;

    const show = () => {
      node.style.transition =
        "opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)";
      node.style.opacity = "1";
      node.style.transform = "none";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(node);
          timer = window.setTimeout(show, delay);
        }
      },
      // Se dispara un poco antes del borde para que el contenido ya este
      // dentro cuando el ojo llega.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    observer.observe(node);

    // Red de seguridad: si el observer nunca dispara (pestaña en segundo
    // plano al cargar, o un entorno que lo restringe), el contenido se
    // muestra igual en vez de quedarse invisible.
    const failsafe = window.setTimeout(show, 2500 + delay);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
