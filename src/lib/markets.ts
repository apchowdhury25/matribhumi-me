export const OPERATING_COUNTRY = "Bangladesh";

export type MarketCity = {
  name: string;
  slug: string;
};

export type Market = {
  slug: "bangladesh";
  name: string;
  shortName: string;
  country: string;
  countryAliases: readonly string[];
  region: string;
  heroImage: string;
  seoTitle: string;
  description: string;
  intro: string;
  cities: readonly MarketCity[];
  listingsPublished: boolean;
};

export const markets = [
  {
    slug: "bangladesh",
    name: "Bangladesh",
    shortName: "Bangladesh",
    country: "Bangladesh",
    countryAliases: ["Bangladesh"],
    region: "South Asia",
    heroImage: "/media/locations/dhaka.jpg",
    seoTitle: "Bangladesh property advisor",
    description:
      "Independent property guidance in Bangladesh. Explore selected developments, compare options, and coordinate your purchase with a MatriBhumi advisor.",
    intro:
      "MatriBhumi helps buyers find and evaluate properties from participating developers in Bangladesh and coordinates the buyer’s interaction with the developer. The property purchase agreement is between the buyer and the relevant developer/seller.",
    cities: [
      { name: "Dhaka", slug: "dhaka" },
      { name: "Chattogram", slug: "chattogram" },
    ],
    listingsPublished: true,
  },
] as const satisfies readonly Market[];

export type MarketSlug = (typeof markets)[number]["slug"];

export function getMarket(slug: string) {
  return markets.find((market) => market.slug === slug) ?? null;
}

export function getMarketByCountry(country: string) {
  const value = country.trim().toLowerCase();
  return (
    markets.find(
      (market) =>
        market.country.toLowerCase() === value ||
        market.shortName.toLowerCase() === value ||
        market.countryAliases.some((alias) => alias.toLowerCase() === value),
    ) ?? null
  );
}

export function countryFilterValues(countryOrSlug: string) {
  const market = getMarket(countryOrSlug) ?? getMarketByCountry(countryOrSlug);
  if (!market) return [OPERATING_COUNTRY];
  return [...market.countryAliases];
}

export function isOperatingCountry(country: string) {
  return country.trim().toLowerCase() === OPERATING_COUNTRY.toLowerCase();
}

export function marketHasPublicListings(slug: string) {
  return getMarket(slug)?.listingsPublished === true;
}
