import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminViewingsPage() {
  const items = await prisma.viewingRequest.findMany({ include: { property: true }, orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-display text-4xl">Viewing requests</h1>
      <table className="mt-8 w-full text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
          <tr><th className="py-2">Name</th><th>Property</th><th>Date</th><th>Status</th></tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-charcoal/10">
              <td className="py-2">{item.name}</td>
              <td>{item.property.name}</td>
              <td>{formatDate(item.preferredDate)} {item.preferredTime}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
