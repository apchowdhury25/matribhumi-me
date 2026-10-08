import { describe, expect, it } from "vitest";
import {
  buyerFeeDisclosure,
  buyerFeeHeadline,
  buyerFeeMarketing,
  buyerJourneyFeeMessage,
  propertySourceDisclosure,
} from "@/config/businessModel";
import {
  bangladeshLegalTopics,
  compensationTransparency,
  counselReview,
  howWeWork,
  legalNav,
  legalPages,
  noInvestmentPromises,
  positioning,
  professionalAdvice,
  propertyDisclaimer,
  transactionFlows,
} from "@/config/legal";
import { footerNav } from "@/config/site";

const BUYER_FEE =
  "MatriBhumi does not charge buyers a property brokerage or consultation fee for its core property advisory service. Where applicable, MatriBhumi may receive compensation from participating developers under separate commercial agreements.";

describe("canonical buyer-fee disclosure", () => {
  it("uses the same configurable sentence across public copy", () => {
    expect(buyerFeeDisclosure).toBe(BUYER_FEE);
    expect(buyerJourneyFeeMessage).toBe(BUYER_FEE);
    expect(buyerFeeMarketing).toBe(BUYER_FEE);
    expect(compensationTransparency.disclosure).toBe(BUYER_FEE);
    expect(legalPages.buyerFee.sections.flatMap((section) => section.paragraphs)).toContain(BUYER_FEE);
  });

  it("does not claim a universal developer fee or buyer-paid commission", () => {
    expect(BUYER_FEE.toLowerCase()).not.toContain("%");
    expect(buyerFeeHeadline.toLowerCase()).not.toMatch(/commission-free|financially independent/);
    expect(compensationTransparency.points).toEqual([
      "Buyers do not pay MatriBhumi’s core advisory fee.",
      "Participating developers may compensate MatriBhumi.",
      "Developer arrangements can differ.",
      "Buyers may ask MatriBhumi about relevant developer relationships.",
    ]);
  });
});

describe("how we work and transaction flows", () => {
  it("states the Bangladesh advisory role and purchase agreement", () => {
    expect(howWeWork.summary).toBe(
      "MatriBhumi helps buyers find and evaluate properties from participating developers in Bangladesh and coordinates the buyer’s interaction with the developer.",
    );
    expect(howWeWork.purchaseAgreement).toBe(
      "The property purchase agreement is between the buyer and the relevant developer/seller.",
    );
    expect(positioning.summary).toContain("Bangladesh");
    expect(positioning.licence).toContain("does not claim");
  });

  it("keeps the buyer purchase separate from developer compensation", () => {
    expect(transactionFlows.buyerPurchase.steps).toEqual(["Buyer", "Property purchase", "Developer/Seller"]);
    expect(transactionFlows.developerCommercial.steps).toEqual(["Developer", "Commercial agreement", "MatriBhumi"]);
    expect(transactionFlows.funds).toContain("does not receive or hold the buyer’s property purchase funds");
    expect(transactionFlows.developerCommercial.note).toContain("not a fee paid by the buyer");
  });
});

describe("property and professional-advice disclaimers", () => {
  it("warns that listing details may change and are not a guarantee", () => {
    expect(propertyDisclaimer.body).toContain("Prices, availability, specifications, unit availability");
    expect(propertyDisclaimer.body).toContain("not a guarantee");
    expect(propertySourceDisclosure).toBe(propertyDisclaimer.body);
  });

  it("avoids investment promises and recommends independent advice", () => {
    expect(noInvestmentPromises.body.toLowerCase()).toMatch(/guaranteed appreciation/);
    expect(professionalAdvice.body).toContain("legal advice");
    expect(professionalAdvice.body).toContain("tax advice");
    expect(professionalAdvice.body).toContain("financial advice");
    expect(professionalAdvice.body).toContain("financing advice");
  });
});

describe("Bangladesh legal pages", () => {
  it("exposes seven counsel-structured legal pages plus the Bangladesh legal area", () => {
    expect(Object.keys(legalPages)).toEqual([
      "terms",
      "privacy",
      "cookies",
      "property",
      "buyerFee",
      "developers",
      "disclaimer",
    ]);
    expect(legalNav.map((item) => item.href)).toEqual([
      "/privacy",
      "/terms",
      "/cookies",
      "/disclaimer",
      "/disclaimer/property",
      "/disclaimer/buyer-fee",
      "/disclaimer/developers",
      "/legal/bangladesh",
    ]);
    expect(footerNav.legal).toEqual(legalNav);
  });

  it("marks copy as pending Bangladesh counsel review and not legal advice", () => {
    expect(counselReview.status).toBe("pending_review");
    expect(counselReview.jurisdiction).toBe("Bangladesh");
    expect(counselReview.notice).toContain("not legal advice");
    expect(counselReview.notice).toContain("has not been reviewed or approved");
    expect(bangladeshLegalTopics.every((topic) => topic.status === "pending_counsel")).toBe(true);
  });

  it("does not invent licences or other-country legal frameworks", () => {
    const blob = JSON.stringify({ legalPages, bangladeshLegalTopics, positioning, counselReview });
    expect(blob).not.toMatch(/UAE|United Arab Emirates|Malaysia|Malaysian/i);
    expect(blob).not.toMatch(/RAJUK|licence no\.|license no\.|registration no\./i);
    expect(positioning.licence).toContain("No licence number");
  });
});
