"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "matribhumi:favorites";

type Ctx = {
  ids: string[];
  ready: boolean;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
};

const FavoritesContext = createContext<Ctx | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as unknown;
          if (Array.isArray(parsed)) {
            setIds(parsed.filter((id): id is string => typeof id === "string"));
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
        setIds((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        ),
    }),
    [ids, ready],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
