import Image from "next/image";
import { groups, logoById, recognition, sectionCopy } from "@/content/media";
import { Section } from "@/components/shared/Section";

/**
 * Awards & competitions, programmes & partners, and media features — the
 * "where we've been featured" section. Groups with no entries are skipped.
 */
export function RecognitionSection() {
  return (
    <Section id="recognition" labelledBy="recognition-heading">
      <h2 id="recognition-heading" className="text-h2 text-ink">
        {sectionCopy.title}
      </h2>
      <p className="mt-6 max-w-2xl text-lede text-ink-muted">{sectionCopy.body}</p>

      <div className="mt-14 space-y-14">
        {groups.map((group) => {
          const items = recognition.filter((r) => r.kind === group.kind);
          if (items.length === 0) return null;

          return (
            <div key={group.kind}>
              <h3 className="font-display text-h3 text-forest">{group.label}</h3>

              <ul className="mt-6 grid gap-5 md:grid-cols-2">
                {items.map((item) => {
                  const logo = logoById(item.logoId);
                  return (
                    <li
                      key={item.id}
                      className="flex items-start gap-5 rounded-[var(--radius-lg)] border border-line-soft bg-surface p-6 shadow-card"
                    >
                      {logo && (
                        <Image
                          src={logo.src}
                          alt=""
                          width={logo.width}
                          height={logo.height}
                          className="h-10 w-24 shrink-0 object-contain"
                        />
                      )}

                      <div className="min-w-0">
                        <p className="font-display font-bold text-ink">{item.title}</p>
                        <p className="mt-1 text-sm text-ink-muted">
                          {item.org}
                          {item.year ? ` · ${item.year}` : ""}
                        </p>
                        {item.summary && (
                          <p className="mt-3 text-sm text-ink-muted">{item.summary}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
