"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { newsletter } from "@/content/home";
import { googleForm, formspreeEndpoint } from "@/content/contact";
import { site } from "@/content/site";
import { sendForm, type Outcome } from "@/lib/forms";

type Status = "idle" | "sending" | Outcome;

/**
 * v1 hides the field behind a button that has to be opened first. v2 shows it,
 * because on a page this typographically quiet a single underlined rule with a
 * caret in it costs nothing and removes a click. Same endpoint, same three
 * honest outcomes.
 */
export function NewsletterInline() {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    const outcome = await sendForm({
      fields: [{ name: "email", label: "Email", values: [email] }],
      subject: `Newsletter signup — ${site.name}`,
      google: googleForm.newsletter,
      formspree: formspreeEndpoint,
    });

    setStatus(outcome);
    // Keep the address after a mailto handoff — that draft may never be sent.
    if (outcome === "ok") setEmail("");
  }

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
      <form onSubmit={onSubmit} className="flex w-full max-w-md items-end gap-4">
        <div className="min-w-0 flex-1">
          <label htmlFor={`${uid}-email`} className="v2-label block text-ink-warm-3">
            {newsletter.title}
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={newsletter.placeholder}
            aria-describedby={`${uid}-status`}
            className="v2-field mt-3 w-full pb-2.5 text-lg text-ink-warm placeholder:text-ink-warm-3"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] bg-obsidian px-5 py-3 font-display font-bold text-paper transition-colors duration-200 hover:bg-green-400 hover:text-obsidian disabled:cursor-default disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : newsletter.submitLabel}
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </form>

      <p
        id={`${uid}-status`}
        role="status"
        className="max-w-xs text-sm leading-snug text-ink-warm-3 sm:text-right"
      >
        {status === "ok" && "You're on the list. We'll write when there's news."}
        {status === "mailto" && "Opening your email app. Send that message and you're on the list."}
        {status === "error" && (
          <>
            Something went wrong. Email us at{" "}
            <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </>
        )}
        {(status === "idle" || status === "sending") && newsletter.body ? newsletter.body : null}
      </p>
    </div>
  );
}
