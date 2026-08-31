import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's single entrance primitive. CSS-only on purpose — it needs no
 * client JS, so the hero is never blank while React hydrates, and the global
 * prefers-reduced-motion rule collapses it to the finished state.
 */
export function Reveal({
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
  return (
    <Tag
      className={cn("reveal", className)}
      style={{ animationDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
