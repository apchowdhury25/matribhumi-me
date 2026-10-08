import Link from "next/link";
import { neighborhoodPath, type HierarchyNeighborhood } from "@/config/locations";

export function NeighborhoodCard({
  citySlug,
  neighborhood,
  propertyCount,
}: {
  citySlug: string;
  neighborhood: HierarchyNeighborhood;
  propertyCount?: number;
}) {
  return (
    <Link
      href={neighborhoodPath(citySlug, neighborhood.slug)}
      className="group flex min-h-[280px] flex-col overflow-hidden bg-ivory"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-stone">
        <img
          src={neighborhood.heroImage}
          alt={neighborhood.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-charcoal/10 transition group-hover:bg-charcoal/0" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-3xl group-hover:text-moss">{neighborhood.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{neighborhood.description}</p>
        {propertyCount && propertyCount > 0 ? (
          <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-earth">
            {propertyCount} {propertyCount === 1 ? "property" : "properties"}
          </p>
        ) : (
          <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-earth">Explore neighborhood</p>
        )}
      </div>
    </Link>
  );
}
