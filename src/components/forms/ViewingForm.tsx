"use client";

import { useActionState } from "react";
import { submitViewing } from "@/app/actions/public";
import { Button } from "@/components/ui/button";

const initial = { ok: false, error: "" };

export function ViewingForm({ propertyId }: { propertyId: string }) {
  const [state, action, pending] = useActionState(submitViewing, initial);
  if (state.ok) {
    return (
      <div className="border border-moss/20 bg-mist p-6 text-sm leading-7">
        Your viewing request has been received. A consultant will confirm availability.
        Demonstration only — no appointment is guaranteed.
      </div>
    );
  }
  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="propertyId" value={propertyId} />
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <Field name="name" label="Name" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone" required />
      <Field name="preferredDate" label="Preferred date" type="date" required />
      <Field name="preferredTime" label="Preferred time" type="time" required />
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Contact method
        <select name="contactMethod" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal">
          <option value="EMAIL">Email</option>
          <option value="PHONE">Phone</option>
          <option value="WHATSAPP">WhatsApp</option>
        </select>
      </label>
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Message
        <textarea name="message" rows={4} className="w-full border border-charcoal/15 bg-paper p-3 text-base text-charcoal" />
      </label>
      <label className="flex items-start gap-3 text-sm normal-case tracking-normal text-muted">
        <input type="checkbox" name="consent" value="true" required className="mt-1" />
        I agree to be contacted about this viewing request.
      </label>
      {state.error ? <p className="text-sm text-red-800">{state.error}</p> : null}
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Schedule a Viewing"}
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
