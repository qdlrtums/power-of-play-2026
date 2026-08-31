import { story } from "@/content/about";
import { Rail } from "./Rail";
import { AwardRail } from "./AwardRail";

/**
 * About opens on the statement at display size, with the award photographs
 * scrolling in a column on the right.
 */
export function StoryV2() {
  return (
    <section aria-labelledby="story-heading" className="v2-dotfield pb-16 pt-10 sm:pt-14 lg:pb-24">
      <Rail>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] lg:gap-16">
          <div>
            <h1
              id="story-heading"
              className="max-w-[22ch] text-d2 font-bold text-ink-warm"
            >
              {story.title}
            </h1>

            <div className="mt-10 space-y-6 md:mt-14">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-xl text-lede leading-relaxed text-ink-warm-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <AwardRail />
        </div>
      </Rail>
    </section>
  );
}
