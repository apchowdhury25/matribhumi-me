export function DemoInventoryNotice({
  kind = "listing",
}: {
  kind?: "listing" | "development" | "article" | "role";
}) {
  const label =
    kind === "article"
      ? "Demonstration article"
      : kind === "role"
        ? "Demonstration role"
        : kind === "development"
          ? "Demonstration development"
          : "Demonstration listing";
  return (
    <p
      role="note"
      className="border border-earth/35 bg-sand/50 px-4 py-3 text-sm leading-6 text-charcoal"
    >
      {label}. This is sample/test data for development and is not genuine production inventory.
    </p>
  );
}

export function DemoInventoryBadge() {
  return (
    <span className="bg-earth px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ivory">
      Demonstration
    </span>
  );
}
