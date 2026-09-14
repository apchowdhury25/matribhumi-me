import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateLeadStatus } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

const statuses = ["NEW","CONTACTED","QUALIFIED","VIEWING_SCHEDULED","NEGOTIATION","CONVERTED","CLOSED"];

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id }, include: { property: true } });
  if (!lead) notFound();
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl">{lead.name}</h1>
      <p className="mt-2 text-sm text-muted">{lead.email} · {lead.phone} · {lead.country}</p>
      <p className="mt-6 leading-7">{lead.message}</p>
      {lead.property ? <p className="mt-4 text-sm text-earth">Property: {lead.property.name}</p> : null}
      <form action={updateLeadStatus} className="mt-8 grid gap-4">
        <input type="hidden" name="id" value={lead.id} />
        <select name="status" defaultValue={lead.status} className="h-11 border border-charcoal/15 bg-paper px-3">
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <textarea name="notes" defaultValue={lead.notes ?? ""} rows={4} className="border border-charcoal/15 bg-paper p-3" />
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Update</button>
      </form>
    </div>
  );
}
