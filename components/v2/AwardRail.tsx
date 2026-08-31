import { recognition } from "@/content/media";
import { AwardCard } from "./AwardCard";

const awards = recognition.filter((item) => item.kind === "award");

/**
 * Vertical loop of boxed award cards beside the About story.
 */
export function AwardRail() {
  return (
    <div
      aria-label="Awards"
      className="v2-award-rail relative h-[28rem] overflow-hidden sm:h-[36rem] lg:h-[42rem]"
    >
      <div className="v2-award-track flex flex-col">
        <List />
        <List clone />
      </div>
    </div>
  );
}

function List({ clone = false }: { clone?: boolean }) {
  return (
    <ul aria-hidden={clone || undefined} data-award-clone={clone || undefined} className="flex flex-col gap-4 py-2">
      {awards.map((item) => (
        <li key={`${item.id}${clone ? "-clone" : ""}`}>
          <AwardCard item={item} />
        </li>
      ))}
    </ul>
  );
}
