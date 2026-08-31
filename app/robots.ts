import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * `/v2` and `/compare` are the redesign preview and the side-by-side viewer.
 * They serve the same copy as the live pages, so leaving them crawlable would
 * hand search engines three URLs for every page. Each also carries
 * `robots: { index: false }` in its own metadata — this is the belt, that is
 * the braces.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system", "/v2", "/compare"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
