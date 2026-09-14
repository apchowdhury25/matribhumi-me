import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, include: { property: true } });
  return (
    <div>
      <h1 className="font-display text-4xl">Leads</h1>
      <table className="mt-8 w-full text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
          <tr><th className="py-2">Name</th><th>Email</th><th>Type</th><th>Status</th><th>When</th></tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-charcoal/10">
              <td className="py-3"><Link href={`/admin/leads/${lead.id}`}>{lead.name}</Link></td>
              <td>{lead.email}</td>
              <td>{statusLabel(lead.inquiryType)}</td>
              <td>{statusLabel(lead.status)}</td>
              <td>{formatDate(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
