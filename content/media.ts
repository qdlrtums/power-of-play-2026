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
  photo?: { src: string; alt: string; width: number; height: number };
  /** True while any field above is still awaiting client confirmation. */
  draft: boolean;
};

export const logoById = (id?: string): Logo | undefined =>
  logos.find((l) => l.id === id);

export const sectionCopy = {
  title: "Recognition",
  body: "Competitions, programmes, and partners.",
} as const;

export const groups: { kind: RecognitionKind; label: string }[] = [
  { kind: "award", label: "Awards & competitions" },
  { kind: "programme", label: "Programmes & partners" },
  { kind: "media", label: "In the media" },
];

/**
 * Award titles, placements, and dates restated from photographs the company
 * supplied and from their pitch deck. Years are only filled where the artwork
 * itself states a date.
 */
export const recognition: RecognitionItem[] = [
  {
    id: "fowler-gsc",
    kind: "award",
    title: "2nd Prize, $15,000",
    org: "Fowler Global Social Innovation Challenge",
    year: "2026",
    summary: "University of San Diego.",
    photo: {
      src: "/images/awards/fowler-gsc.jpeg",
      alt: "Power of Play receiving a $15,000 ceremonial cheque at the Fowler Global Social Innovation Challenge",
      width: 2048,
      height: 1366,
    },
    draft: false,
  },
  {
    id: "theforge",
    kind: "award",
    title: "Startup Survivor Grand Prize, $15,000",
    org: "The Forge Business Incubator",
    year: "2024",
    logoId: "theforge",
    photo: {
      src: "/team/award-forge.jpg",
      alt: "Deena Al-Sammak and Rooaa Shanshal receiving The Forge Startup Survivor Grand Prize",
      width: 6000,
      height: 4000,
    },
    draft: false,
  },
  {
    id: "gsea",
    kind: "award",
    title: "Third Prize, $20,000",
    org: "GSEA by Entrepreneurs' Organization",
    year: "2023",
    logoId: "entrepreneurs-organization",
    photo: {
      src: "/team/award-gsea.jpg",
      alt: "Deena Al-Sammak with the GSEA third prize ceremonial cheque",
      width: 3648,
      height: 5472,
    },
    draft: false,
  },
  {
    id: "spark-grant",
    kind: "award",
    title: "SPARK Competition Winner",
    org: "Hamilton Health Sciences",
    year: "2024",
    logoId: "hamilton-health",
    photo: {
      src: "/team/award-sparkcompetition.jpg",
      alt: "Power of Play named 2024 SPARK Competition Winner by Hamilton Health Sciences",
      width: 1620,
      height: 1080,
    },
    draft: false,
  },
  {
    id: "clark-centre",
    kind: "award",
    title: "1st Place, Video Pitch",
    org: "Clark Centre for Entrepreneurship",
    year: null,
    photo: {
      src: "/images/awards/clark-centre.jpeg",
      alt: "First place video pitch award at the Clark Centre for Entrepreneurship",
      width: 2048,
      height: 1362,
    },
    draft: false,
  },
  {
    id: "health-innovation-bootcamp",
    kind: "award",
    title: "Pitch Competition Winner, $1,000",
    org: "Health Innovation Bootcamp, The Clinic",
    year: "2024",
    logoId: "theclinic",
    photo: {
      src: "/team/award-theclinic.jpg",
      alt: "Deena Al-Sammak and Rooaa Shanshal winning the Health Innovation Bootcamp pitch competition",
      width: 2048,
      height: 1365,
    },
    draft: false,
  },
  {
    id: "tcu-ripple",
    kind: "award",
    title: "Ripple Effect Award",
    org: "Values and Ventures Competition, TCU",
    year: "2023",
    photo: {
      src: "/team/award-tcu.jpg",
      alt: "Deena Al-Sammak and Rooaa Shanshal with the 2023 Ripple Effect Award at TCU",
      width: 1200,
      height: 1600,
    },
    draft: false,
  },
  {
    id: "synapse",
    kind: "award",
    title: "1st Place",
    org: "synapse Life Science Competition",
    year: null,
    draft: false,
  },
  {
    id: "mcmaster-seed",
    kind: "programme",
    title: "Student Seed Fund Recipient",
    org: "McMaster University",
    year: null,
    draft: false,
  },
  {
    id: "innovation-factory",
    kind: "programme",
    title: "Programme partner",
    org: "Innovation Factory",
    year: null,
    logoId: "innovation-factory",
    draft: false,
  },
  {
    id: "lab2market",
    kind: "programme",
    title: "Lab2Market Launch",
    org: "Lab2Market Launch",
    year: null,
    logoId: "lab2market",
    draft: false,
  },
  {
    id: "entrepreneurs-organization",
    kind: "programme",
    title: "Programme partner",
    org: "Entrepreneurs' Organization",
    year: null,
    logoId: "entrepreneurs-organization",
    draft: false,
  },
  {
    id: "theclinic",
    kind: "programme",
    title: "Programme partner",
    org: "The Clinic Agency",
    year: null,
    logoId: "theclinic",
    draft: false,
  },
  {
    id: "rellia",
    kind: "programme",
    title: "Programme partner",
    org: "Rellia Health Network",
    year: null,
    logoId: "rellia",
    draft: false,
  },
];

export const awardPhotos = recognition.filter((r) => r.photo);
