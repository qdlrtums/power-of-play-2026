import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The v2 small-type voice: mono, uppercase, tracked. It replaces v1's
 * display-font eyebrow everywhere, and it is what makes the page read as
 * clinical rather than promotional.
 */
export function Label({
  children,
  className,
  id,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "p" | "span" | "h2" | "div";
}) {
  return (
    <Tag id={id} className={cn("v2-label text-ink-warm-3", className)}>
      {children}
    </Tag>
  );
}

/** Label with the lime tick that marks a section start. */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("v2-label flex items-center gap-3 text-ink-warm-2", className)}>
      <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[var(--radius-pill)] bg-green-400" />
      {children}
    </p>
  );
}
