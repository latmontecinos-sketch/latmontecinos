import {
  siGit,
  siGithub,
  siEthereum,
  siEthers,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siOpenzeppelin,
  siSolidity,
  siStellar,
  siSupabase,
  siTailwindcss,
  siTelegram,
  siTurso,
  siTypescript,
  siVercel,
} from "simple-icons";
import type { T } from "./ui";
import { palette } from "./theme";

export type Tech = { name: string; path: string; color: string };

/**
 * Las fichas usan un fondo oscuro fijo en los dos temas. Los logos de marca
 * estan pensados para fondo oscuro o blanco, y varios (JavaScript, Stellar,
 * Turso, React) son colores claros que sobre el tema claro quedaban en torno a
 * 1.2:1 — practicamente invisibles. Con la ficha oscura todos se leen igual.
 *
 * Por lo mismo, las marcas casi negras (Next.js, GitHub, Vercel, Ethereum) se
 * pintan en claro fijo sobre la ficha.
 */
const LIGHT_ON_CHIP = palette.dark.text;

const icon = (
  i: { title: string; path: string; hex: string },
  name?: string,
  color?: string,
): Tech => ({
  name: name ?? i.title,
  path: i.path,
  color: color ?? `#${i.hex}`,
});

export const techGroups: { title: T; note: T; items: Tech[] }[] = [
  {
    title: { es: "Lenguajes", en: "Languages" },
    note: { es: "La base de todo lo que construyo", en: "The base of everything I build" },
    items: [icon(siTypescript), icon(siJavascript)],
  },
  {
    title: { es: "Frontend", en: "Frontend" },
    note: { es: "Interfaces y producto", en: "Interfaces and product" },
    items: [
      icon(siReact),
      icon(siNextdotjs, "Next.js", LIGHT_ON_CHIP),
      icon(siTailwindcss, "Tailwind"),
    ],
  },
  {
    title: { es: "Backend y datos", en: "Backend & data" },
    note: { es: "APIs, persistencia y jobs", en: "APIs, persistence and jobs" },
    items: [
      icon(siNodedotjs, "Node.js"),
      icon(siPostgresql),
      icon(siSupabase),
      icon(siTurso),
    ],
  },
  {
    title: { es: "Web3", en: "Web3" },
    note: { es: "Contratos, bots y wallets sobre EVM", en: "Contracts, bots and wallets on EVM" },
    items: [
      icon(siEthereum, "EVM", LIGHT_ON_CHIP),
      // #363636 y #2535A0 sobre la ficha oscura quedan por debajo de 2:1
      icon(siSolidity, "Solidity", LIGHT_ON_CHIP),
      icon(siEthers, "ethers.js", LIGHT_ON_CHIP),
      icon(siOpenzeppelin, "OpenZeppelin"),
      icon(siStellar),
    ],
  },
  {
    title: { es: "Herramientas", en: "Tooling" },
    note: { es: "Versiones, despliegue y bots", en: "Versions, deploys and bots" },
    items: [
      icon(siGit),
      icon(siGithub, "GitHub", LIGHT_ON_CHIP),
      icon(siVercel, "Vercel", LIGHT_ON_CHIP),
      icon(siTelegram),
    ],
  },
];
