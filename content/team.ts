export type Member = {
  slug: string;
  name: string;
  role: string;
  photo: { src: string; width: number; height: number } | null;
  /** Short bio shown on the About card. */
  bio: string;
  /** Optional pull-quote, rendered above the bio on the card. */
  quote?: string;
  linkedin?: string;
  /** True while `bio`/`quote` are still placeholder copy awaiting the client. */
  draft: boolean;
};

/**
 * Confirmed by the client: Deena Al-Sammak (CEO) and Rooaa Shansal (COO).
 * Names, roles and photographs are real. Bios and quotes are PLACEHOLDER and
 * are flagged with `draft: true` — nothing here is invented biography.
 *
 * Photographs are the full-resolution originals from _prototype/reference/.
 */
export const team: Member[] = [
  {
    slug: "deena-al-sammak",
    name: "Deena Al-Sammak",
    role: "Chief Executive Officer",
    photo: { src: "/team/deena-al-sammak.webp", width: 1080, height: 1080 },
    quote: "PLACEHOLDER — a one-line quote from Deena.",
    bio: "PLACEHOLDER — two or three sentences on Deena's background and what she leads at Power of Play. Replace before launch.",
    draft: true,
  },
  {
    slug: "rooaa-shansal",
    name: "Rooaa Shansal",
    role: "Chief Operations Officer",
    photo: { src: "/team/rooaa-shansal.jpg", width: 1365, height: 2048 },
    quote: "PLACEHOLDER — a one-line quote from Rooaa.",
    bio: "PLACEHOLDER — two or three sentences on Rooaa's background and what she leads at Power of Play. Replace before launch.",
    draft: true,
  },
];
