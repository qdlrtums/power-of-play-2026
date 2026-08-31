/**
 * Global site facts. Phase 2 note: this file is shaped like the document a
 * Sanity `siteSettings` singleton would return, so swapping the source later
 * touches this file and nothing that imports from it.
 */
export const site = {
  name: "Power of Play",
  legalName: "Power of Play Inc.",
  url: "https://powerofplayinc.com",
  tagline: "Taking a play-based approach to pediatric rehabilitation",
  description:
    "Power of Play is a pediatric rehabilitation company taking a play-based approach to therapy and assessment for young children.",
  email: "info@powerofplayinc.com",
  linkedin: "https://www.linkedin.com/company/power-of-play-pop/",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
] as const;

export const navCta = { label: "Get in touch", href: "/contact" } as const;
