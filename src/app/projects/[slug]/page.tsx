import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyMap } from "@/components/maps/PropertyMap";
import { getDevelopment } from "@/lib/data";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { formatPrice, statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getDevelopment(slug);
  if (!project) return createMetadata({ title: "Development", description: "MatriBhumi development", path: `/projects/${slug}` });
  return createMetadata({
    title: project.name,
    description: project.tagline,
    path: `/projects/${project.slug}`,
    image: project.heroImage,
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getDevelopment(slug);
  if (!project) notFound();

  return (
    <PublicShell transparentHeader>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Developments", path: "/projects" }, { name: project.name, path: `/projects/${project.slug}` }])} />
      <section className="relative min-h-[80vh]">
        <img src={project.heroImage} alt={project.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative flex min-h-[80vh] items-end px-6 pb-16 md:px-12">
          <div className="max-w-3xl text-ivory">
            <p className="text-[11px] uppercase tracking-[0.24em] text-sand">
              {project.location.city}, {project.location.country}
            </p>
            <h1 className="font-display mt-4 text-5xl md:text-7xl">{project.name}</h1>
            <p className="mt-4 text-lg text-ivory/80">{project.tagline}</p>
            <Button href="/properties" variant="invert" className="mt-8">Explore Properties</Button>
          </div>
        </div>
      </section>
      <section className="grid gap-12 px-6 py-20 md:px-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl">Architecture</h2>
          <p className="mt-4 leading-8 text-muted">{project.architecture}</p>
        </div>
        <div>
          <h2 className="font-display text-4xl">Lifestyle</h2>
          <p className="mt-4 leading-8 text-muted">{project.lifestyle}</p>
        </div>
      </section>
      <section className="bg-mist px-6 py-16 md:px-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-earth">{project.locationNote}</p>
        <p className="mt-4 max-w-3xl text-lg leading-8">{project.description}</p>
        <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {Object.entries(project.stats as Record<string, string | number>).map(([k, v]) => (
            <div key={k}>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-earth">{k}</dt>
              <dd className="font-mono mt-1 text-2xl">{String(v)}</dd>
            </div>
          ))}
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-earth">Status</dt>
            <dd className="mt-1">{statusLabel(project.status)} · {project.completion}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-earth">From</dt>
            <dd className="mt-1">{formatPrice(project.startingPrice, project.currency)}</dd>
          </div>
        </dl>
      </section>
      <section className="px-6 py-20 md:px-12">
        <h2 className="font-display text-4xl">Homes in this place</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {project.properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
      <section className="px-6 pb-20 md:px-12">
        <h2 className="font-display mb-6 text-4xl">On the map</h2>
        <PropertyMap latitude={project.latitude} longitude={project.longitude} name={project.name} />
        <Link href={`/locations/${project.location.slug}`} className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] text-earth">
          All of {project.location.name}
        </Link>
      </section>
    </PublicShell>
  );
}
