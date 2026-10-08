import { prisma } from "@/lib/prisma";
import { updateViewing } from "@/app/actions/admin";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const statuses = ["NEW", "REQUESTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default async function AdminViewingsPage() {
  const [items, staff] = await Promise.all([
    prisma.viewingRequest.findMany({
      include: { property: true, developer: true, assignedAdvisor: true, lead: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);
  return (
    <div>
      <h1 className="font-display text-4xl">Viewing requests</h1>
      <div className="mt-8 grid gap-6">
        {items.map((item) => (
          <form key={item.id} action={updateViewing} className="grid gap-3 border border-charcoal/10 bg-paper p-5 md:grid-cols-2">
            <input type="hidden" name="id" value={item.id} />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted">{item.email} · {item.phone}</p>
              <p className="mt-2 text-sm">{item.property.name}</p>
              <p className="text-sm text-muted">
                {formatDate(item.preferredDate)} {item.preferredTime} · {item.viewingType.replace(/_/g, " ")}
              </p>
              {item.developer ? <p className="text-sm text-muted">Developer: {item.developer.name}</p> : null}
            </div>
            <div className="grid gap-3">
              <select name="status" defaultValue={item.status} className="h-11 border border-charcoal/15 px-3 text-sm">
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <select name="assignedAdvisorId" defaultValue={item.assignedAdvisorId ?? ""} className="h-11 border border-charcoal/15 px-3 text-sm">
                <option value="">Advisor</option>
                {staff.map((person) => (
                  <option key={person.id} value={person.id}>{person.name}</option>
                ))}
              </select>
              <input name="locationNote" defaultValue={item.locationNote ?? ""} placeholder="Location" className="h-11 border border-charcoal/15 px-3 text-sm" />
              <textarea name="notes" defaultValue={item.notes ?? ""} placeholder="Notes" className="border border-charcoal/15 p-3 text-sm" />
              <label className="text-sm"><input type="checkbox" name="developerConfirmed" defaultChecked={item.developerConfirmed} /> Developer confirmed</label>
              <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Update</button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
