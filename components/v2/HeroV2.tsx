import { hero } from "@/content/home";
import { Rail } from "./Rail";
import { NewsletterInline } from "./NewsletterInline";
import { PlacedPhoto } from "./PlacedPhoto";

/**
 * Headline first, hard against the left rail; the photograph takes the column
 * beside it. An earlier pass sat the type on top of the picture, which cost
 * the headline its left edge and left the photograph half-washed-out to keep
 * the words readable. Two fields, one rule between them, reads calmer and lets
 * both do their job.
 *
 * The three children are placed explicitly rather than left to flow, because
 * the two axes want different orders: stacked, the headline has to lead and
 * the photograph breaks the column before the sign-up; side by side, the
 * photograph sits against both of them at once.
 *
 * It still sits a little low and a little off-square — placed by hand rather
 * than snapped to the grid — which is the warmth the rest of the page is
 * built on.
 */
export function HeroV2() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="v2-dotfield relative overflow-x-hidden pt-10 sm:pt-14 lg:pt-20"
    >
      <Rail>
        <div className="grid gap-10 pb-16 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-16 lg:gap-y-0 lg:pb-24">
          <h1
            id="hero-heading"
            className="max-w-[12ch] text-display font-bold text-ink-warm lg:col-start-1 lg:row-start-1"
          >
            {hero.headline.before}
            <span className="v2-marker">{hero.headline.highlight}</span>
            {hero.headline.after}
          </h1>

          <PlacedPhoto
            src="/team/product-1.jpg"
            alt="The Power of Play team with the play-based assessment prototype"
            sizes="(min-width: 1024px) 25rem, (min-width: 640px) 60vw, 90vw"
            priority
            objectPosition="50% 38%"
            className="aspect-[4/3] w-[min(100%,22rem)] rotate-[-1.5deg] sm:aspect-[4/5] justify-self-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-full lg:max-w-[25rem] lg:translate-y-6 lg:self-center lg:rotate-[-4deg]"
          />

          <div className="max-w-md lg:col-start-1 lg:row-start-2 lg:mt-8">
            <p className="text-lede leading-relaxed text-ink-warm-2">{hero.lede}</p>

            <div className="mt-10 border-t border-line pt-7 sm:mt-12">
              <NewsletterInline />
            </div>
          </div>
        </div>
      </Rail>
    </section>
  );
}
