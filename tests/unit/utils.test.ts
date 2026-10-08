import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";
import { isVerifiedDeveloper, ownershipLabel, publicDeveloperName } from "@/lib/developer";
import { countryFilterValues, getMarket, getMarketByCountry } from "@/lib/markets";

describe("slugify", () => {
  it("creates url-safe slugs", () => {
    expect(slugify("MatriBhumi Heights")).toBe("matribhumi-heights");
  });
});

describe("publicDeveloperName", () => {
  it("hides unpublished and placeholder partners", () => {
    expect(publicDeveloperName({ name: "Unpublished partner", published: false })).toBeNull();
    expect(publicDeveloperName({ name: "Unpublished partner", published: true })).toBeNull();
    expect(publicDeveloperName({ name: "Horizon Homes", published: true })).toBe("Horizon Homes");
  });

  it("labels MatriBhumi-owned listings without a partner brand", () => {
    expect(ownershipLabel({ matribhumiOwned: true, developer: { name: "Unpublished partner", published: false } })).toBe(
      "MatriBhumi-owned",
    );
    expect(ownershipLabel({ matribhumiOwned: false, developer: { name: "Unpublished partner", published: false } })).toBeNull();
  });

  it("treats a developer as trusted only when published and verified", () => {
    expect(isVerifiedDeveloper({ name: "Horizon Homes", published: true, verified: true })).toBe(true);
    expect(isVerifiedDeveloper({ name: "Horizon Homes", published: true, verified: false })).toBe(false);
    expect(isVerifiedDeveloper({ name: "Unpublished partner", published: true, verified: true })).toBe(false);
  });
});

describe("markets", () => {
  it("resolves Bangladesh, UAE, and Malaysia as advisory markets", () => {
    expect(getMarket("bangladesh")?.country).toBe("Bangladesh");
    expect(getMarketByCountry("Bangladesh")?.slug).toBe("bangladesh");
    expect(countryFilterValues("bangladesh")).toEqual(["Bangladesh"]);
    expect(getMarket("uae")?.shortName).toBe("UAE");
    expect(getMarket("malaysia")?.shortName).toBe("Malaysia");
    expect(getMarket("uae")?.listingsPublished).toBe(false);
    expect(getMarket("malaysia")?.listingsPublished).toBe(false);
    expect(getMarket("bangladesh")?.cities.map((city) => city.name)).toEqual([
      "Dhaka",
      "Chattogram",
      "Bashundhara",
    ]);
  });
});

describe("rateLimit", () => {
  it("allows then blocks", () => {
    const key = `test-${Date.now()}`;
    expect(rateLimit(key, 2, 60_000).ok).toBe(true);
    expect(rateLimit(key, 2, 60_000).ok).toBe(true);
    expect(rateLimit(key, 2, 60_000).ok).toBe(false);
  });
});
