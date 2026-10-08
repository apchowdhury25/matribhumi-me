/** Residence phone dial codes for buyers living abroad. These are not public property markets. */
export const countryCodes = [
  { id: "BD", dial: "+880", country: "Bangladesh" },
  { id: "AE", dial: "+971", country: "United Arab Emirates" },
  { id: "GB", dial: "+44", country: "United Kingdom" },
  { id: "US", dial: "+1", country: "United States" },
  { id: "CA", dial: "+1", country: "Canada" },
  { id: "SG", dial: "+65", country: "Singapore" },
  { id: "MY", dial: "+60", country: "Malaysia" },
  { id: "AU", dial: "+61", country: "Australia" },
  { id: "SA", dial: "+966", country: "Saudi Arabia" },
  { id: "QA", dial: "+974", country: "Qatar" },
  { id: "KW", dial: "+965", country: "Kuwait" },
  { id: "BH", dial: "+973", country: "Bahrain" },
  { id: "OM", dial: "+968", country: "Oman" },
  { id: "IT", dial: "+39", country: "Italy" },
  { id: "FR", dial: "+33", country: "France" },
  { id: "DE", dial: "+49", country: "Germany" },
  { id: "JP", dial: "+81", country: "Japan" },
  { id: "KR", dial: "+82", country: "South Korea" },
] as const;

export type CountryCodeId = (typeof countryCodes)[number]["id"];

export function findCountry(id: string) {
  return countryCodes.find((entry) => entry.id === id);
}
