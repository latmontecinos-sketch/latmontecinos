"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01{}[]()<>/*+=;:$_.#|→λ∑◇01abcdef";
const COLUMN_WIDTH = 24;
const FONT_SIZE = 16;
const TRAIL = 9;
// Tope de cuadros por segundo: la lluvia es lenta y no gana nada a 60 o 120 fps,
// pero cuesta el doble o el cuádruple de batería.
const FPS = 24;
const FRAME_MS = 1000 / FPS;

/**
 * Lluvia de codigo detras del contenido. Dos reglas mandan sobre lo estetico:
 * el texto de encima tiene que seguir cumpliendo contraste AA, asi que se
 * dibuja con alpha muy bajo; y no puede costar bateria, asi que se detiene
 * cuando la pestaña no esta visible y no arranca si el usuario pidio menos
 * movimiento. Además va a 24 fps y avanza según el tiempo, no según los
 * cuadros: en una pantalla de 120 Hz caía al doble de velocidad.
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
    let raf = 0;
    let last = 0;
    let running = true;

    const readInk = () => {
      // El glifo toma el color del tema activo, asi que el fondo se aclara u
      // oscurece solo cuando el usuario cambia de modo.
      const styles = getComputedStyle(document.documentElement);
      return {
        ink: styles.getPropertyValue("--muted").trim() || "#9c9385",
        accent: styles.getPropertyValue("--accent").trim() || "#e8b84b",
        // El gris del tema claro sobre fondo casi blanco rinde bastante menos
        // que el mismo alpha sobre el fondo oscuro: con el mismo numero la
        // lluvia se veia en oscuro y casi no en claro.
        boost: document.documentElement.classList.contains("dark") ? 1 : 1.25,
      };
    };

    let { ink, accent, boost } = readInk();

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      // Cambiar el tamaño del canvas reinicia su estado: la fuente se fija aquí, una vez.
      ctx.font = `${FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";

      const count = Math.ceil(width / COLUMN_WIDTH);
      columns = Array.from({ length: count }, () => ({
        y: Math.random() * height,
        speed: 0.35 + Math.random() * 0.75,
      }));
      ({ ink, accent, boost } = readInk());
    };

    const draw = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      const elapsed = now - last;
      if (elapsed < FRAME_MS) return;
      // Pasos equivalentes a los de 60 fps, con tope por si la pestaña estuvo congelada.
      const steps = Math.min(elapsed / (1000 / 60), 10);
      last = now;
      // Los glifos cambian cada ~0,5 s, igual que antes del tope de fps.
      const tick = Math.floor(now / 533);

      ctx.clearRect(0, 0, width, height);

      columns.forEach((column, index) => {
        const x = index * COLUMN_WIDTH + 6;
        column.y += column.speed * steps;
        if (column.y > height + 120) column.y = -Math.random() * 260;

        // Una estela corta por columna: la cabeza algo mas visible que la cola.
        for (let step = 0; step < TRAIL; step++) {
          const y = column.y - step * (FONT_SIZE + 5);
          if (y < -FONT_SIZE || y > height) continue;
          const glyph = GLYPHS[(index * 7 + step * 3 + tick) % GLYPHS.length];
          // La cabeza de cada estela va en el dorado de la marca y se apaga
          // hacia la cola; el techo de alpha lo fija la legibilidad, no el gusto.
          ctx.globalAlpha = (step === 0 ? 0.72 : 0.44 - step * 0.045) * boost;
          ctx.fillStyle = step === 0 ? accent : ink;
          ctx.fillText(glyph, x, y);
        }
      });

      ctx.globalAlpha = 1;
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        ({ ink, accent, boost } = readInk());
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    // El toggle de tema solo cambia la clase `dark` del <html>: sin esto los
    // glifos se quedaban con el color del tema anterior hasta el proximo
    // resize, y con la lluvia mas visible el desfase se veia.
    const themeWatcher = new MutationObserver(() => {
      ({ ink, accent, boost } = readInk());
    });
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      themeWatcher.disconnect();
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
          texto de la zona de lectura: el degradado no deja pasar un glifo
          entero donde hay texto. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_74%_70%_at_center,var(--bg)_49%,transparent_100%)]" />
    </div>
  );
}
