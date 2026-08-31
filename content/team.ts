export type MemberKind = "founder" | "advisor";

export type Member = {
  slug: string;
  name: string;
  role: string;
  kind: MemberKind;
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
 * Founders confirmed by the client. Advisor names and roles come from the
 * company's own pitch deck. Bios and quotes for Deena and Rooaa are still
 * PLACEHOLDER. Advisor one-liners restated from the pitch deck, not invented.
 */
export const team: Member[] = [
  {
    slug: "deena-al-sammak",
    name: "Deena Al-Sammak",
    role: "Chief Executive Officer",
    kind: "founder",
    photo: { src: "/team/deena-al-sammak.webp", width: 1080, height: 1080 },
    quote: "PLACEHOLDER — a one-line quote from Deena.",
    bio: "PLACEHOLDER — two or three sentences on Deena's background and what she leads at Power of Play. Replace before launch.",
    linkedin: "https://www.linkedin.com/in/deena-al-sammak/",
    draft: true,
  },
  {
    slug: "rooaa-shansal",
    name: "Rooaa Shanshal",
    role: "Chief Operations Officer",
    kind: "founder",
    photo: { src: "/team/rooaa-shansal.jpg", width: 1365, height: 2048 },
    quote: "PLACEHOLDER — a one-line quote from Rooaa.",
    bio: "PLACEHOLDER — two or three sentences on Rooaa's background and what she leads at Power of Play. Replace before launch.",
    linkedin: "https://ca.linkedin.com/in/rooaashanshal",
    draft: true,
  },
  {
    slug: "tara-packham",
    name: "Dr Tara Packham",
    role: "Clinical Advisor",
    kind: "advisor",
    photo: { src: "/team/tara_packham_photo.jpg", width: 1200, height: 1800 },
    bio: "Occupational therapist in hand therapy. Clinical advisor to Power of Play.",
    linkedin: "https://www.linkedin.com/in/tara-packham-21918924/",
    draft: false,
  },
  {
    slug: "megan-kane",
    name: "Megan Kane",
    role: "Regulatory & QA Expert",
    kind: "advisor",
    photo: { src: "/team/megan-headshot.jpeg", width: 896, height: 1088 },
    bio: "Regulatory and quality assurance expert, and entrepreneur in residence.",
    linkedin: "https://www.linkedin.com/in/megankane1/",
    draft: false,
  },
];

export const founders = team.filter((m) => m.kind === "founder");
export const advisors = team.filter((m) => m.kind === "advisor");
