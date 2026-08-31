import Image from "next/image";
import type { Member } from "@/content/team";
import { LinkedInIcon } from "@/components/shared/icons";

/**
 * Portrait card: photograph above, name and role below. Bios and pull-quotes
 * are still owed by the client, so the card deliberately carries only what is
 * confirmed — a name, a role and a face read as finished; a paragraph of
 * placeholder does not.
 */
export function TeamCard({ member }: { member: Member }) {
  return (
    <li className="overflow-hidden rounded-[var(--radius-lg)] border border-line-soft bg-surface shadow-card">
      {member.photo && (
        <div className="relative aspect-[4/5]">
          <Image
            src={member.photo.src}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 640px) 34rem, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="p-7 lg:p-8">
        <h3 className="text-h3 text-ink">{member.name}</h3>
        <p className="mt-1 font-display font-bold text-green-700">{member.role}</p>

        {member.linkedin && (
          <a
            href={member.linkedin}
            className="mt-5 inline-flex w-fit items-center gap-2 font-display font-bold text-forest underline-offset-4 hover:underline"
          >
            <LinkedInIcon className="size-4" />
            LinkedIn
          </a>
        )}
      </div>
    </li>
  );
}
