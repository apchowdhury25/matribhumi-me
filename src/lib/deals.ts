import { prisma } from "@/lib/prisma";

export async function openDealForLead(options: {
  leadId: string;
  propertyId?: string | null;
  developerId?: string | null;
  developmentId?: string | null;
}) {
  const existing = await prisma.deal.findFirst({
    where: { leadId: options.leadId, status: "OPEN" },
    select: { id: true },
  });
  if (existing) return existing;

  return prisma.deal.create({
    data: {
      leadId: options.leadId,
      propertyId: options.propertyId || null,
      developerId: options.developerId || null,
      developmentId: options.developmentId || null,
      stage: "BUYER_LEAD",
      status: "OPEN",
    },
    select: { id: true },
  });
}
