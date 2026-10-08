/**
 * Central commercial settings. Public copy and admin UI read these values
 * instead of repeating buyer-fee numbers in pages.
 *
 * Change buyerPaysMatriBhumi / buyerFee here if the business model changes.
 * Developer compensation terms stay in the database and are admin-only.
 */
export const developerFeeTerms = [
  "developer compensation",
  "referral fee",
  "consultant fee",
  "service fee",
] as const;

export type DeveloperFeeTerm = (typeof developerFeeTerms)[number];

export const businessModel = {
  buyerPaysMatriBhumi: false,
  buyerFee: 0,
  buyerFeeCurrency: "USD",
  developerCompensation: true,
  /** Internal CRM label. Change per contract language; do not hard-code "commission". */
  developerFeeTerm: "developer compensation" as DeveloperFeeTerm,
} as const;

export type BusinessModel = typeof businessModel;

export const buyerFeeStatement = businessModel.buyerPaysMatriBhumi
  ? `Buyers pay MatriBhumi a fee of ${businessModel.buyerFee} ${businessModel.buyerFeeCurrency}.`
  : "You pay MatriBhumi nothing for our property advisory and transaction-coordination service. Where applicable, participating developers compensate MatriBhumi under separate commercial agreements.";

export const buyerFeeNote =
  "Developer arrangements vary by project. The buyer's purchase agreement is with the property developer/seller. MatriBhumi does not receive the buyer's property purchase funds.";

export const buyerJourneyFeeMessage =
  "MatriBhumi does not charge buyers a property brokerage or consultation fee. Where applicable, MatriBhumi is compensated by participating developers under separate agreements.";

export const advisorFollowUpMessage =
  "Your MatriBhumi property advisor will review your requirements and contact you.";

export const propertySourceDisclosure =
  "Property information is provided by or sourced from the relevant developer. Availability, pricing, specifications and completion dates should be confirmed directly before making a purchase decision.";

export function buyerPaysNothing() {
  return !businessModel.buyerPaysMatriBhumi && businessModel.buyerFee === 0;
}

export function developerFeeLabel(options?: { capitalize?: boolean; plural?: boolean }) {
  const term = businessModel.developerFeeTerm;
  const withPlural = options?.plural && !term.endsWith("s") ? `${term}s` : term;
  if (!options?.capitalize) return withPlural;
  return withPlural.charAt(0).toUpperCase() + withPlural.slice(1);
}
