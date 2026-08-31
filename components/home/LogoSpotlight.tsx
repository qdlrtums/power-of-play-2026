"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { logos, recognitionLabel } from "@/content/logos";

const INTERVAL = 2800;

/**
 * Cycles one logo at a time with a crossfade. Pauses on hover and on
 * focus-within. Under prefers-reduced-motion it does not cycle at all — the
 * full set is rendered statically instead, so no information is behind motion.
 */
export function LogoSpotlight() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % logos.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce]);

  const label = (
    <p className="font-display text-eyebrow font-bold uppercase tracking-[0.18em] text-ink-muted">
      {recognitionLabel}
    </p>
  );

  if (reduce) {
    return (
      <div className="flex flex-col items-center gap-6">
        {label}
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map((logo) => (
            <li key={logo.id}>
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-10 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const current = logos[index];

  return (
    <div
      className="flex flex-col items-center gap-6"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      {label}
      <div className="relative flex h-20 w-full max-w-md items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.68, 0.35, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={current.src}
              alt={current.name}
              width={current.width}
              height={current.height}
              className="max-h-16 w-auto object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
