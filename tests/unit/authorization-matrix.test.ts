import { describe, expect, it } from "vitest";
import type { UserRole } from "@prisma/client";
import {
  canAccessContent,
  canAccessSales,
  canEditDevelopers,
  canManage,
  canUpload,
  canViewCompensation,
  canViewInternalNotes,
  canViewReports,
} from "@/lib/auth-roles";
import { canVisitConsolePath } from "@/lib/admin-nav";
import { containsConfidentialKey, publicDeveloperSelect, stripConfidential } from "@/lib/public-fields";

const roles: UserRole[] = ["ADMIN", "EDITOR", "SALES"];

describe("PUBLIC / EDITOR / SALES / ADMIN access matrix", () => {
  it("keeps confidential commercial data off public payloads", () => {
    const leaked = stripConfidential({
      id: "p1",
      name: "Heights",
      developer: {
        name: "Example Homes",
        publicDescription: "Homes in Dhaka",
        contactEmail: "secret@example.com",
        internalNotes: "do not publish",
        staffNotes: "staff only",
        advisorNotes: "advisor only",
        leadNotes: "lead only",
        dealNotes: "deal only",
        relationshipNotes: "intro pending",
        percentage: 3.5,
        agreementReference: "AGR-1",
        estimatedValue: 250000,
        commercialTerms: "2% referral",
        compensations: [{ percentage: 2, feeAmount: 4000 }],
        partnerships: [{ agreementReference: "P-1" }],
        deals: [{ estimatedValue: 1 }],
        followUps: [{ notes: "call" }],
      },
      expectedAmount: 12000,
      paymentStatus: "EXPECTED",
      confidential: true,
    });
    expect(leaked.developer.name).toBe("Example Homes");
    expect(leaked.developer.publicDescription).toBe("Homes in Dhaka");
    expect(leaked.developer).not.toHaveProperty("contactEmail");
    expect(leaked.developer).not.toHaveProperty("internalNotes");
    expect(leaked.developer).not.toHaveProperty("staffNotes");
    expect(leaked.developer).not.toHaveProperty("advisorNotes");
    expect(leaked.developer).not.toHaveProperty("leadNotes");
    expect(leaked.developer).not.toHaveProperty("dealNotes");
    expect(leaked.developer).not.toHaveProperty("percentage");
    expect(leaked.developer).not.toHaveProperty("agreementReference");
    expect(leaked.developer).not.toHaveProperty("estimatedValue");
    expect(leaked.developer).not.toHaveProperty("commercialTerms");
    expect(leaked.developer).not.toHaveProperty("compensations");
    expect(leaked.developer).not.toHaveProperty("partnerships");
    expect(leaked.developer).not.toHaveProperty("deals");
    expect(leaked.developer).not.toHaveProperty("followUps");
    expect(leaked).not.toHaveProperty("expectedAmount");
    expect(leaked).not.toHaveProperty("paymentStatus");
    expect(leaked).not.toHaveProperty("confidential");
  });

  it("selects only public developer columns", () => {
    expect(publicDeveloperSelect).not.toHaveProperty("internalNotes");
    expect(publicDeveloperSelect).not.toHaveProperty("relationshipNotes");
    expect(publicDeveloperSelect).not.toHaveProperty("contactEmail");
    expect(publicDeveloperSelect).not.toHaveProperty("partnerships");
    expect(publicDeveloperSelect).not.toHaveProperty("compensations");
  });

  it("treats compensation, notes, and financial keys as confidential", () => {
    expect(containsConfidentialKey("internalNotes")).toBe(true);
    expect(containsConfidentialKey("staffNotes")).toBe(true);
    expect(containsConfidentialKey("estimatedValue")).toBe(true);
    expect(containsConfidentialKey("agreementReference")).toBe(true);
    expect(containsConfidentialKey("description")).toBe(false);
    expect(containsConfidentialKey("publicDescription")).toBe(false);
  });

  it("does not grant any staff capability to the public", () => {
    for (const role of roles) {
      expect(canManage(role)).toBe(true);
    }
    expect(canViewCompensation("ADMIN" as UserRole)).toBe(true);
    expect(["EDITOR", "SALES"].every((role) => canViewCompensation(role as UserRole) === false)).toBe(true);
  });

  it("limits editors to content, developer profiles, and uploads", () => {
    expect(canAccessContent("EDITOR")).toBe(true);
    expect(canEditDevelopers("EDITOR")).toBe(true);
    expect(canUpload("EDITOR")).toBe(true);
    expect(canViewInternalNotes("EDITOR")).toBe(true);
    expect(canAccessSales("EDITOR")).toBe(false);
    expect(canViewReports("EDITOR")).toBe(false);
    expect(canViewCompensation("EDITOR")).toBe(false);
    expect(canVisitConsolePath("/admin/properties", "EDITOR")).toBe(true);
    expect(canVisitConsolePath("/admin/leads", "EDITOR")).toBe(false);
    expect(canVisitConsolePath("/admin/reports", "EDITOR")).toBe(false);
  });

  it("limits sales advisors to pipeline work without compensation totals", () => {
    expect(canAccessSales("SALES")).toBe(true);
    expect(canViewReports("SALES")).toBe(true);
    expect(canUpload("SALES")).toBe(false);
    expect(canAccessContent("SALES")).toBe(false);
    expect(canEditDevelopers("SALES")).toBe(false);
    expect(canViewCompensation("SALES")).toBe(false);
    expect(canVisitConsolePath("/admin/leads", "SALES")).toBe(true);
    expect(canVisitConsolePath("/admin/reports", "SALES")).toBe(true);
    expect(canVisitConsolePath("/admin/properties", "SALES")).toBe(false);
  });

  it("gives administrators full sales, content, upload, and compensation access", () => {
    expect(canAccessSales("ADMIN")).toBe(true);
    expect(canAccessContent("ADMIN")).toBe(true);
    expect(canEditDevelopers("ADMIN")).toBe(true);
    expect(canViewReports("ADMIN")).toBe(true);
    expect(canViewCompensation("ADMIN")).toBe(true);
    expect(canUpload("ADMIN")).toBe(true);
    expect(canVisitConsolePath("/admin/reports", "ADMIN")).toBe(true);
    expect(canVisitConsolePath("/admin/developers", "ADMIN")).toBe(true);
  });
});
