"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "matribhumi:cookies";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(!localStorage.getItem(KEY));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-ivory/95 px-4 py-4 backdrop-blur sm:px-6 md:px-10" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-muted">
          We use essential cookies to run this site. Analytics cookies are optional. See our{" "}
          <Link href="/cookies" className="underline">
            cookie notice
          </Link>
          .
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            className="h-11 px-4 text-[11px] uppercase tracking-[0.18em] text-muted"
            onClick={() => {
              localStorage.setItem(KEY, "essential");
              setVisible(false);
            }}
          >
            Essential only
          </button>
          <button
            className="h-11 bg-charcoal px-5 text-[11px] uppercase tracking-[0.18em] text-ivory"
            onClick={() => {
              localStorage.setItem(KEY, "all");
              setVisible(false);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
