import { CountryMarketPage } from "@/components/site/CountryMarketPage";
import { createMetadata } from "@/lib/seo";
import { getMarket } from "@/lib/markets";

export const dynamic = "force-dynamic";

const market = getMarket("malaysia")!;

export const metadata = createMetadata({
  title: market.seoTitle,
  description: market.description,
  path: "/locations/malaysia",
  image: market.heroImage,
});

export default function MalaysiaPage() {
  return <CountryMarketPage slug="malaysia" />;
}
