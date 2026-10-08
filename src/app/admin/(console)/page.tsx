import Link from "next/link";
import { getAdminMetrics } from "@/lib/data";
import { getTodayCrmMetrics } from "@/lib/crm";
import { prisma } from "@/lib/prisma";
import { requireUser, canAccessContent, canAccessSales } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const user = await requireUser();
  if (!user) redirect("/admin/login");
  const showSales = canAccessSales(user.role);
  const showContent = canAccessContent(user.role);
  const [metrics, today, recent, dueFollowUps, attention] = await Promise.all([
    showContent ? getAdminMetrics() : Promise.resolve(null),
    showSales ? getTodayCrmMetrics() : Promise.resolve(null),
    showSales
      ? prisma.lead.findMany({
          orderBy: { createdAt: "desc" },
          take: 8,
          include: { property: true, assignedStaff: true },
        })
      : Promise.resolve([]),
    showSales
      ? prisma.followUp.findMany({
          where: { completed: false },
          orderBy: { dueAt: "asc" },
          take: 6,
          include: { lead: true, assignedAdvisor: true },
        })
      : Promise.resolve([]),
    showSales
      ? prisma.developer.findMany({
          where: {
            OR: [
              { status: { in: ["PROSPECT", "PAUSED"] } },
              { partnerships: { none: {} } },
              { partnerships: { some: { relationshipStatus: { in: ["PROSPECT", "UNDER_REVIEW"] } } } },
            ],
          },
          take: 6,
          orderBy: { updatedAt: "desc" },
        })
      : Promise.resolve([]),
  ]);

  const todayCards = today
    ? [
        ["New buyer leads", today.newBuyerLeads, "/admin/leads?dateFrom=" + today.generatedAt.toISOString().slice(0, 10)],
        ["Qualified leads", today.qualifiedLeads, "/admin/leads?status=QUALIFIED"],
        ["Viewing requests", today.viewingRequests, "/admin/viewings"],
        ["Developer introductions", today.developerIntroductions, "/admin/pipeline"],
        ["Active transactions", today.activeTransactions, "/admin/pipeline"],
        ["Closed transactions", today.closedTransactions, "/admin/reports"],
        ["Follow-ups due", today.followUpsDue, "/admin/follow-ups"],
        ["Developer relationships requiring attention", today.developerAttention, "/admin/developers"],
      ] as const
    : [];

  const contentCards = metrics
    ? [
        ["Properties", metrics.properties, "/admin/properties"],
        ["Developments", metrics.developments, "/admin/developments"],
        ["Developers", metrics.developers, "/admin/developers"],
        ["Units", metrics.units, "/admin/units"],
        ["Published articles", metrics.articles, "/admin/insights"],
      ] as const
    : [];

  return (
    <div>
      <h1 className="font-display text-4xl">Dashboard</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Advisory CRM for buyer coordination and developer relationships. Figures are an internal snapshot, not a revenue forecast.
      </p>

      {todayCards.length ? (
        <>
          <h2 className="font-display mt-10 text-3xl">Today</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            {todayCards.map(([label, value, href]) => (
              <Link key={label} href={href} className="border border-charcoal/10 bg-paper p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-earth">{label}</p>
                <p className="font-mono mt-3 text-3xl">{value}</p>
              </Link>
            ))}
          </div>
        </>
      ) : null}

      {contentCards.length ? (
        <>
          <h2 className="font-display mt-12 text-3xl">Catalogue</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            {contentCards.map(([label, value, href]) => (
              <Link key={label} href={href} className="border border-charcoal/10 bg-paper p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-earth">{label}</p>
                <p className="font-mono mt-3 text-3xl">{value}</p>
              </Link>
            ))}
          </div>
        </>
      ) : null}

      {showSales ? (
        <>
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

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <section>
              <h2 className="font-display text-3xl">Follow-ups due</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {dueFollowUps.length ? dueFollowUps.map((item) => (
                  <li key={item.id}>
                    <Link href={item.leadId ? `/admin/leads/${item.leadId}` : "/admin/follow-ups"}>
                      {item.task} · {formatDate(item.dueAt)}
                    </Link>
                    <p className="text-muted">{item.lead?.name ?? "Unlinked"} · {item.assignedAdvisor?.name ?? "Unassigned"}</p>
                  </li>
                )) : <li className="text-muted">No open follow-ups.</li>}
              </ul>
            </section>
            <section>
              <h2 className="font-display text-3xl">Developer relationships requiring attention</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {attention.length ? attention.map((developer) => (
                  <li key={developer.id}>
                    <Link href={`/admin/developers/${developer.id}`}>{developer.name}</Link>
                    <p className="text-muted">{developer.status}</p>
                  </li>
                )) : <li className="text-muted">No developers need review.</li>}
              </ul>
            </section>
          </div>
        </>
      ) : null}
    </div>
  );
}
