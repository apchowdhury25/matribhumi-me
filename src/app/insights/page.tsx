import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { JsonLd } from "@/components/site/JsonLd";
import { getArticles } from "@/lib/data";
import { formatDate, statusLabel } from "@/lib/format";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const categories = [
  "NEWS",
  "PROJECT_UPDATES",
  "ARCHITECTURE",
  "DESIGN",
  "SUSTAINABILITY",
  "MARKET_INSIGHTS",
  "LIFESTYLE",
] as const;

type Category = (typeof categories)[number];

function isCategory(value: string | undefined): value is Category {
  return !!value && (categories as readonly string[]).includes(value);
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const label = isCategory(category) ? statusLabel(category) : null;
  return createMetadata({
    title: label ? `${label} insights` : "Insights",
    description:
      "Notes on coming home to Bangladesh: architecture, family visits, and looking after a house from overseas. Demonstration articles.",
    path: label ? `/insights?category=${category}` : "/insights",
    image: "/media/about-studio.jpg",
  });
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: raw } = await searchParams;
  const category = isCategory(raw) ? raw : undefined;
  const articles = await getArticles(category);

  return (
    <PublicShell transparentHeader>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
      <PageHero
        image="/media/about-studio.jpg"
        eyebrow="Insights"
        title="Notes on coming home."
        description="Essays on visiting Bangladesh, looking after a house from abroad, and the unglamorous craft of making a place. Demonstration content."
      />

      <section className="px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <SectionHeader
          eyebrow="The journal"
          title="Read by subject."
          description="Filter the archive. Every piece is fictional briefing copy assembled for this website."
        />
        <div className="mt-10 flex flex-wrap gap-2">
          <FilterLink href="/insights" active={!category}>
            All
          </FilterLink>
          {categories.map((item) => (
            <FilterLink
              key={item}
              href={`/insights?category=${item}`}
              active={category === item}
            >
              {statusLabel(item)}
            </FilterLink>
          ))}
        </div>

        {articles.length === 0 ? (
          <p className="mt-16 max-w-xl text-muted">
            No articles in this category yet. Demonstration archives grow as the studio writes.
          </p>
        ) : (
          <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.id} href={`/insights/${article.slug}`} className="group">
                <div className="aspect-[16/10] overflow-hidden bg-stone">
                  <img
                    src={article.coverImage}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-earth">
                  {statusLabel(article.category)} · {formatDate(article.publishedAt)}
                </p>
                <h2 className="font-display mt-2 text-3xl leading-tight group-hover:text-moss">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">{article.excerpt}</p>
                <p className="mt-4 font-mono text-xs text-earth">
                  {article.readingTime} min · {article.author.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PublicShell>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "h-10 px-4 text-[11px] uppercase tracking-[0.18em] leading-10",
        active ? "bg-charcoal text-ivory" : "border border-charcoal/15 text-charcoal hover:border-charcoal",
      )}
    >
      {children}
    </Link>
  );
}
