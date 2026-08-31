/**
 * TODO(client): Formspree project endpoint, e.g. "https://formspree.io/f/xxxxxxxx".
 * Both the contact form and the home-page newsletter card post here; the
 * newsletter signup is tagged with a hidden `_subject` so the two are
 * distinguishable in the Formspree inbox.
 *
 * While this is null the forms still validate and give the visitor an honest
 * fallback (email us directly) rather than silently discarding the submission.
 */
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
