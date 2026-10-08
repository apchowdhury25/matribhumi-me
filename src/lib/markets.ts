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
      "Independent Bangladesh property advisor and consultant for local buyers, NRBs, and Bangladeshis living abroad. Compare selected developer properties and coordinate viewings — with no buyer fee.",
    intro:
      "MatriBhumi helps buyers compare new-development and selected developer properties in Bangladesh, then coordinates introductions and viewings. The purchase agreement is with the developer or seller.",
    cities: [
      { name: "Dhaka", slug: "dhaka" },
      { name: "Chattogram", slug: "chattogram" },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    shortName: "UAE",
    country: "United Arab Emirates",
    countryAliases: ["United Arab Emirates", "UAE"],
    region: "Middle East",
    heroImage: "/media/location-coastal.jpg",
    seoTitle: "UAE property advisor",
    description:
      "UAE property advisor for buyers relocating to the Emirates, comparing developer projects, and coordinating viewings in Dubai and other cities as listings are published — with no buyer fee.",
    intro:
      "MatriBhumi advises on selected developer properties in the UAE and coordinates the buying journey. Availability is shown only where listings have been published. The purchase agreement is with the developer or seller.",
    cities: [
      { name: "Dubai", slug: "dubai" },
      { name: "Abu Dhabi", slug: "abu-dhabi" },
      { name: "Sharjah", slug: "sharjah" },
    ],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    shortName: "Malaysia",
    country: "Malaysia",
    countryAliases: ["Malaysia"],
    region: "Southeast Asia",
    heroImage: "/media/location-singapore.jpg",
    seoTitle: "Malaysia property advisor",
    description:
      "Malaysia property advisor for buyers comparing developer properties and coordinating the purchase journey in Kuala Lumpur, Johor Bahru, Penang and other cities as data becomes available — with no buyer fee.",
    intro:
      "MatriBhumi will list selected developer properties in Malaysia as partnerships are confirmed. City pages appear when location data is published. The purchase agreement is with the developer or seller.",
    cities: [
      { name: "Kuala Lumpur", slug: "kuala-lumpur" },
      { name: "Johor Bahru", slug: "johor-bahru" },
      { name: "Penang", slug: "penang" },
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
  if (!market) return [countryOrSlug];
  return [...market.countryAliases];
}
