import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare designs",
  robots: { index: false, follow: false },
};

/**
 * The comparison viewer owns the whole viewport, so it takes neither design's
 * header or footer — it would be comparing them through one of them.
 */
export default function CompareLayout({ children }: LayoutProps<"/compare">) {
  // `h-dvh` alone, no `flex-1`: as a flex item of the body it would grow past
  // its own height and push the second frame below the fold.
  return (
    <div className="flex h-dvh shrink-0 flex-col overflow-hidden bg-obsidian">
      {children}
    </div>
  );
}
