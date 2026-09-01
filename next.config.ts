import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /**
   * Kept here rather than in a host config file so the rule travels with the
   * app: `/design-system` is an internal reference page, not public content.
   */
  async headers() {
    return [
      {
        source: "/design-system",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/v1/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: false },
      { source: "/v2/:path*", destination: "/:path*", permanent: false },
      { source: "/design-system", destination: "/v1/design-system", permanent: false },
    ];
  },
};

export default nextConfig;
