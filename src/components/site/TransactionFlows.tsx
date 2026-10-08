import { transactionFlows } from "@/config/legal";
import { cn } from "@/lib/utils";

export function TransactionFlows({ tone = "light" }: { tone?: "light" | "mist" | "dark" }) {
  const dark = tone === "dark";
  const flows = [transactionFlows.buyerPurchase, transactionFlows.developerCommercial];
  return (
    <section
      className={cn(
        "px-4 py-16 sm:px-6 md:px-12 md:py-24",
        tone === "mist" && "bg-mist",
        dark && "bg-charcoal text-ivory",
      )}
    >
      <p className={cn("text-[11px] uppercase tracking-[0.28em]", dark ? "text-sand" : "text-earth")}>
        Transparency
      </p>
      <h2 className="font-display mt-3 text-[1.85rem] leading-[1.15] sm:text-4xl">
        {transactionFlows.title}
      </h2>
      <p className={cn("mt-6 max-w-3xl text-lg leading-8", dark ? "text-ivory/80" : "text-muted")}>
        {transactionFlows.intro}
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {flows.map((flow) => (
          <article
            key={flow.title}
            className={cn("border p-6 md:p-8", dark ? "border-ivory/15" : "border-charcoal/10 bg-ivory")}
          >
            <h3 className="font-display text-2xl">{flow.title}</h3>
            <p className={cn("mt-5 text-sm uppercase tracking-[0.12em]", dark ? "text-sand" : "text-earth")}>
              {flow.steps.join(" → ")}
            </p>
            <p className={cn("mt-4 text-sm leading-7", dark ? "text-ivory/70" : "text-muted")}>{flow.note}</p>
          </article>
        ))}
      </div>
      <p className={cn("mt-8 max-w-3xl text-sm leading-7", dark ? "text-ivory/65" : "text-muted")}>
        {transactionFlows.funds}
      </p>
    </section>
  );
}
