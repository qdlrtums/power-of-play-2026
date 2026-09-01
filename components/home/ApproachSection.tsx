import { approach } from "@/content/home";
import { Section } from "@/components/shared/Section";

export function ApproachSection() {
  return (
    <Section labelledBy="approach-heading">
      <div className="max-w-3xl">
        <h2 id="approach-heading" className="text-h2 text-ink">
          {approach.title}
        </h2>
        <p className="mt-4 text-lede text-ink-muted">{approach.body}</p>
      </div>

      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {approach.steps.map((step, i) => (
          <li key={step.title} className="rounded-[var(--radius-lg)] border border-line-soft bg-surface p-7 shadow-card">
            <span
              aria-hidden="true"
              className="inline-flex size-10 items-center justify-center rounded-[var(--radius-pill)] bg-green-400 font-display text-base font-bold text-brand-ink"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-h3 text-ink">{step.title}</h3>
            <p className="mt-3 text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
