export type MatchLead = {
  preferredCity?: string | null;
  preferredMarket?: string | null;
  residenceCountry?: string | null;
  propertyType?: string | null;
  budget?: string | null;
  budgetMin?: number | string | null;
  budgetMax?: number | string | null;
  bedrooms?: number | null;
  developerId?: string | null;
  developmentId?: string | null;
};

export type MatchProperty = {
  id: string;
  name: string;
  type: string;
  status: string;
  startingPrice: number | string;
  bedroomsMin: number;
  bedroomsMax: number;
  developerId: string;
  developmentId: string;
  location: { name: string; city: string; country: string };
};

export type MatchResult = {
  propertyId: string;
  score: number;
  maxScore: number;
  percent: number;
  reasons: string[];
};

function norm(value?: string | null) {
  return (value ?? "").trim().toLowerCase();
}

function asNumber(value?: number | string | null) {
  if (value == null || value === "") return null;
  const n = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function parseBudgetNumber(value?: string | null) {
  return asNumber(value);
}

function citiesMatch(preferred: string, location: MatchProperty["location"]) {
  const needle = norm(preferred);
  if (!needle) return false;
  return [location.city, location.name].some((part) => {
    const hay = norm(part);
    return hay === needle || hay.includes(needle) || needle.includes(hay);
  });
}

/**
 * Weighted advisor match. This is a staff screening aid, not a valuation,
 * legal opinion, or AI recommendation.
 */
export function scorePropertyMatch(lead: MatchLead, property: MatchProperty): MatchResult {
  let earned = 0;
  let maxScore = 0;
  const reasons: string[] = [];

  if (lead.preferredCity) {
    maxScore += 25;
    if (citiesMatch(lead.preferredCity, property.location)) {
      earned += 25;
      reasons.push("Preferred city matches the listing location.");
    }
  }

  if (lead.preferredMarket) {
    maxScore += 10;
    const market = norm(lead.preferredMarket);
    const country = norm(property.location.country);
    if (country === market || (market.includes("bangladesh") && country === "bangladesh")) {
      earned += 10;
      reasons.push("Preferred market matches the listing country.");
    }
  }

  if (lead.developerId) {
    maxScore += 15;
    if (lead.developerId === property.developerId) {
      earned += 15;
      reasons.push("Preferred developer matches.");
    }
  }

  if (lead.developmentId) {
    maxScore += 15;
    if (lead.developmentId === property.developmentId) {
      earned += 15;
      reasons.push("Preferred project matches.");
    }
  }

  if (lead.propertyType) {
    maxScore += 15;
    if (lead.propertyType === property.type) {
      earned += 15;
      reasons.push("Property type matches.");
    }
  }

  const min = asNumber(lead.budgetMin);
  const max = asNumber(lead.budgetMax) ?? parseBudgetNumber(lead.budget ?? null);
  const price = asNumber(property.startingPrice);
  if (min != null || max != null) {
    maxScore += 15;
    if (price != null) {
      const aboveMin = min == null || price >= min;
      const belowMax = max == null || price <= max * 1.1;
      if (aboveMin && belowMax) {
        earned += 15;
        reasons.push("Starting price sits within the stated budget range.");
      }
    }
  }

  if (lead.bedrooms != null) {
    maxScore += 10;
    if (lead.bedrooms >= property.bedroomsMin && lead.bedrooms <= property.bedroomsMax) {
      earned += 10;
      reasons.push("Bedroom count is within the listing range.");
    }
  }

  maxScore += 5;
  if (property.status !== "SOLD_OUT") {
    earned += 5;
    reasons.push("Listing is not marked sold out.");
  }

  const percent = maxScore === 0 ? 0 : Math.round((earned / maxScore) * 100);
  if (!reasons.length) reasons.push("No strong matches yet — review manually.");

  return { propertyId: property.id, score: earned, maxScore, percent, reasons };
}

export function rankPropertyMatches(lead: MatchLead, properties: MatchProperty[]) {
  return properties
    .map((property) => ({ property, match: scorePropertyMatch(lead, property) }))
    .sort((a, b) => b.match.percent - a.match.percent || b.match.score - a.match.score);
}
