"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

type Results = {
  properties: { slug: string; name: string; location: { city: string } }[];
  developments: { slug: string; name: string; location: { city: string } }[];
  locations: { slug: string; name: string; country: string }[];
  articles: { slug: string; title: string }[];
};

export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => {
        document.body.style.overflow = "";
        clearTimeout(t);
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open || q.trim().length < 2) {
      const handle = window.setTimeout(() => setResults(null), 0);
      return () => window.clearTimeout(handle);
    }
    const handle = window.setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) setResults(await res.json());
    }, 180);
    return () => window.clearTimeout(handle);
  }, [q, open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="grid h-10 w-10 place-items-center text-current"
      >
        <Search className="h-4 w-4" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-[80] bg-charcoal/55 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="mx-auto mt-0 h-full w-full border-0 bg-ivory shadow-lift sm:mt-[10vh] sm:h-auto sm:w-[min(720px,calc(100%-2rem))] sm:border sm:border-stone">
            <div className="flex items-center gap-3 border-b border-charcoal/10 px-4 sm:px-5" style={{ paddingTop: "env(safe-area-inset-top)" }}>
              <Search className="h-4 w-4 shrink-0 text-earth" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search homes, places, insights"
                className="h-14 min-w-0 flex-1 bg-transparent text-base text-charcoal outline-none placeholder:text-muted"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto p-5 sm:max-h-[50vh]">
              {!results ? (
                <p className="text-sm text-muted">
                  Type at least two characters. Press <kbd className="font-mono">/</kbd> anytime.
                </p>
              ) : (
                <div className="space-y-6">
                  <Group title="Properties" onPick={() => setOpen(false)}>
                    {results.properties.map((item) => (
                      <Link key={item.slug} href={`/properties/${item.slug}`}>
                        {item.name}
                        <span className="ml-2 text-muted">{item.location.city}</span>
                      </Link>
                    ))}
                  </Group>
                  <Group title="Developments" onPick={() => setOpen(false)}>
                    {results.developments.map((item) => (
                      <Link key={item.slug} href={`/projects/${item.slug}`}>
                        {item.name}
                        <span className="ml-2 text-muted">{item.location.city}</span>
                      </Link>
                    ))}
                  </Group>
                  <Group title="Locations" onPick={() => setOpen(false)}>
                    {results.locations.map((item) => (
                      <Link key={item.slug} href={`/locations/${item.slug}`}>
                        {item.name}
                        <span className="ml-2 text-muted">{item.country}</span>
                      </Link>
                    ))}
                  </Group>
                  <Group title="Insights" onPick={() => setOpen(false)}>
                    {results.articles.map((item) => (
                      <Link key={item.slug} href={`/insights/${item.slug}`}>
                        {item.title}
                      </Link>
                    ))}
                  </Group>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Group({
  title,
  children,
  onPick,
}: {
  title: string;
  children: React.ReactNode;
  onPick: () => void;
}) {
  const items = Array.isArray(children) ? children : [children];
  if (!items.length) return null;
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-earth">{title}</p>
      <ul className="mt-2 space-y-1" onClick={onPick}>
        {items.map((child, i) => (
          <li key={i} className="text-charcoal [&_a]:block [&_a]:py-2 hover:[&_a]:text-moss">
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}
