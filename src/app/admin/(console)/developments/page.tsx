import { prisma } from "@/lib/prisma";
import { upsertDevelopment } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminDevelopmentsPage() {
  const [items, locations, developers] = await Promise.all([
    prisma.development.findMany({ include: { location: true }, orderBy: { name: "asc" } }),
    prisma.location.findMany(),
    prisma.developer.findMany(),
  ]);
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="font-display text-4xl">Developments</h1>
        <ul className="mt-8 divide-y divide-charcoal/10">
          {items.map((item) => (
            <li key={item.id} className="py-3">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted">{item.location.city} · {item.status}</p>
            </li>
          ))}
        </ul>
      </div>
      <form action={upsertDevelopment} className="grid gap-3 self-start border border-charcoal/10 bg-paper p-5">
        <h2 className="font-display text-2xl">New</h2>
        <input name="name" required placeholder="Name" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <textarea name="tagline" placeholder="Tagline" className="border border-charcoal/15 p-3 text-sm" />
        <textarea name="description" placeholder="Description" className="border border-charcoal/15 p-3 text-sm" />
        <input name="architecture" placeholder="Architecture" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="lifestyle" placeholder="Lifestyle" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="locationNote" placeholder="Location note" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="heroImage" defaultValue="/media/hero-plaza.jpg" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="completion" placeholder="2028" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="startingPrice" placeholder="180000" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <select name="locationId" className="h-11 border border-charcoal/15 px-3 text-sm">
          {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <select name="developerId" className="h-11 border border-charcoal/15 px-3 text-sm">
          {developers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <label className="text-sm"><input type="checkbox" name="published" defaultChecked /> Published</label>
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Create</button>
      </form>
    </div>
  );
}
