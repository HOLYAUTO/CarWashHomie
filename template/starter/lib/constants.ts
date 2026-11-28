/* STARTER — copy to lib/constants.ts for a new shop, then replace every
   「◯◯」 placeholder. Structure is identical to the live file.

   Central constants for business info — change once, propagate
   everywhere. Used across Navbar, Hero, Reservation, Access,
   Footer, tokusho, privacy, metadata / JSON-LD, FAQ, llms.txt etc. */

/* Weekday master: schema.org `dayOfWeek` (English) ↔ on-page label. */
export const WEEKDAYS = [
  { en: "Monday", ja: "月" },
  { en: "Tuesday", ja: "火" },
  { en: "Wednesday", ja: "水" },
  { en: "Thursday", ja: "木" },
  { en: "Friday", ja: "金" },
  { en: "Saturday", ja: "土" },
  { en: "Sunday", ja: "日" },
] as const;
export type Weekday = (typeof WEEKDAYS)[number]["en"];

export const BUSINESS = {
  /* Human-facing name */
  nameJa: "◯◯コーティング",
  nameEn: "OO Coating",
  tagline: "◯◯（店のキャッチコピー）",

  /* Contact */
  phone: "000-000-0000",
  phoneTel: "0000000000", // for tel: links
  phoneIntl: "+81-00-000-0000", // for JSON-LD `telephone`
  email: "info@example.com",
  instagramHandle: "example",
  instagramUrl: "https://www.instagram.com/example/",
  xHandle: "example",
  xUrl: "https://x.com/example",
  lineUrl: "https://lin.ee/example", // 公式LINE 友だち追加

  /* Address */
  postalCode: "000-0000",
  addressLine: "◯◯県◯◯市◯◯町1-2-3",
  addressRegion: "◯◯県",
  addressLocality: "◯◯市",
  streetAddress: "◯◯町1-2-3",
  /* One-line directions (IC / station / parking) — reused by llms.txt. */
  accessSummary:
    "◯◯自動車道「◯◯IC」から車で約◯分／「◯◯駅」から徒歩◯分／駐車場◯台",

  /* Hours — the ONLY place to edit opening hours / closed days.
     The on-page labels, JSON-LD dayOfWeek, FAQ answers and llms.txt
     are all derived from these three values. */
  opens: "10:00",
  closes: "19:00",
  closedDays: ["Wednesday"] as readonly Weekday[],

  /* Legal */
  registrationNumber: "T0000000000000", // 適格請求書発行事業者登録番号

  /* Responsible person */
  operator: "◯◯ ◯◯",
  operatorTitle: "代表",
} as const;

/** Weekdays the shop is open — feeds JSON-LD `dayOfWeek`. */
export function openDays(): Weekday[] {
  return WEEKDAYS.map((d) => d.en).filter(
    (d) => !BUSINESS.closedDays.includes(d),
  );
}

/** 「火曜日」「火曜日・水曜日」, or 「年中無休」 when never closed. */
export function closedDaysLabel(): string {
  if (BUSINESS.closedDays.length === 0) return "年中無休";
  return BUSINESS.closedDays
    .map((en) => `${WEEKDAYS.find((d) => d.en === en)?.ja ?? en}曜日`)
    .join("・");
}

/** 「10:00 — 19:00」 */
export const hoursLabel = `${BUSINESS.opens} — ${BUSINESS.closes}`;

/* Brand-concept layer — the wording that carries THIS shop's concept
   . When the site is reused for another shop,
   rewrite this block instead of hunting through the chrome components.
   See template/01-design.md. */
export const BRAND = {
  /** Short wordmark shown next to the logo (header / footer). */
  mark: "カーコーティング専門店",
  /** Footer pitch, one sentence per item. */
  pitch: [
    "◯◯市のカーコーティング・ディテイリング専門店です。",
    "塗装の状態を確認し、お車ごとに最適な施工をご提案します。",
  ],
  /** Header CTA button (desktop). */
  ctaPrimary: "無料見積もり",
  /** CTA button at the bottom of the mobile menu. */
  ctaSecondary: "ご予約・ご相談",
  /** Logo file in /public. */
  logo: "/logo.png",
} as const;

export const SITE = {
  url: "https://example.com",
  name: BUSINESS.nameJa,
  /* schema.org LocalBusiness subtype for components/JsonLd.tsx
     (e.g. AutomotiveBusiness / AutoWash / AutoRepair). */
  businessType: "AutomotiveBusiness",
  /** 業種 — one line, facts only (llms.txt). */
  businessCategory: "ボディコーティング・カーディテーリング専門店",
  /** Top-page title: 「地域＋業種 | 店名」. */
  defaultTitle: "◯◯市のカーコーティング専門店 | ◯◯コーティング",
  /** Site-wide <meta name="keywords">. */
  keywords: [
    "◯◯コーティング",
    "カーコーティング",
    "ガラスコーティング",
    "ディテイリング",
    "◯◯市",
    "◯◯県",
  ],
  /* 120字前後。地域名＋業種＋強み＋行動喚起。 */
  description:
    "◯◯県◯◯市のカーコーティング・ディテイリング専門店「◯◯コーティング」。ガラスコーティング・磨き・内装クリーニングまで、塗装の状態に合わせた施工をご提案します。無料見積もり受付中。",
  ogImage: "/og-image.png",
  locale: "ja_JP",
} as const;

/* Build a standard Next.js `Metadata` object for a sub-page.
   Centralizes canonical URL, Open Graph, Twitter Card, and
   keyword tags so every page gets the same SEO treatment
   without duplicating boilerplate. */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  keywords,
  article,
}: {
  title: string;
  absoluteTitle?: boolean;
  description: string;
  path: string;
  keywords?: readonly string[];
  /** Set for blog/news posts: switches OG type to `article` and uses
      the post's own image + dates. */
  article?: {
    image?: string | null;
    publishedTime: string;
    modifiedTime?: string;
  };
}) {
  const fullTitle = absoluteTitle ? title : `${title} | ${BUSINESS.nameJa}`;
  const images = article?.image
    ? [{ url: article.image, alt: title }]
    : [
        {
          url: SITE.ogImage,
          width: 1200,
          height: 630,
          alt: BUSINESS.nameJa,
        },
      ];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      locale: SITE.locale,
      url: `${SITE.url}${path}`,
      siteName: BUSINESS.nameJa,
      title: fullTitle,
      description,
      images,
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [BUSINESS.operator],
          }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description,
      images: images.map((img) => img.url),
      creator: `@${BUSINESS.xHandle}`,
    },
  };
}
