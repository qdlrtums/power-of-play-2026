"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { newsletter } from "@/content/home";
import { googleForm, formspreeEndpoint } from "@/content/contact";
import { site } from "@/content/site";
import { sendForm, type Outcome } from "@/lib/forms";

type Status = "idle" | "sending" | Outcome;

/**
 * Closed, this is one lime button across the width of the card. Clicking it
 * shortens it to the right, uncovering the email field that was underneath all
 * along — so there is only ever one thing to click, and the form does not ask
 * for anything until the visitor has said they want it.
 */
export function NewsletterCard() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const input = useRef<HTMLInputElement>(null);

  function expand() {
    setOpen(true);
    // Wait for the width transition to have uncovered the field before the
    // caret lands in it. `preventScroll` because the card sits low in the
    // hero panel, and letting the browser scroll it flush yanks the page
    // mid-animation.
    setTimeout(() => input.current?.focus({ preventScroll: true }), 260);
  }

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
    <div>
      <form
        onSubmit={onSubmit}
        data-open={open}
        onKeyDown={(e) => {
          if (e.key === "Escape" && !email) setOpen(false);
        }}
        className="squircle group relative mx-auto flex h-16 w-full max-w-xl items-center bg-surface shadow-lift sm:h-[4.5rem]"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          ref={input}
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inert={!open}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={newsletter.placeholder}
          aria-describedby="newsletter-status"
          className="min-w-0 flex-1 bg-transparent pl-6 pr-2 text-ink opacity-0 outline-none transition-opacity duration-300 placeholder:text-ink-faint group-data-[open=true]:opacity-100 group-data-[open=true]:delay-200 sm:pl-8 sm:text-lede"
        />

        <button
          type={open ? "submit" : "button"}
          onClick={open ? undefined : expand}
          aria-expanded={open}
          aria-controls="newsletter-email"
          disabled={status === "sending"}
          className="squircle absolute inset-y-0 right-0 w-full overflow-hidden bg-green-400 font-display font-bold text-forest transition-[width,box-shadow] duration-500 ease-[var(--ease-brand)] hover:shadow-lift disabled:opacity-60 data-[open=true]:w-[9.5rem] sm:data-[open=true]:w-[12rem]"
          data-open={open}
        >
          {/* Both labels are absolutely positioned so neither one's width can
              fight the width transition; the button simply clips the long one. */}
          <span className="absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap px-6 transition-opacity duration-200 group-data-[open=true]:opacity-0">
            {newsletter.openLabel}
            <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
          </span>
          <span
            aria-hidden={!open}
            className="absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap px-5 text-lg opacity-0 transition-opacity duration-200 group-data-[open=true]:opacity-100 group-data-[open=true]:delay-200"
          >
            {status === "sending" ? "Sending…" : newsletter.submitLabel}
            <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
          </span>
        </button>
      </form>

      <p id="newsletter-status" role="status" className="mt-4 text-center text-sm text-ink-invert-dim">
        {status === "ok" && "You're on the list. We'll write when there's news."}
        {status === "mailto" && "Opening your email app — send that message and you're on the list."}
        {status === "error" && (
          <>
            Something went wrong. Email us at{" "}
            <a className="underline decoration-green-400/60 underline-offset-2" href={`mailto:${site.email}`}>
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
