import { describe, expect, it } from "vitest";
import {
  cityPath,
  citySelectOptions,
  findNeighborhood,
  getCity,
  getNeighborhood,
  locationCities,
  neighborhoodPath,
  neighborhoodSelectOptions,
  neighborhoodsByCategory,
  neighborhoodsForCity,
  publicLocationHref,
} from "@/config/locations";

describe("location hierarchy", () => {
  it("exposes only Dhaka and Chattogram as launch cities", () => {
    expect(locationCities.map((city) => city.slug)).toEqual(["dhaka", "chattogram"]);
  });

  it("keeps neighborhood categories in data, not in the UI layer", () => {
    const dhaka = getCity("Dhaka");
    expect(dhaka).toBeTruthy();
    const groups = neighborhoodsByCategory(dhaka!);
    expect(groups.map((group) => group.category.id)).toEqual(["luxury", "emerging"]);
    expect(groups.flatMap((group) => group.neighborhoods.map((item) => item.slug))).toContain("gulshan");
    expect(groups.flatMap((group) => group.neighborhoods.map((item) => item.slug))).toContain("purbachal");
  });

  it("builds nested neighborhood URLs", () => {
    expect(cityPath("dhaka")).toBe("/locations/dhaka");
    expect(neighborhoodPath("dhaka", "bashundhara")).toBe("/locations/dhaka/bashundhara");
    expect(neighborhoodPath("chattogram", "khulshi")).toBe("/locations/chattogram/khulshi");
    expect(getNeighborhood("dhaka", "bashundhara")?.name).toBe("Bashundhara R/A");
    expect(findNeighborhood("khulshi")?.city.slug).toBe("chattogram");
  });

  it("limits neighborhood filters to the selected city", () => {
    expect(citySelectOptions().map((item) => item.label)).toEqual(["Dhaka", "Chattogram"]);
    expect(neighborhoodSelectOptions("dhaka").map((item) => item.value)).toContain("gulshan");
    expect(neighborhoodSelectOptions("dhaka").map((item) => item.value)).not.toContain("khulshi");
    expect(neighborhoodSelectOptions("chattogram").map((item) => item.value)).toContain("nasirabad");
    expect(neighborhoodSelectOptions("chattogram").map((item) => item.value)).not.toContain("gulshan");
    expect(neighborhoodsForCity("sylhet")).toEqual([]);
  });

  it("maps public location records onto city or neighborhood paths", () => {
    expect(publicLocationHref({ slug: "dhaka" })).toBe("/locations/dhaka");
    expect(publicLocationHref({ slug: "bashundhara", city: "Dhaka" })).toBe("/locations/dhaka/bashundhara");
    expect(publicLocationHref({ slug: "khulshi", parent: { slug: "chattogram" } })).toBe("/locations/chattogram/khulshi");
  });
});
