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
  contact: {
    formId: "1FAIpQLSc31v6GDHsENdJC84fMf0IqO_QEJoZVW-NdlGXjPzmXLd6a6Q",
    fields: {
      name: "entry.1664706469",
      email: "entry.1598646360",
      organization: "entry.1403934931",
      reasons: "entry.712465632",
      message: "entry.1969222792",
    },
  },
  newsletter: {
    formId: "1FAIpQLSfpnp94X1J_7mYqcUvGFj_GnsKzBmMN_vIfRot-iqzvcIzO_w",
    fields: { email: "entry.1331146083" },
  },
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
