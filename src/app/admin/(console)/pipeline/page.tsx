import Link from "next/link";
import { getPipelineBoard } from "@/lib/crm";
import { dealStageValues, pipelineLabel } from "@/lib/pipeline";
import { requireSalesUser } from "@/lib/admin-access";
import { moveDealStage } from "@/app/actions/admin";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function PipelinePage() {
  await requireSalesUser();
  const { columns, total } = await getPipelineBoard();

  return (
    <div>
      <h1 className="font-display text-4xl">Transaction pipeline</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted">
        New lead → Contacted → Qualified → Shortlisted → Developer introduced → Viewing → Property selected → Reservation → Contract → Completion → Closed. Lost / withdrawn sits to the side. The buyer purchases from the developer or seller. These counts are a workflow snapshot, not guaranteed revenue.
      </p>
      <p className="mt-2 text-sm text-earth">{total} transactions</p>
      <div className="mt-8 flex gap-4 overflow-x-auto pb-6">
        {columns.map((column) => (
          <section key={column.key} className="w-64 shrink-0 border border-charcoal/10 bg-paper p-4">
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-earth">{column.label}</h2>
            <p className="font-mono mt-1 text-lg">{column.deals.length}</p>
            <ul className="mt-4 space-y-3">
              {column.deals.map((deal) => (
                <li key={deal.id} className="border border-charcoal/10 p-3 text-sm">
                  <Link href={`/admin/deals/${deal.id}`} className="font-medium">{deal.lead.name}</Link>
                  <p className="text-muted">{deal.property?.name ?? deal.developer?.name ?? "Unassigned"}</p>
                  <p className="text-xs text-muted">{formatDate(deal.updatedAt)}</p>
                  <form action={moveDealStage} className="mt-3 grid gap-2">
                    <input type="hidden" name="dealId" value={deal.id} />
                    <select name="stage" defaultValue={deal.stage} className="h-9 border border-charcoal/15 px-2 text-xs">
                      {dealStageValues.map((stage) => (
                        <option key={stage} value={stage}>{pipelineLabel(stage)}</option>
                      ))}
                    </select>
                    <button className="h-8 bg-charcoal text-[10px] uppercase tracking-[0.14em] text-ivory">Move</button>
                  </form>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
