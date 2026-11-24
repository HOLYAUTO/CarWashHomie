import type { Brand } from "@/lib/content";

/* Copy that names the brand roster (the /brands intro, its FAQs, its
   meta description and keywords) is built from the brands published
   in the admin panel, so editing the roster there updates the wording
   too. Adam's Polishes is always named separately as the headline
   "埼玉 施工代理店" brand, so it is left out of the "other brands" list.

   Pure data + string helpers only: imported by both Server Components
   and the "use client" Brands component. */

const HEADLINE_BRAND = "Adam's Polishes";

/* Curated positioning copy per brand — richer than the thin
   name/region/label fields the admin panel manages. Brands added in
   the admin panel without an entry here get DEFAULT_BRAND_DESCRIPTION. */
export const BRAND_DESCRIPTIONS: Record<string, string> = {
  "Adam's Polishes":
    "アメリカ発のプレミアムカーケアブランド。世界中のプロディテイラーに支持されるポリッシュ・コーティング・ケミカルを、埼玉県内の正規施工代理店として取り扱っています。",
  "RESISTANCE COATING":
    "酸性・アルカリ性の汚れや雨染みなど、塗装へのダメージに対する耐性を高めるコーティング。最高グレード「1ST CLASS RECON100」に採用しています。当店は埼玉施工代理店として施工を行っています。",
  "3D HYBRID COATING":
    "ナノセラミック系のハイブリッドコーティング。2層構造で高耐久・高光沢の仕上がりを実現し、「1ST CLASS RECON100」に採用しています。当店は埼玉施工代理店として施工を行っています。",
};
export const DEFAULT_BRAND_DESCRIPTION =
  "厳選した信頼できるカーケアブランドとして、施工・販売の両面でお取り扱いしています。";

/* Short qualifier used in the "how do you choose between brands" FAQ
   ("ダメージ耐性に優れたRESISTANCE COATING"). Optional per brand. */
const BRAND_TAGLINES: Record<string, string> = {
  "RESISTANCE COATING": "ダメージ耐性に優れた",
  "3D HYBRID COATING": "高耐久・高光沢の",
};

/** Published brands other than the headline brand, in display order. */
function otherBrands(brands: Brand[]): Brand[] {
  return brands.filter((b) => b.name.trim() && b.name.trim() !== HEADLINE_BRAND);
}

/** Published brand names other than the headline brand, in display order. */
export function otherBrandNames(brands: Brand[]): string[] {
  return otherBrands(brands).map((b) => b.name.trim());
}

/** Other brands whose admin-panel label marks the shop as their 施工代理店. */
function agencyBrands(brands: Brand[]): Brand[] {
  return otherBrands(brands).filter((b) => b.label?.includes("代理店"));
}

/** The shared agency label ("埼玉施工代理店"), or a generic one if they differ. */
function agencyLabel(agencies: Brand[]): string {
  const labels = new Set(agencies.map((b) => b.label?.trim()));
  const [only] = Array.from(labels);
  return labels.size === 1 && only ? only : "施工代理店";
}

/** "A・Bの埼玉施工代理店" when the shop is an agency for other brands, else "". */
export function agencyPhrase(brands: Brand[]): string {
  const agencies = agencyBrands(brands);
  if (agencies.length === 0) return "";
  return `${agencies.map((b) => b.name.trim()).join("・")}の${agencyLabel(agencies)}`;
}

/** Sentence for the /brands intro, after the Adam's Polishes line. */
export function brandsIntroSentence(brands: Brand[]): string {
  const agency = agencyPhrase(brands);
  if (agency) {
    return `${agency}も務め、信頼できるカーケアブランドを厳選して施工・販売の両面でお取り扱いしています。`;
  }
  const names = otherBrandNames(brands);
  const lead = names.length > 0 ? `${names.join("・")}など、` : "";
  return `${lead}国内外の信頼できるカーケアブランドを厳選し、施工・販売の両面でお取り扱いしています。`;
}

/** Tail of the /brands meta description, after the Adam's Polishes sentence. */
export function brandsMetaSentence(brands: Brand[]): string {
  const agency = agencyPhrase(brands);
  return agency
    ? `${agency}として、厳選ブランドの施工・販売にも対応します。`
    : "厳選ブランドの施工・販売にも対応します。";
}

/** "A・B（いずれも埼玉施工代理店）など、" for the brand-roster FAQ, or "". */
export function brandRosterLead(brands: Brand[]): string {
  const names = otherBrandNames(brands);
  if (names.length === 0) return "";
  const agencies = agencyBrands(brands);
  const note =
    agencies.length === names.length
      ? `（${names.length > 1 ? "いずれも" : ""}${agencyLabel(agencies)}）`
      : "";
  return `${names.join("・")}${note}など、`;
}

/** "ダメージ耐性に優れたA、高耐久・高光沢のB" for the brand-choice FAQ, or "". */
export function brandChoiceList(brands: Brand[]): string {
  return otherBrandNames(brands)
    .map((name) => `${BRAND_TAGLINES[name] ?? ""}${name}`)
    .join("、");
}
