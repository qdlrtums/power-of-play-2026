"use client";

import { useId, useState, type FormEvent } from "react";
import { googleForm, formspreeEndpoint, reasons } from "@/content/contact";
import { site } from "@/content/site";
import { sendForm, type Outcome } from "@/lib/forms";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | Outcome;
type Errors = Partial<Record<"name" | "email" | "reasons", string>>;

/**
 * The two designs disagree about what a form field looks like — v1 boxes it,
 * v2 rules it underneath — but not about what the form *does*. Only the class
 * strings are swapped; validation, the honeypot, the payload and the three
 * honest outcomes are shared, so the designs cannot drift apart on behaviour.
 */
const skins = {
  v1: {
    field:
      "w-full rounded-[var(--radius-md)] border-2 border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-green-600",
    fieldError: "border-danger",
    legend: "font-display font-bold text-ink",
    choice:
      "flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border-2 border-line bg-surface px-4 py-3 transition-colors hover:border-green-400 has-checked:border-green-600 has-checked:bg-green-50",
    submit:
      "cursor-pointer rounded-[var(--radius-md)] bg-green-400 px-8 py-4 font-display text-lg font-bold text-forest transition-[transform,box-shadow] duration-200 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-default disabled:opacity-60",
  },
  v2: {
    field: "v2-field w-full px-0 py-2.5 text-lg text-ink outline-none placeholder:text-ink-faint",
    fieldError: "border-danger",
    legend: "v2-label text-ink-faint",
    choice:
      "flex cursor-pointer items-center gap-3 rounded-[var(--radius-pill)] border border-line px-4 py-2.5 transition-colors hover:border-green-500 has-checked:border-green-600 has-checked:bg-green-400/15",
    submit:
      "cursor-pointer rounded-[var(--radius-pill)] bg-obsidian px-8 py-4 font-display text-lg font-bold text-paper transition-colors duration-200 hover:bg-green-400 hover:text-obsidian disabled:cursor-default disabled:opacity-60",
  },
} as const;

export function ContactForm({ variant = "v1" }: { variant?: keyof typeof skins }) {
  const uid = useId();
  const skin = skins[variant];
  const fieldBase = skin.field;
  const labelClass =
    variant === "v2" ? "block v2-label text-ink-faint" : "block font-display font-bold text-ink";
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please tell us your name.";

    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That doesn't look like an email address.";

    if (data.getAll("reasons").length === 0) next.reasons = "Please choose at least one.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: a bot fills every field, a person never sees this one.
    if (String(data.get("company") ?? "")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    const outcome = await sendForm({
      fields: [
        { name: "name", label: "Name", values: [String(data.get("name") ?? "")] },
        { name: "email", label: "Email", values: [String(data.get("email") ?? "")] },
        {
          name: "organization",
          label: "Organization or clinic",
          values: [String(data.get("organization") ?? "")],
        },
        {
          name: "reasons",
          label: "Reaching out because",
          values: data.getAll("reasons").map(String),
        },
        { name: "message", label: "Message", values: [String(data.get("message") ?? "")] },
      ],
      subject: `Website enquiry — ${site.name}`,
      google: googleForm.contact,
      formspree: formspreeEndpoint,
    });

    setStatus(outcome);
    // Only clear on a confirmed send. After a mailto handoff the message may
    // never actually go — no mail client, or they close the draft — so their
    // typing has to survive.
    if (outcome === "ok") form.reset();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div>
        <label htmlFor={`${uid}-name`} className={labelClass}>
          Name <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          autoComplete="name"
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          className={cn(fieldBase, "mt-2", errors.name && skin.fieldError)}
        />
        {errors.name && (
          <p id={`${uid}-name-err`} className="mt-2 text-sm font-semibold text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className={labelClass}>
          Email <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? `${uid}-email-err` : undefined}
          className={cn(fieldBase, "mt-2", errors.email && skin.fieldError)}
        />
        {errors.email && (
          <p id={`${uid}-email-err`} className="mt-2 text-sm font-semibold text-danger">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${uid}-org`} className={labelClass}>
          Organization or clinic
        </label>
        <input
          id={`${uid}-org`}
          name="organization"
          autoComplete="organization"
          className={cn(fieldBase, "mt-2")}
        />
      </div>

      <fieldset
        aria-describedby={errors.reasons ? `${uid}-reasons-err` : undefined}
        aria-invalid={errors.reasons ? "true" : undefined}
      >
        <legend className={skin.legend}>
          I&apos;m reaching out because… <span aria-hidden="true">*</span>
          <span className="sr-only">(choose at least one)</span>
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {reasons.map((reason) => (
            <label
              key={reason}
              className={skin.choice}
            >
              <input
                type="checkbox"
                name="reasons"
                value={reason}
                className="size-5 shrink-0 accent-[var(--color-green-600)]"
              />
              <span className="text-ink">{reason}</span>
            </label>
          ))}
        </div>
        {errors.reasons && (
          <p id={`${uid}-reasons-err`} className="mt-2 text-sm font-semibold text-danger">
            {errors.reasons}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor={`${uid}-message`} className={labelClass}>
          Message
        </label>
        <textarea id={`${uid}-message`} name="message" rows={6} className={cn(fieldBase, "mt-2 resize-y")} />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className={skin.submit}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        <p role="status" className="text-sm text-ink-muted">
          {status === "ok" && "Thanks — we'll be in touch."}
          {status === "error" && (
            <>
              Something went wrong. Please email{" "}
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </>
          )}
          {status === "mailto" &&
            "Opening your email app — hit send and the message reaches us."}
        </p>
      </div>
    </form>
  );
}
