import Image from "next/image";
import { problem } from "@/content/home";
import { Section, Eyebrow } from "@/components/shared/Section";

export function ProblemSection() {
  return (
    <Section labelledBy="problem-heading" className="bg-ground-soft">
      <Eyebrow>{problem.eyebrow}</Eyebrow>

      <div className="mt-5 grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:gap-14">
        <div className="flex flex-col items-start justify-center py-2 lg:py-8">
          <h2 id="problem-heading" className="max-w-3xl text-h2 text-ink">
            {problem.title}
          </h2>

          <p className="mt-7 inline-block rounded-[var(--radius-pill)] bg-green-400 px-7 py-3 font-display text-h3 font-bold text-brand-ink">
            {problem.stat}
          </p>
        </div>

        <figure className="squircle relative min-h-72 overflow-hidden bg-green-900 shadow-lift sm:min-h-96 lg:min-h-[28rem]">
          <Image
            src="/banners/1778287106612.jpeg"
            alt="A Power of Play team member presenting the challenges with current pediatric assessment options"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-green-950/35 via-transparent to-transparent"
            aria-hidden="true"
          />
        </figure>
      </div>

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
