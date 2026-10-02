import { legalCompliance } from "@/config/site";
import { cn } from "@/lib/utils";

export function LegalCompliance({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className={cn(dark ? "text-ivory" : "text-charcoal")}>
      <p className={cn("text-[11px] uppercase tracking-[0.24em]", dark ? "text-sand" : "text-earth")}>
        Legal & transparency
      </p>
      <h2 className="font-display mt-3 text-3xl md:text-4xl">Compliance, stated as it stands.</h2>
      <dl className="mt-8 grid gap-8 md:grid-cols-3">
        {legalCompliance.map((item) => (
          <div key={item.title} className={cn("border-t pt-5", dark ? "border-ivory/15" : "border-charcoal/10")}>
            <dt className="font-display text-2xl">{item.title}</dt>
            <dd className={cn("mt-3 text-sm leading-7", dark ? "text-ivory/70" : "text-muted")}>{item.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
