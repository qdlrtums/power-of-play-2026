import Image from "next/image";
import { UserRound } from "lucide-react";
import type { Member } from "@/content/team";
import { LinkedInIcon } from "@/components/shared/icons";

/**
 * Wide card: photograph on the left, pull-quote over name and role on the
 * right. Stacks to photo-above-text below md. `min-h` on md up because the
 * text column is short — without it the photo stretches to a letterbox and
 * object-cover crops the face out of a portrait shot.
 */
export function TeamCard({ member }: { member: Member }) {
  return (
    <li className="squircle grid overflow-hidden border border-line-soft bg-surface shadow-card md:min-h-[22rem] md:grid-cols-[minmax(0,20rem)_1fr]">
      <div className="squircle-top relative aspect-[4/3] overflow-hidden bg-green-100 md:aspect-auto md:squircle-left">
        {member.photo ? (
          <Image
            src={member.photo.src}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 768px) 20rem, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-green-700">
            <span className="flex size-20 items-center justify-center rounded-full bg-green-200/80">
              <UserRound className="size-10" aria-hidden="true" />
            </span>
            <span className="font-display text-sm font-semibold">Headshot to come</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center p-8 lg:p-12">
        {member.quote && (
          <blockquote className="font-display text-h3 leading-snug text-forest">
            &ldquo;{member.quote}&rdquo;
          </blockquote>
        )}

        <div className="mt-6">
          <h3 className="text-h3 text-ink">{member.name}</h3>
          <p className="mt-1 font-display font-bold text-green-700">{member.role}</p>
        </div>

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
