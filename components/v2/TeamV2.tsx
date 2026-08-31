import Image from "next/image";
import type { Member } from "@/content/team";
import { team } from "@/content/team";
import { teamSection } from "@/content/about";
import { LinkedInIcon } from "@/components/shared/icons";
import { Band } from "./Rail";
import { SectionLabel } from "./Label";

/**
 * One full-width row per person, divided by hairlines — no card, no shadow.
 * The pull-quote is the largest thing in the row, because on a page about two
 * founders the quote is the content and the portrait is the caption.
 */
function Row({ member }: { member: Member }) {
  return (
    <li className="grid gap-8 border-b border-line py-12 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14 lg:gap-20">
      {member.photo && (
        <div className="relative aspect-[3/4] w-full max-w-[15rem] overflow-hidden rounded-[var(--radius-photo)] bg-paper-3">
          <Image
            src={member.photo.src}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 768px) 15rem, 60vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col justify-center">
        {member.quote && (
          <blockquote className="max-w-2xl font-display text-d3 font-bold leading-snug text-ink-warm">
            &ldquo;{member.quote}&rdquo;
          </blockquote>
        )}

        <p className="mt-7 max-w-2xl leading-relaxed text-ink-warm-2">{member.bio}</p>

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

export function TeamV2() {
  return (
    <Band id="team" labelledBy="v2-team-heading">
      <SectionLabel>{teamSection.eyebrow}</SectionLabel>
      <h2 id="v2-team-heading" className="mt-7 max-w-[16ch] text-d2 font-bold text-ink-warm">
        {teamSection.title}
      </h2>

      <ul className="mt-12 border-t border-line">
        {team.map((member) => (
          <Row key={member.slug} member={member} />
        ))}
      </ul>
    </Band>
  );
}
