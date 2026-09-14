import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, statusLabel } from "@/lib/format";
import { deleteProperty } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const items = await prisma.property.findMany({ include: { location: true }, orderBy: { name: "asc" } });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Properties</h1>
        <Link href="/admin/properties/new" className="bg-charcoal px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ivory">New</Link>
      </div>
      <table className="mt-8 w-full text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
          <tr><th className="py-2">Name</th><th>Location</th><th>Status</th><th>Price</th><th></th></tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-charcoal/10">
              <td className="py-3"><Link href={`/admin/properties/${item.id}`}>{item.name}</Link></td>
              <td>{item.location.city}</td>
              <td>{statusLabel(item.status)}</td>
              <td>{formatPrice(item.startingPrice, item.currency)}</td>
              <td>
                <form action={deleteProperty}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="text-[11px] uppercase tracking-[0.16em] text-muted">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
