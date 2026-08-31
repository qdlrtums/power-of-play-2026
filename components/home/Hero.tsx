import { hero } from "@/content/home";
import { Reveal } from "@/components/shared/Reveal";
import { HeroPill } from "./HeroPill";
import { PillarBg } from "./PillarBg";
import { NewsletterCard } from "./NewsletterCard";

export function Hero() {
  return (
    <section className="relative px-3 pb-24 pt-8 sm:px-5 lg:pb-32 lg:pt-12" aria-labelledby="hero-heading">
      {/* Decorative columns rising from behind the elevated hero card. */}
      <PillarBg className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[26rem] w-full" />

      <div className="on-forest relative mx-auto max-w-[88rem] rounded-[var(--radius-lg)] bg-forest px-5 py-16 text-center shadow-hero sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <Reveal as="p" className="font-display text-eyebrow font-semibold uppercase tracking-[0.16em] text-ink-invert">
          {hero.eyebrow}
        </Reveal>

        <h1 id="hero-heading" className="mx-auto mt-6 max-w-[13ch] text-hero leading-[1.12] text-green-400">
          <Reveal as="span" delay={0.1} className="block">
            {hero.headline.before}
            <HeroPill>{hero.headline.highlight}</HeroPill>
            {hero.headline.after}
          </Reveal>
        </h1>

        <Reveal as="p" delay={0.2} className="mx-auto mt-8 max-w-2xl text-lede text-ink-invert-dim">
          {hero.lede}
        </Reveal>

        <div aria-hidden="true" className="h-10 sm:h-12" />
      </div>

      {/* Overflows the hero card's bottom edge, overlapping into the next section. */}
      <Reveal
        delay={0.45}
        className="relative z-10 mx-auto -mt-14 max-w-4xl px-2 sm:-mt-16 lg:-mt-20"
      >
        <NewsletterCard />
      </Reveal>
    </section>
  );
}
