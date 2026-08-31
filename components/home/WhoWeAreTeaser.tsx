import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whoWeAre } from "@/content/home";
import { team } from "@/content/team";
import { Section, Eyebrow } from "@/components/shared/Section";
import { DraftBadge } from "@/components/shared/DraftBadge";

export function WhoWeAreTeaser() {
  return (
    <Section labelledBy="who-heading" className="bg-ground-soft">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <Eyebrow>{whoWeAre.eyebrow}</Eyebrow>
          <h2 id="who-heading" className="mt-5 text-h2 text-ink">
            {whoWeAre.title}
          </h2>
          <p className="mt-6 text-lede text-ink-muted">
            {whoWeAre.body}
            {whoWeAre.draft && <DraftBadge />}
          </p>
          <Link
            href={whoWeAre.cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-forest px-7 py-4 font-display text-lg font-bold text-ink-invert transition-[transform,box-shadow] duration-200 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-lift"
          >
            {whoWeAre.cta.label}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="flex flex-wrap gap-6">
          {team.map((member) => (
            <li key={member.slug} className="text-center">
              {member.photo && (
                <Image
                  src={member.photo.src}
                  alt=""
                  width={member.photo.width}
                  height={member.photo.height}
                  className="size-32 rounded-[var(--radius-lg)] object-cover shadow-card sm:size-40"
                />
              )}
              <p className="mt-3 font-display font-bold text-ink">{member.name}</p>
              <p className="text-sm text-ink-muted">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
