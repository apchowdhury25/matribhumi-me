/**
 * Central commercial settings. Public copy and admin UI read these values
 * instead of repeating buyer-fee numbers in pages.
 *
 * Change buyerPaysMatriBhumi / buyerFee here if the business model changes.
 * Developer compensation terms stay in the database and are admin-only.
 */
export const businessModel = {
  buyerPaysMatriBhumi: false,
  buyerFee: 0,
  buyerFeeCurrency: "USD",
  developerCompensation: true,
} as const;

export type BusinessModel = typeof businessModel;

export const buyerFeeStatement = businessModel.buyerPaysMatriBhumi
  ? `Buyers pay MatriBhumi a fee of ${businessModel.buyerFee} ${businessModel.buyerFeeCurrency}.`
  : "You pay MatriBhumi nothing for our property advisory and transaction-coordination service. Where applicable, participating developers compensate MatriBhumi under separate commercial agreements.";

export const buyerFeeNote =
  "Developer arrangements vary by project. The buyer's purchase agreement is with the property developer/seller. MatriBhumi does not receive the buyer's property purchase funds.";

export function buyerPaysNothing() {
  return !businessModel.buyerPaysMatriBhumi && businessModel.buyerFee === 0;
}
