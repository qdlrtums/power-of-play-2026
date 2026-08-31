import { hero } from "@/content/home";
import { Rail } from "./Rail";
import { NewsletterInline } from "./NewsletterInline";
import { OverlapPhoto } from "./OverlapPhoto";

/**
 * Product photograph anchored top-left. The headline sits on top of it so the
 * two share an edge instead of sitting in separate columns.
 */
export function HeroV2() {
  return (
    <section aria-labelledby="hero-heading" className="v2-dotfield relative overflow-x-hidden pt-6 sm:pt-8">
      <Rail className="relative">
        <OverlapPhoto
          src="/team/product-1.jpg"
          alt="The Power of Play team with the play-based assessment prototype"
          sizes="(min-width: 1024px) 28rem, (min-width: 640px) 46vw, 90vw"
          priority
          fade="hero"
          objectPosition="50% 38%"
          className="relative z-0 aspect-[4/5] w-[min(88%,20rem)] -translate-x-3 rotate-0 sm:absolute sm:left-0 sm:top-2 sm:w-[min(48%,24rem)] sm:-translate-x-8 sm:-rotate-6 md:w-[26rem] lg:w-[28rem] lg:-rotate-[7deg]"
        />

        <div className="relative z-10 -mt-16 max-w-xl pt-6 sm:ml-auto sm:mt-10 sm:w-[min(100%,34rem)] sm:pt-8 lg:mt-16 lg:w-[36rem]">
          <h1
            id="hero-heading"
            className="max-w-[11ch] text-display font-bold text-ink-warm"
          >
            {hero.headline.before}
            <span className="v2-marker">{hero.headline.highlight}</span>
            {hero.headline.after}
          </h1>

          <p className="mt-6 max-w-md text-lede leading-relaxed text-ink-warm-2 sm:mt-8">
            {hero.lede}
          </p>

          <div className="mt-10 border-t border-line pb-14 pt-7 sm:mt-12 lg:pb-16">
            <NewsletterInline />
          </div>
        </div>
      </Rail>
    </section>
  );
}
