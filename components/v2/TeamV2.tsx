import Image from "next/image";
import type { Member } from "@/content/team";
import { founders, advisors } from "@/content/team";
import { teamSection } from "@/content/about";
import { LinkedInIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { Band } from "./Rail";

function isLive(text?: string) {
  return Boolean(text) && !text!.startsWith("PLACEHOLDER");
}

function FounderRow({ member }: { member: Member }) {
  // Quote and bio are both still awaiting the client. Until they land, the
  // row has nothing to fill its second column with, so it stops pretending to
  // be an editorial spread: the name sits at the top beside the photograph
  // rather than floating in the middle of the gap under a rule with nothing
  // above it.
  const hasCopy = isLive(member.quote) || isLive(member.bio);

  return (
    <li
      className={cn(
        "grid gap-8 border-b border-line md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14 lg:gap-20",
        hasCopy ? "py-12" : "py-10",
      )}
    >
      {member.photo && (
        <div className="relative aspect-[3/4] w-full max-w-[15rem] overflow-hidden rounded-[var(--radius-photo)] bg-paper-3">
          <span className="relative block h-full w-full overflow-hidden">
          <Image
            src={member.photo.src}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 768px) 15rem, 60vw"
            className="object-cover"
          />
          </span>
        </div>
      )}

      <div className={cn("flex flex-col", hasCopy ? "justify-center" : "justify-start")}>
        {isLive(member.quote) && (
          <blockquote className="max-w-2xl font-display text-d3 font-bold leading-snug text-ink-warm">
            &ldquo;{member.quote}&rdquo;
          </blockquote>
        )}

        {isLive(member.bio) && (
          <p className="mt-7 max-w-2xl leading-relaxed text-ink-warm-2">{member.bio}</p>
        )}

        <div
          className={cn(
            "flex flex-wrap items-baseline gap-x-5 gap-y-2",
            hasCopy && "mt-8 border-t border-line pt-6",
          )}
        >
          <h3 className="font-display text-xl font-bold text-ink-warm">{member.name}</h3>
          <p className="v2-label text-ink-warm-3">{member.role}</p>
          {member.linkedin && (
            <a
              href={member.linkedin}
              className="v2-label inline-flex items-center gap-2 text-green-700 transition-colors duration-200 hover:text-ink-warm"
            >
              <LinkedInIcon className="size-3.5" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

function PersonCard({ member, photoClass }: { member: Member; photoClass: string }) {
  return (
    <li className="flex flex-col border-t border-line pt-7">
      {member.photo ? (
        <div
          className={cn(
            "relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-photo)] bg-paper-3",
            photoClass,
          )}
        >
          <span className="relative block h-full w-full overflow-hidden">
            <Image
              src={member.photo.src}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="15rem"
              className="object-cover"
            />
          </span>
        </div>
      ) : (
        <span
          aria-hidden="true"
          className="flex size-14 items-center justify-center rounded-[var(--radius-photo)] bg-paper-3 font-display text-lg font-bold text-green-700"
        >
          {member.name.replace(/^Dr\s+/i, "").split(" ").map((part) => part[0]).join("").slice(0, 2)}
        </span>
      )}
      <h3 className="mt-5 font-display text-xl font-bold text-ink-warm">{member.name}</h3>
      <p className="v2-label mt-2 text-ink-warm-3">{member.role}</p>
      {isLive(member.bio) && (
        <p className="mt-4 max-w-sm leading-relaxed text-ink-warm-2">{member.bio}</p>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          className="v2-label mt-5 inline-flex items-center gap-2 text-green-700 transition-colors duration-200 hover:text-ink-warm"
        >
          <LinkedInIcon className="size-3.5" />
          LinkedIn
        </a>
      )}
    </li>
  );
}

export function TeamV2() {
  // The founder rows are an editorial spread built around a quote and a bio,
  // and both are still awaiting the client. Rather than run two full-width
  // rows with an empty half each, the founders fall back to the same card the
  // advisors use — a finished roster now, and the spread returns on its own
  // the moment there is copy to hang it on.
  const foundersHaveCopy = founders.some(
    (member) => isLive(member.quote) || isLive(member.bio),
  );

  return (
    <Band id="team" labelledBy="team-heading">
      <h2 id="team-heading" className="max-w-[18ch] text-d2 font-bold text-ink-warm">
        {teamSection.title}
      </h2>

      {foundersHaveCopy ? (
        <ul className="mt-12 border-t border-line">
          {founders.map((member) => (
            <FounderRow key={member.slug} member={member} />
          ))}
        </ul>
      ) : (
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-14">
          {founders.map((member) => (
            <PersonCard key={member.slug} member={member} photoClass="max-w-[15rem]" />
          ))}
        </ul>
      )}

      <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-14">
        {advisors.map((member) => (
          <PersonCard key={member.slug} member={member} photoClass="max-w-[11rem]" />
        ))}
      </ul>
    </Band>
  );
}
