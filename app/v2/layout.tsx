import type { Metadata } from "next";
import { monoLabel } from "@/lib/fonts";
import { SkipLink } from "@/components/site/SkipLink";
import { V2Header } from "@/components/v2/V2Header";
import { V2Footer } from "@/components/v2/V2Footer";

/**
 * The v2 concept. Same content files as the live site, different design
 * system: `theme-v2` re-points the shared colour, radius and type tokens for
 * everything inside this subtree, so components written against the v1
 * vocabulary (`bg-surface`, `text-ink`, `border-line`) come out in the v2
 * palette without being forked.
 *
 * It is a real route rather than a branch-only replacement so the two designs
 * can be opened side by side at `/compare` and shared on one preview URL.
 */
export const metadata: Metadata = {
  // Never index the concept: it is the same copy as the live pages.
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: LayoutProps<"/v2">) {
  return (
    <div className={`${monoLabel.variable} theme-v2 flex flex-1 flex-col bg-paper`}>
      <SkipLink href="#v2-main" />
      <V2Header />
      <main id="v2-main" className="flex-1">
        {children}
      </main>
      <V2Footer />
    </div>
  );
}
