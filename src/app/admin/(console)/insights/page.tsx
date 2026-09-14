import { prisma } from "@/lib/prisma";
import { upsertArticle } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminInsightsPage() {
  const items = await prisma.newsArticle.findMany({ orderBy: { publishedAt: "desc" } });
  return (
    <div>
      <h1 className="font-display text-4xl">News</h1>
      <ul className="mt-8 divide-y divide-charcoal/10">
        {items.map((item) => (
          <li key={item.id} className="py-3">{item.title}</li>
        ))}
      </ul>
      <form action={upsertArticle} className="mt-10 grid max-w-2xl gap-3">
        <h2 className="font-display text-2xl">New article</h2>
        <input name="title" required placeholder="Title" className="h-11 border border-charcoal/15 px-3" />
        <input name="excerpt" placeholder="Excerpt" className="h-11 border border-charcoal/15 px-3" />
        <textarea name="body" placeholder="Body" rows={6} className="border border-charcoal/15 p-3" />
        <input name="coverImage" defaultValue="/media/about-studio.jpg" className="h-11 border border-charcoal/15 px-3" />
        <select name="category" className="h-11 border border-charcoal/15 px-3">
          {["NEWS","PROJECT_UPDATES","ARCHITECTURE","DESIGN","SUSTAINABILITY","MARKET_INSIGHTS","LIFESTYLE"].map((c) => <option key={c}>{c}</option>)}
        </select>
        <label className="text-sm"><input type="checkbox" name="published" defaultChecked /> Published</label>
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Publish</button>
      </form>
    </div>
  );
}
