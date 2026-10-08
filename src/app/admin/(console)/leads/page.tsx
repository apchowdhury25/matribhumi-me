import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { leadWhere } from "@/lib/crm";
import { requireSalesUser } from "@/lib/admin-access";
import { formatDate, formatPrice, statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

function one(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireSalesUser();
  const raw = await searchParams;
  const filters = {
    q: one(raw.q),
    country: one(raw.country),
    market: one(raw.market),
    developerId: one(raw.developerId),
    status: one(raw.status),
    advisorId: one(raw.advisorId),
    propertyId: one(raw.propertyId),
    dateFrom: one(raw.dateFrom),
    dateTo: one(raw.dateTo),
    budget: one(raw.budget),
  };
  const [leads, developers, properties, staff] = await Promise.all([
    prisma.lead.findMany({
      where: leadWhere(filters),
      orderBy: { createdAt: "desc" },
      include: { property: true, developer: true, assignedStaff: true },
    }),
    prisma.developer.findMany({ orderBy: { name: "asc" } }),
    prisma.property.findMany({ orderBy: { name: "asc" } }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);
  const statuses = ["NEW", "CONTACTED", "QUALIFIED", "VIEWING_SCHEDULED", "NEGOTIATION", "CONVERTED", "CLOSED"];

  return (
    <div>
      <h1 className="font-display text-4xl">Leads</h1>
      <form className="mt-8 grid gap-3 border border-charcoal/10 bg-paper p-5 md:grid-cols-3">
        <input name="q" defaultValue={filters.q} placeholder="Search name, email, phone" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="country" defaultValue={filters.country} placeholder="Country" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="market" defaultValue={filters.market} placeholder="Market" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <select name="developerId" defaultValue={filters.developerId} className="h-11 border border-charcoal/15 px-3 text-sm">
          <option value="">Developer</option>
          {developers.map((developer) => (
            <option key={developer.id} value={developer.id}>{developer.name}</option>
          ))}
        </select>
        <select name="status" defaultValue={filters.status} className="h-11 border border-charcoal/15 px-3 text-sm">
          <option value="">Status</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <select name="advisorId" defaultValue={filters.advisorId} className="h-11 border border-charcoal/15 px-3 text-sm">
          <option value="">Advisor</option>
          {staff.map((person) => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
        <select name="propertyId" defaultValue={filters.propertyId} className="h-11 border border-charcoal/15 px-3 text-sm">
          <option value="">Property</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>{property.name}</option>
          ))}
        </select>
        <input name="budget" defaultValue={filters.budget} placeholder="Budget" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="dateFrom" type="date" defaultValue={filters.dateFrom} className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="dateTo" type="date" defaultValue={filters.dateTo} className="h-11 border border-charcoal/15 px-3 text-sm" />
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Filter</button>
      </form>
      <table className="mt-8 w-full text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
          <tr>
            <th className="py-2">Name</th>
            <th>Country</th>
            <th>Market</th>
            <th>Developer</th>
            <th>Property</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Advisor</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-charcoal/10">
              <td className="py-3"><Link href={`/admin/leads/${lead.id}`}>{lead.name}</Link></td>
              <td>{lead.residenceCountry || lead.country}</td>
              <td>{lead.preferredMarket ?? "—"}</td>
              <td>{lead.developer?.name ?? "—"}</td>
              <td>{lead.property?.name ?? "—"}</td>
              <td>{lead.budgetMax ? formatPrice(lead.budgetMax, lead.currency) : lead.budget ?? "—"}</td>
              <td>{statusLabel(lead.status)}</td>
              <td>{lead.assignedStaff?.name ?? "—"}</td>
              <td>{formatDate(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
