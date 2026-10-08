import { prisma } from "@/lib/prisma";
import { upsertLocation } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminLocationsPage() {
  const items = await prisma.location.findMany({
    include: { parent: { select: { name: true, slug: true } } },
    orderBy: [{ kind: "asc" }, { city: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });
  const cities = items.filter((item) => item.kind === "CITY");
  return (
    <div>
      <h1 className="font-display text-4xl">Locations</h1>
      <ul className="mt-8 divide-y divide-charcoal/10">
        {items.map((item) => (
          <li key={item.id} className="py-3">
            <span className="text-[11px] uppercase tracking-[0.16em] text-earth">{item.kind}</span>
            {" "}
            {item.name}
            {item.parent ? ` · ${item.parent.name}` : ` · ${item.city}`}
          </li>
        ))}
      </ul>
      <form action={upsertLocation} className="mt-10 grid max-w-lg gap-3">
        <h2 className="font-display text-2xl">New location</h2>
        <input name="name" required placeholder="Name" className="h-11 border border-charcoal/15 px-3" />
        <input name="slug" placeholder="Slug" className="h-11 border border-charcoal/15 px-3" />
        <select name="kind" defaultValue="NEIGHBORHOOD" className="h-11 border border-charcoal/15 px-3">
          <option value="CITY">City</option>
          <option value="NEIGHBORHOOD">Neighborhood</option>
        </select>
        <select name="parentId" defaultValue="" className="h-11 border border-charcoal/15 px-3">
          <option value="">Parent city (neighborhoods)</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
        <input name="category" placeholder="Category (luxury, emerging, established)" className="h-11 border border-charcoal/15 px-3" />
        <input name="city" placeholder="City" className="h-11 border border-charcoal/15 px-3" />
        <input name="country" defaultValue="Bangladesh" placeholder="Country" className="h-11 border border-charcoal/15 px-3" />
        <textarea name="description" placeholder="Description" className="border border-charcoal/15 p-3" />
        <textarea name="overview" placeholder="Overview" className="border border-charcoal/15 p-3" />
        <textarea name="lifestyle" placeholder="Lifestyle" className="border border-charcoal/15 p-3" />
        <textarea name="connectivity" placeholder="Connectivity" className="border border-charcoal/15 p-3" />
        <textarea name="opportunities" placeholder="Opportunities" className="border border-charcoal/15 p-3" />
        <input name="heroImage" defaultValue="/media/location-aerial.jpg" className="h-11 border border-charcoal/15 px-3" />
        <input name="latitude" placeholder="Lat" className="h-11 border border-charcoal/15 px-3" />
        <input name="longitude" placeholder="Lng" className="h-11 border border-charcoal/15 px-3" />
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Save</button>
      </form>
    </div>
  );
}
