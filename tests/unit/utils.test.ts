import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";

describe("slugify", () => {
  it("creates url-safe slugs", () => {
    expect(slugify("MatriBhumi Heights")).toBe("matribhumi-heights");
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
