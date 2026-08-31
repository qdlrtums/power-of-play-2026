"use client";

import { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RecognitionItem } from "@/content/media";
import { AwardCard } from "./AwardCard";

/**
 * Horizontal snap carousel of award cards. Motion is user-driven (buttons and
 * swipe), so it does not compete with the logo ticker on the home page.
 */
export function AwardCarousel({ items }: { items: RecognitionItem[] }) {
  const scroller = useRef<HTMLUListElement>(null);

  const scrollByCard = useCallback((direction: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("li");
    const gap = 16;
    const amount = (card ? card.getBoundingClientRect().width : 280) + gap;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * amount, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <div className="relative">
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous awards"
          onClick={() => scrollByCard(-1)}
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[var(--radius-pill)] border border-hairline bg-white text-ink-warm transition-colors duration-200 hover:bg-paper-2"
        >
          <ChevronLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next awards"
          onClick={() => scrollByCard(1)}
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[var(--radius-pill)] border border-hairline bg-white text-ink-warm transition-colors duration-200 hover:bg-paper-2"
        >
          <ChevronRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <ul
        ref={scroller}
        tabIndex={0}
        aria-label="Awards and partners"
        className="v2-carousel flex gap-4 overflow-x-auto pb-2"
      >
        {items.map((item) => (
          <li key={item.id} className="w-[min(17.5rem,78vw)] shrink-0 snap-start">
            <AwardCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
