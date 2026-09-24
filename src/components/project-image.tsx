"use client";

import Image from "next/image";
import type { Project } from "@/content/site";
import { useSite } from "@/components/providers";

/** La captura del proyecto destacado. Es cliente solo para que el `alt` siga al idioma. */
export function ProjectImage({ image }: { image: NonNullable<Project["image"]> }) {
  const { t } = useSite();
  return (
    <Image
      src={image.src}
      alt={t(image.alt)}
      width={image.width}
      height={image.height}
      // Next la marca como elemento LCP: en escritorio cae justo en el borde
      // del primer viewport, así que se pide con prioridad.
      priority
      sizes="(min-width: 1024px) 780px, 100vw"
      // Recortada a banner se lee como vista previa y no como la página embebida.
      className="aspect-[2/1] w-full object-cover object-top"
    />
  );
}
