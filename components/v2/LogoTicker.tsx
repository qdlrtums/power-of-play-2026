import Image from "next/image";
import { logos, recognitionLabel, type Logo } from "@/content/logos";

/**
 * A seamless marquee instead of v1's four-at-a-time crossfade.
 *
 * The list is rendered twice inside a track that translates by exactly -50%,
 * so at the end of the cycle the second copy sits where the first began and
 * the loop has no visible seam. Only the first copy is exposed to assistive
 * tech; the clone is decorative.
 *
 * It is pure CSS (`.v2-ticker`, theme-v2.css) — no hydration, no timers, and
 * `prefers-reduced-motion` collapses it to a static wrapped row rather than a
 * frozen one, so no logo is ever parked off-screen.
 */
function Track({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      aria-hidden={clone || undefined}
      data-ticker-clone={clone || undefined}
      className="flex shrink-0 items-center"
    >
      {logos.map((logo: Logo) => (
        <li key={logo.id} className="flex w-[13rem] shrink-0 items-center justify-center px-8 sm:w-[15rem]">
          <span className="relative h-10 w-full sm:h-11">
            <Image
              src={logo.src}
              alt={clone ? "" : logo.name}
              fill
              sizes="15rem"
              className="object-contain"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LogoTicker() {
  return (
    <section aria-label={recognitionLabel} className="border-y border-line py-10">
      <div className="mx-auto flex max-w-[84rem] flex-col gap-6 px-6 sm:flex-row sm:items-center sm:gap-10 sm:px-10 lg:px-14">
        <p className="v2-label shrink-0 text-ink-warm-3">{recognitionLabel}</p>

        <div className="v2-ticker relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div className="v2-ticker-track flex w-max">
            <Track />
            <Track clone />
          </div>
        </div>
      </div>
    </section>
  );
}
