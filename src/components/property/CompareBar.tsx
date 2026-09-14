"use client";

import Link from "next/link";
import { useCompare } from "@/components/providers/CompareProvider";

export function CompareBar() {
  const { ids, clear } = useCompare();
  if (!ids.length) return null;
  return (
    <div className="fixed inset-x-3 z-30 flex flex-wrap items-center justify-between gap-3 border border-charcoal/10 bg-charcoal px-4 py-3 text-ivory shadow-lift sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:gap-4 sm:px-5 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] sm:bottom-4">
      <p className="text-[11px] uppercase tracking-[0.18em]">
        {ids.length} selected to compare
      </p>
      <div className="flex items-center gap-3">
        <Link href="/compare" className="bg-ivory px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-charcoal">
          Compare
        </Link>
        <button type="button" onClick={clear} className="min-h-10 text-[11px] uppercase tracking-[0.18em] text-ivory/70">
          Clear
        </button>
      </div>
    </div>
  );
}
