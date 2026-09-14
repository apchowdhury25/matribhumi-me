import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const items = await prisma.jobApplication.findMany({ include: { job: true }, orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-display text-4xl">Applications</h1>
      <table className="mt-8 w-full text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
          <tr><th className="py-2">Name</th><th>Role</th><th>Email</th><th>When</th></tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-charcoal/10">
              <td className="py-2">{item.name}</td>
              <td>{item.job.title}</td>
              <td>{item.email}</td>
              <td>{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
