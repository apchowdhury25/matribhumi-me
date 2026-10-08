"use client";

import { useActionState } from "react";
import { submitAdvisory } from "@/app/actions/public";
import { Button } from "@/components/ui/button";
import { BuyerFeeNotice } from "@/components/site/BuyerFeeNotice";
import { advisorFollowUpMessage } from "@/config/businessModel";
import { buyerCtas } from "@/config/ctas";
import {
  currencies,
  financingOptions,
  leadPurposes,
  propertyTypes,
  purchaseTimelines,
} from "@/lib/validations";
import { statusLabel } from "@/lib/format";

const initial = { ok: false, error: "" };

export function AdvisoryForm({
  developers,
  developments,
}: {
  developers: { id: string; name: string }[];
  developments: { id: string; name: string }[];
}) {
  const [state, action, pending] = useActionState(submitAdvisory, initial);

  if (state.ok) {
    return (
      <div className="border border-moss/20 bg-mist p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-earth">Request received</p>
        <h2 className="font-display mt-3 text-3xl">Thank you.</h2>
        <p className="mt-4 text-sm leading-7 text-charcoal">{advisorFollowUpMessage}</p>
        <BuyerFeeNotice className="mt-4" />
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-4">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <Field name="name" label="Name" required autoComplete="name" />
      <Field name="email" label="Email" type="email" required autoComplete="email" />
      <Field name="phone" label="WhatsApp / phone" required autoComplete="tel" />
      <Field name="residenceCountry" label="Country of residence" required autoComplete="country-name" />
      <input type="hidden" name="preferredMarket" value="Bangladesh" />
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Preferred country
        <input
          value="Bangladesh"
          readOnly
          className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal"
        />
      </label>
      <Field name="preferredCity" label="Preferred city" required />
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Property type
        <select name="propertyType" required defaultValue="APARTMENT" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal">
          {propertyTypes.map((type) => (
            <option key={type} value={type}>{statusLabel(type)}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="budget" label="Budget" required />
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
          Currency
          <select name="currency" defaultValue="BDT" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal">
            {currencies.map((code) => (
              <option key={code}>{code}</option>
            ))}
          </select>
        </label>
      </div>
      <Field name="bedrooms" label="Bedrooms" type="number" required />
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Purpose
        <select name="purpose" required defaultValue="PRIMARY_RESIDENCE" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal">
          {leadPurposes.map((purpose) => (
            <option key={purpose} value={purpose}>{statusLabel(purpose)}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Purchase timeline
        <select name="timeline" required defaultValue="3–6 months" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal">
          {purchaseTimelines.map((timeline) => (
            <option key={timeline}>{timeline}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Preferred contact method
        <select name="contactMethod" defaultValue="WHATSAPP" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal">
          <option value="WHATSAPP">WhatsApp</option>
          <option value="EMAIL">Email</option>
          <option value="PHONE">Phone</option>
        </select>
      </label>
      {developers.length ? (
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
          Preferred developer (optional)
          <select name="developerId" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal">
            <option value="">No preference</option>
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>{developer.name}</option>
            ))}
          </select>
        </label>
      ) : null}
      {developments.length ? (
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
          Specific project (optional)
          <select name="developmentId" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal">
            <option value="">No preference</option>
            {developments.map((development) => (
              <option key={development.id} value={development.id}>{development.name}</option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Financing requirement (optional)
        <select name="financingStatus" className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base text-charcoal">
          <option value="">Not specified</option>
          {financingOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Message
        <textarea name="message" required minLength={10} rows={5} className="w-full border border-charcoal/15 bg-paper p-3 text-base text-charcoal" />
      </label>
      <label className="flex items-start gap-3 text-sm normal-case tracking-normal text-muted">
        <input type="checkbox" name="consent" value="true" required className="mt-1" />
        I agree to MatriBhumi storing these requirements so an advisor can contact me. I do not need to provide nationality, passport, or financial documents at this stage.
      </label>
      {state.error ? <p className="text-sm text-red-800">{state.error}</p> : null}
      <BuyerFeeNotice />
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : buyerCtas.talkToAdvisor}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        min={type === "number" ? 0 : undefined}
        className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base tracking-normal text-charcoal"
      />
    </label>
  );
}
