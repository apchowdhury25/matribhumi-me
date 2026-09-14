"use client";

import { useActionState } from "react";
import { submitApplication } from "@/app/actions/public";
import { Button } from "@/components/ui/button";

const initial = { ok: false, error: "" };

export function ApplicationForm({ jobId }: { jobId: string }) {
  const [state, action, pending] = useActionState(submitApplication, initial);

  if (state.ok) {
    return (
      <div className="border border-moss/20 bg-mist p-6 text-sm leading-7 text-charcoal">
        Your application has been received. This is a demonstration form and does
        not start a real hiring process.
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="jobId" value={jobId} />
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <Field name="name" label="Name" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone" required />
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Resume URL
        <input
          name="resumeUrl"
          type="url"
          required
          placeholder="https://"
          className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base tracking-normal text-charcoal"
        />
        <span className="normal-case tracking-normal text-muted">
          Paste a public link to your CV. File upload is not enabled on this demonstration site.
        </span>
      </label>
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
        Cover letter
        <textarea
          name="coverLetter"
          required
          minLength={40}
          rows={7}
          className="w-full border border-charcoal/15 bg-paper p-3 text-base tracking-normal text-charcoal"
        />
      </label>
      {state.error ? <p className="text-sm text-red-800">{state.error}</p> : null}
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Submit application"}
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
        className="h-11 border border-charcoal/15 bg-paper px-3 text-sm tracking-normal text-charcoal"
      />
    </label>
  );
}
