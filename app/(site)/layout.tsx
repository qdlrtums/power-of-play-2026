import type { ReactNode } from "react";
import { monoLabel } from "@/lib/fonts";
import { SkipLink } from "@/components/site/SkipLink";
import { V2Header } from "@/components/v2/V2Header";
import { V2Footer } from "@/components/v2/V2Footer";

/**
 * Live site chrome. `theme-v2` re-points the shared colour, radius and type
 * tokens for everything inside this subtree.
 */

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${monoLabel.variable} theme-v2 flex flex-1 flex-col bg-paper`}>
      <SkipLink href="#main" />
      <V2Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <V2Footer />
    </div>
  );
}
