import Image from "next/image";
import { problem } from "@/content/home";
import { Section } from "@/components/shared/Section";

export function ProblemSection() {
  return (
    <Section labelledBy="problem-heading" className="bg-ground-soft">
      <div className="grid items-stretch gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(28rem,1.05fr)] lg:gap-8">
        <div className="flex flex-col items-start justify-center py-2 lg:py-4">
          <h2 id="problem-heading" className="max-w-3xl text-h2 text-ink">
            {problem.title}
          </h2>

          <p className="mt-5 inline-block rounded-[var(--radius-pill)] bg-green-400 px-7 py-3 font-display text-h3 font-bold text-brand-ink">
            {problem.stat}
          </p>
        </div>

        <figure className="squircle relative min-h-64 overflow-hidden bg-green-100 shadow-lift sm:min-h-80 lg:h-[clamp(15rem,31vh,19rem)] lg:min-h-0 lg:w-full lg:max-w-[36rem] lg:justify-self-end">
          <Image
            src="/images/Screenshot 2026-09-01 at 12.27.06 PM.png"
            alt="A therapist supporting a young person during a fine-motor activity"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover object-center"
          />
        </figure>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {problem.points.map((point) => (
          <li
            key={point.title}
            className="rounded-[var(--radius-lg)] bg-forest p-6 text-ink-invert shadow-card"
          >
            <h3 className="text-h3 text-green-300">{point.title}</h3>
            <p className="mt-3 text-ink-invert-dim">{point.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
