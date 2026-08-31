import { site } from "@/content/site";

/**
 * Form delivery. The site has no backend on purpose, so a submission goes
 * straight from the visitor's browser to whichever third party is configured
 * in `content/contact.ts` — or, if none is, into a pre-filled email.
 *
 * There are three outcomes and the UI names all three honestly. Nothing is
 * ever swallowed: the visitor is never shown a success message for a
 * submission that did not leave the browser.
 */
export type Outcome = "ok" | "error" | "mailto";

/** A Google Form and the `entry.N` id of each of its questions. */
export type GoogleTarget = {
  formId: string;
  /** Payload field name -> `entry.123456789`. */
  fields: Record<string, string>;
};

/**
 * One answer. `label` is only ever used by the email fallback, so the message
 * reads like a form and not like a query string. `values` is a list because a
 * checkbox group answers several times to the same question.
 */
export type Field = { name: string; label: string; values: string[] };

export async function sendForm({
  fields,
  subject,
  google,
  formspree,
}: {
  fields: Field[];
  subject: string;
  google: GoogleTarget | null;
  formspree: string | null;
}): Promise<Outcome> {
  if (google) return sendToGoogleForm(google, fields);
  if (formspree) return sendToFormspree(formspree, fields, subject);
  openMailClient(subject, fields);
  return "mailto";
}

/**
 * Google's `formResponse` endpoint sends no CORS headers, so the POST has to
 * be `no-cors` and the response comes back opaque: we can tell that the
 * request left the browser, not what Google made of it. Anything that reaches
 * the endpoint is written to the linked Sheet, so treat "sent" as success and
 * let a genuine network failure fall through to the catch.
 */
async function sendToGoogleForm(target: GoogleTarget, fields: Field[]): Promise<Outcome> {
  const body = new URLSearchParams();
  for (const field of fields) {
    const entry = target.fields[field.name];
    if (!entry) continue;
    for (const value of field.values) if (value) body.append(entry, value);
  }

  try {
    await fetch(`https://docs.google.com/forms/d/e/${target.formId}/formResponse`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return "ok";
  } catch {
    return "error";
  }
}

/** Formspree answers with JSON and a real status, so this one can be checked. */
async function sendToFormspree(
  endpoint: string,
  fields: Field[],
  subject: string,
): Promise<Outcome> {
  const payload: Record<string, string | string[]> = { _subject: subject };
  for (const field of fields) {
    payload[field.name] = field.values.length > 1 ? field.values : (field.values[0] ?? "");
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}

/**
 * Last resort while nothing is wired up: hand the answers to the visitor's own
 * mail client, already addressed and filled in. It costs them one extra click
 * and it reaches a real inbox, which beats dropping the enquiry.
 */
function openMailClient(subject: string, fields: Field[]) {
  const body = fields
    .filter((field) => field.values.some(Boolean))
    .map((field) => `${field.label}: ${field.values.filter(Boolean).join(", ")}`)
    .join("\n\n");

  window.location.href =
    `mailto:${site.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
}
