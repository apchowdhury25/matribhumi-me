import Link from "next/link";
import { formatBedrooms, formatPrice, statusLabel } from "@/lib/format";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { CompareToggle } from "@/components/property/CompareToggle";
import { Button } from "@/components/ui/button";
import { isVerifiedDeveloper, publicDeveloperName } from "@/lib/developer";

export type PropertyCardData = {
  id: string;
  slug: string;
  name: string;
  heroImage: string;
  type: string;
  status: string;
  startingPrice: { toString(): string } | number;
  currency: string;
  bedroomsMin: number;
  bedroomsMax: number;
  areaMin: number;
  areaUnit: string;
  location: { name: string; city: string; country: string };
  developer?: { name: string; published: boolean; verified?: boolean } | null;
  matribhumiOwned?: boolean;
};

export function PropertyCard({
  property,
  layout = "grid",
}: {
  property: PropertyCardData;
  layout?: "grid" | "list";
}) {
  const href = `/properties/${property.slug}`;
  const developerName = publicDeveloperName(property.developer);
  const verified = isVerifiedDeveloper(property.developer);
  const media = (
    <div className="relative h-full overflow-hidden bg-stone">
      <Link href={href} className="block h-full">
        <img
          src={property.heroImage}
          alt={property.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </Link>
      <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-charcoal">
        {statusLabel(property.status)}
      </span>
      <div className="absolute right-3 top-3 flex gap-2">
        <FavoriteButton propertyId={property.id} />
        <CompareToggle propertyId={property.id} />
      </div>
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col justify-between p-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-earth">
          {property.location.city}, {property.location.country}
        </p>
        <h3 className="font-display mt-2 text-2xl leading-tight text-charcoal">
          <Link href={href} className="hover:text-moss">{property.name}</Link>
        </h3>
        <p className="mt-2 text-sm text-muted">
          {statusLabel(property.type)} · {formatBedrooms(property.bedroomsMin, property.bedroomsMax)} ·{" "}
          {property.areaMin.toLocaleString()} {property.areaUnit}
        </p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-muted">Listed through MatriBhumi</p>
        {developerName ? (
          <p className="mt-1 text-sm text-charcoal">
            Developer: {developerName}
            {verified ? " · Verified" : ""}
          </p>
        ) : null}
      </div>
      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Starting from</p>
        <p className="mt-1 text-lg text-charcoal">
          {formatPrice(property.startingPrice, property.currency)}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Button href={`${href}#inquire`} className="w-full">Request details</Button>
          <Button href={`${href}#viewing`} variant="outline" className="w-full">
            Arrange a viewing
          </Button>
          <Link
            href="/contact"
            className="text-center text-[11px] uppercase tracking-[0.18em] text-earth hover:text-charcoal"
          >
            Speak with an advisor
          </Link>
        </div>
      </div>
    </div>
  );

  if (layout === "list") {
    return (
      <article className="group grid overflow-hidden border border-charcoal/10 bg-paper md:grid-cols-[320px_1fr]">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[240px]">{media}</div>
        {body}
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-charcoal/10 bg-paper">
      <div className="aspect-[4/3]">{media}</div>
      {body}
    </article>
  );
}
