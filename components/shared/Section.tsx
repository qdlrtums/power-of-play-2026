import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  labelledBy,
  id,
}: {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("px-5 py-16 sm:px-8 lg:py-20", className)}
    >
      <div className="mx-auto max-w-[80rem]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-display text-eyebrow font-bold uppercase tracking-[0.18em] text-green-700", className)}>
      {children}
    </p>
  );
}
