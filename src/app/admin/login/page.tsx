"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-charcoal px-4 sm:px-6">
      <form action={action} className="w-full max-w-md border border-ivory/10 bg-ink p-6 text-ivory sm:p-8">
        <Logo variant="dark" />
        <h1 className="font-display mt-8 text-4xl">Staff sign in</h1>
        <label className="mt-8 grid gap-2 text-[11px] uppercase tracking-[0.18em] text-sand">
          Email
          <input name="email" type="email" required className="h-12 bg-charcoal px-3 text-base text-ivory" />
        </label>
        <label className="mt-4 grid gap-2 text-[11px] uppercase tracking-[0.18em] text-sand">
          Password
          <input name="password" type="password" required className="h-12 bg-charcoal px-3 text-base text-ivory" />
        </label>
        {state.error ? <p className="mt-4 text-sm text-sand">{state.error}</p> : null}
        <Button type="submit" variant="invert" className="mt-8 w-full" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
