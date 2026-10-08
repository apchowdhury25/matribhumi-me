import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";
import { ownershipLabel, publicDeveloperName } from "@/lib/developer";

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
});

describe("rateLimit", () => {
  it("allows then blocks", () => {
    const key = `test-${Date.now()}`;
    expect(rateLimit(key, 2, 60_000).ok).toBe(true);
    expect(rateLimit(key, 2, 60_000).ok).toBe(true);
    expect(rateLimit(key, 2, 60_000).ok).toBe(false);
  });
});
