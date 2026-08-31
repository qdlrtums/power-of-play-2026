import { nav, navCta, site } from "./site";
import { hero } from "./home";

/**
 * v2-only copy and route helpers.
 *
 * Everything here is either a route transform or a restatement of a fact that
 * already exists in `content/` — nothing about the company, the product or the
 * evidence is invented for the redesign, and every PLACEHOLDER in the v1
 * content files is still a PLACEHOLDER when v2 renders it.
 */

/** v2 lives under `/v2`, so every shared nav href needs re-pointing. */
export const v2Href = (href: string) => (href === "/" ? "/v2" : `/v2${href}`);

export const v2Nav = nav.map((item) => ({ ...item, href: v2Href(item.href) }));
export const v2NavCta = { ...navCta, href: v2Href(navCta.href) };

/**
 * The hero's "at a glance" strip. Each line is a restatement of an existing
 * fact, not a new claim:
 *   Focus   — content/site.ts  `description` ("pediatric rehabilitation")
 *   Ages    — content/home.ts  `hero.eyebrow` ("ages 0–7")
 *   Method  — content/site.ts  `tagline` ("a play-based approach")
 */
export const heroFacts = [
  { label: "Focus", value: "Pediatric rehabilitation" },
  { label: "Ages", value: "0–7" },
  { label: "Method", value: "Play-based assessment" },
] as const;

export const v2Meta = {
  /** Shown in the header so a reviewer always knows which design they are on. */
  badge: "Concept v2",
  heroKicker: hero.eyebrow,
  /** Standing line above the closing CTA. */
  closingKicker: `Talk to ${site.name}`,
} as const;

export const contactChannels = {
  eyebrow: "Direct",
  title: "Or skip the form",
  body: "Both reach the same two people.",
} as const;
