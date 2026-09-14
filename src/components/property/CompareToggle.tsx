"use client";

import { Columns2 } from "lucide-react";
import { useCompare } from "@/components/providers/CompareProvider";
import { cn } from "@/lib/utils";

export function CompareToggle({ propertyId }: { propertyId: string }) {
  const { has, toggle } = useCompare();
  const active = has(propertyId);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from comparison" : "Add to comparison"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(propertyId);
      }}
      className={cn(
        "grid h-9 w-9 place-items-center bg-ivory/90 text-charcoal transition hover:bg-ivory",
        active && "text-moss",
      )}
    >
      <Columns2 className="h-4 w-4" />
    </button>
  );
}
