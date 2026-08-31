import { logos, type Logo } from "./logos";

export type RecognitionKind = "award" | "programme" | "media";

export type RecognitionItem = {
  id: string;
  kind: RecognitionKind;
  title: string;
  org: string;
  /** null until the client confirms the date — never guessed. */
  year: string | null;
  href?: string;
  /** Matches an id in content/logos.ts, when a logo exists for the item. */
  logoId?: string;
  summary?: string;
  /** True while any field above is still awaiting client confirmation. */
  draft: boolean;
};

export const logoById = (id?: string): Logo | undefined =>
  logos.find((l) => l.id === id);

export const sectionCopy = {
  eyebrow: "Recognition",
  title: "Where we've been recognised",
  body: "Competitions, programmes, and press. Updated as the work is published.",
} as const;

export const groups: { kind: RecognitionKind; label: string }[] = [
  { kind: "award", label: "Awards & competitions" },
  { kind: "programme", label: "Programmes & partners" },
  { kind: "media", label: "In the media" },
];

/**
 * TODO(client): confirm years, links and one-line summaries for every entry.
 *
 * IMPORTANT — the brief cited an "iF Design Award" as a competition win, but no
 * iF Design artwork exists in the repo: the files named `iF-Logo_colour.*` are
 * the Innovation Factory logo. The award entry below is therefore an unverified
 * placeholder. Confirm whether the award was actually won (and supply the
 * artwork), or delete the entry. Nothing here has been invented or assumed.
 *
 * Organisation names were read off the supplied artwork, which corrected three
 * of them: "The Clinic" -> The Clinic Agency, "Rellia" -> Rellia Health Network,
 * "Lab2Market" -> Lab2Market Launch.
 */
export const recognition: RecognitionItem[] = [
  {
    id: "if-design-award",
    kind: "award",
    title: "PLACEHOLDER — unverified: iF Design Award",
    org: "iF International Forum Design",
    year: null,
    summary:
      "PLACEHOLDER — confirm this award was won, then add the category, year and logo. No artwork was supplied.",
    draft: true,
  },
  {
    id: "innovation-factory",
    kind: "programme",
    title: "PLACEHOLDER — programme or cohort name",
    org: "Innovation Factory",
    year: null,
    logoId: "innovation-factory",
    draft: true,
  },
  {
    id: "theforge",
    kind: "programme",
    title: "PLACEHOLDER — programme or cohort name",
    org: "The Forge",
    year: null,
    logoId: "theforge",
    draft: true,
  },
  {
    id: "lab2market",
    kind: "programme",
    title: "PLACEHOLDER — programme or cohort name",
    org: "Lab2Market Launch",
    year: null,
    logoId: "lab2market",
    draft: true,
  },
  {
    id: "entrepreneurs-organization",
    kind: "programme",
    title: "PLACEHOLDER — programme or award name",
    org: "Entrepreneurs' Organization",
    year: null,
    logoId: "entrepreneurs-organization",
    draft: true,
  },
  {
    id: "theclinic",
    kind: "programme",
    title: "PLACEHOLDER — programme or partnership name",
    org: "The Clinic Agency",
    year: null,
    logoId: "theclinic",
    draft: true,
  },
  {
    id: "rellia",
    kind: "programme",
    title: "PLACEHOLDER — programme or partnership name",
    org: "Rellia Health Network",
    year: null,
    logoId: "rellia",
    draft: true,
  },
  {
    id: "media-1",
    kind: "media",
    title: "PLACEHOLDER — article or segment headline",
    org: "PLACEHOLDER — publication",
    year: null,
    summary:
      "PLACEHOLDER — add one entry per media feature, or delete this group if there are none yet.",
    draft: true,
  },
];
