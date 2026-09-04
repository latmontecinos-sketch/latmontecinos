"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import {
  about,
  community,
  profile,
  projects,
  type Project,
  proof,
  socials,
  stackDaily,
  stackLearning,
  ui,
} from "@/content/site";
import { useSite } from "@/components/providers";
import {
  ArrowIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-14 sm:py-20">
      <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {title}
      </h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

const socialLinks = [
  { href: socials.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: socials.github, label: "GitHub", Icon: GitHubIcon },
  { href: socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: socials.x, label: "X", Icon: XIcon },
  { href: socials.telegramChannel, label: "Telegram", Icon: TelegramIcon },
];

export function Hero() {
  const { t } = useSite();

  return (
    <section id="top" className="pb-14 pt-16 sm:pb-20 sm:pt-24">
      <Image
        src="/aex-logo.png"
        alt="AEX"
        width={64}
        height={64}
        priority
        className="mb-7 rounded-full border border-border"
      />
      <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {t(profile.role)}
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
        {t(profile.tagline)}
      </p>
      <p className="mt-4 text-sm text-muted">{t(profile.location)}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
        >
          <MailIcon />
          {profile.email}
        </a>
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

      <ProofBar />
    </section>
  );
}

function ProofBar() {
  const { t } = useSite();

  return (
    <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-border pt-8 sm:grid-cols-4">
      {proof.map((item) => {
        const value = (
          <dt className="font-display text-2xl font-bold tracking-tight text-text transition-colors sm:text-3xl">
            {t(item.value)}
          </dt>
        );
        const label = (
          <dd className="mt-1 text-xs leading-snug text-muted">
            {t(item.label)}
          </dd>
        );

        // Una cifra comprobable en un clic pesa mucho mas que una que hay que
        // creer, asi que cada dato con fuente publica va enlazado a su prueba.
        return item.href ? (
          <div key={t(item.label)} className="group">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <span className="block group-hover:text-accent [&>dt]:group-hover:text-accent">
                {value}
                {label}
              </span>
            </a>
          </div>
        ) : (
          <div key={t(item.label)}>
            {value}
            {label}
          </div>
        );
      })}
    </dl>
  );
}

export function About() {
  const { t } = useSite();

  return (
    <Section id="about" title={t(ui.aboutTitle)}>
      <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted">
        {t(about)
          .split("\n\n")
          .map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
      </div>
    </Section>
  );
}

function ProjectTitle({ project, large }: { project: Project; large?: boolean }) {
  const { t } = useSite();

  return (
    <div className="flex items-center gap-2.5">
      <h3
        className={`font-display font-semibold text-text ${
          large ? "text-xl sm:text-2xl" : "text-lg"
        }`}
      >
        {project.name}
      </h3>
      {project.status ? (
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
          {t(project.status)}
        </span>
      ) : null}
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  const { t } = useSite();

  return (
    <>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-surface-2 px-2 py-1 text-[11px] text-muted"
          >
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
              {t(link.label)}
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}

export function Projects() {
  const { t } = useSite();
  // El primero es el proyecto ancla: esta vivo y se puede abrir y probar, asi
  // que se lleva la captura y el ancho completo. Darle a los tres el mismo
  // peso desperdiciaba justo el unico que un revisor puede comprobar.
  const [featured, ...rest] = projects;

  return (
    <Section id="projects" title={t(ui.projectsTitle)}>
      <article className="overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/60">
        {featured.image ? (
          <a
            href={featured.links[0]?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-b border-border"
          >
            <Image
              src={featured.image.src}
              alt={t(featured.image.alt)}
              width={featured.image.width}
              height={featured.image.height}
              sizes="(min-width: 1024px) 960px, 100vw"
              // A tamaño completo la captura ocupaba casi toda la pantalla y
              // empujaba el resto fuera de vista; recortada a banner se lee
              // como vista previa y no como la pagina embebida.
              className="aspect-[2/1] w-full object-cover object-top"
            />
          </a>
        ) : null}
        <div className="p-5 sm:p-6">
          <ProjectTitle project={featured} large />
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
            {t(featured.summary)}
          </p>
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
              {t(project.summary)}
            </p>
            <ProjectMeta project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Community() {
  const { t } = useSite();

  return (
    <Section id="community" title={t(ui.communityTitle)}>
      <ul className="space-y-6">
        {community.map((item) => (
          <li
            key={t(item.org) + t(item.title)}
            className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6"
          >
            <p className="text-sm text-muted">{t(item.period)}</p>
            <div>
              <h3 className="font-medium text-text">
                {t(item.title)}
                <span className="text-muted"> · </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {t(item.org)}
                  </a>
                ) : (
                  <span className="text-muted">{t(item.org)}</span>
                )}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {t(item.detail)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Stack() {
  const { t } = useSite();

  return (
    <Section id="stack" title={t(ui.stackTitle)}>
      <p className="text-sm font-medium text-text">{t(ui.stackDailyLabel)}</p>
      <dl className="mt-4 grid gap-6 sm:grid-cols-2">
        {stackDaily.map((group) => (
          <div key={group.items.join()}>
            <dt className="text-xs uppercase tracking-wider text-muted">
              {t(group.group)}
            </dt>
            <dd className="mt-2.5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-9 text-sm font-medium text-text">
        {t(ui.stackLearningLabel)}
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
    </Section>
  );
}

export function Contact() {
  const { t } = useSite();

  return (
    <Section id="contact" title={t(ui.contactTitle)}>
      <p className="max-w-xl text-base leading-relaxed text-muted">
        {t(ui.contactBody)}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
        >
          <MailIcon />
          {profile.email}
        </a>
        <a
          href={socials.telegramCommunity}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <TelegramIcon />
          Telegram
        </a>
      </div>
    </Section>
  );
}

export function Footer() {
  const { t } = useSite();

  return (
    <footer className="border-t border-border py-8 text-sm text-muted">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{t(ui.builtWith)}</p>
      </div>
    </footer>
  );
}
