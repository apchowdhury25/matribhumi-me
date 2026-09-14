import { prisma } from "@/lib/prisma";
import { MediaUpload } from "@/components/admin/MediaUpload";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const items = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-display text-4xl">Media</h1>
      <p className="mt-2 text-sm text-muted">Local uploads in development; S3 when bucket credentials are set.</p>
      <div className="mt-8">
        <MediaUpload />
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="border border-charcoal/10 bg-paper p-3 text-sm">
            <p>{item.filename}</p>
            <a href={item.url} className="text-earth">{item.url}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
