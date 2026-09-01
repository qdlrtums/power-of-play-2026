"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RecognitionItem } from "@/content/media";
import { AwardCard } from "./AwardCard";

/** Pixels per second. Slow enough to read a card title as it passes. */
const SPEED = 26;
/** How long the drift stays out of the way after the visitor touches it. */
const RESUME_DELAY = 2600;

/**
 * Award cards on a strip that scrolls itself, left to right, forever.
 *
 * It drives `scrollLeft` on a real scroll container rather than translating a
 * track, which is the slower way to do a marquee but the only one that leaves
 * the strip swipeable, wheel-scrollable and reachable by keyboard. The list is
 * rendered twice so the position can wrap at the halfway mark without a seam.
 *
 * Any deliberate input — pointer, wheel, the arrow buttons, focus — parks the
 * animation, because a strip that keeps sliding while you are reading it is
 * worse than one that never moved.
 */
export function AwardCarousel({ items }: { items: RecognitionItem[] }) {
  const scroller = useRef<HTMLUListElement>(null);
  const held = useRef(0);
  /** Distance from a card to its own copy — the exact wrap distance. */
  const period = useRef(0);

  /** Park the drift for a beat; called by every manual interaction. */
  const hold = useCallback(() => {
    held.current = performance.now() + RESUME_DELAY;
  }, []);

  const scrollByCard = useCallback(
    (direction: number) => {
      const el = scroller.current;
      if (!el) return;
      hold();
      const card = el.querySelector("li");
      const gap = 16;
      const amount = (card ? card.getBoundingClientRect().width : 280) + gap;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollBy({ left: direction * amount, behavior: reduce ? "auto" : "smooth" });
    },
    [hold],
  );

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = performance.now();

    // Measured rather than derived from scrollWidth/2: the gap between the two
    // passes belongs to neither of them, so half the scroll width overshoots
    // the loop by half a gap and the wrap shows as a nudge.
    const measure = () => {
      const first = el.firstElementChild as HTMLElement | null;
      const loop = el.querySelector<HTMLElement>("[data-loop-start]");
      period.current = first && loop ? loop.offsetLeft - first.offsetLeft : 0;
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(el);

    const frame = (now: number) => {
      // Clamped so a backgrounded tab does not resume with one enormous step.
      const dt = Math.min(now - last, 64);
      last = now;

      if (now >= held.current && period.current > 0) {
        let next = el.scrollLeft + (SPEED * dt) / 1000;
        if (next >= period.current) next -= period.current;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || motion.matches) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    start();
    const onMotionChange = () => (motion.matches ? stop() : start());
    motion.addEventListener("change", onMotionChange);

    // Pointer events cover touch as well as mouse, so a finger held on the
    // strip parks it for exactly as long as it is there.
    const pause = () => {
      held.current = Infinity;
    };
    const release = () => {
      held.current = performance.now() + RESUME_DELAY;
    };

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", release);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", release);
    el.addEventListener("wheel", hold, { passive: true });

    return () => {
      stop();
      resize.disconnect();
      motion.removeEventListener("change", onMotionChange);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", release);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", release);
      el.removeEventListener("wheel", hold);
    };
  }, [hold]);

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
          <li key={item.id} className="w-[min(17.5rem,78vw)] shrink-0">
            <AwardCard item={item} />
          </li>
        ))}
        {/* Second pass: what the strip wraps onto, and never announced twice. */}
        {items.map((item, i) => (
          <li
            key={`${item.id}-loop`}
            aria-hidden="true"
            data-loop-start={i === 0 ? "" : undefined}
            className="w-[min(17.5rem,78vw)] shrink-0"
          >
            <AwardCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
