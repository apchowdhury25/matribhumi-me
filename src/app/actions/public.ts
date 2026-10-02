"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { leadSchema, viewingSchema, contactSchema, applicationSchema, waitlistSchema, brochureSchema } from "@/lib/validations";
import { getClientIp } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";
import { brochureEmail, sendMail } from "@/lib/mail";
import { findCountry } from "@/lib/countries";
import { siteConfig } from "@/config/site";

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
    },
  });
  await sendMail({
    to: process.env.SMTP_FROM || "hello@matribhumi.me",
    subject: `Inquiry from ${parsed.data.name}`,
    text: parsed.data.message,
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
    contactMethod: formData.get("contactMethod") || "EMAIL",
    message: formData.get("message") || undefined,
    consent: formData.get("consent") === "true",
  });
  if (!parsed.success) return { ok: false, error: "Please check the viewing details and try again." };
  await prisma.viewingRequest.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      propertyId: parsed.data.propertyId,
      preferredDate: new Date(parsed.data.preferredDate),
      preferredTime: parsed.data.preferredTime,
      contactMethod: parsed.data.contactMethod,
      message: parsed.data.message,
    },
  });
  await prisma.lead.updateMany({
    where: { email: parsed.data.email, propertyId: parsed.data.propertyId },
    data: { status: "VIEWING_SCHEDULED" },
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
    },
  });

  await sendMail({
    to: siteConfig.salesEmail,
    replyTo: parsed.data.email,
    subject: `Waitlist: ${parsed.data.name}`,
    text: `${parsed.data.name} (${parsed.data.email}, ${phone}, ${country.country}) joined the pre-launch waitlist.\nInterest: ${parsed.data.interest}\nDevelopment: ${parsed.data.project ?? "General portfolio"}`,
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
      message: `Pre-launch brochure download.${parsed.data.project ? ` Development: ${parsed.data.project}.` : ""} ${letter.downloadUrl}`,
      inquiryType: "SALES",
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
    text: `${parsed.data.name} (${parsed.data.email}) downloaded the pre-launch brochure.${parsed.data.project ? ` Development: ${parsed.data.project}.` : ""}`,
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
