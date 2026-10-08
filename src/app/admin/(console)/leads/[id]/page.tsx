import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  addShortlistItem,
  recordDeveloperIntroduction,
  removeShortlistItem,
  updateLeadStatus,
  updateShortlistItem,
  upsertDeal,
} from "@/app/actions/admin";
import { rankPropertyMatches } from "@/lib/matching";
import { OPERATING_COUNTRY } from "@/lib/markets";
import { formatPrice, statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "VIEWING_SCHEDULED", "NEGOTIATION", "CONVERTED", "CLOSED"];
const qualifications = ["UNQUALIFIED", "QUALIFYING", "QUALIFIED", "DISQUALIFIED"];
const purposes = ["PRIMARY_RESIDENCE", "SECOND_HOME", "RELOCATION", "INVESTMENT", "OTHER"];
const introMethods = ["EMAIL", "PHONE", "WHATSAPP", "MEETING", "OTHER"];
const introStatuses = ["PLANNED", "SENT", "CONFIRMED", "COMPLETED", "CANCELLED"];

function dateValue(value?: Date | null) {
  if (!value) return "";
  return value.toISOString().slice(0, 10);
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lead, staff, properties, developers] = await Promise.all([
    prisma.lead.findUnique({
      where: { id },
      include: {
        property: true,
        developer: true,
        development: true,
        assignedStaff: true,
        deals: true,
        shortlistItems: {
          include: { property: true, developer: true, development: true },
          orderBy: { createdAt: "desc" },
        },
        introductions: { include: { developer: true }, orderBy: { introducedAt: "desc" } },
      },
    }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
    prisma.property.findMany({
      where: { published: true, location: { country: OPERATING_COUNTRY } },
      include: { location: true },
      orderBy: { name: "asc" },
    }),
    prisma.developer.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!lead) notFound();

  const ranked = rankPropertyMatches(
    {
      preferredCity: lead.preferredCity,
      preferredMarket: lead.preferredMarket,
      propertyType: lead.propertyType,
      budget: lead.budget,
      budgetMin: lead.budgetMin?.toString() ?? null,
      budgetMax: lead.budgetMax?.toString() ?? null,
      bedrooms: lead.bedrooms,
      developerId: lead.developerId,
      developmentId: lead.developmentId,
    },
    properties.map((property) => ({
      id: property.id,
      name: property.name,
      type: property.type,
      status: property.status,
      startingPrice: property.startingPrice.toString(),
      bedroomsMin: property.bedroomsMin,
      bedroomsMax: property.bedroomsMax,
      developerId: property.developerId,
      developmentId: property.developmentId,
      location: property.location,
    })),
  ).slice(0, 12);
  const openDeal = lead.deals.find((deal) => deal.status === "OPEN") ?? lead.deals[0];

  return (
    <div className="grid max-w-5xl gap-12">
      <div>
        <h1 className="font-display text-4xl">{lead.name}</h1>
        <p className="mt-2 text-sm text-muted">{lead.email} · {lead.phone} · {lead.country}</p>
        <p className="mt-2 text-sm text-earth">
          {lead.source} · {lead.preferredCity ?? "—"}, {lead.preferredMarket ?? "—"} · {lead.propertyType ?? "type open"} · {lead.budget ?? "budget open"} {lead.currency}
        </p>
        <p className="mt-6 leading-7">{lead.message}</p>
        {lead.property ? <p className="mt-4 text-sm text-earth">Property: {lead.property.name}</p> : null}
        {lead.developer ? <p className="text-sm text-earth">Developer referral: {lead.developer.name}</p> : null}
        {lead.deals.length ? (
          <ul className="mt-4 text-sm">
            {lead.deals.map((deal) => (
              <li key={deal.id}>
                <Link href={`/admin/deals/${deal.id}`}>Deal {statusLabel(deal.stage)} · {deal.status}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <form action={upsertDeal} className="mt-4">
            <input type="hidden" name="leadId" value={lead.id} />
            <input type="hidden" name="developerId" value={lead.developerId ?? ""} />
            <input type="hidden" name="developmentId" value={lead.developmentId ?? ""} />
            <input type="hidden" name="propertyId" value={lead.propertyId ?? ""} />
            <button className="text-[11px] uppercase tracking-[0.16em] text-earth">Open deal</button>
          </form>
        )}
      </div>

      <form action={updateLeadStatus} className="grid max-w-2xl gap-4">
        <input type="hidden" name="id" value={lead.id} />
        <select name="status" defaultValue={lead.status} className="h-11 border border-charcoal/15 bg-paper px-3">
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select name="qualificationStatus" defaultValue={lead.qualificationStatus} className="h-11 border border-charcoal/15 bg-paper px-3">
          {qualifications.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select name="purpose" defaultValue={lead.purpose ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3">
          <option value="">Purpose</option>
          {purposes.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select name="assignedStaffId" defaultValue={lead.assignedStaffId ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3">
          <option value="">Assigned staff</option>
          {staff.map((person) => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
        <input name="buyerCity" defaultValue={lead.buyerCity ?? ""} placeholder="Buyer city" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="nationality" defaultValue={lead.nationality ?? ""} placeholder="Nationality (optional)" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="residenceCountry" defaultValue={lead.residenceCountry ?? ""} placeholder="Residence country" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="preferredMarket" defaultValue={lead.preferredMarket ?? ""} placeholder="Preferred market" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="preferredCity" defaultValue={lead.preferredCity ?? ""} placeholder="Preferred city" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="timeline" defaultValue={lead.timeline ?? ""} placeholder="Timeline" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="financingStatus" defaultValue={lead.financingStatus ?? ""} placeholder="Financing status" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="bedrooms" defaultValue={lead.bedrooms ?? ""} placeholder="Bedrooms" className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <input name="nextFollowUpAt" type="date" defaultValue={dateValue(lead.nextFollowUpAt)} className="h-11 border border-charcoal/15 bg-paper px-3 text-sm" />
        <textarea name="notes" defaultValue={lead.notes ?? ""} rows={4} className="border border-charcoal/15 bg-paper p-3" />
        <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Update</button>
      </form>

      <section>
        <h2 className="font-display text-3xl">Matching</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Advisor screening score against published Bangladesh listings. This is not an AI recommendation, valuation, or legal opinion.
        </p>
        <ul className="mt-6 divide-y divide-charcoal/10">
          {ranked.map(({ property: matchProperty, match }) => {
            const listing = properties.find((row) => row.id === matchProperty.id);
            if (!listing) return null;
            return (
              <li key={listing.id} className="grid gap-3 py-4 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-medium">{listing.name}</p>
                  <p className="text-sm text-muted">
                    {listing.location.city} · {statusLabel(listing.type)} · {formatPrice(listing.startingPrice, listing.currency)} · {match.percent}% match
                  </p>
                  <p className="mt-1 text-xs text-muted">{match.reasons.join(" ")}</p>
                </div>
                <form action={addShortlistItem} className="grid gap-2">
                  <input type="hidden" name="leadId" value={lead.id} />
                  <input type="hidden" name="propertyId" value={listing.id} />
                  <input name="advisorRecommendation" placeholder="Advisor note" className="h-10 border border-charcoal/15 px-3 text-sm" />
                  <button className="h-10 bg-charcoal px-3 text-[11px] uppercase tracking-[0.16em] text-ivory">Add to shortlist</button>
                </form>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-3xl">Shortlist</h2>
        {lead.shortlistItems.length ? (
          <ul className="mt-6 grid gap-6">
            {lead.shortlistItems.map((item) => (
              <li key={item.id} className="border border-charcoal/10 bg-paper p-5">
                <p className="font-medium">{item.property.name}</p>
                <p className="text-sm text-muted">
                  {item.developer?.name ?? "Developer unpublished"} · {item.development?.name ?? "—"} · {item.locationNote}
                </p>
                <p className="mt-2 text-sm">
                  {item.estimatedPrice ? formatPrice(item.estimatedPrice, item.currency) : "Price to confirm"}
                </p>
                {item.keyFeatures ? <p className="mt-2 text-sm text-muted">{item.keyFeatures}</p> : null}
                <form action={updateShortlistItem} className="mt-4 grid gap-3">
                  <input type="hidden" name="id" value={item.id} />
                  <input name="estimatedPrice" defaultValue={item.estimatedPrice?.toString() ?? ""} placeholder="Estimated price" className="h-10 border border-charcoal/15 px-3 text-sm" />
                  <input name="currency" defaultValue={item.currency} className="h-10 border border-charcoal/15 px-3 text-sm" />
                  <input name="locationNote" defaultValue={item.locationNote ?? ""} placeholder="Location" className="h-10 border border-charcoal/15 px-3 text-sm" />
                  <input name="keyFeatures" defaultValue={item.keyFeatures ?? ""} placeholder="Key features" className="h-10 border border-charcoal/15 px-3 text-sm" />
                  <textarea name="notes" defaultValue={item.notes ?? ""} placeholder="Notes" className="border border-charcoal/15 p-3 text-sm" />
                  <textarea name="advisorRecommendation" defaultValue={item.advisorRecommendation ?? ""} placeholder="Advisor recommendation" className="border border-charcoal/15 p-3 text-sm" />
                  <button className="h-10 bg-charcoal text-[11px] uppercase tracking-[0.16em] text-ivory">Save shortlist item</button>
                </form>
                <form action={removeShortlistItem} className="mt-2">
                  <input type="hidden" name="id" value={item.id} />
                  <button className="text-[11px] uppercase tracking-[0.16em] text-muted">Remove</button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">No shortlist yet. Add listings from matching above.</p>
        )}
      </section>

      <section>
        <h2 className="font-display text-3xl">Developer introduction</h2>
        <p className="mt-2 text-sm text-muted">Record when the buyer is introduced to the developer of record. MatriBhumi is not the seller.</p>
        <ul className="mt-4 space-y-2 text-sm">
          {lead.introductions.map((item) => (
            <li key={item.id}>
              {item.developer.name} · {dateValue(item.introducedAt)} · {item.method} · {item.status}
              {item.contactPerson ? ` · ${item.contactPerson}` : ""}
            </li>
          ))}
        </ul>
        <form action={recordDeveloperIntroduction} className="mt-6 grid max-w-xl gap-3 border border-charcoal/10 bg-paper p-5">
          <input type="hidden" name="leadId" value={lead.id} />
          {openDeal ? <input type="hidden" name="dealId" value={openDeal.id} /> : null}
          <select name="developerId" required className="h-11 border border-charcoal/15 px-3 text-sm">
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
    </div>
  );
}
