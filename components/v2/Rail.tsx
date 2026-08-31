import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The v2 measure. Wider than v1's 80rem and with a bigger gutter, because the
 * layout is built on hairline rules that run edge to edge inside it — a
 * narrower rail makes those rules look like underlined boxes.
 */
export function Rail({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[84rem] px-6 sm:px-10 lg:px-14", className)}>
      {children}
    </div>
  );
}

/** A full-bleed band with a hairline top edge — the v2 section separator. */
export function Band({
  children,
  className,
  labelledBy,
  id,
  ruled = true,
}: {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  id?: string;
  ruled?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        ruled && "border-t border-line",
        className,
      )}
    >
      <Rail>{children}</Rail>
    </section>
  );
}
