import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** /design-system is intentionally omitted — it is an unlisted internal page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/contact"];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
