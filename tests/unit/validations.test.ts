import { describe, expect, it } from "vitest";
import { leadSchema, propertyFilterSchema, viewingSchema } from "@/lib/validations";

describe("leadSchema", () => {
  it("accepts a complete inquiry", () => {
    const parsed = leadSchema.safeParse({
      name: "Test Visitor",
      email: "visitor@example.com",
      phone: "+88010000000",
      country: "Bangladesh",
      message: "I would like information about Heights Residences.",
      consent: true,
    });
    expect(parsed.success).toBe(true);
  });
  it("rejects a honeypot-free but short message", () => {
    const parsed = leadSchema.safeParse({
      name: "A",
      email: "bad",
      phone: "1",
      country: "X",
      message: "Hi",
      consent: true,
    });
    expect(parsed.success).toBe(false);
  });
});

describe("viewingSchema", () => {
  it("requires a property", () => {
    const parsed = viewingSchema.safeParse({
      name: "Visitor Name",
      email: "visitor@example.com",
      phone: "+88010000000",
      propertyId: "",
      preferredDate: "2026-10-01",
      preferredTime: "10:00",
      consent: true,
    });
    expect(parsed.success).toBe(false);
  });
});

describe("propertyFilterSchema", () => {
  it("coerces page numbers", () => {
    const parsed = propertyFilterSchema.parse({ page: "2", view: "grid" });
    expect(parsed.page).toBe(2);
  });
});
