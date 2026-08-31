import type { GoogleTarget } from "@/lib/forms";

/**
 * ── Where the two forms send ────────────────────────────────────────────────
 *
 * Fill in ONE of the two blocks below. Google Forms is the recommendation:
 * free with no submission cap, and the answers land in a Google Sheet the
 * client owns. Formspree emails each submission instead, but its free tier
 * stops at 50 a month. See README → Forms for how to get the ids.
 *
 * While BOTH are empty the forms still validate, then open a pre-filled email
 * to info@ with the answers already in it. Slightly clunky, but the enquiry
 * reaches a real inbox — nothing is ever dropped silently.
 */

/**
 * Google Forms. `formId` is the long id in the form's own URL:
 *   https://docs.google.com/forms/d/e/<formId>/viewform
 * Each `fields` value is the `entry.N` name of the matching question.
 */
export const googleForm: {
  contact: GoogleTarget | null;
  newsletter: GoogleTarget | null;
} = {
  contact: null,
  // contact: {
  //   formId: "1FAIpQLSc_________________________",
  //   fields: {
  //     name: "entry.111111111",
  //     email: "entry.222222222",
  //     organization: "entry.333333333",
  //     reasons: "entry.444444444",
  //     message: "entry.555555555",
  //   },
  // },

  newsletter: null,
  // newsletter: {
  //   formId: "1FAIpQLSd_________________________",
  //   fields: { email: "entry.666666666" },
  // },
};

/** Formspree. One endpoint serves both forms; `_subject` tells them apart. */
export const formspreeEndpoint: string | null = null;

export const reasons = [
  "Clinical partnership",
  "Pilot or trial",
  "Press or media",
  "Investment",
  "Careers",
  "Something else",
] as const;

export const contactCopy = {
  eyebrow: "Contact",
  title: "Get in touch",
  lede: "Tell us a little about why you're reaching out and we'll come back to you.",
} as const;
