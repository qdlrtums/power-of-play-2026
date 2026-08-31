import { hero } from "@/content/home";
import { heroFacts } from "@/content/v2";
import { Rail } from "./Rail";
import { NewsletterInline } from "./NewsletterInline";

/**
 * Editorial hero: kicker rule, then the sentence at the largest size the page
 * will ever use, with the lede set as a narrow column offset to the right.
 *
 * The marker under "assessment" replaces v1's filled pill. Same idea — mark
 * the one word the whole positioning turns on — but a stroke rather than a
 * block, because at this size a filled pill stops being an accent and becomes
 * a second background. It is drawn in CSS (`.v2-marker`, theme-v2.css) so it
 * never depends on hydration, and reduced motion renders it already drawn.
 */
export function HeroV2() {
  return (
    <section aria-labelledby="v2-hero-heading" className="v2-dotfield relative pt-10 sm:pt-16">
      <Rail>
        {/* Kicker row — the page's first hairline, and the facts strip that
            tells a clinician who this is for before they read a word of copy. */}
        <div className="flex flex-col gap-6 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="v2-label flex items-center gap-3 text-ink-warm-2">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[var(--radius-pill)] bg-green-400" />
            {hero.eyebrow}
          </p>

          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="v2-label text-ink-warm-3">{fact.label}</dt>
                <dd className="mt-1.5 font-display text-sm font-bold text-ink-warm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <h1
          id="v2-hero-heading"
          className="mt-10 max-w-[16ch] text-display font-bold text-ink-warm sm:mt-14"
        >
          {hero.headline.before}
          <span className="v2-marker">{hero.headline.highlight}</span>
          {hero.headline.after}
        </h1>

        {/* Offset right, narrow measure — the classic editorial standfirst. */}
        <p className="ml-auto mt-10 max-w-md text-lede leading-relaxed text-ink-warm-2 sm:mt-14 lg:mr-[8%]">
          {hero.lede}
        </p>

        <div className="mt-14 border-t border-line pb-16 pt-8 sm:mt-20 lg:pb-24">
          <NewsletterInline />
        </div>
      </Rail>
    </section>
  );
}
