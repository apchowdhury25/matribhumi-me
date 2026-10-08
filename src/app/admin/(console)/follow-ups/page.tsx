import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { addFollowUp, completeFollowUp } from "@/app/actions/admin";
import { requireSalesUser } from "@/lib/admin-access";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function FollowUpsPage() {
  await requireSalesUser();
  const [items, leads, staff] = await Promise.all([
    prisma.followUp.findMany({
      orderBy: [{ completed: "asc" }, { dueAt: "asc" }],
      include: { lead: true, developer: true, assignedAdvisor: true },
    }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 80 }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="font-display text-4xl">Follow-ups</h1>
        <ul className="mt-8 grid gap-4">
          {items.map((item) => (
            <li key={item.id} className="border border-charcoal/10 bg-paper p-5">
              <p className="font-medium">{item.task}</p>
              <p className="text-sm text-muted">
                Due {formatDate(item.dueAt)} · {item.assignedAdvisor?.name ?? "Unassigned"} · {item.completed ? "Completed" : "Open"}
              </p>
              {item.lead ? <p className="mt-2 text-sm"><Link href={`/admin/leads/${item.lead.id}`}>{item.lead.name}</Link></p> : null}
              {item.developer ? <p className="text-sm"><Link href={`/admin/developers/${item.developer.id}`}>{item.developer.name}</Link></p> : null}
              {item.note ? <p className="mt-2 text-sm text-muted">{item.note}</p> : null}
              <form action={completeFollowUp} className="mt-3">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="completed" value={item.completed ? "false" : "true"} />
                <button className="text-[11px] uppercase tracking-[0.16em] text-earth">
                  {item.completed ? "Reopen" : "Mark completed"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
      <form action={addFollowUp} className="grid gap-3 self-start border border-charcoal/10 bg-paper p-5">
        <h2 className="font-display text-2xl">New follow-up</h2>
        <select name="leadId" className="h-11 border border-charcoal/15 px-3 text-sm">
          <option value="">Lead</option>
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>{lead.name}</option>
          ))}
        </select>
        <select name="assignedAdvisorId" className="h-11 border border-charcoal/15 px-3 text-sm">
          <option value="">Advisor</option>
          {staff.map((person) => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
        <input name="dueAt" type="date" required className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="task" required placeholder="Task" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <textarea name="note" placeholder="Note" className="border border-charcoal/15 p-3 text-sm" />
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Create</button>
      </form>
    </div>
  );
}
