import { describe, expect, it } from "vitest";
import { brochureSchema, leadSchema, propertyFilterSchema, viewingSchema, waitlistSchema } from "@/lib/validations";
import { brochureEmail } from "@/lib/mail";

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

describe("waitlistSchema", () => {
  it("accepts a diaspora waitlist request", () => {
    const parsed = waitlistSchema.safeParse({
      name: "Asha Rahman",
      email: "asha@example.com",
      countryId: "GB",
      phone: "7700900123",
      interest: "Retirement",
      project: "MatriBhumi Heights",
      consent: true,
    });
    expect(parsed.success).toBe(true);
  });
});

describe("brochureSchema", () => {
  it("accepts a brochure request", () => {
    const parsed = brochureSchema.safeParse({
      name: "Asha Rahman",
      email: "asha@example.com",
      consent: true,
    });
    expect(parsed.success).toBe(true);
  });
});

describe("brochureEmail", () => {
  it("addresses the reader by first name and includes the download link", () => {
    const letter = brochureEmail("Asha Rahman");
    expect(letter.subject).toBe("Your MatriBhumi Pre-Launch Portfolio & Brochure");
    expect(letter.text.startsWith("Dear Asha,")).toBe(true);
    expect(letter.text).toContain("https://matribhumi.me/media/brochures/matribhumi-preview.pdf");
    expect(letter.text).toContain("House 12, Road 7, Gulshan, Dhaka, Bangladesh");
    expect(letter.text).toContain("Welcome back to the idea of home.");
    expect(letter.html).toContain("Download brochure");
  });
});

describe("propertyFilterSchema", () => {
  it("coerces page numbers", () => {
    const parsed = propertyFilterSchema.parse({ page: "2", view: "grid" });
    expect(parsed.page).toBe(2);
  });
});
