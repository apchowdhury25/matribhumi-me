import { CountryMarketPage } from "@/components/site/CountryMarketPage";
import { createMetadata } from "@/lib/seo";
import { getMarket } from "@/lib/markets";

export const dynamic = "force-dynamic";

const market = getMarket("uae")!;

export const metadata = createMetadata({
  title: market.seoTitle,
  description: market.description,
  path: "/locations/uae",
  image: market.heroImage,
});

export default function UaePage() {
  return <CountryMarketPage slug="uae" />;
}
