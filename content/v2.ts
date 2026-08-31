import { nav, navCta, site } from "./site";

/**
 * v2 is now the live site at `/`, `/about`, `/contact`.
 * The previous design lives at `/v1`.
 */

export const v2Href = (href: string) => href;

export const v2Nav = nav;
export const v2NavCta = navCta;

export const v2Meta = {
  closingKicker: `Talk to ${site.name}`,
} as const;
