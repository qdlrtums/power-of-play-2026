import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * `/v1` and `/compare` are the previous design and the side-by-side viewer.
 * They serve the same copy as the live pages, so leaving them crawlable would
 * hand search engines two URLs for every page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/v1", "/compare"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
