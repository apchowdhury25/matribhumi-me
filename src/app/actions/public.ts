"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { leadSchema, viewingSchema, contactSchema, applicationSchema } from "@/lib/validations";
import { getClientIp } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";
import { sendMail } from "@/lib/mail";

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
