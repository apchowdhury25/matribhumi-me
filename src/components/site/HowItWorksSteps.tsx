import { howItWorksSteps } from "@/config/site";
import { cn } from "@/lib/utils";

export function HowItWorksSteps({ light = false }: { light?: boolean }) {
  return (
    <ol className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {howItWorksSteps.map((item) => (
        <li
          key={item.step}
          className={cn(
            "border p-6 md:p-8",
            light ? "border-ivory/15 bg-charcoal" : "border-charcoal/10 bg-paper",
          )}
        >
          <p className={cn("font-mono text-sm", light ? "text-sand" : "text-earth")}>{item.step}</p>
          <h3 className={cn("font-display mt-3 text-2xl leading-snug", light ? "text-ivory" : "text-charcoal")}>
            {item.title}
          </h3>
          <p className={cn("mt-3 text-sm leading-7", light ? "text-ivory/70" : "text-muted")}>{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
