"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "matribhumi:compare";
const MAX = 3;

type Ctx = {
  ids: string[];
  ready: boolean;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  clear: () => void;
};

const CompareContext = createContext<Ctx | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as unknown;
          if (Array.isArray(parsed)) {
            setIds(parsed.filter((id): id is string => typeof id === "string").slice(0, MAX));
          }
        }
      } catch {
        /* ignore */
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids, ready]);

  const value = useMemo<Ctx>(
    () => ({
      ids,
      ready,
      has: (id) => ids.includes(id),
      toggle: (id) =>
        setIds((current) => {
          if (current.includes(id)) return current.filter((item) => item !== id);
          if (current.length >= MAX) return [...current.slice(1), id];
          return [...current, id];
        }),
      clear: () => setIds([]),
    }),
    [ids, ready],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
