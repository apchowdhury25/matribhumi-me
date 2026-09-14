import { prisma } from "@/lib/prisma";
import { upsertAmenity } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminAmenitiesPage() {
  const items = await prisma.amenity.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h1 className="font-display text-4xl">Amenities</h1>
      <ul className="mt-8 grid gap-2 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="border border-charcoal/10 bg-paper px-4 py-3">{item.name}</li>
        ))}
      </ul>
      <form action={upsertAmenity} className="mt-10 grid max-w-md gap-3">
        <input name="name" required placeholder="Name" className="h-11 border border-charcoal/15 px-3" />
        <input name="category" placeholder="Category" className="h-11 border border-charcoal/15 px-3" />
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Add</button>
      </form>
    </div>
  );
}
