import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getProperties } from "@/lib/data";
import { propertyFilterSchema } from "@/lib/validations";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: "Properties",
  description:
    "Demonstration homes in Bangladesh — including Bashundhara’s new districts — for expats, retirees, and families already living in Dhaka.",
  path: "/properties",
  image: "/media/hero-urban.jpg",
});

const types = ["APARTMENT", "VILLA", "TOWNHOUSE", "PENTHOUSE", "MIXED_USE"];
const statuses = ["UPCOMING", "LAUNCHED", "UNDER_CONSTRUCTION", "READY", "SOLD_OUT"];

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const flat = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
  );
  const filters = propertyFilterSchema.parse(flat);
  const data = await getProperties(filters);
  const view = filters.view === "list" ? "list" : "grid";
  const qs = new URLSearchParams(
    Object.entries(flat).filter(([, v]) => Boolean(v)) as [string, string][],
  );

  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/hero-urban.jpg"
        eyebrow="Properties"
        title="A Bangladesh address that fits how you live."
        description="Search demonstration homes for holidays, retirement, and everyday living in Bashundhara and beyond. Nothing here is a live offering or a financial recommendation."
      />
      <section className="px-6 py-12 md:px-12">
        <form className="grid gap-3 border border-charcoal/10 bg-paper p-4 md:grid-cols-4 lg:grid-cols-6">
          <input name="q" defaultValue={filters.q} placeholder="Search" className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm md:col-span-2" />
          <select name="location" defaultValue={filters.location ?? ""} className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm">
            <option value="">All locations</option>
            {data.locations.map((loc) => (
              <option key={loc.id} value={loc.slug}>{loc.name}</option>
            ))}
          </select>
          <select name="type" defaultValue={filters.type ?? ""} className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm">
            <option value="">All types</option>
            {types.map((t) => <option key={t} value={t}>{statusLabel(t)}</option>)}
          </select>
          <select name="status" defaultValue={filters.status ?? ""} className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm">
            <option value="">All statuses</option>
            {statuses.map((t) => <option key={t} value={t}>{statusLabel(t)}</option>)}
          </select>
          <select name="bedrooms" defaultValue={filters.bedrooms ?? ""} className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm">
            <option value="">Beds</option>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
          <select name="bathrooms" defaultValue={filters.bathrooms ?? ""} className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm">
            <option value="">Baths</option>
            {[1, 2, 3].map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
          <input name="minPrice" defaultValue={filters.minPrice ?? ""} placeholder="Min price" className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm" />
          <input name="maxPrice" defaultValue={filters.maxPrice ?? ""} placeholder="Max price" className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm" />
          <input name="minArea" defaultValue={filters.minArea ?? ""} placeholder="Min area" className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm" />
          <select name="amenity" defaultValue={filters.amenity ?? ""} className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm">
            <option value="">Amenities</option>
            {data.amenities.map((a) => <option key={a.id} value={a.slug}>{a.name}</option>)}
          </select>
          <select name="sort" defaultValue={filters.sort ?? ""} className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm">
            <option value="">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="newest">Newest</option>
          </select>
          <input type="hidden" name="view" value={view} />
          <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Apply</button>
        </form>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted">{data.total} homes</p>
          <div className="flex gap-2 text-[11px] uppercase tracking-[0.18em]">
            <a href={`?${new URLSearchParams({ ...Object.fromEntries(qs), view: "grid" }).toString()}`} className={view === "grid" ? "text-charcoal" : "text-muted"}>Grid</a>
            <a href={`?${new URLSearchParams({ ...Object.fromEntries(qs), view: "list" }).toString()}`} className={view === "list" ? "text-charcoal" : "text-muted"}>List</a>
          </div>
        </div>

        {data.items.length === 0 ? (
          <p className="mt-16 text-muted">No demonstration homes match those filters.</p>
        ) : (
          <div className={view === "list" ? "mt-8 grid gap-6" : "mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3"}>
            {data.items.map((property) => (
              <PropertyCard key={property.id} property={property} layout={view} />
            ))}
          </div>
        )}

        {data.pages > 1 ? (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: data.pages }, (_, i) => i + 1).map((page) => (
              <a
                key={page}
                href={`?${new URLSearchParams({ ...Object.fromEntries(qs), page: String(page) }).toString()}`}
                className={`grid h-10 w-10 place-items-center ${page === data.page ? "bg-charcoal text-ivory" : "border border-charcoal/15"}`}
              >
                {page}
              </a>
            ))}
          </div>
        ) : null}
        <div className="mt-16">
          <Button href="/contact" variant="outline">Talk with sales</Button>
        </div>
      </section>
    </PublicShell>
  );
}
