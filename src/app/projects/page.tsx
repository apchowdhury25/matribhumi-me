import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { DualCta } from "@/components/site/LeadCapture";
import { getDevelopments } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { formatPrice, statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: "Developments",
  description:
    "Exclusive pre-launch developments in Bangladesh — boutique residences within Dhaka’s master-planned Bashundhara district, and in Chattogram.",
  path: "/projects",
  image: "/media/hero-plaza.jpg",
});

const categories = ["RESIDENTIAL", "VILLAS", "COMMERCIAL", "HOSPITALITY", "MIXED_USE", "WATERFRONT", "COMMUNITIES"];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; lifestyle?: string }>;
}) {
  const { category } = await searchParams;
  const projects = await getDevelopments(category);

  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/hero-plaza.jpg"
        eyebrow="Developments"
        title="Neighbourhoods you can return to — or live in every day."
        description="Upcoming architectural concepts for vacation weeks, retirement, and full-time living. Join the waitlist for priority before the public launch."
      />
      <section className="px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em]">
          <Link href="/projects" className={!category ? "text-charcoal" : "text-muted"}>All</Link>
          {categories.map((item) => (
            <Link key={item} href={`/projects?category=${item}`} className={category === item ? "text-charcoal" : "text-muted"}>
              {statusLabel(item)}
            </Link>
          ))}
        </div>
        <div className="mt-12 grid gap-10">
          {projects.map((project, index) => (
            <article key={project.id} className="group grid items-center gap-8 lg:grid-cols-12">
              <div className={index % 2 ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-7"}>
                <Link href={`/projects/${project.slug}`} className="block aspect-[16/9] overflow-hidden bg-stone">
                  <img src={project.heroImage} alt={project.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </Link>
              </div>
              <div className={index % 2 ? "lg:col-span-5 lg:col-start-1 lg:row-start-1" : "lg:col-span-5"}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-earth">
                  {project.location.city} · {statusLabel(project.category)}
                </p>
                <h2 className="font-display mt-2 text-4xl">
                  <Link href={`/projects/${project.slug}`} className="hover:text-moss">{project.name}</Link>
                </h2>
                <p className="mt-3 text-muted">{project.tagline}</p>
                <p className="mt-4 text-sm text-muted">
                  {statusLabel(project.status)} · {project.completion} · from {formatPrice(project.startingPrice, project.currency)}
                </p>
                <DualCta projectName={project.name} className="mt-6" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
