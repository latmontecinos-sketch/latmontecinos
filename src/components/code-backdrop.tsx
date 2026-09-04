"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01{}[]()<>/*+=;:$_.#|→λ∑◇01abcdef";
const COLUMN_WIDTH = 26;
const FONT_SIZE = 15;

/**
 * Lluvia de codigo detras del contenido. Dos reglas mandan sobre lo estetico:
 * el texto de encima tiene que seguir cumpliendo contraste AA, asi que se
 * dibuja con alpha muy bajo; y no puede costar bateria, asi que se detiene
 * cuando la pestaña no esta visible y no arranca si el usuario pidio menos
 * movimiento.
 */
export function CodeBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns: { y: number; speed: number }[] = [];
    let frame = 0;
    let raf = 0;
    let running = true;

    const readInk = () => {
      // El glifo toma el color del tema activo, asi que el fondo se aclara u
      // oscurece solo cuando el usuario cambia de modo.
      const styles = getComputedStyle(document.documentElement);
      return {
        ink: styles.getPropertyValue("--muted").trim() || "#9c9385",
        accent: styles.getPropertyValue("--accent").trim() || "#e8b84b",
      };
    };

    let { ink, accent } = readInk();

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.ceil(width / COLUMN_WIDTH);
      columns = Array.from({ length: count }, () => ({
        y: Math.random() * height,
        speed: 0.35 + Math.random() * 0.75,
      }));
      ({ ink, accent } = readInk());
    };

    const draw = () => {
      if (!running) return;
      frame++;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";

      columns.forEach((column, index) => {
        const x = index * COLUMN_WIDTH + 6;
        column.y += column.speed;
        if (column.y > height + 120) column.y = -Math.random() * 260;

        // Una estela corta por columna: la cabeza algo mas visible que la cola.
        for (let step = 0; step < 7; step++) {
          const y = column.y - step * (FONT_SIZE + 5);
          if (y < -FONT_SIZE || y > height) continue;
          const glyph = GLYPHS[(index * 7 + step * 3 + (frame >> 5)) % GLYPHS.length];
          // La cabeza de cada estela va en el dorado de la marca y se apaga
          // hacia la cola; el techo de alpha lo fija la legibilidad, no el gusto.
          ctx.globalAlpha = step === 0 ? 0.5 : 0.26 - step * 0.035;
          ctx.fillStyle = step === 0 ? accent : ink;
          ctx.fillText(glyph, x, y);
        }
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        ({ ink, accent } = readInk());
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* Difumina la lluvia hacia el centro para que nunca compita con el
          texto que queda en la zona de lectura. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_74%_70%_at_center,var(--bg)_52%,transparent_100%)]" />
    </div>
  );
}
