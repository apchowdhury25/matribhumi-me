import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateLeadStatus, upsertDeal } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "VIEWING_SCHEDULED", "NEGOTIATION", "CONVERTED", "CLOSED"];
const qualifications = ["UNQUALIFIED", "QUALIFYING", "QUALIFIED", "DISQUALIFIED"];
const purposes = ["PRIMARY_RESIDENCE", "SECOND_HOME", "RELOCATION", "INVESTMENT", "OTHER"];

function dateValue(value?: Date | null) {
  if (!value) return "";
  return value.toISOString().slice(0, 10);
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lead, staff] = await Promise.all([
    prisma.lead.findUnique({
      where: { id },
      include: { property: true, developer: true, development: true, assignedStaff: true, deals: true },
    }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!lead) notFound();
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl">{lead.name}</h1>
      <p className="mt-2 text-sm text-muted">{lead.email} · {lead.phone} · {lead.country}</p>
      <p className="mt-6 leading-7">{lead.message}</p>
      {lead.property ? <p className="mt-4 text-sm text-earth">Property: {lead.property.name}</p> : null}
      {lead.developer ? <p className="text-sm text-earth">Developer referral: {lead.developer.name}</p> : null}
      {lead.deals.length ? (
        <ul className="mt-4 text-sm">
          {lead.deals.map((deal) => (
            <li key={deal.id}>
              <Link href={`/admin/deals/${deal.id}`}>Deal {deal.stage} · {deal.status}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <form action={upsertDeal} className="mt-4">
          <input type="hidden" name="leadId" value={lead.id} />
          <input type="hidden" name="developerId" value={lead.developerId ?? ""} />
          <input type="hidden" name="developmentId" value={lead.developmentId ?? ""} />
          <input type="hidden" name="propertyId" value={lead.propertyId ?? ""} />
          <button className="text-[11px] uppercase tracking-[0.16em] text-earth">Open deal</button>
        </form>
      )}
      <form action={updateLeadStatus} className="mt-8 grid gap-4">
        <input type="hidden" name="id" value={lead.id} />
        <select name="status" defaultValue={lead.status} className="h-11 border border-charcoal/15 bg-paper px-3">
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select name="qualificationStatus" defaultValue={lead.qualificationStatus} className="h-11 border border-charcoal/15 bg-paper px-3">
          {qualifications.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select name="purpose" defaultValue={lead.purpose ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3">
          <option value="">Purpose</option>
          {purposes.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select name="assignedStaffId" defaultValue={lead.assignedStaffId ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3">
          <option value="">Assigned staff</option>
          {staff.map((person) => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
        <input name="buyerCity" defaultValue={lead.buyerCity ?? ""} placeholder="Buyer city" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="nationality" defaultValue={lead.nationality ?? ""} placeholder="Nationality (optional)" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="residenceCountry" defaultValue={lead.residenceCountry ?? ""} placeholder="Residence country" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="preferredMarket" defaultValue={lead.preferredMarket ?? ""} placeholder="Preferred market" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="preferredCity" defaultValue={lead.preferredCity ?? ""} placeholder="Preferred city" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="timeline" defaultValue={lead.timeline ?? ""} placeholder="Timeline" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="financingStatus" defaultValue={lead.financingStatus ?? ""} placeholder="Financing status" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="bedrooms" defaultValue={lead.bedrooms ?? ""} placeholder="Bedrooms" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="nextFollowUpAt" type="date" defaultValue={dateValue(lead.nextFollowUpAt)} className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <textarea name="notes" defaultValue={lead.notes ?? ""} rows={4} className="border border-charcoal/15 bg-paper p-3" />
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Update</button>
      </form>
    </div>
  );
}
