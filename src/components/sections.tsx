// Las secciones de la página. Son componentes de servidor: los textos van en
// los dos idiomas (<Tr>) y el CSS muestra el activo, así que el contenido no
// viaja en el JavaScript. Solo son cliente los controles, la navegación de
// escritorio, la captura del proyecto y la animación de entrada.
import type { ReactNode } from "react";
import {
  about,
  community,
  contactIntents,
  howIWork,
  profile,
  projects,
  proof,
  socials,
  softSkills,
  stackLearning,
  type Project,
} from "@/content/site";
import { ui, type T } from "@/content/ui";
import { techGroups } from "@/content/tech";
import { palette } from "@/content/theme";
import { DesktopNav } from "@/components/desktop-nav";
import { SiteControls } from "@/components/header";
import { ProjectImage } from "@/components/project-image";
import { Reveal } from "@/components/reveal";
import { ForLang, Tr } from "@/components/tr";
import {
  ArrowIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons";
import Image from "next/image";

function Section({ id, index, title, children }: { id: string; index: string; title: T; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-border py-14 sm:py-16">
      <Reveal>
        <h2 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          <span aria-hidden className="text-muted">
            {index}
          </span>
          <Tr value={title} />
        </h2>
      </Reveal>
      <Reveal delay={90} className="mt-7">
        {children}
      </Reveal>
    </section>
  );
}

// GitHub y LinkedIn primero: son los dos destinos que abre alguien evaluando a un desarrollador.
const socialLinks = [
  { href: socials.github, label: "GitHub", Icon: GitHubIcon },
  { href: socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: socials.x, label: "X", Icon: XIcon },
  { href: socials.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: socials.telegramChannel, label: "Telegram", Icon: TelegramIcon },
];

export function Identity() {
  return (
    <section id="top" className="pt-8 sm:pt-12 lg:pt-0">
      <div className="relative z-40 mb-7 flex items-center justify-between gap-4">
        <Image
          src="/aex-logo.png"
          alt="AEX"
          width={64}
          height={64}
          priority
          className="rounded-full border border-border"
        />
        <SiteControls />
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        <Tr value={profile.role} />
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-[2.6rem] xl:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted lg:text-base">
        <Tr value={profile.tagline} />
      </p>
      <p className="mt-4 font-mono text-xs text-muted">
        <Tr value={profile.location} />
      </p>

      {/* En escritorio la navegación vive en esta columna fija; en pantallas
          chicas pasa al menú junto al logo. */}
      <div className="mt-9 hidden lg:block">
        <DesktopNav />
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-semibold text-bg transition-opacity hover:opacity-90"
        >
          <MailIcon />
          {profile.email}
        </a>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {socialLinks.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Icon />
          </a>
        ))}
      </div>
    </section>
  );
}

export function ProofBar() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-7 pb-2 pt-12 sm:grid-cols-4 lg:pt-0">
      {proof.map((item) => {
        const content = (
          <>
            <dt className="font-display text-2xl font-bold tracking-tight text-text transition-colors group-hover:text-accent sm:text-3xl">
              <Tr value={item.value} />
            </dt>
            <dd className="mt-1 text-xs leading-snug text-muted">
              <Tr value={item.label} />
            </dd>
          </>
        );
        // Cada cifra con fuente pública va enlazada a su prueba. Si la prueba
        // está en esta misma página, el enlace es un ancla y no abre pestaña.
        const external = !item.href?.startsWith("#");
        return (
          <div key={item.label.es} className="group">
            {item.href ? (
              <a
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="block"
              >
                {content}
              </a>
            ) : (
              content
            )}
          </div>
        );
      })}
    </dl>
  );
}

export function About() {
  return (
    <Section id="about" index="01" title={ui.aboutTitle}>
      {(["es", "en"] as const).map((lang) => (
        <ForLang key={lang} lang={lang} className="max-w-2xl space-y-4 text-base leading-relaxed text-muted">
          {about[lang].split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </ForLang>
      ))}
    </Section>
  );
}

function ProjectTitle({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <h3 className={`font-display font-semibold text-text ${large ? "text-xl sm:text-2xl" : "text-lg"}`}>
        {project.name}
      </h3>
      {project.status ? (
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
          <Tr value={project.status} />
        </span>
      ) : null}
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-md bg-surface-2 px-2 py-1 text-[11px] text-muted">
            {tag}
          </li>
        ))}
      </ul>

      {project.links.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              <Tr value={link.label} />
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}

export function Projects() {
  // El primero es el proyecto ancla: está vivo y se puede probar, así que se
  // lleva la captura y el ancho completo.
  const [featured, ...rest] = projects;

  return (
    <Section id="projects" index="02" title={ui.projectsTitle}>
      <article className="overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/60">
        {featured.image ? (
          <a href={featured.links[0]?.href} target="_blank" rel="noopener noreferrer" className="block border-b border-border">
            <ProjectImage image={featured.image} />
          </a>
        ) : null}
        <div className="p-5 sm:p-6">
          <ProjectTitle project={featured} large />
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
            <Tr value={featured.summary} />
          </p>

          {featured.caseStudy ? (
            // <details> nativo: el caso queda plegado para quien escanea y
            // disponible para quien quiere profundidad, sin depender de JS.
            <details className="group mt-5 border-t border-border pt-4">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent hover:underline">
                <span className="transition-transform group-open:rotate-90" aria-hidden>
                  ▸
                </span>
                <span className="group-open:hidden">
                  <Tr value={ui.caseStudyOpen} />
                </span>
                <span className="hidden group-open:inline">
                  <Tr value={ui.caseStudyClose} />
                </span>
              </summary>
              <div className="mt-5 max-w-2xl space-y-5">
                {featured.caseStudy.map((block) => (
                  <div key={block.heading.es}>
                    <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-text">
                      <Tr value={block.heading} />
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      <Tr value={block.body} />
                    </p>
                  </div>
                ))}
              </div>
            </details>
          ) : null}

          <ProjectMeta project={featured} />
        </div>
      </article>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {rest.map((project) => (
          <li
            key={project.name}
            className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent/60"
          >
            <ProjectTitle project={project} />
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
              <Tr value={project.summary} />
            </p>
            <ProjectMeta project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Community() {
  return (
    <Section id="community" index="03" title={ui.communityTitle}>
      <ul className="space-y-6">
        {community.map((item) => (
          <li key={item.org.es + item.title.es} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <p className="text-sm text-muted">
              <Tr value={item.period} />
            </p>
            <div>
              <h3 className="font-medium text-text">
                <Tr value={item.title} />
                <span className="text-muted"> · </span>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    <Tr value={item.org} />
                  </a>
                ) : (
                  <span className="text-muted">
                    <Tr value={item.org} />
                  </span>
                )}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                <Tr value={item.detail} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Bullets({ items, className }: { items: T[]; className: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.es} className="flex items-baseline gap-2 text-sm text-muted">
          <span aria-hidden className="text-accent">
            ✦
          </span>
          <Tr value={item} />
        </li>
      ))}
    </ul>
  );
}

export function Stack() {
  return (
    <Section id="stack" index="04" title={ui.stackTitle}>
      <p className="text-sm font-medium text-text">
        <Tr value={ui.techTitle} />
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {techGroups.map((group) => (
          <div key={group.title.es} className="rounded-xl border border-border bg-surface p-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text">
              <Tr value={group.title} />
            </h3>
            <p className="mt-1 text-xs text-muted">
              <Tr value={group.note} />
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  className="flex w-[4.75rem] flex-col items-center gap-2 rounded-lg border border-white/10 px-2 py-3 text-center"
                  style={{ backgroundColor: palette.chip }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 shrink-0" style={{ fill: tech.color }}>
                    <path d={tech.path} />
                  </svg>
                  <span className="font-mono text-[10px] leading-tight" style={{ color: palette.dark.muted }}>
                    {tech.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-9 text-sm font-medium text-text">
        <Tr value={ui.howIWorkLabel} />
      </p>
      <Bullets items={howIWork} className="mt-3 space-y-2" />

      <p className="mt-9 text-sm font-medium text-text">
        <Tr value={ui.stackLearningLabel} />
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {stackLearning.map((item) => (
          <span
            key={item}
            className="rounded-md border border-dashed border-accent/60 bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
          >
            {item}
          </span>
        ))}
      </div>

      <p className="mt-9 text-sm font-medium text-text">
        <Tr value={ui.softSkillsLabel} />
      </p>
      <Bullets items={softSkills} className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2" />
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" index="05" title={ui.contactTitle}>
      <p className="max-w-xl text-base leading-relaxed text-muted">
        <Tr value={ui.contactBody} />
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
        >
          <MailIcon />
          {profile.email}
        </a>
      </div>

      <p className="mt-8 text-sm text-muted">
        <Tr value={ui.contactWhatsAppHint} />
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {/* El mensaje prellenado cambia con el idioma, así que hay un enlace por idioma. */}
        {contactIntents.flatMap((intent) =>
          (["es", "en"] as const).map((lang) => (
            <a
              key={`${intent.label.es}-${lang}`}
              data-lang={lang}
              lang={lang}
              href={`${socials.whatsapp}?text=${encodeURIComponent(intent.message[lang])}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              <WhatsAppIcon />
              {intent.label[lang]}
            </a>
          )),
        )}
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-sm text-muted">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Componente de servidor: el año sale del build, sin desajuste al hidratar. */}
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          <Tr value={ui.builtWith} />
        </p>
      </div>
    </footer>
  );
}
