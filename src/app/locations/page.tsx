import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { getLocations } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: "Locations",
  description:
    "Bashundhara, Dhaka, and Chattogram are the heart of MatriBhumi’s demonstration work — for expats, retirees, and families already in Bangladesh.",
  path: "/locations",
  image: "/media/location-aerial.jpg",
});

export default async function LocationsPage() {
  const locations = await getLocations();
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/location-aerial.jpg"
        eyebrow="Locations"
        title="Bangladesh first — especially Bashundhara."
        description="Homes for coming back, retiring, or living every day in Dhaka’s new districts. Other cities on this map are demonstration studies."
      />
      <section className="grid gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:px-12 md:py-20">
        {locations.map((location) => (
          <Link key={location.id} href={`/locations/${location.slug}`} className="group">
            <div className="aspect-[16/10] overflow-hidden bg-stone">
              <img src={location.heroImage} alt={location.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-earth">{location.country}</p>
            <h2 className="font-display text-4xl">{location.city}</h2>
            <p className="mt-2 text-sm text-muted">{location.description}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-earth">
              {location._count.developments} developments · {location._count.properties} homes
            </p>
          </Link>
        ))}
      </section>
    </PublicShell>
  );
}
