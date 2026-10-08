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

/** Canonical public buyer-fee disclosure. Edit here to change site-wide wording. */
export const buyerFeeDisclosure =
  "MatriBhumi does not charge buyers a property brokerage or consultation fee for its core property advisory service. Where applicable, MatriBhumi may receive compensation from participating developers under separate commercial agreements.";

export const buyerFeeStatement = businessModel.buyerPaysMatriBhumi
  ? `Buyers pay MatriBhumi a fee of ${businessModel.buyerFee} ${businessModel.buyerFeeCurrency}.`
  : buyerFeeDisclosure;

export const buyerFeeNote =
  "Developer commercial arrangements can differ. The property purchase agreement is between the buyer and the relevant developer/seller. MatriBhumi does not receive or hold the buyer’s property purchase funds. Buyers may ask MatriBhumi about relevant developer relationships.";

export const buyerJourneyFeeMessage = buyerFeeStatement;

/** Marketing headline. Pair it with buyerFeeDisclosure; do not claim independence from developers. */
export const buyerFeeHeadline = "No MatriBhumi brokerage or consultation fee for buyers.";

export const buyerFeeMarketing = buyerFeeDisclosure;

export const advisorFollowUpMessage =
  "Your MatriBhumi property advisor will review your requirements and contact you.";

export const propertySourceDisclosure =
  "Prices, availability, specifications, unit availability, completion schedules, service charges, taxes, title information and other property details may change. Buyers should confirm important information with the relevant developer/seller and qualified professionals before making a purchase decision. Property information on this website is not a guarantee.";

export function buyerPaysNothing() {
  return !businessModel.buyerPaysMatriBhumi && businessModel.buyerFee === 0;
}

export function developerFeeLabel(options?: { capitalize?: boolean; plural?: boolean }) {
  const term = businessModel.developerFeeTerm;
  const withPlural = options?.plural && !term.endsWith("s") ? `${term}s` : term;
  if (!options?.capitalize) return withPlural;
  return withPlural.charAt(0).toUpperCase() + withPlural.slice(1);
}
