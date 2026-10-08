import { getCrmReports } from "@/lib/crm";
import { canViewCompensation } from "@/lib/auth";
import { requireReportsUser } from "@/lib/admin-access";
import { developerFeeLabel } from "@/config/businessModel";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

function Rate({ value }: { value: number }) {
  return <span>{Math.round(value * 1000) / 10}%</span>;
}

export default async function ReportsPage() {
  const user = await requireReportsUser();
  const showFees = canViewCompensation(user.role);
  const reports = await getCrmReports({ includeCompensation: showFees });
  const feeTerm = developerFeeLabel();

  return (
    <div className="grid max-w-5xl gap-12">
      <div>
        <h1 className="font-display text-4xl">Internal reports</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          Operational snapshot of advisory activity. These figures are not a forecast, not guaranteed revenue, and not a valuation of any property or developer relationship.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="border border-charcoal/10 bg-paper p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-earth">Closed transactions</p>
          <p className="font-mono mt-2 text-3xl">{reports.closedCount}</p>
        </article>
        <article className="border border-charcoal/10 bg-paper p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-earth">Estimated transaction value</p>
          <p className="font-mono mt-2 text-3xl">{formatPrice(reports.estimatedTransactionValue, "USD")}</p>
          <p className="mt-2 text-sm text-muted">Buyer purchase with the developer or seller, where recorded. Not MatriBhumi income.</p>
        </article>
        <article className="border border-charcoal/10 bg-paper p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-earth">Conversion rate</p>
          <p className="font-mono mt-2 text-3xl"><Rate value={reports.conversionRate} /></p>
          <p className="mt-2 text-sm text-muted">{reports.closedCount} closed of {reports.dealCount} transactions.</p>
        </article>
        <article className="border border-charcoal/10 bg-paper p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-earth">Viewing-to-transaction conversion</p>
          <p className="font-mono mt-2 text-3xl"><Rate value={reports.viewingToTransaction} /></p>
          <p className="mt-2 text-sm text-muted">Deals that reached property selected or later, against {reports.viewingCount} viewing requests.</p>
        </article>
        {showFees && reports.compensationDue != null && reports.compensationReceived != null ? (
          <>
            <article className="border border-charcoal/10 bg-paper p-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-earth">{developerFeeLabel({ capitalize: true })} due</p>
              <p className="font-mono mt-2 text-3xl">{formatPrice(reports.compensationDue, "USD")}</p>
              <p className="mt-2 text-sm text-muted">Admin only. Expected or invoiced {feeTerm} from developers, not buyer funds.</p>
            </article>
            <article className="border border-charcoal/10 bg-paper p-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-earth">{developerFeeLabel({ capitalize: true })} received</p>
              <p className="font-mono mt-2 text-3xl">{formatPrice(reports.compensationReceived, "USD")}</p>
            </article>
          </>
        ) : (
          <p className="text-sm text-muted md:col-span-2">
            {developerFeeLabel({ capitalize: true })} due and received is visible to administrators only.
          </p>
        )}
      </section>

      <ReportTable title="Leads by country" rows={reports.leadsByCountry} />
      <ReportTable title="Leads by source" rows={reports.leadsBySource} />
      <ReportTable title="Leads by developer" rows={reports.leadsByDeveloper} />
      <ReportTable title="Leads by property" rows={reports.leadsByProperty} />
      <ReportTable title="Transaction pipeline" rows={reports.pipeline} />
    </div>
  );
}

function ReportTable({ title, rows }: { title: string; rows: { label: string; count: number }[] }) {
  return (
    <section>
      <h2 className="font-display text-3xl">{title}</h2>
      <table className="mt-4 w-full text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
          <tr><th className="py-2">Label</th><th>Count</th></tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((row) => (
            <tr key={row.label} className="border-t border-charcoal/10">
              <td className="py-2">{row.label}</td>
              <td>{row.count}</td>
            </tr>
          )) : (
            <tr><td className="py-2 text-muted" colSpan={2}>No records yet.</td></tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
