import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";
import { openDealForLead } from "@/lib/deals";

export async function POST(request: NextRequest) {
  if (!rateLimit(`api-lead:${getClientIp(request.headers)}`).ok) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
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
  return NextResponse.json({ id: lead.id });
}
