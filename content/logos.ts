export type Logo = {
  id: string;
  /** Organisation name — also the image alt text. Verified against the artwork. */
  name: string;
  src: string;
  /** Intrinsic pixel dimensions, so next/image can reserve layout (CLS = 0). */
  width: number;
  height: number;
  href?: string;
};

/**
 * Label chosen with the client. Covers awards, accelerators and partners.
 *
 * NOTE(assets): the two files originally named `iF-Logo_colour.*` are NOT the
 * iF Design Award — both are the Innovation Factory logo. They have been
 * renamed accordingly. Every name below was read off the artwork itself.
 */
export const recognitionLabel = "Recognised by";

export const logos: Logo[] = [
  {
    id: "innovation-factory",
    name: "Innovation Factory",
    src: "/logos/innovation-factory.webp",
    width: 2037,
    height: 801,
  },
  {
    id: "theforge",
    name: "The Forge",
    src: "/logos/theforge.png",
    width: 404,
    height: 91,
  },
  {
    id: "lab2market",
    name: "Lab2Market Launch",
    src: "/logos/lab2market.png",
    width: 960,
    height: 268,
  },
  {
    id: "entrepreneurs-organization",
    name: "Entrepreneurs' Organization",
    src: "/logos/entrepreneurs-organization.png",
    width: 444,
    height: 222,
  },
  {
    id: "theclinic",
    name: "The Clinic Agency",
    src: "/logos/theclinic.png",
    width: 272,
    height: 272,
  },
  {
    id: "rellia",
    name: "Rellia Health Network",
    src: "/logos/rellia.png",
    width: 346,
    height: 178,
  },
];
