import { problem } from "@/content/home";
import { Rail } from "./Rail";
import { SectionLabel } from "./Label";

/**
 * v1 states the problem in three identical cards. Three identical cards is the
 * house style of every startup page ever built, and it flattens three findings
 * of different weight into one shape.
 *
 * Here it is a numbered table on a dark band: one row per finding, divided by
 * hairlines, headline left and evidence right. It reads like something out of
 * a clinical document, which is the register this particular claim needs.
 */
export function ProblemBand() {
  return (
    <section
      aria-labelledby="v2-problem-heading"
      className="on-dark bg-obsidian py-20 text-paper sm:py-24 lg:py-32"
    >
      <Rail>
        <SectionLabel className="text-green-400">{problem.eyebrow}</SectionLabel>

        <h2
          id="v2-problem-heading"
          className="mt-8 max-w-[18ch] text-d2 font-bold text-paper"
        >
          {problem.title}
        </h2>

        {/* The number gets its own rule and the only lime on the band, but
            stays below the statement in size — it is the evidence for the
            headline, not a second headline. */}
        <p className="mt-14 border-t border-hairline-dark pt-8 text-d3 font-display font-bold text-green-400 sm:mt-16">
          {problem.stat}
        </p>

        <ol className="mt-14 border-t border-hairline-dark sm:mt-16">
          {problem.points.map((point, i) => (
            <li
              key={point.title}
              className="grid gap-4 border-b border-hairline-dark py-8 md:grid-cols-[4rem_1fr_1.15fr] md:gap-10 md:py-10"
            >
              <span aria-hidden="true" className="v2-label pt-1.5 text-green-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-d3 font-bold text-paper">{point.title}</h3>
              <p className="leading-relaxed text-paper-dim">{point.body}</p>
            </li>
          ))}
        </ol>
      </Rail>
    </section>
  );
}
