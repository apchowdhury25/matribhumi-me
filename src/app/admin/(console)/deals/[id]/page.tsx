import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { canViewCompensation } from "@/lib/auth";
import { requireSalesUser } from "@/lib/admin-access";
import { moveDealStage, recordDeveloperIntroduction, selectPropertyForDeal, upsertDeal, upsertDealCompensation } from "@/app/actions/admin";
import { formatDate } from "@/lib/format";
import { dealStageValues, pipelineColumns, pipelineColumnForDeal, pipelineLabel } from "@/lib/pipeline";
import { developerFeeLabel } from "@/config/businessModel";

export const dynamic = "force-dynamic";

const statuses = ["OPEN", "WON", "LOST", "CANCELLED"];
const compensationTypes = ["PERCENTAGE", "FIXED", "HYBRID", "OTHER"];
const agreementStatuses = ["DRAFT", "AGREED", "ACTIVE", "EXPIRED"];
const paymentStatuses = ["NOT_DUE", "EXPECTED", "INVOICED", "PAID", "WRITTEN_OFF"];
const introMethods = ["EMAIL", "PHONE", "WHATSAPP", "MEETING", "OTHER"];
const introStatuses = ["PLANNED", "SENT", "CONFIRMED", "COMPLETED", "CANCELLED"];

function dateValue(value?: Date | null) {
  if (!value) return "";
  return value.toISOString().slice(0, 10);
}

export default async function AdminDealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireSalesUser();
  const { id } = await params;
  const showCompensation = Boolean(user && canViewCompensation(user.role));
  const deal = await prisma.deal.findUnique({
    where: { id },
    include: {
      lead: true,
      developer: true,
      development: true,
      property: true,
      unit: true,
      assignedAdvisor: true,
      introductions: { include: { developer: true }, orderBy: { introducedAt: "desc" } },
    },
  });
  if (!deal) notFound();
  const compensation = showCompensation
    ? await prisma.dealCompensation.findUnique({ where: { dealId: deal.id } })
    : null;
  const [developers, developments, properties, units, staff] = await Promise.all([
    prisma.developer.findMany({ orderBy: { name: "asc" } }),
    prisma.development.findMany({ orderBy: { name: "asc" } }),
    prisma.property.findMany({ orderBy: { name: "asc" } }),
    prisma.unit.findMany({ orderBy: { name: "asc" } }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="grid max-w-3xl gap-12">
      <form action={upsertDeal} className="grid gap-4">
        <h1 className="font-display text-4xl">{deal.lead.name}</h1>
        <p className="text-sm text-muted">
          {deal.lead.email} · pipeline from buyer lead through completion. The buyer pays the developer or seller. MatriBhumi does not receive purchase funds.
        </p>
        <input type="hidden" name="id" value={deal.id} />
        <input type="hidden" name="leadId" value={deal.leadId} />
        <select name="developerId" defaultValue={deal.developerId ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3">
          <option value="">Developer</option>
          {developers.map((developer) => (
            <option key={developer.id} value={developer.id}>{developer.name}</option>
          ))}
        </select>
        <select name="developmentId" defaultValue={deal.developmentId ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3">
          <option value="">Development</option>
          {developments.map((development) => (
            <option key={development.id} value={development.id}>{development.name}</option>
          ))}
        </select>
        <select name="propertyId" defaultValue={deal.propertyId ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3">
          <option value="">Property</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>{property.name}</option>
          ))}
        </select>
        <select name="unitId" defaultValue={deal.unitId ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3">
          <option value="">Unit</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>{unit.name}</option>
          ))}
        </select>
        <select name="assignedAdvisorId" defaultValue={deal.assignedAdvisorId ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3">
          <option value="">Advisor</option>
          {staff.map((person) => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
        <select name="stage" defaultValue={deal.stage} className="h-11 border border-charcoal/15 bg-paper px-3">
          {dealStageValues.map((stage) => (
            <option key={stage} value={stage}>{pipelineLabel(stage)}</option>
          ))}
        </select>
        <select name="status" defaultValue={deal.status} className="h-11 border border-charcoal/15 bg-paper px-3">
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <input name="estimatedValue" defaultValue={deal.estimatedValue?.toString() ?? ""} placeholder="Estimated transaction value" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="currency" defaultValue={deal.currency} className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
          Developer referral date
          <input name="developerReferralAt" type="date" defaultValue={dateValue(deal.developerReferralAt)} className="h-11 border border-charcoal/15 bg-paper px-3" />
        </label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
          Viewing date
          <input name="viewingAt" type="date" defaultValue={dateValue(deal.viewingAt)} className="h-11 border border-charcoal/15 bg-paper px-3" />
        </label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
          Reservation date
          <input name="reservationAt" type="date" defaultValue={dateValue(deal.reservationAt)} className="h-11 border border-charcoal/15 bg-paper px-3" />
        </label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
          Contract date
          <input name="contractAt" type="date" defaultValue={dateValue(deal.contractAt)} className="h-11 border border-charcoal/15 bg-paper px-3" />
        </label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
          Completion date
          <input name="completionAt" type="date" defaultValue={dateValue(deal.completionAt)} className="h-11 border border-charcoal/15 bg-paper px-3" />
        </label>
        <textarea name="internalNotes" defaultValue={deal.internalNotes ?? ""} rows={4} className="border border-charcoal/15 bg-paper p-3 text-sm" />
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Update deal</button>
      </form>

      <section>
        <h2 className="font-display text-2xl">Transaction pipeline</h2>
        <p className="mt-2 text-sm text-muted">
          New lead → Contacted → Qualified → Shortlisted → Developer introduced → Viewing → Property selected → Reservation → Contract → Completion → Closed. Lost / withdrawn is a terminal stage. The buyer purchases from the developer or seller. MatriBhumi is not the seller.
        </p>
        <ol className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.14em]">
          {pipelineColumns.map((column) => (
            <li
              key={column.key}
              className={pipelineColumnForDeal(deal) === column.key ? "bg-charcoal px-3 py-2 text-ivory" : "border border-charcoal/15 px-3 py-2"}
            >
              {column.label}
            </li>
          ))}
        </ol>
        <form action={moveDealStage} className="mt-4 flex flex-wrap items-end gap-3">
          <input type="hidden" name="dealId" value={deal.id} />
          <select name="stage" defaultValue={deal.stage} className="h-11 border border-charcoal/15 px-3 text-sm">
            {dealStageValues.map((stage) => (
              <option key={stage} value={stage}>{pipelineLabel(stage)}</option>
            ))}
          </select>
          <button className="h-11 bg-charcoal px-4 text-[11px] uppercase tracking-[0.18em] text-ivory">Move stage</button>
        </form>
        <form action={selectPropertyForDeal} className="mt-6 grid gap-3 border border-charcoal/10 bg-paper p-5">
          <p className="text-sm text-muted">When the buyer chooses a listing, mark the property selected. This does not complete a sale.</p>
          <input type="hidden" name="dealId" value={deal.id} />
          <select name="propertyId" defaultValue={deal.propertyId ?? ""} required className="h-11 border border-charcoal/15 px-3 text-sm">
            <option value="">Select property</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>{property.name}</option>
            ))}
          </select>
          <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Mark property selected</button>
        </form>
      </section>

      <section>
        <h2 className="font-display text-2xl">Developer introductions</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {deal.introductions.map((item) => (
            <li key={item.id}>
              {item.developer.name} · {dateValue(item.introducedAt)} · {item.method} · {item.status}
              {item.contactPerson ? ` · ${item.contactPerson}` : ""}
            </li>
          ))}
        </ul>
        <form action={recordDeveloperIntroduction} className="mt-6 grid gap-3 border border-charcoal/10 bg-paper p-5">
          <input type="hidden" name="leadId" value={deal.leadId} />
          <input type="hidden" name="dealId" value={deal.id} />
          <select name="developerId" defaultValue={deal.developerId ?? ""} required className="h-11 border border-charcoal/15 px-3 text-sm">
            <option value="">Developer</option>
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>{developer.name}</option>
            ))}
          </select>
          <input name="introducedAt" type="date" className="h-11 border border-charcoal/15 px-3 text-sm" />
          <input name="contactPerson" placeholder="Contact person" className="h-11 border border-charcoal/15 px-3 text-sm" />
          <select name="method" defaultValue="EMAIL" className="h-11 border border-charcoal/15 px-3 text-sm">
            {introMethods.map((method) => (
              <option key={method}>{method}</option>
            ))}
          </select>
          <select name="status" defaultValue="SENT" className="h-11 border border-charcoal/15 px-3 text-sm">
            {introStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <textarea name="notes" placeholder="Notes" className="border border-charcoal/15 p-3 text-sm" />
          <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Record introduction</button>
        </form>
      </section>

      {showCompensation ? (
        <form action={upsertDealCompensation} className="grid gap-3 border border-charcoal/10 bg-paper p-5">
          <h2 className="font-display text-2xl">Expected {developerFeeLabel()}</h2>
          <p className="text-sm text-muted">
            Amount MatriBhumi expects from the developer after a successful transaction. Separate from the buyer&apos;s purchase price. Admin only.
          </p>
          <input type="hidden" name="dealId" value={deal.id} />
          <select name="compensationType" defaultValue={compensation?.compensationType ?? "PERCENTAGE"} className="h-11 border border-charcoal/15 px-3 text-sm">
            {compensationTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <select name="agreementStatus" defaultValue={compensation?.agreementStatus ?? "DRAFT"} className="h-11 border border-charcoal/15 px-3 text-sm">
            {agreementStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <input name="agreementReference" defaultValue={compensation?.agreementReference ?? ""} placeholder="Agreement reference" className="h-11 border border-charcoal/15 px-3 text-sm" />
          <input name="percentage" defaultValue={compensation?.percentage?.toString() ?? ""} placeholder="Percentage" className="h-11 border border-charcoal/15 px-3 text-sm" />
          <input name="expectedAmount" defaultValue={compensation?.expectedAmount?.toString() ?? ""} placeholder="Expected amount" className="h-11 border border-charcoal/15 px-3 text-sm" />
          <input name="currency" defaultValue={compensation?.currency ?? "USD"} className="h-11 border border-charcoal/15 px-3 text-sm" />
          <select name="paymentStatus" defaultValue={compensation?.paymentStatus ?? "NOT_DUE"} className="h-11 border border-charcoal/15 px-3 text-sm">
            {paymentStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <input name="paymentDate" type="date" defaultValue={dateValue(compensation?.paymentDate)} className="h-11 border border-charcoal/15 px-3 text-sm" />
          <input name="transactionReference" defaultValue={compensation?.transactionReference ?? ""} placeholder="Transaction reference" className="h-11 border border-charcoal/15 px-3 text-sm" />
          <textarea name="internalNotes" defaultValue={compensation?.internalNotes ?? ""} className="border border-charcoal/15 p-3 text-sm" />
          <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Save compensation</button>
        </form>
      ) : (
        <p className="text-sm text-muted">Developer compensation for this deal is visible to administrators only.</p>
      )}
      {deal.assignedAdvisor ? <p className="text-sm text-muted">Advisor: {deal.assignedAdvisor.name}. Updated {formatDate(deal.updatedAt)}.</p> : null}
    </div>
  );
}
