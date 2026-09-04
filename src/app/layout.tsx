import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { CodeBackdrop } from "@/components/code-backdrop";
import { profile, socials } from "@/content/site";
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

const description =
  "Web3 builder y developer en La Paz, Bolivia. Herramientas cripto en TypeScript, core team de Ethereum Bolivia y creador de Alex Criptomonedas.";

export const metadata: Metadata = {
  metadataBase: new URL("https://latmontecinos.vercel.app"),
  title: {
    default: `${profile.name} — Web3 Builder & Developer`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Web3",
    "Stellar",
    "DeFi",
    "Bolivia",
    "TypeScript",
    "Ethereum Bolivia",
  ],
  authors: [{ name: profile.name, url: socials.github }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    locale: "es_BO",
    alternateLocale: "en_US",
    url: "/",
    title: `${profile.name} — Web3 Builder & Developer`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@AlexCriptoPro",
    title: `${profile.name} — Web3 Builder & Developer`,
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0a08" },
  ],
};

// Corre antes del primer pintado para que no haya destello de tema ni de idioma.
const bootstrap = `(function(){try{
var t=localStorage.getItem('lat-theme');
if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
if(t==='dark'){document.documentElement.classList.add('dark');}
var l=localStorage.getItem('lat-lang');
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
