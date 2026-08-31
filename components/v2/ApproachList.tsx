import { approach } from "@/content/home";
import { Band } from "./Rail";
import { SectionLabel } from "./Label";

/**
 * Sticky heading on the left, the steps running past it on the right. The
 * heading stays in view for the whole scroll of the list, so a reader never
 * loses what the numbered items are steps *of* — which is the one thing a
 * three-across card grid cannot do.
 *
 * The steps are still PLACEHOLDER in `content/home.ts`; nothing here invents
 * copy to fill the shape.
 */
export function ApproachList() {
  return (
    <Band labelledBy="v2-approach-heading" ruled={false}>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>{approach.eyebrow}</SectionLabel>
          <h2 id="v2-approach-heading" className="mt-7 text-d2 font-bold text-ink-warm">
            {approach.title}
          </h2>
          <p className="mt-7 text-lede leading-relaxed text-ink-warm-2">{approach.body}</p>
        </div>

        <ol className="border-t border-line">
          {approach.steps.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-3 border-b border-line py-9 sm:grid-cols-[4rem_1fr] sm:gap-8"
            >
              <span
                aria-hidden="true"
                className="font-display text-d3 font-bold leading-none text-green-700"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-d3 font-bold text-ink-warm">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-warm-2">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}
