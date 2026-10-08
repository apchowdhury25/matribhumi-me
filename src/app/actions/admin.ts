"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { canViewCompensation, requireUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import type {
  CompensationAgreementStatus,
  CompensationPaymentStatus,
  CompensationType,
  DealStage,
  DealStatus,
  DeveloperStatus,
  LeadQualification,
  LeadStatus,
  PartnershipStatus,
  ViewingStatus,
} from "@prisma/client";

async function guard() {
  const user = await requireUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function updateLeadStatus(formData: FormData) {
  await guard();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as LeadStatus;
  const notes = String(formData.get("notes") ?? "");
  const qualificationStatus = String(formData.get("qualificationStatus") || "UNQUALIFIED") as LeadQualification;
  const buyerCity = String(formData.get("buyerCity") || "") || null;
  const nationality = String(formData.get("nationality") || "") || null;
  const residenceCountry = String(formData.get("residenceCountry") || "") || null;
  const preferredMarket = String(formData.get("preferredMarket") || "") || null;
  const preferredCity = String(formData.get("preferredCity") || "") || null;
  const timeline = String(formData.get("timeline") || "") || null;
  const financingStatus = String(formData.get("financingStatus") || "") || null;
  const nextFollowUp = String(formData.get("nextFollowUpAt") || "");
  const assignedStaffId = String(formData.get("assignedStaffId") || "") || null;
  const purpose = String(formData.get("purpose") || "") || null;
  const bedroomsRaw = String(formData.get("bedrooms") || "");
  await prisma.lead.update({
    where: { id },
    data: {
      status,
      notes,
      qualificationStatus,
      buyerCity,
      nationality,
      residenceCountry,
      preferredMarket,
      preferredCity,
      timeline,
      financingStatus,
      assignedStaffId,
      purpose: purpose as never,
      bedrooms: bedroomsRaw ? Number(bedroomsRaw) : null,
      nextFollowUpAt: nextFollowUp ? new Date(nextFollowUp) : null,
    },
  });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

export async function deleteProperty(formData: FormData) {
  await guard();
  await prisma.property.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/properties");
  redirect("/admin/properties");
}

export async function upsertProperty(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name"));
  const data = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    description: String(formData.get("description")),
    type: String(formData.get("type")) as never,
    status: String(formData.get("status")) as never,
    startingPrice: String(formData.get("startingPrice") || "0"),
    bedroomsMin: Number(formData.get("bedroomsMin") || 1),
    bedroomsMax: Number(formData.get("bedroomsMax") || 1),
    bathroomsMin: Number(formData.get("bathroomsMin") || 1),
    bathroomsMax: Number(formData.get("bathroomsMax") || 1),
    areaMin: Number(formData.get("areaMin") || 0),
    areaMax: Number(formData.get("areaMax") || 0),
    heroImage: String(formData.get("heroImage") || "/media/hero-urban.jpg"),
    latitude: Number(formData.get("latitude") || 0),
    longitude: Number(formData.get("longitude") || 0),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    matribhumiOwned: formData.get("matribhumiOwned") === "on",
    developmentId: String(formData.get("developmentId")),
    locationId: String(formData.get("locationId")),
    developerId: String(formData.get("developerId")),
  };
  if (id) await prisma.property.update({ where: { id }, data });
  else await prisma.property.create({ data });
  revalidatePath("/admin/properties");
  redirect("/admin/properties");
}

export async function upsertDevelopment(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name"));
  const data = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    tagline: String(formData.get("tagline") || ""),
    description: String(formData.get("description") || ""),
    architecture: String(formData.get("architecture") || ""),
    lifestyle: String(formData.get("lifestyle") || ""),
    locationNote: String(formData.get("locationNote") || ""),
    heroImage: String(formData.get("heroImage") || "/media/hero-plaza.jpg"),
    category: String(formData.get("category") || "RESIDENTIAL") as never,
    propertyType: String(formData.get("propertyType") || "APARTMENT") as never,
    status: String(formData.get("status") || "LAUNCHED") as never,
    completion: String(formData.get("completion") || ""),
    startingPrice: String(formData.get("startingPrice") || "0"),
    stats: {},
    latitude: Number(formData.get("latitude") || 0),
    longitude: Number(formData.get("longitude") || 0),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    signature: formData.get("signature") === "on",
    matribhumiOwned: formData.get("matribhumiOwned") === "on",
    locationId: String(formData.get("locationId")),
    developerId: String(formData.get("developerId")),
  };
  if (id) await prisma.development.update({ where: { id }, data });
  else await prisma.development.create({ data });
  revalidatePath("/admin/developments");
  redirect("/admin/developments");
}

export async function upsertLocation(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name"));
  const data = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    city: String(formData.get("city") || name),
    country: String(formData.get("country") || ""),
    description: String(formData.get("description") || ""),
    overview: String(formData.get("overview") || ""),
    lifestyle: String(formData.get("lifestyle") || ""),
    connectivity: String(formData.get("connectivity") || ""),
    opportunities: String(formData.get("opportunities") || ""),
    heroImage: String(formData.get("heroImage") || "/media/location-aerial.jpg"),
    latitude: Number(formData.get("latitude") || 0),
    longitude: Number(formData.get("longitude") || 0),
  };
  if (id) await prisma.location.update({ where: { id }, data });
  else await prisma.location.create({ data });
  revalidatePath("/admin/locations");
  redirect("/admin/locations");
}

export async function upsertUnit(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const data = {
    name: String(formData.get("name")),
    type: String(formData.get("type") || ""),
    bedrooms: Number(formData.get("bedrooms") || 1),
    bathrooms: Number(formData.get("bathrooms") || 1),
    area: Number(formData.get("area") || 0),
    price: String(formData.get("price") || "0"),
    status: String(formData.get("status") || "AVAILABLE") as never,
    propertyId: String(formData.get("propertyId")),
  };
  if (id) await prisma.unit.update({ where: { id }, data });
  else await prisma.unit.create({ data });
  revalidatePath("/admin/units");
  redirect("/admin/units");
}

export async function upsertAmenity(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name"));
  const data = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    icon: String(formData.get("icon") || slugify(name)),
    category: String(formData.get("category") || "general"),
  };
  if (id) await prisma.amenity.update({ where: { id }, data });
  else await prisma.amenity.create({ data });
  revalidatePath("/admin/amenities");
  redirect("/admin/amenities");
}

export async function upsertArticle(formData: FormData) {
  const user = await guard();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title"));
  const data = {
    title,
    slug: String(formData.get("slug") || slugify(title)),
    excerpt: String(formData.get("excerpt") || ""),
    body: String(formData.get("body") || ""),
    coverImage: String(formData.get("coverImage") || "/media/about-studio.jpg"),
    category: String(formData.get("category") || "NEWS") as never,
    readingTime: Number(formData.get("readingTime") || 4),
    published: formData.get("published") === "on",
    authorId: user.id,
  };
  if (id) await prisma.newsArticle.update({ where: { id }, data });
  else await prisma.newsArticle.create({ data });
  revalidatePath("/admin/insights");
  redirect("/admin/insights");
}

export async function upsertJob(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title"));
  const data = {
    title,
    slug: String(formData.get("slug") || slugify(title)),
    department: String(formData.get("department") || ""),
    location: String(formData.get("location") || ""),
    type: String(formData.get("type") || "Full-time"),
    description: String(formData.get("description") || ""),
    requirements: String(formData.get("requirements") || ""),
    published: formData.get("published") === "on",
  };
  if (id) await prisma.job.update({ where: { id }, data });
  else await prisma.job.create({ data });
  revalidatePath("/admin/careers");
  redirect("/admin/careers");
}

export async function createMediaAsset(formData: FormData) {
  await guard();
  await prisma.mediaAsset.create({
    data: {
      url: String(formData.get("url")),
      key: String(formData.get("key")),
      filename: String(formData.get("filename")),
      mimeType: String(formData.get("mimeType")),
      size: Number(formData.get("size") || 0),
      alt: String(formData.get("alt") || ""),
    },
  });
  revalidatePath("/admin/media");
}

export async function upsertDeveloper(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name"));
  const cities = String(formData.get("cities") || "")
    .split(",")
    .map((city) => city.trim())
    .filter(Boolean);
  const data = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    description: String(formData.get("description") || ""),
    publicDescription: String(formData.get("publicDescription") || formData.get("description") || ""),
    logoUrl: String(formData.get("logoUrl") || "") || null,
    website: String(formData.get("website") || "") || null,
    country: String(formData.get("country") || "Bangladesh"),
    cities,
    contactName: String(formData.get("contactName") || "") || null,
    contactEmail: String(formData.get("contactEmail") || "") || null,
    contactPhone: String(formData.get("contactPhone") || "") || null,
    status: (String(formData.get("status") || "PROSPECT") as DeveloperStatus),
    published: formData.get("published") === "on",
    verified: formData.get("verified") === "on",
    featured: formData.get("featured") === "on",
    relationshipNotes: String(formData.get("relationshipNotes") || "") || null,
    internalNotes: String(formData.get("internalNotes") || "") || null,
  };
  if (id) await prisma.developer.update({ where: { id }, data });
  else await prisma.developer.create({ data });
  revalidatePath("/admin/developers");
  redirect("/admin/developers");
}

export async function upsertPartnership(formData: FormData) {
  const user = await guard();
  const id = String(formData.get("id") || "");
  const developerId = String(formData.get("developerId"));
  const markets = String(formData.get("markets") || "Bangladesh")
    .split(",")
    .map((market) => market.trim())
    .filter(Boolean);
  const data: {
    developerId: string;
    relationshipStatus: PartnershipStatus;
    startDate: Date | null;
    endDate: Date | null;
    markets: string[];
    active: boolean;
    publicVisibility: boolean;
    internalNotes: string | null;
    agreementReference?: string | null;
  } = {
    developerId,
    relationshipStatus: String(formData.get("relationshipStatus") || "PROSPECT") as PartnershipStatus,
    startDate: formData.get("startDate") ? new Date(String(formData.get("startDate"))) : null,
    endDate: formData.get("endDate") ? new Date(String(formData.get("endDate"))) : null,
    markets,
    active: formData.get("active") === "on",
    publicVisibility: formData.get("publicVisibility") === "on",
    internalNotes: String(formData.get("internalNotes") || "") || null,
  };
  if (canViewCompensation(user.role)) {
    data.agreementReference = String(formData.get("agreementReference") || "") || null;
  }
  if (id) await prisma.developerPartnership.update({ where: { id }, data });
  else await prisma.developerPartnership.create({ data });
  revalidatePath(`/admin/developers/${developerId}`);
}

export async function upsertDeveloperCompensation(formData: FormData) {
  const user = await guard();
  if (!canViewCompensation(user.role)) redirect("/admin/developers");
  const partnershipId = String(formData.get("partnershipId"));
  const partnership = await prisma.developerPartnership.findUnique({ where: { id: partnershipId } });
  if (!partnership) redirect("/admin/developers");
  await prisma.developerCompensation.create({
    data: {
      partnershipId,
      compensationType: String(formData.get("compensationType") || "PERCENTAGE") as CompensationType,
      agreementStatus: String(formData.get("agreementStatus") || "DRAFT") as CompensationAgreementStatus,
      agreementReference: String(formData.get("agreementReference") || "") || null,
      percentage: String(formData.get("percentage") || "") || null,
      fixedAmount: String(formData.get("fixedAmount") || "") || null,
      currency: String(formData.get("currency") || "USD"),
      paymentStatus: String(formData.get("paymentStatus") || "NOT_DUE") as CompensationPaymentStatus,
      paymentDate: formData.get("paymentDate") ? new Date(String(formData.get("paymentDate"))) : null,
      transactionReference: String(formData.get("transactionReference") || "") || null,
      internalNotes: String(formData.get("internalNotes") || "") || null,
    },
  });
  revalidatePath(`/admin/developers/${partnership.developerId}`);
}

export async function upsertDeal(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const leadId = String(formData.get("leadId"));
  const data = {
    leadId,
    developerId: String(formData.get("developerId") || "") || null,
    developmentId: String(formData.get("developmentId") || "") || null,
    propertyId: String(formData.get("propertyId") || "") || null,
    unitId: String(formData.get("unitId") || "") || null,
    assignedAdvisorId: String(formData.get("assignedAdvisorId") || "") || null,
    stage: String(formData.get("stage") || "BUYER_LEAD") as DealStage,
    status: String(formData.get("status") || "OPEN") as DealStatus,
    estimatedValue: String(formData.get("estimatedValue") || "") || null,
    currency: String(formData.get("currency") || "USD"),
    developerReferralAt: formData.get("developerReferralAt") ? new Date(String(formData.get("developerReferralAt"))) : null,
    viewingAt: formData.get("viewingAt") ? new Date(String(formData.get("viewingAt"))) : null,
    reservationAt: formData.get("reservationAt") ? new Date(String(formData.get("reservationAt"))) : null,
    contractAt: formData.get("contractAt") ? new Date(String(formData.get("contractAt"))) : null,
    completionAt: formData.get("completionAt") ? new Date(String(formData.get("completionAt"))) : null,
    internalNotes: String(formData.get("internalNotes") || "") || null,
  };
  if (id) await prisma.deal.update({ where: { id }, data });
  else await prisma.deal.create({ data });
  revalidatePath("/admin/deals");
  redirect(id ? `/admin/deals/${id}` : "/admin/deals");
}

export async function upsertDealCompensation(formData: FormData) {
  const user = await guard();
  if (!canViewCompensation(user.role)) redirect("/admin/deals");
  const dealId = String(formData.get("dealId"));
  const data = {
    compensationType: String(formData.get("compensationType") || "PERCENTAGE") as CompensationType,
    agreementStatus: String(formData.get("agreementStatus") || "DRAFT") as CompensationAgreementStatus,
    agreementReference: String(formData.get("agreementReference") || "") || null,
    percentage: String(formData.get("percentage") || "") || null,
    expectedAmount: String(formData.get("expectedAmount") || "") || null,
    currency: String(formData.get("currency") || "USD"),
    paymentStatus: String(formData.get("paymentStatus") || "NOT_DUE") as CompensationPaymentStatus,
    paymentDate: formData.get("paymentDate") ? new Date(String(formData.get("paymentDate"))) : null,
    transactionReference: String(formData.get("transactionReference") || "") || null,
    internalNotes: String(formData.get("internalNotes") || "") || null,
  };
  await prisma.dealCompensation.upsert({
    where: { dealId },
    create: { dealId, ...data },
    update: data,
  });
  revalidatePath(`/admin/deals/${dealId}`);
}

export async function updateViewing(formData: FormData) {
  await guard();
  const id = String(formData.get("id"));
  await prisma.viewingRequest.update({
    where: { id },
    data: {
      status: String(formData.get("status") || "NEW") as ViewingStatus,
      developerConfirmed: formData.get("developerConfirmed") === "on",
      notes: String(formData.get("notes") || "") || null,
      locationNote: String(formData.get("locationNote") || "") || null,
      assignedAdvisorId: String(formData.get("assignedAdvisorId") || "") || null,
    },
  });
  revalidatePath("/admin/viewings");
}
