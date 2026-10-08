import { describe, expect, it } from "vitest";
import {
  businessModel,
  developerFeeLabel,
  developerFeeTerms,
} from "@/config/businessModel";
import { canVisitConsolePath, navForRole } from "@/lib/admin-nav";
import {
  canAccessContent,
  canAccessSales,
  canEditDevelopers,
  canViewCompensation,
  canViewReports,
} from "@/lib/auth-roles";
import { leadWhere, summarizeCrmReports } from "@/lib/crm";
import {
  normalizeDealStage,
  pipelineColumnForDeal,
  pipelineColumns,
  pipelineLabel,
  reachedPropertySelected,
  statusForStage,
} from "@/lib/pipeline";

describe("staff roles", () => {
  it("gives administrators full sales, content, and confidential access", () => {
    expect(canAccessSales("ADMIN")).toBe(true);
    expect(canAccessContent("ADMIN")).toBe(true);
    expect(canEditDevelopers("ADMIN")).toBe(true);
    expect(canViewReports("ADMIN")).toBe(true);
    expect(canViewCompensation("ADMIN")).toBe(true);
  });

  it("limits editors to content and developer profiles", () => {
    expect(canAccessContent("EDITOR")).toBe(true);
    expect(canEditDevelopers("EDITOR")).toBe(true);
    expect(canAccessSales("EDITOR")).toBe(false);
    expect(canViewReports("EDITOR")).toBe(false);
    expect(canViewCompensation("EDITOR")).toBe(false);
  });

  it("limits sales advisors to leads, pipeline, and reports without compensation", () => {
    expect(canAccessSales("SALES")).toBe(true);
    expect(canViewReports("SALES")).toBe(true);
    expect(canAccessContent("SALES")).toBe(false);
    expect(canEditDevelopers("SALES")).toBe(false);
    expect(canViewCompensation("SALES")).toBe(false);
  });

  it("hides sales routes from editors and content routes from sales", () => {
    const editor = navForRole("EDITOR").map((link) => link.href);
    const sales = navForRole("SALES").map((link) => link.href);
    expect(editor).toContain("/admin/properties");
    expect(editor).toContain("/admin/developers");
    expect(editor).not.toContain("/admin/leads");
    expect(editor).not.toContain("/admin/pipeline");
    expect(editor).not.toContain("/admin/reports");
    expect(sales).toContain("/admin/leads");
    expect(sales).toContain("/admin/pipeline");
    expect(sales).toContain("/admin/follow-ups");
    expect(sales).toContain("/admin/reports");
    expect(sales).toContain("/admin/developers");
    expect(sales).not.toContain("/admin/properties");
    expect(canVisitConsolePath("/admin/leads", "EDITOR")).toBe(false);
    expect(canVisitConsolePath("/admin/properties", "SALES")).toBe(false);
    expect(canVisitConsolePath("/admin/reports", "SALES")).toBe(true);
    expect(canVisitConsolePath("/admin/reports", "EDITOR")).toBe(false);
    expect(canVisitConsolePath("/admin/developers", "SALES")).toBe(true);
  });
});

describe("developer fee terminology", () => {
  it("uses a configurable term instead of hard-coded commission", () => {
    expect(developerFeeTerms).toEqual([
      "developer compensation",
      "referral fee",
      "consultant fee",
      "service fee",
    ]);
    expect(businessModel.developerFeeTerm).toBe("developer compensation");
    expect(developerFeeLabel()).toBe("developer compensation");
    expect(developerFeeLabel({ capitalize: true })).toBe("Developer compensation");
    expect(developerFeeLabel()).not.toMatch(/commission/i);
  });
});

describe("transaction pipeline", () => {
  it("covers the advisory workflow including lost or withdrawn", () => {
    expect(pipelineColumns.map((column) => column.label)).toEqual([
      "New lead",
      "Contacted",
      "Qualified",
      "Shortlisted",
      "Developer introduced",
      "Viewing",
      "Property selected",
      "Reservation",
      "Contract",
      "Completion",
      "Closed",
      "Lost / withdrawn",
    ]);
  });

  it("maps legacy qualification and withdrawn stages onto the board", () => {
    expect(normalizeDealStage("QUALIFICATION")).toBe("QUALIFIED");
    expect(normalizeDealStage("QUALIFIED")).toBe("QUALIFIED");
    expect(normalizeDealStage("WITHDRAWN")).toBe("LOST");
    expect(pipelineColumnForDeal({ stage: "VIEWING", status: "OPEN" })).toBe("VIEWING");
    expect(pipelineColumnForDeal({ stage: "BUYER_LEAD", status: "LOST" })).toBe("LOST");
    expect(pipelineColumnForDeal({ stage: "CONTACTED", status: "CANCELLED" })).toBe("LOST");
    expect(pipelineLabel("DEVELOPER_INTRODUCTION")).toBe("Developer introduced");
  });

  it("updates deal status when a stage is closed, lost, or withdrawn", () => {
    expect(statusForStage("CLOSED", "OPEN")).toBe("WON");
    expect(statusForStage("LOST", "OPEN")).toBe("LOST");
    expect(statusForStage("WITHDRAWN", "OPEN")).toBe("CANCELLED");
    expect(statusForStage("CONTACTED", "WON")).toBe("OPEN");
    expect(reachedPropertySelected("RESERVATION", "OPEN")).toBe(true);
    expect(reachedPropertySelected("VIEWING", "OPEN")).toBe(false);
  });
});

describe("lead filters", () => {
  it("combines search, country, market, and budget as independent clauses", () => {
    const where = leadWhere({
      q: "Asha",
      country: "United Kingdom",
      market: "Bangladesh",
      status: "QUALIFIED",
      budget: "250000",
    });
    expect(where.AND).toHaveLength(5);
  });
});

describe("internal reports", () => {
  it("computes conversion and estimated value without treating them as guaranteed revenue", () => {
    const reports = summarizeCrmReports({
      leads: [
        { country: "Bangladesh", residenceCountry: "United Kingdom", source: "ADVISORY", developer: { name: "Example Homes" }, property: { name: "Heights" } },
        { country: "Bangladesh", source: "WEBSITE" },
      ],
      deals: [
        { stage: "CLOSED", status: "WON", estimatedValue: 200000 },
        { stage: "VIEWING", status: "OPEN", estimatedValue: 150000 },
        { stage: "LOST", status: "LOST", estimatedValue: 90000 },
      ],
      viewingCount: 4,
      fees: [
        { amount: 5000, status: "EXPECTED" },
        { amount: 2000, status: "PAID" },
      ],
      includeCompensation: true,
    });
    expect(reports.leadsByCountry[0]?.label).toBe("United Kingdom");
    expect(reports.leadsBySource.find((row) => row.label === "ADVISORY")?.count).toBe(1);
    expect(reports.leadsByDeveloper[0]).toEqual({ label: "Example Homes", count: 1 });
    expect(reports.closedCount).toBe(1);
    expect(reports.dealCount).toBe(3);
    expect(reports.conversionRate).toBeCloseTo(1 / 3);
    expect(reports.estimatedTransactionValue).toBe(440000);
    expect(reports.viewingToTransaction).toBe(0.25);
    expect(reports.compensationDue).toBe(5000);
    expect(reports.compensationReceived).toBe(2000);
  });

  it("omits compensation totals unless an administrator requests them", () => {
    const reports = summarizeCrmReports({
      leads: [],
      deals: [{ stage: "CLOSED", status: "WON", estimatedValue: 100 }],
      viewingCount: 0,
      fees: [{ amount: 40, status: "PAID" }],
      includeCompensation: false,
    });
    expect(reports.compensationDue).toBeNull();
    expect(reports.compensationReceived).toBeNull();
  });
});
