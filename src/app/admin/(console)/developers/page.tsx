import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { upsertDeveloper } from "@/app/actions/admin";
import { statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

const statuses = ["PROSPECT", "ACTIVE", "PAUSED", "ENDED"];

export default async function AdminDevelopersPage() {
  const items = await prisma.developer.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { properties: true, partnerships: true } } },
  });
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="font-display text-4xl">Developers</h1>
        <table className="mt-8 w-full text-left text-sm">
          <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
            <tr>
              <th className="py-2">Company</th>
              <th>Status</th>
              <th>Published</th>
              <th>Listings</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-charcoal/10">
                <td className="py-3">
                  <Link href={`/admin/developers/${item.id}`}>{item.name}</Link>
                </td>
                <td>{statusLabel(item.status)}</td>
                <td>{item.published ? "Yes" : "No"}</td>
                <td>{item._count.properties}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form action={upsertDeveloper} className="grid gap-3 self-start border border-charcoal/10 bg-paper p-5">
        <h2 className="font-display text-2xl">New developer</h2>
        <input name="name" required placeholder="Company name" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="slug" placeholder="slug" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <textarea name="description" placeholder="Internal description" className="border border-charcoal/15 p-3 text-sm" />
        <textarea name="publicDescription" placeholder="Public description" className="border border-charcoal/15 p-3 text-sm" />
        <input name="website" placeholder="Website" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="logoUrl" placeholder="Logo URL" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="country" defaultValue="Bangladesh" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <input name="cities" placeholder="Cities, comma-separated" className="h-11 border border-charcoal/15 px-3 text-sm" />
        <select name="status" defaultValue="PROSPECT" className="h-11 border border-charcoal/15 px-3 text-sm">
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <label className="text-sm"><input type="checkbox" name="published" /> Published</label>
        <label className="text-sm"><input type="checkbox" name="verified" /> Verified</label>
        <label className="text-sm"><input type="checkbox" name="featured" /> Featured</label>
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Create</button>
      </form>
    </div>
  );
}
