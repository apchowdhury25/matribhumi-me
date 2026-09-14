"use client";

import Link from "next/link";
import { useCompare } from "@/components/providers/CompareProvider";

export function CompareBar() {
  const { ids, clear } = useCompare();
  if (!ids.length) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 border border-charcoal/10 bg-charcoal px-5 py-3 text-ivory shadow-lift">
      <p className="text-[11px] uppercase tracking-[0.18em]">
        {ids.length} selected to compare
      </p>
      <Link href="/compare" className="bg-ivory px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-charcoal">
        Compare
      </Link>
      <button type="button" onClick={clear} className="text-[11px] uppercase tracking-[0.18em] text-ivory/70">
        Clear
      </button>
    </div>
  );
}
