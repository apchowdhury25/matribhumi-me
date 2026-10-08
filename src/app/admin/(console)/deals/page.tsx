import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { upsertDeal } from "@/app/actions/admin";
import { requireSalesUser } from "@/lib/admin-access";
import { formatDate, statusLabel } from "@/lib/format";
import { dealStageValues, pipelineLabel } from "@/lib/pipeline";

export const dynamic = "force-dynamic";
const statuses = ["OPEN", "WON", "LOST", "CANCELLED"];

export default async function AdminDealsPage() {
  await requireSalesUser();
  const [deals, leads, developers, properties, staff] = await Promise.all([
    prisma.deal.findMany({
      orderBy: { updatedAt: "desc" },
      include: { lead: true, developer: true, property: true },
    }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.developer.findMany({ orderBy: { name: "asc" } }),
    prisma.property.findMany({ orderBy: { name: "asc" } }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="font-display text-4xl">Deals</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Track buyer introductions through to completion. Buyer purchase funds stay with the developer or seller. MatriBhumi compensation is recorded separately by an administrator.
        </p>
        <table className="mt-8 w-full text-left text-sm">
          <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
            <tr>
              <th className="py-2">Buyer</th>
              <th>Stage</th>
              <th>Status</th>
              <th>Property</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} className="border-t border-charcoal/10">
                <td className="py-3">
                  <Link href={`/admin/deals/${deal.id}`}>{deal.lead.name}</Link>
                </td>
                <td>{statusLabel(deal.stage)}</td>
                <td>{statusLabel(deal.status)}</td>
                <td>{deal.property?.name ?? "—"}</td>
                <td>{formatDate(deal.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form action={upsertDeal} className="grid gap-3 self-start border border-charcoal/10 bg-paper p-5">
        <h2 className="font-display text-2xl">Open deal</h2>
        <select name="leadId" required className="h-11 border border-charcoal/15 px-3 text-sm">
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>{lead.name}</option>
          ))}
        </select>
        <select name="developerId" className="h-11 border border-charcoal/15 px-3 text-sm">
          <option value="">Developer</option>
          {developers.map((developer) => (
            <option key={developer.id} value={developer.id}>{developer.name}</option>
          ))}
        </select>
        <select name="propertyId" className="h-11 border border-charcoal/15 px-3 text-sm">
          <option value="">Property</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>{property.name}</option>
          ))}
        </select>
        <select name="assignedAdvisorId" className="h-11 border border-charcoal/15 px-3 text-sm">
          <option value="">Advisor</option>
          {staff.map((person) => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
        <select name="stage" defaultValue="BUYER_LEAD" className="h-11 border border-charcoal/15 px-3 text-sm">
          {dealStageValues.map((stage) => (
            <option key={stage} value={stage}>{pipelineLabel(stage)}</option>
          ))}
        </select>
        <select name="status" defaultValue="OPEN" className="h-11 border border-charcoal/15 px-3 text-sm">
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <input name="estimatedValue" placeholder="Estimated transaction value" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="currency" defaultValue="USD" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Create</button>
      </form>
    </div>
  );
}
