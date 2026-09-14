import { describe, expect, it } from "vitest";
import { formatArea, formatBedrooms, formatPrice, statusLabel } from "@/lib/format";

describe("formatPrice", () => {
  it("formats USD without cents", () => {
    expect(formatPrice(180000, "USD")).toContain("180,000");
  });
  it("handles invalid numbers", () => {
    expect(formatPrice(Number.NaN)).toBe("Price on request");
  });
});

describe("formatArea", () => {
  it("includes the unit", () => {
    expect(formatArea(980)).toBe("980 sqft");
  });
});

describe("formatBedrooms", () => {
  it("labels studios", () => {
    expect(formatBedrooms(0, 0)).toBe("Studio");
  });
  it("ranges", () => {
    expect(formatBedrooms(1, 3)).toBe("1–3 bed");
  });
});

describe("statusLabel", () => {
  it("humanizes enums", () => {
    expect(statusLabel("UNDER_CONSTRUCTION")).toBe("Under Construction");
  });
});
