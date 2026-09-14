import { prisma } from "@/lib/prisma";
import { upsertUnit } from "@/app/actions/admin";
import { formatPrice, statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminUnitsPage() {
  const [units, properties] = await Promise.all([
    prisma.unit.findMany({ include: { property: true }, orderBy: { name: "asc" } }),
    prisma.property.findMany(),
  ]);
  return (
    <div>
      <h1 className="font-display text-4xl">Units</h1>
      <table className="mt-8 w-full text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
          <tr><th className="py-2">Unit</th><th>Property</th><th>Beds</th><th>Price</th><th>Status</th></tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.id} className="border-t border-charcoal/10">
              <td className="py-2">{unit.name}</td>
              <td>{unit.property.name}</td>
              <td>{unit.bedrooms}</td>
              <td>{formatPrice(unit.price)}</td>
              <td>{statusLabel(unit.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action={upsertUnit} className="mt-10 grid max-w-lg gap-3">
        <h2 className="font-display text-2xl">Add unit</h2>
        <input name="name" required placeholder="Unit name" className="h-11 border border-charcoal/15 px-3" />
        <input name="type" placeholder="Type" className="h-11 border border-charcoal/15 px-3" />
        <input name="bedrooms" type="number" defaultValue={2} className="h-11 border border-charcoal/15 px-3" />
        <input name="bathrooms" type="number" defaultValue={2} className="h-11 border border-charcoal/15 px-3" />
        <input name="area" type="number" defaultValue={1000} className="h-11 border border-charcoal/15 px-3" />
        <input name="price" defaultValue="250000" className="h-11 border border-charcoal/15 px-3" />
        <select name="propertyId" className="h-11 border border-charcoal/15 px-3">
          {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Save</button>
      </form>
    </div>
  );
}
