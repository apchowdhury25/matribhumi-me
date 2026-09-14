import { prisma } from "@/lib/prisma";
import { upsertJob } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const items = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-display text-4xl">Careers</h1>
      <ul className="mt-8 divide-y divide-charcoal/10">
        {items.map((item) => (
          <li key={item.id} className="py-3">{item.title} · {item.location}</li>
        ))}
      </ul>
      <form action={upsertJob} className="mt-10 grid max-w-lg gap-3">
        <input name="title" required placeholder="Title" className="h-11 border border-charcoal/15 px-3" />
        <input name="department" placeholder="Department" className="h-11 border border-charcoal/15 px-3" />
        <input name="location" placeholder="Location" className="h-11 border border-charcoal/15 px-3" />
        <input name="type" defaultValue="Full-time" className="h-11 border border-charcoal/15 px-3" />
        <textarea name="description" placeholder="Description" className="border border-charcoal/15 p-3" />
        <textarea name="requirements" placeholder="Requirements" className="border border-charcoal/15 p-3" />
        <label className="text-sm"><input type="checkbox" name="published" defaultChecked /> Published</label>
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Save</button>
      </form>
    </div>
  );
}
