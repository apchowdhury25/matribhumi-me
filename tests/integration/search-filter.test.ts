import { describe, expect, it } from "vitest";
import { propertyFilterSchema } from "@/lib/validations";

describe("property filtering", () => {
  it("builds a typed filter object from query params", () => {
    const filters = propertyFilterSchema.parse({
      q: "Heights",
      type: "APARTMENT",
      minPrice: "100000",
      bedrooms: "2",
      sort: "price-asc",
    });
    expect(filters.q).toBe("Heights");
    expect(filters.minPrice).toBe(100000);
    expect(filters.bedrooms).toBe(2);
  });
});
