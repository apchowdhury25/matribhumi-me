import Link from "next/link";

export function LocationBreadcrumb({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.16em] text-ivory/70">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">→</span> : null}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-ivory">
                {item.name}
              </Link>
            ) : (
              <span className={index === items.length - 1 ? "text-sand" : undefined}>{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LocationBreadcrumbOnLight({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.16em] text-earth">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">→</span> : null}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-charcoal">
                {item.name}
              </Link>
            ) : (
              <span className={index === items.length - 1 ? "text-charcoal" : undefined}>{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
