import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { pipelineColumnForDeal, pipelineColumns, reachedPropertySelected } from "@/lib/pipeline";

export function dayBounds(date = new Date()) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function asNumber(value?: string | number | null) {
  if (value == null || value === "") return null;
  const n = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

export type LeadFilterInput = {
  q?: string;
  country?: string;
  market?: string;
  developerId?: string;
  status?: string;
  advisorId?: string;
  propertyId?: string;
  dateFrom?: string;
  dateTo?: string;
  budget?: string;
};

export function leadWhere(filters: LeadFilterInput): Prisma.LeadWhereInput {
  const clauses: Prisma.LeadWhereInput[] = [];
  const q = filters.q?.trim();
  if (q) {
    clauses.push({
      OR: [
        { name: { contains: q } },
        { email: { contains: q } },
        { phone: { contains: q } },
        { message: { contains: q } },
      ],
    });
  }
  if (filters.country) {
    clauses.push({
      OR: [
        { country: { contains: filters.country } },
        { residenceCountry: { contains: filters.country } },
      ],
    });
  }
  if (filters.market) clauses.push({ preferredMarket: { contains: filters.market } });
  if (filters.developerId) clauses.push({ developerId: filters.developerId });
  if (filters.status) clauses.push({ status: filters.status as Prisma.LeadWhereInput["status"] });
  if (filters.advisorId) clauses.push({ assignedStaffId: filters.advisorId });
  if (filters.propertyId) clauses.push({ propertyId: filters.propertyId });
  if (filters.dateFrom || filters.dateTo) {
    const createdAt: Prisma.DateTimeFilter = {};
    if (filters.dateFrom) createdAt.gte = new Date(filters.dateFrom);
    if (filters.dateTo) {
      const end = new Date(filters.dateTo);
      end.setHours(23, 59, 59, 999);
      createdAt.lte = end;
    }
    clauses.push({ createdAt });
  }
  const budget = asNumber(filters.budget);
  if (budget != null) {
    clauses.push({
      OR: [{ budget: { contains: String(budget) } }, { budgetMax: { lte: budget * 1.1 } }],
    });
  }
  if (!clauses.length) return {};
  return { AND: clauses };
}

export async function getTodayCrmMetrics() {
  const { start, end } = dayBounds();
  const now = new Date();
  const [
    newBuyerLeads,
    qualifiedLeads,
    viewingRequests,
    developerIntroductions,
    activeTransactions,
    closedTransactions,
    followUpsDue,
    developerAttention,
  ] = await Promise.all([
    prisma.lead.count({
      where: { createdAt: { gte: start, lte: end }, inquiryType: { in: ["SALES", "GENERAL"] } },
    }),
    prisma.lead.count({
      where: {
        OR: [{ status: "QUALIFIED" }, { qualificationStatus: "QUALIFIED" }],
      },
    }),
    prisma.viewingRequest.count({ where: { createdAt: { gte: start, lte: end } } }),
    prisma.developerIntroduction.count({ where: { introducedAt: { gte: start, lte: end } } }),
    prisma.deal.count({ where: { status: "OPEN" } }),
    prisma.deal.count({
      where: {
        OR: [
          { stage: "CLOSED", updatedAt: { gte: start, lte: end } },
          { status: "WON", updatedAt: { gte: start, lte: end } },
        ],
      },
    }),
    prisma.followUp.count({ where: { completed: false, dueAt: { lte: end } } }),
    prisma.developer.count({
      where: {
        OR: [
          { status: { in: ["PROSPECT", "PAUSED"] } },
          { partnerships: { none: {} } },
          { partnerships: { some: { relationshipStatus: { in: ["PROSPECT", "UNDER_REVIEW"] } } } },
        ],
      },
    }),
  ]);

  return {
    newBuyerLeads,
    qualifiedLeads,
    viewingRequests,
    developerIntroductions,
    activeTransactions,
    closedTransactions,
    followUpsDue,
    developerAttention,
    generatedAt: now,
  };
}

export async function getPipelineBoard() {
  const deals = await prisma.deal.findMany({
    orderBy: { updatedAt: "desc" },
    include: { lead: true, developer: true, property: true, assignedAdvisor: true },
  });
  const columns = pipelineColumns.map((column) => ({
    ...column,
    deals: deals.filter((deal) => pipelineColumnForDeal(deal) === column.key),
  }));
  return { columns, total: deals.length };
}

export type ReportLead = {
  country: string | null;
  residenceCountry?: string | null;
  source: string;
  developer?: { name: string } | null;
  property?: { name: string } | null;
};

export type ReportDeal = {
  stage: string;
  status: string;
  estimatedValue?: { toString(): string } | number | string | null;
};

export type ReportFee = {
  amount: number;
  status: string;
};

function tally(rows: { key: string; count?: number }[]) {
  const map = new Map<string, number>();
  for (const row of rows) map.set(row.key, (map.get(row.key) ?? 0) + (row.count ?? 1));
  return [...map.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
}

function numericValue(value?: { toString(): string } | number | string | null) {
  if (value == null || value === "") return 0;
  const n = typeof value === "number" ? value : Number(value.toString());
  return Number.isFinite(n) ? n : 0;
}

export function summarizeCrmReports(input: {
  leads: ReportLead[];
  deals: ReportDeal[];
  viewingCount: number;
  fees?: ReportFee[];
  includeCompensation?: boolean;
}) {
  const { leads, deals, viewingCount } = input;
  const leadsByCountry = tally(
    leads.map((lead) => ({ key: lead.residenceCountry || lead.country || "Unspecified" })),
  );
  const leadsBySource = tally(leads.map((lead) => ({ key: lead.source })));
  const leadsByDeveloper = tally(
    leads.filter((lead) => lead.developer).map((lead) => ({ key: lead.developer!.name })),
  );
  const leadsByProperty = tally(
    leads.filter((lead) => lead.property).map((lead) => ({ key: lead.property!.name })),
  );
  const pipeline = pipelineColumns.map((column) => ({
    label: column.label,
    count: deals.filter((deal) => pipelineColumnForDeal(deal) === column.key).length,
  }));
  const closed = deals.filter((deal) => deal.stage === "CLOSED" || deal.status === "WON");
  const estimatedTransactionValue = deals.reduce((sum, deal) => sum + numericValue(deal.estimatedValue), 0);
  const closedValue = closed.reduce((sum, deal) => sum + numericValue(deal.estimatedValue), 0);
  const conversionRate = deals.length ? closed.length / deals.length : 0;
  const selected = deals.filter((deal) => reachedPropertySelected(deal.stage, deal.status)).length;
  const viewingToTransaction = viewingCount ? selected / viewingCount : 0;
  const fees = input.includeCompensation ? input.fees ?? [] : [];
  const compensationDue = fees
    .filter((row) => row.status === "EXPECTED" || row.status === "INVOICED" || row.status === "NOT_DUE")
    .reduce((sum, row) => sum + (Number.isFinite(row.amount) ? row.amount : 0), 0);
  const compensationReceived = fees
    .filter((row) => row.status === "PAID")
    .reduce((sum, row) => sum + (Number.isFinite(row.amount) ? row.amount : 0), 0);

  return {
    leadsByCountry,
    leadsBySource,
    leadsByDeveloper,
    leadsByProperty,
    pipeline,
    closedCount: closed.length,
    dealCount: deals.length,
    estimatedTransactionValue,
    closedValue,
    conversionRate,
    viewingToTransaction,
    viewingCount,
    compensationDue: input.includeCompensation ? compensationDue : null,
    compensationReceived: input.includeCompensation ? compensationReceived : null,
  };
}

export async function getCrmReports(options?: { includeCompensation?: boolean }) {
  const includeCompensation = Boolean(options?.includeCompensation);
  const [leads, deals, viewingCount, dealFees, developerFees] = await Promise.all([
    prisma.lead.findMany({
      select: {
        country: true,
        residenceCountry: true,
        source: true,
        developerId: true,
        propertyId: true,
        developer: { select: { name: true } },
        property: { select: { name: true } },
      },
    }),
    prisma.deal.findMany({
      select: {
        stage: true,
        status: true,
        estimatedValue: true,
        currency: true,
        viewingAt: true,
      },
    }),
    prisma.viewingRequest.count(),
    includeCompensation
      ? prisma.dealCompensation.findMany({
          select: { expectedAmount: true, paymentStatus: true, currency: true },
        })
      : Promise.resolve([]),
    includeCompensation
      ? prisma.developerCompensation.findMany({
          select: { fixedAmount: true, paymentStatus: true, currency: true },
        })
      : Promise.resolve([]),
  ]);

  const fees = includeCompensation
    ? [
        ...dealFees.map((row) => ({
          amount: row.expectedAmount ? Number(row.expectedAmount.toString()) : 0,
          status: row.paymentStatus,
        })),
        ...developerFees.map((row) => ({
          amount: row.fixedAmount ? Number(row.fixedAmount.toString()) : 0,
          status: row.paymentStatus,
        })),
      ]
    : [];

  return summarizeCrmReports({
    leads,
    deals,
    viewingCount,
    fees,
    includeCompensation,
  });
}

export function attentionReasons(developer: {
  status: string;
  partnerships: { relationshipStatus: string }[];
}) {
  const reasons: string[] = [];
  if (developer.status === "PROSPECT") reasons.push("Developer is still a prospect.");
  if (developer.status === "PAUSED") reasons.push("Relationship is paused.");
  if (!developer.partnerships.length) reasons.push("No partnership record.");
  if (developer.partnerships.some((item) => item.relationshipStatus === "PROSPECT" || item.relationshipStatus === "UNDER_REVIEW")) {
    reasons.push("Partnership needs review.");
  }
  return reasons;
}
