import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export function PageHero({
  image,
  eyebrow,
  title,
  description,
  children,
  compact = false,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn("relative overflow-hidden", compact ? "min-h-[52vh]" : "min-h-[72vh]")}>
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/20" />
      <div className="relative flex min-h-inherit items-end px-6 pb-16 pt-32 md:px-12 md:pb-24">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="text-[11px] uppercase tracking-[0.3em] text-sand">{eyebrow}</p>
          ) : null}
          <h1 className="font-display mt-4 text-5xl leading-[0.95] text-ivory md:text-7xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/80">{description}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
      <div className="pointer-events-none absolute right-6 top-28 hidden opacity-40 md:block">
        <Logo variant="mark" className="h-10 w-10 text-ivory" />
      </div>
    </section>
  );
}
