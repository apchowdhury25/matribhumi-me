"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { cn } from "@/lib/utils";

export function FavoriteButton({ propertyId }: { propertyId: string }) {
  const { has, toggle } = useFavorites();
  const active = has(propertyId);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from saved homes" : "Save home"}
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
      <Heart className={cn("h-4 w-4", active && "fill-current")} />
    </button>
  );
}
