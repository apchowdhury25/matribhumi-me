"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="px-6 py-32 md:px-12">
      <h1 className="font-display text-5xl">Something went wrong.</h1>
      <p className="mt-4 max-w-lg text-muted">The page could not be completed. Try again, or return home.</p>
      <div className="mt-8 flex gap-4">
        <Button type="button" onClick={reset}>Try again</Button>
        <Button href="/" variant="outline">Home</Button>
      </div>
    </section>
  );
}
