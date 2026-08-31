"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { logos, recognitionLabel } from "@/content/logos";
import { cn } from "@/lib/utils";

/** How many logos are on screen at once. Two per row below `sm`. */
const VISIBLE = 4;
const INTERVAL = 4200;

/**
 * Every cell is the same size and every logo is fitted inside the same box, so
 * a 1:1 mark and a 2.5:1 wordmark still read as evenly spaced. Hairlines sit
 * between cells rather than around them — a divided row, not a set of boxes.
 */
function cellClass(i: number) {
  return cn(
    "flex items-center justify-center px-6 py-5",
    // two columns below sm
    i % 2 !== 0 && "border-l border-line-soft",
    i >= 2 && "border-t border-line-soft",
    // four columns from sm up
    i % 4 !== 0 && "sm:border-l sm:border-line-soft",
    i >= 4 ? "sm:border-t sm:border-line-soft" : "sm:border-t-0",
  );
}

function LogoCell({ logo, index }: { logo: (typeof logos)[number]; index: number }) {
  return (
    <li className={cellClass(index)}>
      <span className="relative h-10 w-full max-w-[9rem] sm:h-12">
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          sizes="(min-width: 640px) 9rem, 40vw"
          className="object-contain"
        />
      </span>
    </li>
  );
}

/**
 * Shows four logos at a time and blurs one group into the next. Pauses on
 * hover and on focus-within. Under prefers-reduced-motion nothing cycles — the
 * full set is rendered in the same divided grid, so no logo is behind motion.
 */
export function LogoSpotlight() {
  const reduce = useReducedMotion();
  const [start, setStart] = useState(0);
  const paused = useRef(false);

  // With fewer logos than slots there is nothing to rotate through.
  const rotates = !reduce && logos.length > VISIBLE;

  useEffect(() => {
    if (!rotates) return;
    const id = setInterval(() => {
      if (!paused.current) setStart((i) => (i + VISIBLE) % logos.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [rotates]);

  const label = (
    <p className="font-display text-eyebrow font-bold uppercase tracking-[0.18em] text-ink-muted">
      {recognitionLabel}
    </p>
  );

  if (!rotates) {
    return (
      <div className="flex flex-col items-center gap-8">
        {label}
        <ul className="grid w-full max-w-5xl grid-cols-2 sm:grid-cols-4">
          {logos.map((logo, i) => (
            <LogoCell key={logo.id} logo={logo} index={i} />
          ))}
        </ul>
      </div>
    );
  }

  const group = Array.from(
    { length: VISIBLE },
    (_, i) => logos[(start + i) % logos.length],
  );

  return (
    <div
      className="flex flex-col items-center gap-8"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      {label}

      {/* Both groups occupy the same grid cell, so the outgoing set blurs out
          under the incoming one instead of the row collapsing between them. */}
      <div className="grid w-full max-w-5xl">
        <AnimatePresence initial={false}>
          <motion.ul
            key={start}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 0.68, 0.35, 1] }}
            className="col-start-1 row-start-1 grid grid-cols-2 sm:grid-cols-4"
          >
            {group.map((logo, i) => (
              <LogoCell key={logo.id} logo={logo} index={i} />
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
