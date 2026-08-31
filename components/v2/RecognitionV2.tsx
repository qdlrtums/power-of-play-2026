import { recognition, sectionCopy } from "@/content/media";
import { Band } from "./Rail";
import { AwardCarousel } from "./AwardCarousel";

/**
 * Awards as boxed cards in a carousel: logo (or photograph), position, name.
 */
export function RecognitionV2() {
  return (
    <Band id="recognition" labelledBy="recognition-heading" className="bg-paper-2">
      <h2 id="recognition-heading" className="max-w-[16ch] text-d2 font-bold text-ink-warm">
        {sectionCopy.title}
      </h2>
      <p className="mt-7 max-w-xl text-lede leading-relaxed text-ink-warm-2">{sectionCopy.body}</p>

      <div className="mt-14">
        <AwardCarousel items={recognition} />
      </div>
    </Band>
  );
}
