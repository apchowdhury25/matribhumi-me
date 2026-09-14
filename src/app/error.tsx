"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="px-4 py-24 sm:px-6 md:px-12 md:py-32">
      <h1 className="font-display text-[2.1rem] sm:text-5xl">Something went wrong.</h1>
      <p className="mt-4 max-w-lg text-muted">The page could not be completed. Try again, or return home.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button type="button" onClick={reset} className="w-full sm:w-auto">Try again</Button>
        <Button href="/" variant="outline" className="w-full sm:w-auto">Home</Button>
      </div>
    </section>
  );
}
