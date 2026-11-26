import { BRAND, BUSINESS, SITE, openDays } from "@/lib/constants";
import { DEFAULT_BRANDS } from "@/lib/content";

/* Structured data for Google / Bing / social crawlers.
   Emits a LocalBusiness schema (subtype: SITE.businessType) with
   address, hours, contact, and legal registration number. */
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": SITE.businessType,
    "@id": `${SITE.url}/#business`,
    name: BUSINESS.nameJa,
    alternateName: BUSINESS.nameEn,
    legalName: BUSINESS.nameJa,
    slogan: BUSINESS.tagline,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    logo: `${SITE.url}${BRAND.logo}`,
    telephone: BUSINESS.phoneIntl,
    priceRange: "¥¥",
    taxID: BUSINESS.registrationNumber,
    address: {
      "@type": "PostalAddress",
      postalCode: BUSINESS.postalCode,
      addressCountry: "JP",
      addressRegion: BUSINESS.addressRegion,
      addressLocality: BUSINESS.addressLocality,
      streetAddress: BUSINESS.streetAddress,
    },
    /* dayOfWeek is derived from BUSINESS.closedDays — never list
       weekdays by hand here, or a closed-day change drifts out of
       sync with the visible hours. */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: openDays(),
        opens: BUSINESS.opens,
        closes: BUSINESS.closes,
      },
    ],
    sameAs: [BUSINESS.instagramUrl, BUSINESS.xUrl, BUSINESS.lineUrl],
    founder: {
      "@type": "Person",
      name: BUSINESS.operator,
      jobTitle: BUSINESS.operatorTitle,
    },
    /* Mirrors DEFAULT_BRANDS in lib/content.ts (kept in step with the
       admin-panel roster) so every page carries the brand roster as a
       search/LLM-answer-engine hint. The dedicated /brands page is the
       live, admin-editable source of truth for the full brand copy. */
    brand: DEFAULT_BRANDS.map((b) => ({
      "@type": "Brand",
      name: b.name,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
