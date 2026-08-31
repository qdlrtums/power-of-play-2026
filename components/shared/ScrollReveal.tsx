"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** useLayoutEffect warns during SSR; this picks the right hook per environment. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Scroll-triggered entrance, built as progressive enhancement: the server
 * renders the element plainly visible, and JS only hides it (before first
 * paint) once it has taken over. If JS never runs, the content is simply
 * there — which matters here, because these are the proof logos.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"static" | "pending" | "in">("static");

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("pending");
  }, []);

  useEffect(() => {
    if (state !== "pending" || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("in");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [state]);

  return (
    <Tag
      ref={ref}
      data-reveal={state === "static" ? undefined : state}
      style={{ animationDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </Tag>
  );
}
