import Image from "next/image";
import type { Member } from "@/content/team";
import { DraftBadge } from "@/components/shared/DraftBadge";
import { LinkedInIcon } from "@/components/shared/icons";

/**
 * Large rectangular card: photograph on the left, quote/name/role/bio on the
 * right. Stacks to photo-above-text below the md breakpoint.
 */
export function TeamCard({ member }: { member: Member }) {
  return (
    <li className="grid overflow-hidden rounded-[var(--radius-lg)] border border-line-soft bg-surface shadow-card md:grid-cols-[minmax(0,20rem)_1fr]">
      {member.photo && (
        <div className="relative aspect-[4/3] md:aspect-auto">
          <Image
            src={member.photo.src}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 768px) 20rem, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col justify-center p-8 lg:p-12">
        {member.quote && (
          <blockquote className="font-display text-h3 leading-snug text-forest">
            &ldquo;{member.quote}&rdquo;
            {member.draft && <DraftBadge />}
          </blockquote>
        )}

        <div className="mt-6">
          <h3 className="text-h3 text-ink">{member.name}</h3>
          <p className="mt-1 font-display font-bold text-green-700">{member.role}</p>
        </div>

        <p className="mt-5 text-ink-muted">{member.bio}</p>

        {member.linkedin && (
          <a
            href={member.linkedin}
            className="mt-6 inline-flex w-fit items-center gap-2 font-display font-bold text-forest underline-offset-4 hover:underline"
          >
            <LinkedInIcon className="size-4" />
            LinkedIn
          </a>
        )}
      </div>
    </li>
  );
}
