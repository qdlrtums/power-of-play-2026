import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whoWeAre } from "@/content/home";
import { team } from "@/content/team";
import { v2Href } from "@/content/v2";
import { Band } from "./Rail";
import { SectionLabel } from "./Label";

/**
 * Portraits set as tall plates, the second one dropped half a step so the pair
 * reads as a spread rather than a row of avatars. Names sit under the plate in
 * the label face — no card, no border, no shadow.
 */
export function TeamStrip() {
  return (
    <Band labelledBy="v2-who-heading" className="bg-paper-2">
      <div className="grid gap-16 lg:grid-cols-[1fr_minmax(0,30rem)] lg:items-center lg:gap-24">
        <div>
          <SectionLabel>{whoWeAre.eyebrow}</SectionLabel>
          <h2 id="v2-who-heading" className="mt-7 max-w-[15ch] text-d2 font-bold text-ink-warm">
            {whoWeAre.title}
          </h2>
          <p className="mt-7 max-w-lg text-lede leading-relaxed text-ink-warm-2">
            {whoWeAre.body}
          </p>
          <Link
            href={v2Href(whoWeAre.cta.href)}
            className="group mt-10 inline-flex items-center gap-3 border-b-2 border-green-400 pb-2 font-display text-lg font-bold text-ink-warm transition-colors duration-200 hover:text-green-700"
          >
            {whoWeAre.cta.label}
            <ArrowRight
              className="size-5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-5 sm:gap-8">
          {team.map((member, i) => (
            <li key={member.slug} className={i % 2 === 1 ? "sm:translate-y-12" : undefined}>
              {member.photo && (
                <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-photo)] bg-paper-3">
                  <Image
                    src={member.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 15rem, 45vw"
                    className="object-cover"
                  />
                </div>
              )}
              <p className="mt-4 font-display font-bold leading-tight text-ink-warm">{member.name}</p>
              <p className="v2-label mt-2 text-ink-warm-3">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}
