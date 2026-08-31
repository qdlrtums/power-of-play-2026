import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SkipLink } from "./SkipLink";

/**
 * The v1 page chrome — skip link, header, main landmark, footer.
 *
 * `basePath` prefixes internal nav so the archived design can live at `/v1`
 * without leaking into the live site.
 */
export function SiteShell({
  children,
  basePath = "",
}: {
  children: ReactNode;
  basePath?: string;
}) {
  return (
    <>
      <SkipLink />
      <SiteHeader basePath={basePath} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter basePath={basePath} />
    </>
  );
}
