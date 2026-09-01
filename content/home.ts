import { site } from "./site";

export const hero = {
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
  title: "Fine motor difficulties affect 1 in 16 children's quality of life",
  stat: "That's 63 million kids globally",
  points: [
    {
      title: "Current tools are too large & heavy",
      body: "Traditional hand dynamometers simply don't fit a child's hand and lack meaningful reason for a child to engage and produce maximum effort.",
    },
    {
      title: "Weak hand grips go unmeasured",
      body: "Assessment tools built for adults are not calibrated for low muscle tone which fail to capture weak grips.",
    },
    {
      title: "Informal tests lack objective data",
      body: "Therapists fall back on subjective and unreliable means of collecting data to compensate for the lack of reliable tools for kids.",
    },
  ],
} as const;

/**
 * Describes the APPROACH, never the device — pre-patent constraint.
 * TODO(client): confirm or rewrite. This is deliberately method-level.
 */
export const approach = {
  title: "Assessment that a child experiences as play",
  body: "A play-based device developed to integrate with what kids love doing most: play! Sensitive enough for low muscle tone and clinically reliable to ensure that therapists can compare one visit to the next.",
  steps: [
    {
      title: "Play-Based Approach",
      body: "Engaging biofeedback ensures that children who are not able to follow verbal instructinos can still participate in the assessment.",
    },
    {
      title: "Sensitive to Weak Grips",
      body: "Calibrated for low muscle tone to register the grips of even the weakest patients.",
    },
    {
      title: "The 3-in-1 Tool",
      body: "Measures hook, cylindrical and pinch grips, all in one tool.",
    },
  ],
  draft: false,
} as const;

export const whoWeAre = {
  title: "The team building for pediatric clinicians.",
  cta: { label: "Meet the team", href: "/about" },
  draft: true,
} as const;

export const contactCta = {
  title: "Working in pediatric rehab?",
  body: "We'd like to hear from you, whether that's a clinical partnership, a pilot, or just a conversation.",
  cta: { label: "Get in touch", href: "/contact" },
} as const;
