"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function Gallery({
  images,
}: {
  images: { url: string; alt: string; caption?: string | null }[];
}) {
  const [index, setIndex] = useState<number | null>(null);
  const total = images.length;

  const close = () => setIndex(null);
  const prev = useCallback(() => {
    setIndex((i) => (i === null ? i : (i + total - 1) % total));
  }, [total]);
  const next = useCallback(() => {
    setIndex((i) => (i === null ? i : (i + 1) % total));
  }, [total]);

  useEffect(() => {
    if (index === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, prev, next]);

  const startX = useRef(0);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={image.url + i}
            type="button"
            onClick={() => setIndex(i)}
            className={i === 0 ? "col-span-2 row-span-2" : ""}
          >
            <img src={image.url} alt={image.alt} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      {index !== null ? (
        <div
          className="fixed inset-0 z-[90] bg-charcoal/95"
          onTouchStart={(e) => {
            startX.current = e.changedTouches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - startX.current;
            if (dx > 40) prev();
            if (dx < -40) next();
          }}
        >
          <button className="absolute right-3 top-4 grid h-11 w-11 place-items-center text-ivory sm:right-5 sm:top-5" onClick={close} aria-label="Close gallery">
            <X />
          </button>
          <button className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center text-ivory sm:left-4" onClick={prev} aria-label="Previous image">
            <ChevronLeft />
          </button>
          <img
            src={images[index].url}
            alt={images[index].alt}
            className="mx-auto h-full max-h-full w-auto max-w-full object-contain p-8 sm:p-12"
          />
          <button className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center text-ivory sm:right-4" onClick={next} aria-label="Next image">
            <ChevronRight />
          </button>
          {images[index].caption ? (
            <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-ivory/80">
              {images[index].caption}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
