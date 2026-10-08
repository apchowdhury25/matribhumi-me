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
};

export const markets = [
  {
    slug: "bangladesh",
    name: "Bangladesh",
    shortName: "Bangladesh",
    country: "Bangladesh",
    countryAliases: ["Bangladesh"],
    region: "South Asia",
    heroImage: "/media/location-dhaka.jpg",
    seoTitle: "Bangladesh property advisor",
    description:
      "Independent Bangladesh property advisor and consultant for local buyers, NRBs, and Bangladeshis living abroad. Compare selected developer properties in Bangladesh and coordinate viewings — with no buyer fee.",
    intro:
      "MatriBhumi helps buyers compare new-development and selected developer properties in Bangladesh, then coordinates introductions and viewings. The purchase agreement is with the developer or seller.",
    cities: [
      { name: "Dhaka", slug: "dhaka" },
      { name: "Chattogram", slug: "chattogram" },
      { name: "Bashundhara", slug: "bashundhara" },
    ],
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
