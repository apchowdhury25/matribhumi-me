import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PublicShell>
      <section className="px-4 pb-20 pt-32 sm:px-6 md:px-12 md:pt-40">
        <p className="text-[11px] uppercase tracking-[0.22em] text-earth">404</p>
        <h1 className="font-display mt-4 text-[2.1rem] sm:text-5xl">This page is not on the map.</h1>
        <p className="mt-4 max-w-lg text-muted">The address may have moved, or it never existed on this demonstration site.</p>
        <Button href="/" className="mt-8 w-full sm:w-auto">Back to home</Button>
      </section>
    </PublicShell>
  );
}
