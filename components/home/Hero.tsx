import Image from "next/image";
import { hero } from "@/content/home";
import { Reveal } from "@/components/shared/Reveal";
import { HeroPill } from "./HeroPill";
import { NewsletterCard } from "./NewsletterCard";
import heroImage from "@/_prototype/reference/1778287109130.jpeg";

export function Hero() {
  return (
    <section className="relative px-3 pb-8 pt-8 sm:px-5 lg:pb-12 lg:pt-12" aria-labelledby="hero-heading">
      <div className="on-forest relative mx-auto max-w-[88rem] overflow-hidden rounded-[var(--radius-lg)] bg-green-950 px-5 pb-20 pt-16 text-center shadow-hero sm:px-10 sm:pb-24 sm:pt-20 lg:px-16 lg:pb-28 lg:pt-24">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="(min-width: 1440px) 1408px, calc(100vw - 24px)"
          className="object-cover object-[center_54%] opacity-55 mix-blend-luminosity"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-green-950/75 via-green-900/80 to-green-950/95"
          aria-hidden="true"
        />

        <div className="relative z-10">
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

          <Reveal delay={0.45} className="mx-auto mt-8 max-w-4xl px-2 sm:mt-10 lg:mt-12">
            <NewsletterCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
