import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;
