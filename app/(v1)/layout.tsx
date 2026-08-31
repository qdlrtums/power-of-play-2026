import { SiteShell } from "@/components/site/SiteShell";

/**
 * The original site. Everything under this group renders at the real routes
 * (`/`, `/about`, `/contact`) — the group only exists so that `/v2` can carry
 * a different header and footer without inheriting these.
 */
export default function V1Layout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
