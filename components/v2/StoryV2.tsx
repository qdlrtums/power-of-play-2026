import { story } from "@/content/about";
import { Rail } from "./Rail";
import { AwardDrift } from "./AwardDrift";

/**
 * About opens on the statement at display size, with the award photographs
 * drifting behind it. The heading gets the full measure now that the pictures
 * are behind the type rather than in a column beside it.
 */
export function StoryV2() {
  return (
    <section
      aria-labelledby="story-heading"
      className="v2-dotfield relative overflow-hidden pb-16 pt-10 sm:pt-14 lg:pb-24"
    >
      <div className="relative py-12 sm:py-16 lg:py-20">
        <AwardDrift />

        <Rail className="relative z-10">
          <h1
            id="story-heading"
            className="max-w-[20ch] text-d2 font-bold text-ink-warm"
          >
            {story.title}
          </h1>
        </Rail>
      </div>

      <Rail className="relative z-10">
        <div className="space-y-6">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-xl text-lede leading-relaxed text-ink-warm-2">
              {paragraph}
            </p>
          ))}
        </div>
      </Rail>
    </section>
  );
}
