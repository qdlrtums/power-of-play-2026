import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  ...defineCloudflareConfig(),
  // Keep OpenNext from recursively invoking the package's platform build.
  buildCommand: "npm run build:next",
};

export default config;
