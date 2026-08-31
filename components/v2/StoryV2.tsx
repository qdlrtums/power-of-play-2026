import { story } from "@/content/about";
import { Rail } from "./Rail";
import { SectionLabel } from "./Label";

/**
 * About opens the way the home page does — kicker, hairline, statement at
 * display size — so the two pages read as one publication.
 */
export function StoryV2() {
  return (
    <section aria-labelledby="v2-story-heading" className="v2-dotfield pb-20 pt-14 sm:pt-20 lg:pb-28">
      <Rail>
        <SectionLabel>{story.eyebrow}</SectionLabel>

        <h1
          id="v2-story-heading"
          className="mt-8 max-w-[17ch] text-d2 font-bold text-ink-warm"
        >
          {story.title}
        </h1>

        <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-2 md:gap-16">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lede leading-relaxed text-ink-warm-2">
              {paragraph}
            </p>
          ))}
        </div>
      </Rail>
    </section>
  );
}
