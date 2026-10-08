import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { getLocations } from "@/lib/data";
import { markets } from "@/lib/markets";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: "Locations",
  description:
    "Discover developer properties with a Bangladesh, UAE or Malaysia property advisor. City pages open as location data is published.",
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
        title="Bangladesh, the UAE and Malaysia."
        description="Country pages for our primary markets, then cities and districts as listings are published. MatriBhumi is the advisor; the developer is the seller."
      />
      <section className="px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <SectionHeader eyebrow="Primary markets" title="Start with a country." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {markets.map((market) => (
            <Link key={market.slug} href={`/locations/${market.slug}`} className="group">
              <div className="aspect-[16/10] overflow-hidden bg-stone">
                <img
                  src={market.heroImage}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-earth">{market.seoTitle}</p>
              <h2 className="font-display text-4xl">{market.shortName}</h2>
              <p className="mt-2 text-sm text-muted">{market.intro}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-mist px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <SectionHeader
          eyebrow="Cities and districts"
          title="Published locations."
          description="These pages have listing data today. More cities will appear as data becomes available."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {locations.map((location) => (
            <Link key={location.id} href={`/locations/${location.slug}`} className="group bg-ivory p-2 sm:p-0">
              <div className="aspect-[16/10] overflow-hidden bg-stone">
                <img src={location.heroImage} alt={location.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-earth">{location.country}</p>
              <h2 className="font-display text-4xl">{location.city}</h2>
              <p className="mt-2 text-sm text-muted">{location.description}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-earth">
                {location._count.developments} projects · {location._count.properties} properties
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
