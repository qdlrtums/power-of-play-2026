import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SkipLink } from "./SkipLink";

/**
 * The v1 page chrome — skip link, header, main landmark, footer.
 *
 * It lives in a component rather than straight in the layout because
 * `app/not-found.tsx` sits above the `(v1)` route group (it has to, so that it
 * also catches URLs that match no group at all) and still needs the same
 * frame.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
