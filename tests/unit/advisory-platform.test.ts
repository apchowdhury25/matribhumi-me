import { describe, expect, it } from "vitest";
import { canManage, canViewCompensation } from "@/lib/auth-roles";
import { businessModel, buyerPaysNothing, buyerFeeStatement } from "@/config/businessModel";
import { publicDeveloperSelect, stripConfidential } from "@/lib/public-fields";
import { viewingSchema } from "@/lib/validations";

describe("businessModel", () => {
  it("keeps buyer fees at zero with developer compensation enabled", () => {
    expect(businessModel.buyerPaysMatriBhumi).toBe(false);
    expect(businessModel.buyerFee).toBe(0);
    expect(businessModel.developerCompensation).toBe(true);
    expect(buyerPaysNothing()).toBe(true);
    expect(buyerFeeStatement.toLowerCase()).toContain("nothing");
    expect(buyerFeeStatement.toLowerCase()).not.toContain("%");
  });
});

describe("authorization", () => {
  it("restricts compensation to administrators", () => {
    expect(canViewCompensation("ADMIN")).toBe(true);
    expect(canViewCompensation("EDITOR")).toBe(false);
    expect(canViewCompensation("SALES")).toBe(false);
    expect(canManage("SALES")).toBe(true);
  });
});

describe("public developer fields", () => {
  it("selects only public developer columns", () => {
    expect(publicDeveloperSelect).toMatchObject({
      name: true,
      slug: true,
      publicDescription: true,
      published: true,
      verified: true,
      featured: true,
    });
    expect(publicDeveloperSelect).not.toHaveProperty("internalNotes");
    expect(publicDeveloperSelect).not.toHaveProperty("relationshipNotes");
    expect(publicDeveloperSelect).not.toHaveProperty("contactEmail");
    expect(publicDeveloperSelect).not.toHaveProperty("partnerships");
  });

  it("strips confidential commercial fields from API payloads", () => {
    const payload = stripConfidential({
      id: "p1",
      name: "Heights",
      developer: {
        name: "Example Homes",
        publicDescription: "Homes in Dhaka",
        contactEmail: "secret@example.com",
        internalNotes: "do not publish",
        relationshipNotes: "intro pending",
        percentage: 3.5,
        agreementReference: "AGR-1",
        compensations: [{ percentage: 2 }],
      },
      percentage: 4,
      expectedAmount: 12000,
    });
    expect(payload.developer.name).toBe("Example Homes");
    expect(payload.developer.publicDescription).toBe("Homes in Dhaka");
    expect(payload.developer).not.toHaveProperty("contactEmail");
    expect(payload.developer).not.toHaveProperty("internalNotes");
    expect(payload.developer).not.toHaveProperty("percentage");
    expect(payload.developer).not.toHaveProperty("agreementReference");
    expect(payload.developer).not.toHaveProperty("compensations");
    expect(payload).not.toHaveProperty("percentage");
    expect(payload).not.toHaveProperty("expectedAmount");
  });
});

describe("viewingSchema", () => {
  it("accepts an optional viewing type", () => {
    const parsed = viewingSchema.safeParse({
      name: "Visitor Name",
      email: "visitor@example.com",
      phone: "+88010000000",
      propertyId: "prop-1",
      preferredDate: "2026-10-01",
      preferredTime: "10:00",
      viewingType: "VIRTUAL",
      consent: true,
    });
    expect(parsed.success).toBe(true);
  });
});
