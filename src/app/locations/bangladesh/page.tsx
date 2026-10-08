import { CountryMarketPage } from "@/components/site/CountryMarketPage";
import { createMetadata } from "@/lib/seo";
import { getMarket } from "@/lib/markets";

export const dynamic = "force-dynamic";

const market = getMarket("bangladesh")!;

export const metadata = createMetadata({
  title: market.seoTitle,
  description: market.description,
  path: "/locations/bangladesh",
  image: market.heroImage,
});

export default function BangladeshPage() {
  return <CountryMarketPage slug="bangladesh" />;
}
