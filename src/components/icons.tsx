import { siGithub, siTelegram, siWhatsapp, siX, siYoutube } from "simple-icons";

type IconProps = { className?: string };

const base = "h-[1.15em] w-[1.15em]";

// Logos de marca: salen de simple-icons, la misma fuente que las fichas del
// Stack, para que no convivan dos versiones del mismo logo. LinkedIn no está
// en simple-icons (la marca pidió retirarlo), así que va su path oficial.
function BrandIcon({ path, className = base }: IconProps & { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={path} />
    </svg>
  );
}

export const GitHubIcon = (props: IconProps) => <BrandIcon path={siGithub.path} {...props} />;
export const XIcon = (props: IconProps) => <BrandIcon path={siX.path} {...props} />;
export const YouTubeIcon = (props: IconProps) => <BrandIcon path={siYoutube.path} {...props} />;
export const TelegramIcon = (props: IconProps) => <BrandIcon path={siTelegram.path} {...props} />;
export const WhatsAppIcon = (props: IconProps) => <BrandIcon path={siWhatsapp.path} {...props} />;

const LINKEDIN_PATH =
  "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.36-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z";
export const LinkedInIcon = (props: IconProps) => <BrandIcon path={LINKEDIN_PATH} {...props} />;

export function MailIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2.5 6.5 9.5 7 9.5-7" />
    </svg>
  );
}

export function SunIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function MenuIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ArrowIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
