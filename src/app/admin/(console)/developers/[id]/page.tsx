import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser, canAccessSales, canEditDevelopers, canViewCompensation } from "@/lib/auth";
import { addFollowUp, upsertDeveloper, upsertDeveloperCompensation, upsertPartnership } from "@/app/actions/admin";
import { formatDate, formatPrice, statusLabel } from "@/lib/format";
import { attentionReasons } from "@/lib/crm";
import { developerFeeLabel } from "@/config/businessModel";
import Link from "next/link";

export const dynamic = "force-dynamic";

const developerStatuses = ["PROSPECT", "ACTIVE", "PAUSED", "ENDED"];
const partnershipStatuses = ["PROSPECT", "UNDER_REVIEW", "ACTIVE", "PAUSED", "ENDED"];
const compensationTypes = ["PERCENTAGE", "FIXED", "HYBRID", "OTHER"];
const agreementStatuses = ["DRAFT", "AGREED", "ACTIVE", "EXPIRED"];
const paymentStatuses = ["NOT_DUE", "EXPECTED", "INVOICED", "PAID", "WRITTEN_OFF"];

function asList(value: unknown) {
  return Array.isArray(value) ? value.map(String).join(", ") : "";
}

function dateValue(value?: Date | null) {
  if (!value) return "";
  return value.toISOString().slice(0, 10);
}

export default async function AdminDeveloperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const showCompensation = Boolean(user && canViewCompensation(user.role));
  const showSalesTools = Boolean(user && canAccessSales(user.role));
  const canEdit = Boolean(user && canEditDevelopers(user.role));
  const developer = await prisma.developer.findUnique({
    where: { id },
    include: {
      partnerships: {
        orderBy: { createdAt: "desc" },
        include: showCompensation ? { compensations: { orderBy: { createdAt: "desc" } } } : undefined,
      },
      developments: { orderBy: { name: "asc" } },
      properties: { where: { published: true }, orderBy: { name: "asc" }, include: { location: true } },
      referredLeads: { orderBy: { createdAt: "desc" }, take: 20 },
      deals: { include: { lead: true, property: true }, orderBy: { updatedAt: "desc" } },
      followUps: { include: { assignedAdvisor: true }, orderBy: { dueAt: "asc" } },
    },
  });
  if (!developer) notFound();
  const staff = showSalesTools ? await prisma.user.findMany({ orderBy: { name: "asc" } }) : [];
  const attention = attentionReasons(developer);
  const activeDeals = developer.deals.filter((deal) => deal.status === "OPEN");
  const completedDeals = developer.deals.filter((deal) => deal.stage === "CLOSED" || deal.status === "WON");
  const feeTerm = developerFeeLabel({ capitalize: true });

  return (
    <div className="grid max-w-5xl gap-12">
      {canEdit ? (
      <form action={upsertDeveloper} className="grid max-w-3xl gap-4">
        <h1 className="font-display text-4xl">{developer.name}</h1>
        <p className="text-sm text-muted">Developer CRM · relationship {statusLabel(developer.status)}{developer.verified ? " · verified" : ""}</p>
        {attention.length ? <p className="text-sm text-earth">{attention.join(" ")}</p> : null}
        <input type="hidden" name="id" value={developer.id} />
        <Field name="name" label="Company name" defaultValue={developer.name} />
        <Field name="slug" label="Slug" defaultValue={developer.slug} />
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
          Description
          <textarea name="description" defaultValue={developer.description} rows={4} className="border border-charcoal/15 bg-paper p-3 text-sm" />
        </label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
          Public description
          <textarea name="publicDescription" defaultValue={developer.publicDescription} rows={4} className="border border-charcoal/15 bg-paper p-3 text-sm" />
        </label>
        <Field name="website" label="Website" defaultValue={developer.website ?? ""} />
        <Field name="logoUrl" label="Logo URL" defaultValue={developer.logoUrl ?? ""} />
        <Field name="country" label="Country" defaultValue={developer.country} />
        <Field name="cities" label="Cities" defaultValue={asList(developer.cities)} />
        <Field name="contactName" label="Contact name" defaultValue={developer.contactName ?? ""} />
        <Field name="contactEmail" label="Contact email" defaultValue={developer.contactEmail ?? ""} />
        <Field name="contactPhone" label="Contact phone" defaultValue={developer.contactPhone ?? ""} />
        <select name="status" defaultValue={developer.status} className="h-11 border border-charcoal/15 bg-paper px-3">
          {developerStatuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <label className="text-sm"><input type="checkbox" name="published" defaultChecked={developer.published} /> Published</label>
        <label className="text-sm"><input type="checkbox" name="verified" defaultChecked={developer.verified} /> Verified / approved</label>
        <label className="text-sm"><input type="checkbox" name="featured" defaultChecked={developer.featured} /> Featured</label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
          Relationship notes
          <textarea name="relationshipNotes" defaultValue={developer.relationshipNotes ?? ""} rows={3} className="border border-charcoal/15 bg-paper p-3 text-sm" />
        </label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
          Internal notes
          <textarea name="internalNotes" defaultValue={developer.internalNotes ?? ""} rows={3} className="border border-charcoal/15 bg-paper p-3 text-sm" />
        </label>
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Save developer</button>
      </form>
      ) : (
        <div>
          <h1 className="font-display text-4xl">{developer.name}</h1>
          <p className="mt-2 text-sm text-muted">Developer CRM · relationship {statusLabel(developer.status)}{developer.verified ? " · verified" : ""}</p>
          {attention.length ? <p className="mt-2 text-sm text-earth">{attention.join(" ")}</p> : null}
          <dl className="mt-6 grid gap-2 text-sm md:grid-cols-2">
            <div><span className="text-earth">Country</span> · {developer.country}</div>
            <div><span className="text-earth">Markets</span> · {asList(developer.cities) || "—"}</div>
            <div><span className="text-earth">Website</span> · {developer.website || "—"}</div>
            <div><span className="text-earth">Contact</span> · {developer.contactName || "—"}</div>
          </dl>
          {developer.relationshipNotes ? <p className="mt-4 text-sm">{developer.relationshipNotes}</p> : null}
          {developer.internalNotes ? <p className="mt-2 text-sm text-muted">{developer.internalNotes}</p> : null}
          <p className="mt-4 text-sm text-muted">Profile edits are limited to administrators and editors.</p>
        </div>
      )}

      <section>
        <h2 className="font-display text-3xl">Partnerships</h2>
        <ul className="mt-6 divide-y divide-charcoal/10">
          {developer.partnerships.map((partnership) => (
            <li key={partnership.id} className="py-4 text-sm">
              <p className="font-medium">{statusLabel(partnership.relationshipStatus)} · {partnership.active ? "Active" : "Inactive"}</p>
              <p className="text-muted">Markets: {asList(partnership.markets) || "—"}</p>
              <p className="text-muted">
                {partnership.startDate ? formatDate(partnership.startDate) : "No start"} — {partnership.endDate ? formatDate(partnership.endDate) : "Open"}
              </p>
              {showCompensation && partnership.agreementReference ? (
                <p className="mt-2 text-earth">Agreement: {partnership.agreementReference}</p>
              ) : null}
              {showCompensation && "compensations" in partnership && Array.isArray(partnership.compensations)
                ? partnership.compensations.map((row) => (
                    <p key={row.id} className="mt-2 text-earth">
                      {feeTerm} {row.compensationType}
                      {row.percentage != null ? ` · ${row.percentage}%` : ""}
                      {row.fixedAmount != null ? ` · ${row.fixedAmount} ${row.currency}` : ""}
                      · {row.paymentStatus}
                    </p>
                  ))
                : null}
            </li>
          ))}
        </ul>
        {canEdit ? <form action={upsertPartnership} className="mt-6 grid max-w-xl gap-3 border border-charcoal/10 bg-paper p-5">
          <h3 className="font-display text-2xl">Add partnership</h3>
          <input type="hidden" name="developerId" value={developer.id} />
          <select name="relationshipStatus" defaultValue="PROSPECT" className="h-11 border border-charcoal/15 px-3 text-sm">
            {partnershipStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <input name="markets" defaultValue="Bangladesh" className="h-11 border border-charcoal/15 px-3 text-sm" />
          <input name="startDate" type="date" className="h-11 border border-charcoal/15 px-3 text-sm" />
          <input name="endDate" type="date" className="h-11 border border-charcoal/15 px-3 text-sm" />
          {showCompensation ? (
            <input name="agreementReference" placeholder="Agreement reference (admin only)" className="h-11 border border-charcoal/15 px-3 text-sm" />
          ) : null}
          <textarea name="internalNotes" placeholder="Internal notes" className="border border-charcoal/15 p-3 text-sm" />
          <label className="text-sm"><input type="checkbox" name="active" defaultChecked /> Active</label>
          <label className="text-sm"><input type="checkbox" name="publicVisibility" /> Public visibility</label>
          <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Save partnership</button>
        </form> : null}
        {showCompensation ? (
          <form action={upsertDeveloperCompensation} className="mt-6 grid max-w-xl gap-3 border border-charcoal/10 bg-paper p-5">
            <h3 className="font-display text-2xl">Record {feeTerm.toLowerCase()} terms</h3>
            <p className="text-sm text-muted">Admin only. These terms are never shown on public pages or public APIs.</p>
            <select name="partnershipId" className="h-11 border border-charcoal/15 px-3 text-sm">
              {developer.partnerships.map((partnership) => (
                <option key={partnership.id} value={partnership.id}>
                  {statusLabel(partnership.relationshipStatus)} · {dateValue(partnership.createdAt)}
                </option>
              ))}
            </select>
            <select name="compensationType" className="h-11 border border-charcoal/15 px-3 text-sm">
              {compensationTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <select name="agreementStatus" defaultValue="DRAFT" className="h-11 border border-charcoal/15 px-3 text-sm">
              {agreementStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <input name="agreementReference" placeholder="Agreement reference" className="h-11 border border-charcoal/15 px-3 text-sm" />
            <input name="percentage" placeholder="Percentage" className="h-11 border border-charcoal/15 px-3 text-sm" />
            <input name="fixedAmount" placeholder="Fixed amount" className="h-11 border border-charcoal/15 px-3 text-sm" />
            <input name="currency" defaultValue="USD" className="h-11 border border-charcoal/15 px-3 text-sm" />
            <select name="paymentStatus" defaultValue="NOT_DUE" className="h-11 border border-charcoal/15 px-3 text-sm">
              {paymentStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <input name="paymentDate" type="date" className="h-11 border border-charcoal/15 px-3 text-sm" />
            <input name="transactionReference" placeholder="Transaction reference" className="h-11 border border-charcoal/15 px-3 text-sm" />
            <textarea name="internalNotes" placeholder="Internal notes" className="border border-charcoal/15 p-3 text-sm" />
            <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Save compensation</button>
          </form>
        ) : (
          <p className="mt-6 text-sm text-muted">{feeTerm} terms are visible to administrators only.</p>
        )}
      </section>

      <section>
        <h2 className="font-display text-3xl">Markets and catalogue</h2>
        <p className="mt-2 text-sm text-muted">Markets: {asList(developer.cities) || developer.country}</p>
        <h3 className="mt-6 font-display text-2xl">Developments</h3>
        <ul className="mt-2 text-sm">
          {developer.developments.length ? developer.developments.map((item) => (
            <li key={item.id}>{item.name}</li>
          )) : <li className="text-muted">No developments recorded.</li>}
        </ul>
        <h3 className="mt-6 font-display text-2xl">Active listings</h3>
        <ul className="mt-2 text-sm">
          {developer.properties.length ? developer.properties.map((item) => (
            <li key={item.id}>{item.name} · {item.location.city} · {formatPrice(item.startingPrice, item.currency)}</li>
          )) : <li className="text-muted">No published listings.</li>}
        </ul>
      </section>

      {showSalesTools ? (
        <>
      <section>
        <h2 className="font-display text-3xl">Buyer referrals</h2>
        <ul className="mt-4 text-sm">
          {developer.referredLeads.length ? developer.referredLeads.map((lead) => (
            <li key={lead.id}><Link href={`/admin/leads/${lead.id}`}>{lead.name}</Link> · {lead.status} · {formatDate(lead.createdAt)}</li>
          )) : <li className="text-muted">No referred buyers yet.</li>}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-3xl">Transactions</h2>
        <h3 className="mt-4 font-display text-2xl">Active</h3>
        <ul className="mt-2 text-sm">
          {activeDeals.length ? activeDeals.map((deal) => (
            <li key={deal.id}><Link href={`/admin/deals/${deal.id}`}>{deal.lead.name}</Link> · {statusLabel(deal.stage)} · {deal.property?.name ?? "—"}</li>
          )) : <li className="text-muted">No active transactions.</li>}
        </ul>
        <h3 className="mt-6 font-display text-2xl">Completed</h3>
        <ul className="mt-2 text-sm">
          {completedDeals.length ? completedDeals.map((deal) => (
            <li key={deal.id}><Link href={`/admin/deals/${deal.id}`}>{deal.lead.name}</Link> · {statusLabel(deal.stage)}</li>
          )) : <li className="text-muted">No completed transactions.</li>}
        </ul>
      </section>
        </>
      ) : null}

      {showSalesTools ? (
      <section>
        <h2 className="font-display text-3xl">Follow-ups</h2>
        <ul className="mt-4 text-sm">
          {developer.followUps.map((item) => (
            <li key={item.id}>{item.task} · {formatDate(item.dueAt)} · {item.completed ? "Completed" : "Open"}</li>
          ))}
        </ul>
        <form action={addFollowUp} className="mt-6 grid max-w-xl gap-3 border border-charcoal/10 bg-paper p-5">
          <input type="hidden" name="developerId" value={developer.id} />
          <input name="dueAt" type="date" required className="h-11 border border-charcoal/15 px-3 text-sm" />
          <input name="task" required placeholder="Task" className="h-11 border border-charcoal/15 px-3 text-sm" />
          <select name="assignedAdvisorId" className="h-11 border border-charcoal/15 px-3 text-sm">
            <option value="">Advisor</option>
            {staff.map((person) => (
              <option key={person.id} value={person.id}>{person.name}</option>
            ))}
          </select>
          <textarea name="note" placeholder="Note" className="border border-charcoal/15 p-3 text-sm" />
          <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Create follow-up</button>
        </form>
      </section>
      ) : null}
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
      {label}
      <input name={name} defaultValue={defaultValue} className="h-11 border border-charcoal/15 bg-paper px-3 text-sm text-charcoal" />
    </label>
  );
}
