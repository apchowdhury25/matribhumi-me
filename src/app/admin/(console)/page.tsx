import Link from "next/link";
import { getAdminMetrics } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const metrics = await getAdminMetrics();
  const recent = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { property: true },
  });

  const cards = [
    ["Properties", metrics.properties, "/admin/properties"],
    ["Developments", metrics.developments, "/admin/developments"],
    ["Units", metrics.units, "/admin/units"],
    ["Leads", metrics.leads, "/admin/leads"],
    ["New inquiries", metrics.inquiries, "/admin/leads"],
    ["Viewing requests", metrics.viewings, "/admin/viewings"],
    ["Published articles", metrics.articles, "/admin/insights"],
  ] as const;

  return (
    <div>
      <h1 className="font-display text-4xl">Dashboard</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        {cards.map(([label, value, href]) => (
          <Link key={label} href={href} className="border border-charcoal/10 bg-paper p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-earth">{label}</p>
            <p className="font-mono mt-3 text-3xl">{value}</p>
          </Link>
        ))}
      </div>
      <h2 className="font-display mt-12 text-3xl">Recent leads</h2>
      <table className="mt-4 w-full text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Status</th>
            <th className="py-2">When</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((lead) => (
            <tr key={lead.id} className="border-t border-charcoal/10">
              <td className="py-2">
                <Link href={`/admin/leads/${lead.id}`}>{lead.name}</Link>
              </td>
              <td className="py-2">{lead.email}</td>
              <td className="py-2">{lead.status}</td>
              <td className="py-2">{formatDate(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
