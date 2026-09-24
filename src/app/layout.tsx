import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LANG_KEY, THEME_KEY } from "@/components/prefs";
import { CodeBackdrop } from "@/components/code-backdrop";
import { SITE_URL, profile, socials } from "@/content/site";
import { palette } from "@/content/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const pageTitle = `${profile.name} — ${profile.role.es}`;

// Es lo que se lee en Google y al compartir el enlace, asi que sigue al
// tagline: primero el oficio, despues el terreno donde hay profundidad.
const description =
  "Desarrollador de aplicaciones web, blockchain e IA en La Paz, Bolivia. Construyo plataformas, bots, herramientas con IA y proyectos con pagos y activos digitales. Core team de Ethereum Bolivia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pageTitle,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "desarrollador",
    "full stack",
    "TypeScript",
    "React",
    "Next.js",
    "blockchain",
    "IA",
    "Stellar",
    "Bolivia",
  ],
  authors: [{ name: profile.name, url: socials.github }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    locale: "es_BO",
    alternateLocale: "en_US",
    url: "/",
    title: pageTitle,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@AlexCriptoPro",
    title: pageTitle,
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: palette.light.bg },
    { media: "(prefers-color-scheme: dark)", color: palette.dark.bg },
  ],
};

// Corre antes del primer pintado: fija el tema y el idioma en <html>, y el CSS
// muestra el texto de ese idioma (components/tr.tsx). Sin destello de ninguno.
const bootstrap = `(function(){try{
var t=localStorage.getItem('${THEME_KEY}');
if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
if(t==='dark'){document.documentElement.classList.add('dark');}
var l=localStorage.getItem('${LANG_KEY}');
if(l==='en'||l==='es'){document.documentElement.lang=l;}
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body
        className={`${inter.variable} ${display.variable} ${mono.variable} font-sans antialiased`}
      >
        <CodeBackdrop />
        {children}
      </body>
    </html>
  );
}
