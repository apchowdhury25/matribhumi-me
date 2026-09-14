import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { siteConfig } from "@/config/site";
import { getArticle, getArticles } from "@/lib/data";
import { formatDate, statusLabel } from "@/lib/format";
import { createMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article || !article.published) {
    return createMetadata({
      title: "Insight",
      description: "A MatriBhumi studio note.",
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    image: article.coverImage,
    type: "article",
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article || !article.published) notFound();

  const related = (await getArticles(article.category))
    .filter((item) => item.id !== article.id)
    .slice(0, 3);

  const shareUrl = `${siteConfig.url}/insights/${article.slug}`;
  const shareText = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <PublicShell transparentHeader>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          excerpt: article.excerpt,
          slug: article.slug,
          coverImage: article.coverImage,
          publishedAt: article.publishedAt,
          author: article.author.name,
        })}
      />
      <PageHero
        image={article.coverImage}
        eyebrow={statusLabel(article.category)}
        title={article.title}
        description={article.excerpt}
      />

      <article className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-earth">
            {formatDate(article.publishedAt)} · {article.readingTime} min read · {article.author.name}
          </p>
          <p className="mt-4 text-sm text-muted">{siteConfig.demoNotice}</p>
          <div className="mt-12">
            <ArticleBody body={article.body} />
          </div>

          <div className="mt-16 border-t border-charcoal/10 pt-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-earth">Share</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ShareLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}>
                Facebook
              </ShareLink>
              <ShareLink href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${shareText}`}>
                X
              </ShareLink>
              <ShareLink href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}>
                LinkedIn
              </ShareLink>
              <ShareLink href={`mailto:?subject=${shareText}&body=${encodedUrl}`}>Email</ShareLink>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="bg-mist px-6 py-24 md:px-12">
          <SectionHeader eyebrow="Related" title="More from this shelf." />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/insights/${item.slug}`} className="group">
                <div className="aspect-[16/10] overflow-hidden bg-stone">
                  <img
                    src={item.coverImage}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-earth">
                  {statusLabel(item.category)}
                </p>
                <h3 className="font-display mt-2 text-2xl leading-tight group-hover:text-moss">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="px-6 py-16 md:px-12">
        <Button href="/insights" variant="outline">
          All insights
        </Button>
      </section>
    </PublicShell>
  );
}

function ShareLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="h-10 border border-charcoal/15 px-4 text-[11px] uppercase tracking-[0.18em] leading-10 hover:border-charcoal"
    >
      {children}
    </a>
  );
}

function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/);

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const lines = block.split("\n");
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="font-display text-3xl md:text-4xl">
              {block.replace(/^##\s+/, "")}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="font-display text-2xl">
              {block.replace(/^###\s+/, "")}
            </h3>
          );
        }
        if (lines.every((line) => line.trim().startsWith("- "))) {
          return (
            <ul key={index} className="space-y-2 pl-5">
              {lines.map((line) => (
                <li key={line} className="list-disc text-lg leading-8 text-muted">
                  {line.replace(/^\s*-\s+/, "")}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="text-lg leading-8 text-muted">
            {block}
          </p>
        );
      })}
    </div>
  );
}
