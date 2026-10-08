"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useActionState } from "react";
import { submitBrochure, submitWaitlist } from "@/app/actions/public";
import { Button } from "@/components/ui/button";
import { countryCodes } from "@/lib/countries";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Kind = "waitlist" | "brochure";

type Request = {
  kind: Kind;
  projectName?: string;
  key: number;
};

type LeadCaptureContextValue = {
  openWaitlist: (projectName?: string) => void;
  openBrochure: (projectName?: string) => void;
};

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

export function useLeadCapture() {
  const value = useContext(LeadCaptureContext);
  if (!value) {
    throw new Error("Lead capture is only available inside the public site.");
  }
  return value;
}

export function LeadCaptureProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<Request | null>(null);

  function open(kind: Kind, projectName?: string) {
    setRequest({ kind, projectName, key: Date.now() });
  }

  useEffect(() => {
    if (!request) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setRequest(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [request]);

  return (
    <LeadCaptureContext.Provider
      value={{
        openWaitlist: (projectName) => open("waitlist", projectName),
        openBrochure: (projectName) => open("brochure", projectName),
      }}
    >
      {children}
      {request ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center" role="presentation">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-charcoal/70"
            onClick={() => setRequest(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-capture-title"
            className="relative max-h-[92dvh] w-full overflow-y-auto bg-ivory px-5 py-8 shadow-lift sm:max-w-lg sm:px-8 sm:py-10"
          >
            <button
              type="button"
              onClick={() => setRequest(null)}
              className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.2em] text-earth"
            >
              Close
            </button>
            <CaptureForm
              key={request.key}
              kind={request.kind}
              projectName={request.projectName}
            />
          </div>
        </div>
      ) : null}
    </LeadCaptureContext.Provider>
  );
}

const initial = { ok: false, error: "" };

function CaptureForm({ kind, projectName }: { kind: Kind; projectName?: string }) {
  const action = kind === "waitlist" ? submitWaitlist : submitBrochure;
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (!state.ok || kind !== "brochure") return;
    const link = document.createElement("a");
    link.href = siteConfig.brochurePath;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.click();
  }, [state.ok, kind]);

  if (state.ok && kind === "waitlist") {
    return (
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-earth">Waitlist</p>
        <h2 id="lead-capture-title" className="font-display mt-3 text-4xl leading-tight">
          You are on the list.
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted">
          Floor plans, viewing slots, and developer updates for the projects you asked about will come to this email.
        </p>
      </div>
    );
  }

  if (state.ok && kind === "brochure") {
    return (
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-earth">Brochure</p>
        <h2 id="lead-capture-title" className="font-display mt-3 text-4xl leading-tight">
          Your portfolio is on its way.
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted">
          A note titled “Your MatriBhumi curated portfolio &amp; brochure” is on its way to your inbox, with the selected-project list and next steps.
        </p>
        <a
          href={siteConfig.brochurePath}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex text-[11px] uppercase tracking-[0.2em] text-earth"
        >
          Download the brochure
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-earth">
          {kind === "waitlist" ? "Waitlist" : "Portfolio"}
        </p>
        <h2 id="lead-capture-title" className="font-display mt-3 text-4xl leading-tight">
          {kind === "waitlist" ? "Join the waitlist." : "Download the brochure."}
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          {kind === "waitlist"
            ? "Hear first when curated floor plans, viewing slots, or developer updates are released."
            : "A shortlist of selected developer projects in Bangladesh — including Dhaka, Chattogram, and Bashundhara."}
        </p>
        {projectName ? <p className="mt-3 text-sm text-charcoal">{projectName}</p> : null}
      </div>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      {projectName ? <input type="hidden" name="project" value={projectName} /> : null}
      <Field name="name" label="Full name" autoComplete="name" required autoFocus />
      <Field name="email" label="Email" type="email" autoComplete="email" required />
      {kind === "waitlist" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
            <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
              Country code
              <select
                name="countryId"
                required
                defaultValue="BD"
                className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base tracking-normal text-charcoal"
              >
                {countryCodes.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.country} {entry.dial}
                  </option>
                ))}
              </select>
            </label>
            <Field name="phone" label="Phone" type="tel" autoComplete="tel-national" required />
          </div>
          <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
            Primary interest
            <select
              name="interest"
              required
              defaultValue="Holiday Home"
              className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base tracking-normal text-charcoal"
            >
              <option value="Holiday Home">Holiday Home</option>
              <option value="Retirement">Retirement</option>
              <option value="Investment">Investment</option>
            </select>
          </label>
        </>
      ) : null}
      <label className="flex items-start gap-3 text-sm normal-case tracking-normal text-muted">
        <input type="checkbox" name="consent" value="true" required className="mt-1" />
        I agree to MatriBhumi storing these details to send the brochure and respond about the pre-launch portfolio.
      </label>
      {state.error ? <p className="text-sm text-red-800">{state.error}</p> : null}
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : kind === "waitlist" ? "Join Waitlist" : "Download Brochure"}
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
  autoFocus,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-earth">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className="h-12 w-full border border-charcoal/15 bg-paper px-3 text-base tracking-normal text-charcoal"
      />
    </label>
  );
}

export function DualCta({
  projectName,
  tone = "light",
  className,
}: {
  projectName?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const { openWaitlist, openBrochure } = useLeadCapture();
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
      <Button
        type="button"
        variant={tone === "dark" ? "invert" : "primary"}
        className="w-full sm:w-auto"
        onClick={() => openWaitlist(projectName)}
      >
        Join Waitlist
      </Button>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-full sm:w-auto",
          tone === "dark" && "border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal",
        )}
        onClick={() => openBrochure(projectName)}
      >
        Download Brochure
      </Button>
    </div>
  );
}

export function BrochureButton({
  label = "Download Brochure",
  variant = "invert",
  size = "md",
  className,
}: {
  label?: string;
  variant?: "primary" | "invert" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { openBrochure } = useLeadCapture();
  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={() => openBrochure()}>
      {label}
    </Button>
  );
}

export function WaitlistButton({
  label = "Join Waitlist",
  variant = "primary",
  size = "md",
  className,
  projectName,
}: {
  label?: string;
  variant?: "primary" | "invert" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  projectName?: string;
}) {
  const { openWaitlist } = useLeadCapture();
  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={() => openWaitlist(projectName)}>
      {label}
    </Button>
  );
}
