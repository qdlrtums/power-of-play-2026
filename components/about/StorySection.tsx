import { story } from "@/content/about";
import { Section, Eyebrow } from "@/components/shared/Section";

export function StorySection() {
  return (
    <Section labelledBy="story-heading">
      <div className="max-w-3xl">
        <Eyebrow>{story.eyebrow}</Eyebrow>
        <h1 id="story-heading" className="mt-5 text-h1 text-ink">
          {story.title}
        </h1>
        {story.paragraphs.map((p) => (
          <p key={p} className="mt-6 text-lede text-ink-muted">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
