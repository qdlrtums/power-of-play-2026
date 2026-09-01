import type { ReactNode } from "react";
import { SiteShell } from "@/components/site/SiteShell";

/**
 * The previous design, kept at `/v1` so the two can still be compared.
 */
export const metadata = {
  robots: { index: false, follow: false },
};

export default function V1Layout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-v1 flex min-h-full flex-1 flex-col">
      <SiteShell basePath="/v1">{children}</SiteShell>
    </div>
  );
}
