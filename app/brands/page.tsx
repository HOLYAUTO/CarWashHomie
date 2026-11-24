import Brands from "@/components/Brands";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqJsonLd from "@/components/FaqJsonLd";
import { pageMetadata } from "@/lib/constants";
import { getBrands } from "@/lib/content";
import { brandFaqs } from "@/lib/faqs";
import { otherBrandNames, otherBrandsLead } from "@/lib/brand-copy";

// Always reflect the latest brand list edited in the admin panel.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// The meta description and keywords name the brands published in the
// admin panel, so they follow edits there like the page body does.
export async function generateMetadata() {
  const brands = await getBrands();
  return pageMetadata({
    title: "Adam's Polishes 埼玉 施工代理店｜取扱いブランド",
    description: `車の美容外科 Car Wash Homiesは埼玉県さいたま市岩槻区の「Adam's Polishes 埼玉 施工代理店」。${otherBrandsLead(brands)}厳選ブランドの施工・販売にも対応します。`,
    path: "/brands",
    keywords: [
      "Adam's Polishes 埼玉",
      "Adam's Polishes 施工代理店",
      "アダムスポリッシュ 埼玉",
      "アダムスポリッシュ 施工代理店",
      ...otherBrandNames(brands),
      "取扱いブランド",
      "さいたま市",
      "岩槻",
    ],
  });
}

export default async function BrandsPage() {
  const brands = await getBrands();
  const faqs = brandFaqs(brands);

  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "取扱いブランド", path: "/brands" },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <Brands brands={brands} faqs={faqs} />
    </div>
  );
}
