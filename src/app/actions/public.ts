"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { advisorySchema, leadSchema, viewingSchema, contactSchema, applicationSchema, waitlistSchema, brochureSchema } from "@/lib/validations";
import { getClientIp } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";
import { advisorRequestEmail, brochureEmail, sendMail, viewingRequestEmail } from "@/lib/mail";
import { parseBudgetNumber } from "@/lib/matching";
import { findCountry } from "@/lib/countries";
import { siteConfig } from "@/config/site";
import { openDealForLead } from "@/lib/deals";

type State = { ok: boolean; error: string };

function tooMany(): State {
  return { ok: false, error: "Please wait a moment before sending another request." };
}

async function gated(key: string) {
  const ip = getClientIp(await headers());
  return rateLimit(`${key}:${ip}`, 6, 60_000);
}

export async function submitLead(_prev: State, formData: FormData): Promise<State> {
  if (!(await gated("lead")).ok) return tooMany();
  if (String(formData.get("website") ?? "")) return { ok: true, error: "" };

  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    propertyId: formData.get("propertyId") || undefined,
    budget: formData.get("budget") || undefined,
    contactMethod: formData.get("contactMethod") || "EMAIL",
    message: formData.get("message"),
    inquiryType: formData.get("inquiryType") || "SALES",
    consent: formData.get("consent") === "true",
  });
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const property = parsed.data.propertyId
    ? await prisma.property.findUnique({
        where: { id: parsed.data.propertyId },
        select: { id: true, developerId: true, developmentId: true },
      })
    : null;
  const lead = await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      country: parsed.data.country,
      budget: parsed.data.budget,
      contactMethod: parsed.data.contactMethod,
      message: parsed.data.message,
      inquiryType: parsed.data.inquiryType,
      propertyId: parsed.data.propertyId || null,
      developerId: property?.developerId ?? null,
      developmentId: property?.developmentId ?? null,
      source: "WEBSITE",
    },
  });
  if (parsed.data.inquiryType === "SALES") {
    await openDealForLead({
      leadId: lead.id,
      propertyId: property?.id,
      developerId: property?.developerId,
      developmentId: property?.developmentId,
    });
  }
  await sendMail({
    to: siteConfig.salesEmail,
    replyTo: parsed.data.email,
    subject: `Inquiry from ${parsed.data.name}`,
    text: parsed.data.message,
  });
  return { ok: true, error: "" };
}

export async function submitAdvisory(_prev: State, formData: FormData): Promise<State> {
  if (!(await gated("advisory")).ok) return tooMany();
  if (String(formData.get("website") ?? "")) return { ok: true, error: "" };

  const parsed = advisorySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    residenceCountry: formData.get("residenceCountry"),
    preferredMarket: formData.get("preferredMarket"),
    preferredCity: formData.get("preferredCity"),
    propertyType: formData.get("propertyType"),
    budget: formData.get("budget"),
    currency: formData.get("currency") || "BDT",
    bedrooms: formData.get("bedrooms"),
    purpose: formData.get("purpose"),
    timeline: formData.get("timeline"),
    contactMethod: formData.get("contactMethod") || "WHATSAPP",
    message: formData.get("message"),
    developerId: formData.get("developerId") || undefined,
    developmentId: formData.get("developmentId") || undefined,
    financingStatus: formData.get("financingStatus") || undefined,
    consent: formData.get("consent") === "true",
  });
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };

  const developerId = parsed.data.developerId || null;
  const developmentId = parsed.data.developmentId || null;
  if (developerId) {
    const developer = await prisma.developer.findUnique({ where: { id: developerId }, select: { id: true, published: true } });
    if (!developer?.published) return { ok: false, error: "Please check the form and try again." };
  }
  if (developmentId) {
    const development = await prisma.development.findUnique({ where: { id: developmentId }, select: { id: true, published: true } });
    if (!development?.published) return { ok: false, error: "Please check the form and try again." };
  }

  const budgetMax = parseBudgetNumber(parsed.data.budget);
  const lead = await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      country: parsed.data.residenceCountry,
      residenceCountry: parsed.data.residenceCountry,
      preferredMarket: parsed.data.preferredMarket,
      preferredCity: parsed.data.preferredCity,
      propertyType: parsed.data.propertyType,
      budget: parsed.data.budget,
      budgetMax,
      currency: parsed.data.currency,
      bedrooms: parsed.data.bedrooms,
      purpose: parsed.data.purpose,
      timeline: parsed.data.timeline,
      financingStatus: parsed.data.financingStatus || null,
      contactMethod: parsed.data.contactMethod,
      message: parsed.data.message,
      inquiryType: "SALES",
      source: "ADVISORY",
      qualificationStatus: "QUALIFYING",
      developerId,
      developmentId,
    },
  });
  await openDealForLead({
    leadId: lead.id,
    developerId,
    developmentId,
  });

  const letter = advisorRequestEmail({
    name: parsed.data.name,
    preferredCity: parsed.data.preferredCity,
    preferredMarket: parsed.data.preferredMarket,
    propertyType: parsed.data.propertyType,
    budget: parsed.data.budget,
    currency: parsed.data.currency,
  });
  await sendMail({
    to: parsed.data.email,
    replyTo: siteConfig.salesEmail,
    subject: letter.subject,
    text: letter.text,
  });
  await sendMail({
    to: siteConfig.salesEmail,
    replyTo: parsed.data.email,
    subject: `Advisory request: ${parsed.data.name}`,
    text: `${parsed.data.name} (${parsed.data.email}, ${parsed.data.phone}) asked for property advice.\nResidence: ${parsed.data.residenceCountry}\nLooking in: ${parsed.data.preferredCity}, ${parsed.data.preferredMarket}\nType: ${parsed.data.propertyType}\nBudget: ${parsed.data.budget} ${parsed.data.currency}\nBedrooms: ${parsed.data.bedrooms}\nPurpose: ${parsed.data.purpose}\nTimeline: ${parsed.data.timeline}\n\n${parsed.data.message}`,
  });
  return { ok: true, error: "" };
}

export async function submitContact(_prev: State, formData: FormData): Promise<State> {
  if (!(await gated("contact")).ok) return tooMany();
  if (String(formData.get("website") ?? "")) return { ok: true, error: "" };
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    propertyId: formData.get("propertyId") || undefined,
    budget: formData.get("budget") || undefined,
    contactMethod: formData.get("contactMethod") || "EMAIL",
    message: formData.get("message"),
    inquiryType: formData.get("inquiryType") || "GENERAL",
    consent: formData.get("consent") === "true",
  });
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  const property = parsed.data.propertyId
    ? await prisma.property.findUnique({
        where: { id: parsed.data.propertyId },
        select: { id: true, developerId: true, developmentId: true },
      })
    : null;
  await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      country: parsed.data.country,
      budget: parsed.data.budget,
      contactMethod: parsed.data.contactMethod,
      message: parsed.data.message,
      inquiryType: parsed.data.inquiryType,
      propertyId: parsed.data.propertyId || null,
      developerId: property?.developerId ?? null,
      developmentId: property?.developmentId ?? null,
      source: "WEBSITE",
    },
  });
  return { ok: true, error: "" };
}

export async function submitViewing(_prev: State, formData: FormData): Promise<State> {
  if (!(await gated("viewing")).ok) return tooMany();
  if (String(formData.get("website") ?? "")) return { ok: true, error: "" };
  const parsed = viewingSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    propertyId: formData.get("propertyId"),
    preferredDate: formData.get("preferredDate"),
    preferredTime: formData.get("preferredTime"),
    viewingType: formData.get("viewingType") || "IN_PERSON",
    contactMethod: formData.get("contactMethod") || "EMAIL",
    message: formData.get("message") || undefined,
    consent: formData.get("consent") === "true",
  });
  if (!parsed.success) return { ok: false, error: "Please check the viewing details and try again." };
  const property = await prisma.property.findUnique({
    where: { id: parsed.data.propertyId },
    select: { id: true, name: true, developerId: true, developmentId: true },
  });
  if (!property) return { ok: false, error: "Please check the viewing details and try again." };
  let lead = await prisma.lead.findFirst({
    where: { email: parsed.data.email },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });
  if (!lead) {
    lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        country: "Not specified",
        propertyId: property.id,
        developerId: property.developerId,
        developmentId: property.developmentId,
        contactMethod: parsed.data.contactMethod,
        message: parsed.data.message || `Viewing request for ${property.name}`,
        inquiryType: "SALES",
        source: "WEBSITE",
        status: "VIEWING_SCHEDULED",
      },
      select: { id: true },
    });
  }
  const deal = await openDealForLead({
    leadId: lead.id,
    propertyId: property.id,
    developerId: property.developerId,
    developmentId: property.developmentId,
  });
  await prisma.viewingRequest.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      propertyId: parsed.data.propertyId,
      preferredDate: new Date(parsed.data.preferredDate),
      preferredTime: parsed.data.preferredTime,
      viewingType: parsed.data.viewingType ?? "IN_PERSON",
      contactMethod: parsed.data.contactMethod,
      message: parsed.data.message,
      developerId: property.developerId,
      leadId: lead.id,
      dealId: deal.id,
      status: "REQUESTED",
    },
  });
  await prisma.lead.update({
    where: { id: lead.id },
    data: { status: "VIEWING_SCHEDULED" },
  });
  await prisma.deal.updateMany({
    where: { id: deal.id, status: "OPEN" },
    data: { stage: "VIEWING", viewingAt: new Date() },
  });
  const letter = viewingRequestEmail({ name: parsed.data.name, propertyName: property.name });
  await sendMail({
    to: parsed.data.email,
    replyTo: siteConfig.salesEmail,
    subject: letter.subject,
    text: letter.text,
  });
  await sendMail({
    to: siteConfig.salesEmail,
    replyTo: parsed.data.email,
    subject: `Viewing request: ${parsed.data.name}`,
    text: `${parsed.data.name} requested a ${parsed.data.viewingType ?? "IN_PERSON"} viewing of ${property.name} on ${parsed.data.preferredDate} at ${parsed.data.preferredTime}.`,
  });
  return { ok: true, error: "" };
}

function optionalProject(formData: FormData) {
  const project = String(formData.get("project") ?? "").trim();
  return project || undefined;
}

export async function submitWaitlist(_prev: State, formData: FormData): Promise<State> {
  if (!(await gated("waitlist")).ok) return tooMany();
  if (String(formData.get("website") ?? "")) return { ok: true, error: "" };

  const parsed = waitlistSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    countryId: formData.get("countryId"),
    phone: formData.get("phone"),
    interest: formData.get("interest"),
    project: optionalProject(formData),
    consent: formData.get("consent") === "true",
  });
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };

  const country = findCountry(parsed.data.countryId);
  if (!country) return { ok: false, error: "Please choose a country code." };
  const phone = `${country.dial} ${parsed.data.phone.replace(/\s+/g, " ").trim()}`;

  await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone,
      country: country.country,
      contactMethod: "EMAIL",
      message: `Pre-launch waitlist. Primary interest: ${parsed.data.interest}.${parsed.data.project ? ` Development: ${parsed.data.project}.` : ""}`,
      inquiryType: "SALES",
      source: "WAITLIST",
      purpose: parsed.data.interest === "Investment" ? "INVESTMENT" : parsed.data.interest === "Retirement" ? "PRIMARY_RESIDENCE" : "SECOND_HOME",
    },
  });

  await sendMail({
    to: siteConfig.salesEmail,
    replyTo: parsed.data.email,
    subject: `Waitlist: ${parsed.data.name}`,
    text: `${parsed.data.name} (${parsed.data.email}, ${phone}, ${country.country}) joined the waitlist.\nInterest: ${parsed.data.interest}\nDevelopment: ${parsed.data.project ?? "Selected developer projects"}`,
  });

  return { ok: true, error: "" };
}

export async function submitBrochure(_prev: State, formData: FormData): Promise<State> {
  if (!(await gated("brochure")).ok) return tooMany();
  if (String(formData.get("website") ?? "")) return { ok: true, error: "" };

  const parsed = brochureSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    project: optionalProject(formData),
    consent: formData.get("consent") === "true",
  });
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };

  const letter = brochureEmail(parsed.data.name);
  await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: "Not provided",
      country: "Not specified",
      contactMethod: "EMAIL",
      message: `Brochure download.${parsed.data.project ? ` Development: ${parsed.data.project}.` : ""} ${letter.downloadUrl}`,
      inquiryType: "SALES",
      source: "BROCHURE",
    },
  });

  await sendMail({
    to: parsed.data.email,
    replyTo: siteConfig.email,
    subject: letter.subject,
    text: letter.text,
    html: letter.html,
  });
  await sendMail({
    to: siteConfig.salesEmail,
    replyTo: parsed.data.email,
    subject: `Brochure: ${parsed.data.name}`,
    text: `${parsed.data.name} (${parsed.data.email}) downloaded the brochure.${parsed.data.project ? ` Development: ${parsed.data.project}.` : ""}`,
  });

  return { ok: true, error: "" };
}

export async function submitApplication(_prev: State, formData: FormData): Promise<State> {
  if (!(await gated("job")).ok) return tooMany();
  if (String(formData.get("website") ?? "")) return { ok: true, error: "" };
  const parsed = applicationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    jobId: formData.get("jobId"),
    coverLetter: formData.get("coverLetter"),
    resumeUrl: formData.get("resumeUrl"),
  });
  if (!parsed.success) return { ok: false, error: "Please complete the application." };
  await prisma.jobApplication.create({
    data: parsed.data,
  });
  return { ok: true, error: "" };
}
