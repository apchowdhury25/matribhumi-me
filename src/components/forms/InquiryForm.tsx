"use client";

import { useActionState } from "react";
import { submitLead } from "@/app/actions/public";
import { Button } from "@/components/ui/button";

const initial = { ok: false, error: "" };

const inquiryTypes = [
  { value: "GENERAL", label: "General" },
  { value: "SALES", label: "Sales" },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "MEDIA", label: "Media" },
  { value: "CAREER", label: "Career" },
] as const;

export function InquiryForm({
  propertyId,
  inquiryType = "SALES",
  showTypeSelect = false,
}: {
  propertyId?: string;
  inquiryType?: "GENERAL" | "SALES" | "PARTNERSHIP" | "MEDIA" | "CAREER";
  showTypeSelect?: boolean;
}) {
  const [state, action, pending] = useActionState(submitLead, initial);

  if (state.ok) {
    return (
      <div className="border border-moss/20 bg-mist p-6 text-sm leading-7 text-charcoal">
        Thank you. A member of the MatriBhumi team will be in touch about how
        you might use a home in Bangladesh — for a visit or a longer stay. This
        is a demonstration inquiry and does not create a contractual
        relationship.
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-4">
      {showTypeSelect ? (
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
          Inquiry type
          <select
            name="inquiryType"
            defaultValue={inquiryType}
            className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base tracking-normal text-charcoal"
          >
            {inquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <input type="hidden" name="inquiryType" value={inquiryType} />
      )}
      {propertyId ? <input type="hidden" name="propertyId" value={propertyId} /> : null}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <Field name="name" label="Name" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone" required />
      <Field name="country" label="Country" required />
      {!propertyId ? <Field name="property" label="Property of interest" /> : null}
      <Field name="budget" label="Budget (optional)" />
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Preferred contact
        <select name="contactMethod" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base tracking-normal text-charcoal">
          <option value="EMAIL">Email</option>
          <option value="PHONE">Phone</option>
          <option value="WHATSAPP">WhatsApp</option>
        </select>
      </label>
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Message
        <textarea name="message" required minLength={10} rows={5} className="w-full border border-charcoal/15 bg-paper p-3 text-base tracking-normal text-charcoal" />
      </label>
      <label className="flex items-start gap-3 text-sm normal-case tracking-normal text-muted">
        <input type="checkbox" name="consent" value="true" required className="mt-1" />
        I agree to MatriBhumi storing this inquiry to respond to my request.
      </label>
      {state.error ? <p className="text-sm text-red-800">{state.error}</p> : null}
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Request Information"}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base tracking-normal text-charcoal"
      />
    </label>
  );
}
