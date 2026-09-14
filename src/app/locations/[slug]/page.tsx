import { notFound } from "next/navigation";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyMap } from "@/components/maps/PropertyMap";
import { getLocation } from "@/lib/data";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) return createMetadata({ title: "Location", description: "MatriBhumi location", path: `/locations/${slug}` });
  return createMetadata({
    title: `${location.city}, ${location.country}`,
    description: location.description,
    path: `/locations/${location.slug}`,
    image: location.heroImage,
  });
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) notFound();
  const attractions = (location.attractions as { name: string; category: string }[] | null) ?? [];

  return (
    <PublicShell transparentHeader>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }, { name: location.city, path: `/locations/${location.slug}` }])} />
      <section className="relative min-h-[70vh]">
        <img src={location.heroImage} alt={location.city} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-charcoal/20" />
        <div className="relative flex min-h-[70vh] items-end px-6 pb-16 md:px-12">
          <div className="text-ivory">
            <p className="text-[11px] uppercase tracking-[0.24em] text-sand">{location.country}</p>
            <h1 className="font-display mt-3 text-4xl sm:text-6xl md:text-8xl">{location.city}</h1>
            <p className="mt-4 max-w-xl text-ivory/80">{location.description}</p>
          </div>
        </div>
      </section>
      <section className="grid gap-10 px-4 py-14 sm:px-6 md:px-12 md:py-20 lg:grid-cols-3">
        {[
          ["Overview", location.overview],
          ["Lifestyle", location.lifestyle],
          ["Connectivity", location.connectivity],
        ].map(([title, body]) => (
          <article key={title}>
            <h2 className="font-display text-3xl">{title}</h2>
            <p className="mt-4 leading-7 text-muted">{body}</p>
          </article>
        ))}
      </section>
      <section className="bg-mist px-6 py-16 md:px-12">
        <h2 className="font-display text-4xl">Development opportunities</h2>
        <p className="mt-4 max-w-3xl leading-8 text-muted">{location.opportunities}</p>
      </section>
      <section className="px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <h2 className="font-display text-4xl">Featured homes</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {location.properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          {location.developments.map((d) => (
            <Link key={d.id} href={`/projects/${d.slug}`} className="border border-charcoal/15 px-4 py-2 text-sm">
              {d.name}
            </Link>
          ))}
        </div>
      </section>
      <section className="px-6 pb-20 md:px-12">
        <h2 className="font-display mb-6 text-4xl">Map</h2>
        <PropertyMap latitude={location.latitude} longitude={location.longitude} name={location.city} />
        {attractions.length ? (
          <ul className="mt-8 grid gap-2 md:grid-cols-3">
            {attractions.map((item) => (
              <li key={item.name} className="text-sm text-muted">
                {item.category}: {item.name}
              </li>
            ))}
          </ul>
        ) : null}
        <Button href="/contact" className="mt-10">Speak with us</Button>
      </section>
    </PublicShell>
  );
}
