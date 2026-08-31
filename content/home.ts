import { site } from "./site";

export const hero = {
  eyebrow: "Pediatric rehabilitation · ages 0–7",
  headline: {
    before: "Play is the ",
    highlight: "assessment",
    after: "",
  },
  /** Real, client-supplied positioning line — not placeholder. */
  lede: site.tagline + ".",
} as const;

export const newsletter = {
  title: "Stay updated",
  body: "",
  placeholder: "Enter your email",
  /** On the collapsed button, before the field is revealed. */
  openLabel: "Get notified when we launch",
  /** On the shortened button, once the field is showing. */
  submitLabel: "Notify me",
} as const;

/**
 * Problem framing adapted from the client's own Figma. Two edits were made to
 * respect the pre-patent constraint: references that identified the device
 * category (dynamometers, "finger squeezing") have been generalised to describe
 * the assessment problem rather than the instrument.
 *
 * TODO(client): the 1-in-16 / 63-million figures come from the Figma but carry
 * no citation. Supply the source, or we soften the claim before launch.
 */
export const problem = {
  eyebrow: "What's at stake",
  title: "Fine motor difficulties affect 1 in 16 children's quality of life",
  stat: "That's 63 million kids globally",
  points: [
    {
      title: "Current tools are rigid and intimidating",
      body: "Standard equipment puts young children on edge, producing inconsistent and uncooperative effort.",
    },
    {
      title: "The smallest changes go unrecorded",
      body: "Assessment tools built for adults are not calibrated for low muscle tone, so real progress is invisible.",
    },
    {
      title: "Informal tests lack objective data",
      body: "Therapists fall back on improvised checks that cannot provide measurable tracking over a course of treatment.",
    },
  ],
} as const;

/**
 * Describes the APPROACH, never the device — pre-patent constraint.
 * TODO(client): confirm or rewrite. This is deliberately method-level.
 */
export const approach = {
  title: "Assessment that a child experiences as play",
  body: "A play-based session, built so children engage rather than perform. Sensitive enough for low muscle tone, and structured so therapists can compare one visit to the next.",
  steps: [
    {
      title: "Play first",
      body: "The session is structured as play, so children give real effort instead of freezing in front of a test.",
    },
    {
      title: "Catch the small changes",
      body: "Calibrated for low muscle tone, so progress that adult tools miss actually registers.",
    },
    {
      title: "Track a course of care",
      body: "Objective records clinicians can compare session to session, rather than informal checks.",
    },
  ],
  draft: false,
} as const;

export const whoWeAre = {
  eyebrow: "Who we are",
  title: "A small team building for pediatric clinicians",
  body: "PLACEHOLDER — two sentences introducing the founders and why they started Power of Play.",
  cta: { label: "Meet the team", href: "/about" },
  draft: true,
} as const;

export const contactCta = {
  title: "Working in pediatric rehab?",
  body: "We'd like to hear from you, whether that's a clinical partnership, a pilot, or just a conversation.",
  cta: { label: "Get in touch", href: "/contact" },
} as const;
