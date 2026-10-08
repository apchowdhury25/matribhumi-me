import { describe, expect, it } from "vitest";
import {
  advisorFollowUpMessage,
  buyerJourneyFeeMessage,
  propertySourceDisclosure,
} from "@/config/businessModel";
import { buyerCtas } from "@/config/ctas";
import { howItWorksSteps } from "@/config/site";
import { advisorRequestEmail } from "@/lib/mail";
import { rankPropertyMatches, scorePropertyMatch } from "@/lib/matching";
import { advisorySchema } from "@/lib/validations";

const listing = {
  id: "p1",
  name: "Heights Residences",
  type: "APARTMENT",
  status: "LAUNCHED",
  startingPrice: 180000,
  bedroomsMin: 2,
  bedroomsMax: 3,
  developerId: "dev-1",
  developmentId: "devt-1",
  location: { name: "Bashundhara", city: "Dhaka", country: "Bangladesh" },
};

describe("buyer journey copy", () => {
  it("keeps the configurable public fee message exact", () => {
    expect(buyerJourneyFeeMessage).toBe(
      "MatriBhumi does not charge buyers a property brokerage or consultation fee. Where applicable, MatriBhumi is compensated by participating developers under separate agreements.",
    );
  });

  it("states advisor follow-up and source disclosure without return promises", () => {
    expect(advisorFollowUpMessage).toBe(
      "Your MatriBhumi property advisor will review your requirements and contact you.",
    );
    expect(propertySourceDisclosure).toContain("provided by or sourced from the relevant developer");
    expect(propertySourceDisclosure.toLowerCase()).not.toMatch(/yield|appreciation|return/);
  });

  it("uses advisor CTAs instead of a buy-now primary action", () => {
    expect(buyerCtas.talkToAdvisor).toBe("Talk to a Property Advisor");
    expect(buyerCtas.findMyProperty).toBe("Find My Property");
    expect(buyerCtas.requestDetails).toBe("Request Property Details");
    expect(buyerCtas.arrangeViewing).toBe("Arrange a Viewing");
    expect(Object.values(buyerCtas).join(" ")).not.toMatch(/buy now/i);
  });

  it("describes an eight-step buyer journey", () => {
    expect(howItWorksSteps).toHaveLength(8);
    expect(howItWorksSteps[2]?.body).toBe(advisorFollowUpMessage);
    expect(howItWorksSteps[6]?.body).toContain("MatriBhumi is not the seller");
  });
});

describe("advisorySchema", () => {
  const valid = {
    name: "Asha Rahman",
    email: "asha@example.com",
    phone: "+447700900123",
    residenceCountry: "United Kingdom",
    preferredMarket: "Bangladesh",
    preferredCity: "Dhaka",
    propertyType: "APARTMENT",
    budget: "250000",
    currency: "USD",
    bedrooms: 3,
    purpose: "PRIMARY_RESIDENCE",
    timeline: "3–6 months",
    contactMethod: "WHATSAPP",
    message: "Looking for a family apartment near schools.",
    consent: true,
  };

  it("accepts a complete requirements brief without sensitive documents", () => {
    const parsed = advisorySchema.safeParse(valid);
    expect(parsed.success).toBe(true);
  });

  it("rejects missing consent or a short message", () => {
    expect(advisorySchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(advisorySchema.safeParse({ ...valid, message: "Hi" }).success).toBe(false);
  });

  it("keeps developer, project, and financing optional", () => {
    const parsed = advisorySchema.safeParse({
      ...valid,
      developerId: undefined,
      developmentId: undefined,
      financingStatus: "Bank finance",
    });
    expect(parsed.success).toBe(true);
  });
});

describe("property matching", () => {
  it("scores location, type, price, bedrooms, and availability", () => {
    const match = scorePropertyMatch(
      {
        preferredCity: "Dhaka",
        preferredMarket: "Bangladesh",
        propertyType: "APARTMENT",
        budget: "200000",
        bedrooms: 3,
      },
      listing,
    );
    expect(match.percent).toBe(100);
    expect(match.reasons.join(" ")).toMatch(/city|market|type|price|Bedroom|sold out/i);
  });

  it("ranks a closer listing above a mismatch", () => {
    const ranked = rankPropertyMatches(
      { preferredCity: "Dhaka", propertyType: "APARTMENT", budget: "200000" },
      [
        { ...listing, id: "far", type: "VILLA", location: { name: "Agrabad", city: "Chattogram", country: "Bangladesh" } },
        listing,
      ],
    );
    expect(ranked[0]?.property.id).toBe("p1");
    expect(ranked[0]?.match.percent).toBeGreaterThan(ranked[1]?.match.percent ?? 0);
  });
});

describe("advisor request email", () => {
  it("confirms human review and the buyer-fee message", () => {
    const letter = advisorRequestEmail({
      name: "Asha Rahman",
      preferredCity: "Dhaka",
      preferredMarket: "Bangladesh",
      propertyType: "APARTMENT",
      budget: "250000",
      currency: "USD",
    });
    expect(letter.text).toContain("human review");
    expect(letter.text).toContain(buyerJourneyFeeMessage);
    expect(letter.text.toLowerCase()).not.toContain("ai recommendation");
  });
});
