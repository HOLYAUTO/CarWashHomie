/* STARTER — copy to lib/routes.ts for a new shop. Titles and nav labels
   use generic search words (施工事例 / 代表紹介 …); adjust to the shop.
   Set every `updated` to the launch date. Drop /brands if the shop is
   not a brand dealer.

   Public page registry — the single list that both app/sitemap.ts and
   app/llms.txt/route.ts read, so a new page only has to be added here.

   lastmod rules (Google ignores lastmod that is always "now"):
   - `updated` → hand-maintained pages. Bump it in the SAME commit that
     changes the page's visible content.
   - `tables`  → CMS-driven pages. The sitemap uses the newest
     `updated_at` among the published rows of these tables.
   Article detail pages (/news/<slug>, /useful/<slug>) are added by the
   sitemap itself from the database. */

import { BUSINESS } from "@/lib/constants";

export type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

export type StaticRoute = {
  path: string;
  /** Page name — used as the link text in llms.txt. */
  title: string;
  /** One-line, fact-only summary for llms.txt. */
  summary: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** YYYY-MM-DD the page content last changed (hand-maintained pages). */
  updated?: string;
  /** Tables whose rows make up the page (CMS-driven pages). */
  tables?: readonly string[];
  /** Navigation entries. Present = listed there; the value is the link
      label (often shorter than `title`). Order follows this array. */
  nav?: { header?: string; footer?: string };
};

export const STATIC_ROUTES: StaticRoute[] = [
  {
    path: "/",
    title: "トップ",
    summary: `${BUSINESS.nameJa} の概要・メニューの入口・よくある質問`,
    priority: 1.0,
    changeFrequency: "weekly",
    updated: "2026-01-01",
  },
  {
    path: "/concept",
    nav: { header: "こだわり", footer: "こだわり・選ばれる理由" },
    title: "こだわり・選ばれる理由",
    summary: "施工の考え方と、他店との違い",
    priority: 0.8,
    changeFrequency: "monthly",
    updated: "2026-01-01",
  },
  {
    path: "/menu",
    nav: { header: "メニュー・料金", footer: "メニュー・料金" },
    title: "メニュー・料金",
    summary: "ボディ・内装・ガラス・ホイールコーティングの料金一覧と施工期間の目安",
    priority: 0.9,
    changeFrequency: "monthly",
    tables: [
      "body_coatings",
      "wash_services",
      "interior_coatings",
      "interior_options",
      "glass_coatings",
      "wheel_coatings",
      "b2b_services",
      "menu_notes",
    ],
  },
  {
    path: "/brands",
    nav: { header: "取扱いブランド", footer: "取扱いブランド" },
    title: "取扱いブランド",
    summary: "取扱いコーティングブランドと認定施工店の情報",
    priority: 0.8,
    changeFrequency: "monthly",
    tables: ["brands"],
  },
  {
    path: "/gallery",
    nav: { header: "施工事例", footer: "施工事例" },
    title: "施工事例",
    summary: "Before / After で見る施工事例（車種・色・メニュー別）とお客様の声",
    priority: 0.8,
    changeFrequency: "weekly",
    tables: ["gallery_cases", "testimonials"],
  },
  {
    path: "/news",
    nav: { header: "お知らせ" },
    title: "お知らせ",
    summary: "キャンペーン・営業案内などの最新情報",
    priority: 0.6,
    changeFrequency: "weekly",
    tables: ["news_posts"],
  },
  {
    path: "/useful",
    nav: { header: "コラム", footer: "コラム" },
    title: "コラム",
    summary: "洗車・コーティング・メンテナンスのコツをまとめたコラム",
    priority: 0.6,
    changeFrequency: "weekly",
    tables: ["useful_articles"],
  },
  {
    path: "/doctor",
    nav: { header: "代表紹介", footer: "代表紹介" },
    title: "代表紹介",
    summary: `${BUSINESS.operatorTitle} ${BUSINESS.operator} のプロフィールと実績`,
    priority: 0.7,
    changeFrequency: "monthly",
    updated: "2026-01-01",
  },
  {
    path: "/reservation",
    nav: { header: "ご予約", footer: "ご予約・ご相談" },
    title: "ご予約・ご相談",
    summary: "予約・無料見積もりの方法（公式LINE・電話・Instagram DM・フォーム）",
    priority: 0.9,
    changeFrequency: "monthly",
    updated: "2026-01-01",
  },
  {
    path: "/access",
    nav: { header: "アクセス", footer: "アクセス" },
    title: "アクセス",
    summary: "所在地・営業時間・定休日・駐車場・車と電車でのアクセス",
    priority: 0.7,
    changeFrequency: "yearly",
    updated: "2026-01-01",
  },
  {
    path: "/privacy",
    title: "プライバシーポリシー",
    summary: "個人情報の取り扱い",
    priority: 0.3,
    changeFrequency: "yearly",
    updated: "2026-01-01",
  },
  {
    path: "/legal",
    title: "特定商取引法に基づく表記",
    summary: "事業者情報・支払方法・キャンセルについて",
    priority: 0.3,
    changeFrequency: "yearly",
    updated: "2026-01-01",
  },
];

/** Header navigation (desktop + mobile), in STATIC_ROUTES order. */
export const HEADER_NAV = STATIC_ROUTES.flatMap((r) =>
  r.nav?.header ? [{ label: r.nav.header, href: r.path }] : [],
);

/** Footer sitemap links, in STATIC_ROUTES order. */
export const FOOTER_NAV = STATIC_ROUTES.flatMap((r) =>
  r.nav?.footer ? [{ label: r.nav.footer, href: r.path }] : [],
);
