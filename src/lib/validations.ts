import { z } from "zod";

export const propertyTypes = [
  "APARTMENT",
  "VILLA",
  "TOWNHOUSE",
  "PENTHOUSE",
  "COMMERCIAL",
  "HOSPITALITY",
  "MIXED_USE",
  "PLOT",
] as const;

export const leadPurposes = [
  "PRIMARY_RESIDENCE",
  "SECOND_HOME",
  "RELOCATION",
  "INVESTMENT",
  "OTHER",
] as const;

export const purchaseTimelines = [
  "Immediately",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "12+ months",
  "Exploring",
] as const;

export const financingOptions = [
  "Cash",
  "Bank finance",
  "Undecided",
] as const;

export const currencies = ["USD", "BDT", "GBP", "EUR"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(6).max(40),
  country: z.string().trim().min(2).max(80),
  propertyId: z.string().optional(),
  budget: z.string().trim().max(80).optional(),
  contactMethod: z.enum(["EMAIL", "PHONE", "WHATSAPP"]).default("EMAIL"),
  message: z.string().trim().min(10).max(4000),
  inquiryType: z
    .enum(["GENERAL", "SALES", "PARTNERSHIP", "MEDIA", "CAREER"])
    .default("SALES"),
  consent: z.literal(true, { error: "Consent is required." }),
  website: z.string().max(0).optional(),
});

export const advisorySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(6).max(40),
  residenceCountry: z.string().trim().min(2).max(80),
  preferredMarket: z.string().trim().min(2).max(80),
  preferredCity: z.string().trim().min(2).max(80),
  propertyType: z.enum(propertyTypes),
  budget: z.string().trim().min(1).max(80),
  currency: z.enum(currencies).default("USD"),
  bedrooms: z.coerce.number().int().min(0).max(20),
  purpose: z.enum(leadPurposes),
  timeline: z.enum(purchaseTimelines),
  contactMethod: z.enum(["EMAIL", "PHONE", "WHATSAPP"]).default("WHATSAPP"),
  message: z.string().trim().min(10).max(4000),
  developerId: z.string().optional(),
  developmentId: z.string().optional(),
  financingStatus: z.enum(financingOptions).optional(),
  consent: z.literal(true, { error: "Consent is required." }),
  website: z.string().max(0).optional(),
});

export const viewingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(6).max(40),
  propertyId: z.string().min(1),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  viewingType: z.enum(["IN_PERSON", "VIRTUAL", "SITE_VISIT"]).optional(),
  contactMethod: z.enum(["EMAIL", "PHONE", "WHATSAPP"]).default("EMAIL"),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { error: "Consent is required." }),
  website: z.string().max(0).optional(),
});

export const contactSchema = leadSchema.extend({
  propertyId: z.string().optional(),
});

export const applicationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(6).max(40),
  jobId: z.string().min(1),
  coverLetter: z.string().trim().min(40).max(6000),
  resumeUrl: z.string().min(1),
  website: z.string().max(0).optional(),
});

export const waitlistInterests = ["Holiday Home", "Retirement", "Investment"] as const;

export const waitlistSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  countryId: z.string().trim().min(2).max(8),
  phone: z.string().trim().min(6).max(24),
  interest: z.enum(waitlistInterests),
  project: z.string().trim().max(160).optional(),
  consent: z.literal(true, { error: "Consent is required." }),
  website: z.string().max(0).optional(),
});

export const brochureSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  project: z.string().trim().max(160).optional(),
  consent: z.literal(true, { error: "Consent is required." }),
  website: z.string().max(0).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(120),
});

export const propertyFilterSchema = z.object({
  q: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  location: z.string().optional(),
  developer: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  completionStatus: z.string().optional(),
  featured: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  minArea: z.coerce.number().optional(),
  maxArea: z.coerce.number().optional(),
  completion: z.string().optional(),
  amenity: z.string().optional(),
  sort: z.string().optional(),
  view: z.enum(["grid", "list"]).optional(),
  page: z.coerce.number().min(1).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type AdvisoryInput = z.infer<typeof advisorySchema>;
export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type BrochureInput = z.infer<typeof brochureSchema>;
export type ViewingInput = z.infer<typeof viewingSchema>;
export type PropertyFilters = z.infer<typeof propertyFilterSchema>;
