import Image from "next/image";
import type { Member } from "@/content/team";
import { founders, advisors } from "@/content/team";
import { teamSection } from "@/content/about";
import { LinkedInIcon } from "@/components/shared/icons";
import { Band } from "./Rail";

function isLive(text?: string) {
  return Boolean(text) && !text!.startsWith("PLACEHOLDER");
}

function FounderRow({ member }: { member: Member }) {
  return (
    <li className="grid gap-8 border-b border-line py-12 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14 lg:gap-20">
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

      <div className="flex flex-col justify-center">
        {isLive(member.quote) && (
          <blockquote className="max-w-2xl font-display text-d3 font-bold leading-snug text-ink-warm">
            &ldquo;{member.quote}&rdquo;
          </blockquote>
        )}

        {isLive(member.bio) && (
          <p className="mt-7 max-w-2xl leading-relaxed text-ink-warm-2">{member.bio}</p>
        )}

        <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-line pt-6">
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

function AdvisorCard({ member }: { member: Member }) {
  return (
    <li className="flex flex-col border-t border-line pt-7">
      {member.photo ? (
        <div className="relative aspect-[3/4] w-full max-w-[11rem] overflow-hidden rounded-[var(--radius-photo)] bg-paper-3">
          <span className="relative block h-full w-full overflow-hidden">
            <Image
              src={member.photo.src}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="11rem"
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
  return (
    <Band id="team" labelledBy="team-heading">
      <h2 id="team-heading" className="max-w-[18ch] text-d2 font-bold text-ink-warm">
        {teamSection.title}
      </h2>

      <ul className="mt-12 border-t border-line">
        {founders.map((member) => (
          <FounderRow key={member.slug} member={member} />
        ))}
      </ul>

      <ul className="mt-4 grid gap-10 sm:grid-cols-2">
        {advisors.map((member) => (
          <AdvisorCard key={member.slug} member={member} />
        ))}
      </ul>
    </Band>
  );
}
