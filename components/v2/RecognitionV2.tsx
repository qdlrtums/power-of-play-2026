import Image from "next/image";
import { groups, logoById, recognition, sectionCopy } from "@/content/media";
import { Band } from "./Rail";
import { SectionLabel } from "./Label";

/**
 * An index, not a card wall. Each group is a hairline table: logo, entry, then
 * organisation and year in the label face on the right. Empty groups are
 * skipped, and an entry with no logo simply leaves that column empty rather
 * than falling back to a generic placeholder mark.
 */
export function RecognitionV2() {
  return (
    <Band id="recognition" labelledBy="v2-recognition-heading" className="bg-paper-2">
      <SectionLabel>{sectionCopy.eyebrow}</SectionLabel>
      <h2 id="v2-recognition-heading" className="mt-7 max-w-[16ch] text-d2 font-bold text-ink-warm">
        {sectionCopy.title}
      </h2>
      <p className="mt-7 max-w-xl text-lede leading-relaxed text-ink-warm-2">{sectionCopy.body}</p>

      <div className="mt-16 space-y-16">
        {groups.map((group) => {
          const items = recognition.filter((r) => r.kind === group.kind);
          if (items.length === 0) return null;

          return (
            <div key={group.kind}>
              <h3 className="v2-label border-b border-line pb-4 text-ink-warm-3">{group.label}</h3>

              <ul>
                {items.map((item) => {
                  const logo = logoById(item.logoId);
                  return (
                    <li
                      key={item.id}
                      className="grid gap-x-8 gap-y-3 border-b border-line py-6 sm:grid-cols-[6rem_1fr_auto] sm:items-baseline"
                    >
                      <span className="flex h-7 items-center">
                        {logo && (
                          <Image
                            src={logo.src}
                            alt=""
                            width={logo.width}
                            height={logo.height}
                            className="h-7 w-auto max-w-[6rem] object-contain"
                          />
                        )}
                      </span>

                      <div className="min-w-0">
                        <p className="font-display font-bold text-ink-warm">{item.title}</p>
                        {item.summary && (
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-warm-2">
                            {item.summary}
                          </p>
                        )}
                      </div>

                      <p className="v2-label whitespace-nowrap text-ink-warm-3">
                        {item.org}
                        {item.year ? ` · ${item.year}` : ""}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Band>
  );
}
