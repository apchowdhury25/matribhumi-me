import { LegalDocument } from "@/components/site/LegalDocument";
import { legalPages } from "@/config/legal";
import { createMetadata } from "@/lib/seo";

const page = legalPages.buyerFee;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function BuyerFeeDisclosurePage() {
  return <LegalDocument page={page} />;
}
