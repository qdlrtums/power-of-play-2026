"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { newsletter } from "@/content/home";
import { formspreeEndpoint } from "@/content/contact";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "ok" | "error" | "unconfigured";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // No endpoint yet: tell the visitor honestly rather than dropping the address.
    if (!formspreeEndpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          _subject: `Newsletter signup — ${site.name}`,
          tag: newsletter.tag,
        }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <div className="rounded-[var(--radius-xl)] border border-line-soft bg-surface p-5 shadow-lift sm:rounded-[var(--radius-pill)] sm:p-3 sm:pl-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={newsletter.placeholder}
            aria-describedby="newsletter-status"
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-lede text-ink outline-none placeholder:text-ink-faint sm:px-0"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-green-400 px-6 py-4 font-display text-lg font-bold text-forest transition-[transform,box-shadow] duration-200 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-60 sm:size-14 sm:p-0"
          >
            {/* Icon-only from sm up; the label still reads out to assistive tech. */}
            <span className="sm:sr-only">
              {status === "sending" ? "Sending…" : newsletter.submitLabel}
            </span>
            <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
          </button>
        </form>
      </div>

      <p id="newsletter-status" role="status" className="mt-3 text-center text-sm text-ink-muted">
        {status === "ok" && "Thanks — you're on the list."}
        {status === "error" && (
          <>
            Something went wrong. Email us at{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </>
        )}
        {status === "unconfigured" && (
          <>
            Signup isn&apos;t connected yet — please email{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </>
        )}
        {(status === "idle" || status === "sending") && newsletter.body}
      </p>
    </div>
  );
}
