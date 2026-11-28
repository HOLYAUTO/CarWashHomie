import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChromeGate from "@/components/ChromeGate";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CollectionProvider from "@/components/collection/CollectionProvider";
import CollectionBadge from "@/components/collection/CollectionBadge";
import { SITE, BUSINESS } from "@/lib/constants";

/* Fonts are self-hosted via next/font/local (files in app/fonts, OFL
   licenses in app/fonts/licenses). next/font/google fetched the font CSS
   from Google at build time and derives class-name hashes from it; on
   Vercel the server HTML and client CSS ended up with different hashes,
   so none of the --font-* variables were defined in production. Local
   files make the output deterministic. */

const playfair = localFont({
  src: "./fonts/PlayfairDisplay.woff2",
  weight: "400 900",
  variable: "--font-playfair",
  display: "swap",
});

const blackletter = localFont({
  src: "./fonts/UnifrakturMaguntia.woff2",
  weight: "400",
  variable: "--font-blackletter",
  display: "swap",
});

/* Noto Sans JP — body / readable Japanese. Variable font (400–900),
   subset to Latin, kana, CJK symbols and JIS level 1/2 kanji (cp932).
   `preload: false` because the file is ~2.3 MB; `display: swap` keeps
   text visible while it streams in. */
const notoSansJp = localFont({
  src: "./fonts/NotoSansJP-Variable.woff2",
  weight: "100 900",
  variable: "--font-noto",
  display: "swap",
  preload: false,
});

// 90s / Y2K display fonts
const pressStart = localFont({
  src: "./fonts/PressStart2P.woff2",
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

const vt323 = localFont({
  src: "./fonts/VT323.woff2",
  weight: "400",
  variable: "--font-crt",
  display: "swap",
});

const bungee = localFont({
  src: "./fonts/Bungee.woff2",
  weight: "400",
  variable: "--font-chunky",
  display: "swap",
});

// Pixel-style Japanese (16px DotGothic) for kana/kanji 90s vibe.
// Subset like Noto Sans JP (~440 KB), so not preloaded.
const dotGothic = localFont({
  src: "./fonts/DotGothic16-Regular.woff2",
  weight: "400",
  variable: "--font-pixel-jp",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: `%s | ${BUSINESS.nameJa}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: BUSINESS.operator }],
  creator: BUSINESS.nameJa,
  publisher: BUSINESS.nameJa,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: BUSINESS.nameJa,
    title: SITE.defaultTitle,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: BUSINESS.nameJa,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.description,
    images: [SITE.ogImage],
    creator: `@${BUSINESS.xHandle}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  /* Google Search Console ownership (HTML tag method). Set
     GOOGLE_SITE_VERIFICATION to the `content` value of the
     <meta name="google-site-verification"> tag Search Console shows. */
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${playfair.variable} ${blackletter.variable} ${notoSansJp.variable} ${pressStart.variable} ${vt323.variable} ${bungee.variable} ${dotGothic.variable}`}
    >
      <body className="font-body bg-cream text-midnight antialiased">
        <JsonLd />
        <ChromeGate>
          <Navbar />
        </ChromeGate>
        <CollectionProvider>
          <main className="relative overflow-x-hidden">{children}</main>
          <CollectionBadge />
        </CollectionProvider>
        <ChromeGate>
          <Footer />
        </ChromeGate>
        {/* Analytics on the public site only — not on /admin. */}
        <ChromeGate>
          <GoogleAnalytics />
        </ChromeGate>
      </body>
    </html>
  );
}
