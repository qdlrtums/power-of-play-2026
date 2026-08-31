import { problem } from "@/content/home";
import { Rail } from "./Rail";

/**
 * Dark band. Type only, with quiet lime ornaments in the background so the
 * block is not a blank wall.
 */
export function ProblemBand() {
  return (
    <section
      aria-labelledby="problem-heading"
      className="v2-problem-field on-dark relative bg-obsidian py-20 text-paper sm:py-24 lg:py-32"
    >
      <span aria-hidden="true" className="v2-problem-chip" />
      <Rail className="relative z-10">
        <h2
          id="problem-heading"
          className="max-w-5xl text-d2 font-bold text-paper"
        >
          {problem.title}
        </h2>

        <p className="mt-8 font-display text-d3 font-bold text-green-400 sm:mt-10">
          {problem.stat}
        </p>

        <ol className="mt-14 lg:mt-16">
          {problem.points.map((point, i) => (
            <li
              key={point.title}
              className="grid gap-3 border-t border-hairline-dark py-7 first:border-t-0 md:grid-cols-[3.5rem_1fr] md:gap-8 md:py-8"
            >
              <span aria-hidden="true" className="v2-label pt-1.5 text-green-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-d3 font-bold text-paper">{point.title}</h3>
                <p className="mt-3 leading-relaxed text-paper-dim">{point.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Rail>
    </section>
  );
}
