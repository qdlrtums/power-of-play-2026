import { problem } from "@/content/home";
import { Section, Eyebrow } from "@/components/shared/Section";

export function ProblemSection() {
  return (
    <Section labelledBy="problem-heading" className="bg-ground-soft">
      <Eyebrow>{problem.eyebrow}</Eyebrow>

      <h2 id="problem-heading" className="mt-5 max-w-3xl text-h2 text-ink">
        {problem.title}
      </h2>

      <p className="mt-7 inline-block rounded-[var(--radius-pill)] bg-green-400 px-7 py-3 font-display text-h3 font-bold text-brand-ink">
        {problem.stat}
      </p>

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {problem.points.map((point) => (
          <li
            key={point.title}
            className="rounded-[var(--radius-lg)] bg-forest p-8 text-ink-invert shadow-card"
          >
            <h3 className="text-h3 text-green-300">{point.title}</h3>
            <p className="mt-4 text-ink-invert-dim">{point.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
