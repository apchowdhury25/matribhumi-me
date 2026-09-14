import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PublicShell>
      <section className="px-6 pb-24 pt-40 md:px-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-earth">404</p>
        <h1 className="font-display mt-4 text-5xl">This page is not on the map.</h1>
        <p className="mt-4 max-w-lg text-muted">The address may have moved, or it never existed on this demonstration site.</p>
        <Button href="/" className="mt-8">Back to home</Button>
      </section>
    </PublicShell>
  );
}
