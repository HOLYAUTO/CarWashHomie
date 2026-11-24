import type { Brand } from "@/lib/content";

/* Copy that names the brand roster (the /brands intro, its FAQs, its
   meta description and keywords) is built from the brands published
   in the admin panel, so editing the roster there updates the wording
   too. Adam's Polishes is always named separately as the headline
   "埼玉 施工代理店" brand, so it is left out of the "other brands" list. */

const HEADLINE_BRAND = "Adam's Polishes";

/** Published brand names other than the headline brand, in display order. */
export function otherBrandNames(brands: Brand[]): string[] {
  return brands
    .map((b) => b.name.trim())
    .filter((name) => name && name !== HEADLINE_BRAND);
}

/** "A・B・Cなど、" for use before a noun phrase, or "" when there are none. */
export function otherBrandsLead(brands: Brand[]): string {
  const names = otherBrandNames(brands);
  return names.length > 0 ? `${names.join("・")}など、` : "";
}
