import Image from "next/image";
import { logos, recognitionLabel, type Logo } from "@/content/logos";

function LogoTrack({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      aria-hidden={clone || undefined}
      data-recognition-clone={clone || undefined}
      className="flex shrink-0 items-center"
    >
      {logos.map((logo: Logo) => (
        <li
          key={logo.id}
          className="flex min-h-28 w-[11rem] shrink-0 items-center justify-center px-6 sm:w-[14rem] lg:w-[16rem]"
        >
          <span className="relative h-11 w-full max-w-[10rem] sm:h-12">
            <Image
              src={logo.src}
              alt={clone ? "" : logo.name}
              fill
              sizes="10rem"
              className="object-contain"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A seamless, self-scrolling carousel. The duplicate track is hidden from
 * assistive technology and lands exactly where the first started, avoiding the
 * flash caused by swapping groups. Reduced-motion users get one wrapped list.
 */
export function LogoSpotlight() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 sm:flex-row sm:items-center sm:gap-10">
      <p className="shrink-0 font-display text-eyebrow font-bold uppercase tracking-[0.18em] text-ink-muted">
        {recognitionLabel}
      </p>

      <div className="recognition-carousel relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
        <div className="recognition-carousel__track flex w-max">
          <LogoTrack />
          <LogoTrack clone />
        </div>
      </div>
    </div>
  );
}
