export const OPERATING_COUNTRY = "Bangladesh";

export type MarketCity = {
  name: string;
  slug: string;
};

export type Market = {
  slug: "bangladesh" | "uae" | "malaysia";
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
    heroImage: "/media/location-dhaka.jpg",
    seoTitle: "Bangladesh property advisor",
    description:
      "Independent property guidance in Bangladesh. Explore selected developments, compare options, and coordinate your purchase with a MatriBhumi advisor — with no buyer fee.",
    intro:
      "MatriBhumi helps buyers compare selected developer properties in Bangladesh, then coordinates introductions and viewings. The purchase agreement is with the developer or seller.",
    cities: [
      { name: "Dhaka", slug: "dhaka" },
      { name: "Chattogram", slug: "chattogram" },
      { name: "Bashundhara", slug: "bashundhara" },
    ],
    listingsPublished: true,
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    shortName: "UAE",
    country: "United Arab Emirates",
    countryAliases: ["UAE", "United Arab Emirates"],
    region: "Middle East",
    heroImage: "/media/hero-night.jpg",
    seoTitle: "UAE property advisor",
    description:
      "Independent property guidance in the UAE. Share your requirements with a MatriBhumi advisor. Selected developments appear here as developer partnerships are published — with no buyer fee.",
    intro:
      "MatriBhumi advises buyers looking at the UAE and coordinates introductions when a participating developer is in place. We do not invent listings. The purchase agreement is with the developer or seller.",
    cities: [
      { name: "Dubai", slug: "dubai" },
      { name: "Abu Dhabi", slug: "abu-dhabi" },
    ],
    listingsPublished: false,
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    shortName: "Malaysia",
    country: "Malaysia",
    countryAliases: ["Malaysia"],
    region: "Southeast Asia",
    heroImage: "/media/hero-nature.jpg",
    seoTitle: "Malaysia property advisor",
    description:
      "Independent property guidance in Malaysia. Share your requirements with a MatriBhumi advisor. Selected developments appear here as developer partnerships are published — with no buyer fee.",
    intro:
      "MatriBhumi advises buyers looking at Malaysia and coordinates introductions when a participating developer is in place. We do not invent listings. The purchase agreement is with the developer or seller.",
    cities: [
      { name: "Kuala Lumpur", slug: "kuala-lumpur" },
      { name: "Johor Bahru", slug: "johor-bahru" },
    ],
    listingsPublished: false,
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
