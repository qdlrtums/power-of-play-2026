import { hero } from "@/content/home";
import { Reveal } from "@/components/shared/Reveal";
import { HeroPill } from "./HeroPill";
import { NewsletterCard } from "./NewsletterCard";

export function Hero() {
  return (
    <section className="relative px-3 pb-6 pt-6 sm:px-5 lg:pb-8 lg:pt-8" aria-labelledby="hero-heading">
      <div className="on-forest relative mx-auto max-w-[88rem] overflow-hidden rounded-[var(--radius-lg)] bg-green-950 px-5 pb-16 pt-14 text-center shadow-hero sm:px-10 sm:pb-18 sm:pt-16 lg:px-16 lg:pb-20 lg:pt-18">
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          poster="/banners/1778287109130.jpeg"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover object-[center_54%] opacity-70 mix-blend-luminosity"
        >
          <source src="/banners/Untitled%202.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-gradient-to-b from-green-950/55 via-green-900/60 to-green-950/75"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <h1 id="hero-heading" className="mx-auto max-w-[13ch] text-hero leading-[1.12] text-green-400">
            <Reveal as="span" delay={0.1} className="block">
              <HeroPill>Play</HeroPill> is the assessment
            </Reveal>
          </h1>

          <Reveal as="p" delay={0.2} className="mx-auto mt-6 max-w-2xl text-lede text-ink-invert-dim">
            {hero.lede}
          </Reveal>

          <Reveal delay={0.45} className="mx-auto mt-7 max-w-4xl px-2 sm:mt-8 lg:mt-9">
            <NewsletterCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
