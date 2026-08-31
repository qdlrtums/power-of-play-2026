import Image from "next/image";
import { logoById, type RecognitionItem } from "@/content/media";

/**
 * Boxed card: photograph when we have one, otherwise the organisation logo,
 * then the placement and the name.
 */
export function AwardCard({ item }: { item: RecognitionItem }) {
  const logo = logoById(item.logoId);

  return (
    <article className="v2-award-card flex h-full flex-col">
      {item.photo ? (
        <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-edge)] bg-paper-2">
          <Image
            src={item.photo.src}
            alt=""
            fill
            sizes="18rem"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-[var(--radius-edge)] bg-paper-2 px-5">
          {logo ? (
            <Image
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              className="max-h-14 w-auto max-w-[9rem] object-contain"
            />
          ) : (
            <span className="font-display text-3xl font-bold tracking-tight text-green-800">
              {item.title.split(/[,\s]/)[0]}
            </span>
          )}
        </div>
      )}
      <p className="mt-5 font-display text-lg font-bold leading-snug text-ink-warm">{item.title}</p>
      <p className="mt-1.5 text-sm leading-snug text-ink-warm-2">
        {item.org}{item.year ? `, ${item.year}` : ""}
      </p>
    </article>
  );
}
