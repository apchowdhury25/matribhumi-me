"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { publicLocationHref } from "@/config/locations";
import { cn } from "@/lib/utils";

type Results = {
  properties: { slug: string; name: string; location: { city: string } }[];
  developments: { slug: string; name: string; location: { city: string } }[];
  locations: { slug: string; name: string; country: string; city?: string; kind?: string; parent?: { slug: string } | null }[];
  articles: { slug: string; title: string }[];
};

type Suggestion = {
  id: string;
  group: string;
  title: string;
  meta?: string;
  href: string;
};

const shortcuts: Suggestion[] = [
  { id: "go-dhaka", group: "Suggested", title: "Dhaka", meta: "City", href: "/locations/dhaka" },
  { id: "go-chattogram", group: "Suggested", title: "Chattogram", meta: "City", href: "/locations/chattogram" },
  { id: "go-properties", group: "Suggested", title: "All properties", meta: "Browse", href: "/properties" },
  { id: "go-projects", group: "Suggested", title: "All projects", meta: "Browse", href: "/projects" },
];

function highlight(text: string, query: string) {
  const q = query.trim();
  if (q.length < 2) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-sand/80 px-0.5 text-inherit">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

function toSuggestions(results: Results): Suggestion[] {
  return [
    ...results.properties.map((item) => ({
      id: `property-${item.slug}`,
      group: "Properties",
      title: item.name,
      meta: item.location?.city,
      href: `/properties/${item.slug}`,
    })),
    ...results.developments.map((item) => ({
      id: `development-${item.slug}`,
      group: "Projects",
      title: item.name,
      meta: item.location?.city,
      href: `/projects/${item.slug}`,
    })),
    ...results.locations.map((item) => ({
      id: `location-${item.slug}`,
      group: "Locations",
      title: item.name,
      meta: item.city ?? item.country,
      href: publicLocationHref(item),
    })),
    ...results.articles.map((item) => ({
      id: `article-${item.slug}`,
      group: "Insights",
      title: item.title,
      meta: "Insight",
      href: `/insights/${item.slug}`,
    })),
  ];
}

export function SearchOverlay() {
  const router = useRouter();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<{ query: string; data: Results } | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const request = useRef(0);

  const query = q.trim();
  const searching = query.length >= 2;
  const suggestions = useMemo(() => {
    if (!searching) return shortcuts;
    return results?.query === query ? toSuggestions(results.data) : [];
  }, [query, results, searching]);

  function close() {
    setOpen(false);
    setQ("");
    setResults(null);
    setLoading(false);
    setActive(0);
  }

  function go(href: string) {
    close();
    router.push(href);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !searching) {
      request.current += 1;
      return;
    }
    const id = ++request.current;
    const handle = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (id !== request.current) return;
        const data: Results = res.ok
          ? await res.json()
          : { properties: [], developments: [], locations: [], articles: [] };
        setResults({ query, data });
        setActive(0);
      } catch {
        if (id !== request.current) return;
        setResults({ query, data: { properties: [], developments: [], locations: [], articles: [] } });
      } finally {
        if (id === request.current) setLoading(false);
      }
    }, 140);
    return () => window.clearTimeout(handle);
  }, [open, query, searching]);

  useEffect(() => {
    if (!open) return;
    const node = document.getElementById(`${listId}-${active}`);
    node?.scrollIntoView({ block: "nearest" });
  }, [active, listId, open]);

  function onInputKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!suggestions.length) return;
      setActive((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!suggestions.length) return;
      setActive((index) => (index - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const chosen = suggestions[active];
      if (chosen) go(chosen.href);
      else if (searching) go(`/properties?q=${encodeURIComponent(query)}`);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        className="grid h-10 w-10 place-items-center text-current"
      >
        <Search className="h-4 w-4" />
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-[80] bg-charcoal/60 backdrop-blur-sm"
          role="presentation"
          onMouseDown={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search MatriBhumi"
            className="mx-auto mt-[12vh] w-[min(40rem,calc(100%-1.5rem))] border border-stone bg-ivory text-charcoal shadow-lift"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-charcoal/10 px-3 sm:px-4">
              <Search className="h-4 w-4 shrink-0 text-earth" />
              <input
                ref={inputRef}
                value={q}
                onChange={(event) => {
                  const next = event.target.value;
                  setQ(next);
                  setActive(0);
                  if (next.trim().length < 2) setLoading(false);
                }}
                onKeyDown={onInputKey}
                placeholder="Homes, places, insights"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={suggestions.length > 0}
                aria-controls={listId}
                aria-activedescendant={suggestions[active] ? `${listId}-${active}` : undefined}
                autoComplete="off"
                spellCheck={false}
                className="h-14 min-w-0 flex-1 bg-transparent text-base text-charcoal outline-none placeholder:text-muted focus-visible:!outline-offset-0"
              />
              {q ? (
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="grid h-8 w-8 shrink-0 place-items-center text-muted hover:text-charcoal"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
              <button
                type="button"
                onClick={close}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 border border-charcoal/20 px-3 text-[10px] uppercase tracking-[0.18em] text-charcoal transition hover:border-charcoal hover:bg-charcoal hover:text-ivory"
              >
                Close
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul id={listId} role="listbox" aria-label="Search suggestions" className="max-h-[min(24rem,50vh)] overflow-y-auto py-2">
              {searching && loading && !suggestions.length ? (
                <li className="px-4 py-6 text-sm text-muted">Looking up matches…</li>
              ) : null}
              {searching && !loading && suggestions.length === 0 ? (
                <li className="px-4 py-6 text-sm text-muted">
                  No matches for “{query}”. Press Enter to search properties.
                </li>
              ) : null}
              {!searching ? (
                <li className="px-4 pb-1 pt-2 text-[11px] uppercase tracking-[0.22em] text-earth">Suggested</li>
              ) : null}
              {suggestions.map((item, index) => {
                const previous = suggestions[index - 1];
                const showGroup = searching && item.group !== previous?.group;
                const selected = index === active;
                return (
                  <li key={item.id} role="presentation">
                    {showGroup ? (
                      <p className="px-4 pb-1 pt-3 text-[11px] uppercase tracking-[0.22em] text-earth">{item.group}</p>
                    ) : null}
                    <Link
                      id={`${listId}-${index}`}
                      role="option"
                      aria-selected={selected}
                      href={item.href}
                      onMouseEnter={() => setActive(index)}
                      onClick={close}
                      className={cn(
                        "mx-2 flex items-baseline justify-between gap-4 px-3 py-2.5 text-charcoal",
                        selected ? "bg-mist" : "hover:bg-mist",
                      )}
                    >
                      <span className="min-w-0 font-display text-xl leading-tight">
                        {highlight(item.title, query)}
                      </span>
                      {item.meta ? (
                        <span className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-muted">{item.meta}</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between gap-3 border-t border-charcoal/10 px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-muted">
              <span>{loading && searching ? "Updating matches" : "Type to see matches"}</span>
              <span className="hidden sm:inline">↑↓ move · Enter open · Esc close</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
