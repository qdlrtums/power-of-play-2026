import Image from "next/image";
import { recognition } from "@/content/media";

const photos = recognition.filter((item) => item.photo);

/**
 * Award photographs drifting left to right behind the story heading.
 *
 * Purely decoration — every one of these pictures is readable as a titled card
 * in the Recognition band further down the page — so the strip is hidden from
 * assistive tech and blurred hard enough that the heading keeps its contrast.
 * It sits behind the heading only, not the paragraphs: body copy needs 4.5:1
 * and a photograph, however dimmed, cannot be relied on to leave it there.
 *
 * Two identical rows translate as one. Starting at -50% and ending at 0 makes
 * the travel left-to-right, and at the end the second row is exactly where the
 * first began, so the loop has no seam.
 */
export function AwardDrift() {
  return (
    <div
      aria-hidden="true"
      className="v2-drift pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2"
    >
      <div className="v2-drift-track flex w-max">
        <Row />
        <Row clone />
      </div>
    </div>
  );
}

function Row({ clone = false }: { clone?: boolean }) {
  return (
    <ul data-drift-clone={clone || undefined} className="flex shrink-0 gap-5 pr-5">
      {photos.map((item) => (
        <li
          key={`${item.id}${clone ? "-clone" : ""}`}
          className="relative h-48 w-64 shrink-0 overflow-hidden rounded-[var(--radius-photo)] sm:h-64 sm:w-80 lg:h-72 lg:w-[24rem]"
        >
          {/* Requested at a fraction of the box it fills: 15px of blur makes
              the upscaling invisible, and the strip is the first thing on the
              page, so it has to paint without waiting to be scrolled to. */}
          <Image
            src={item.photo!.src}
            alt=""
            fill
            sizes="192px"
            loading="eager"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
