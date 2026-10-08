import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser, canViewCompensation } from "@/lib/auth";
import { upsertDeveloper, upsertDeveloperCompensation, upsertPartnership } from "@/app/actions/admin";
import { formatDate, statusLabel } from "@/lib/format";

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
  const developer = await prisma.developer.findUnique({
    where: { id },
    include: {
      partnerships: {
        orderBy: { createdAt: "desc" },
        include: showCompensation ? { compensations: { orderBy: { createdAt: "desc" } } } : undefined,
      },
    },
  });
  if (!developer) notFound();

  return (
    <div className="grid max-w-5xl gap-12">
      <form action={upsertDeveloper} className="grid max-w-3xl gap-4">
        <h1 className="font-display text-4xl">{developer.name}</h1>
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
              {"compensations" in partnership && Array.isArray(partnership.compensations)
                ? partnership.compensations.map((row) => (
                    <p key={row.id} className="mt-2 text-earth">
                      Compensation {row.compensationType}
                      {row.percentage != null ? ` · ${row.percentage}%` : ""}
                      {row.fixedAmount != null ? ` · ${row.fixedAmount} ${row.currency}` : ""}
                      · {row.paymentStatus}
                    </p>
                  ))
                : null}
            </li>
          ))}
        </ul>
        <form action={upsertPartnership} className="mt-6 grid max-w-xl gap-3 border border-charcoal/10 bg-paper p-5">
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
        </form>
        {showCompensation ? (
          <form action={upsertDeveloperCompensation} className="mt-6 grid max-w-xl gap-3 border border-charcoal/10 bg-paper p-5">
            <h3 className="font-display text-2xl">Record compensation terms</h3>
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
          <p className="mt-6 text-sm text-muted">Compensation terms are visible to administrators only.</p>
        )}
      </section>
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
