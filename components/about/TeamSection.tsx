import { team } from "@/content/team";
import { teamSection } from "@/content/about";
import { Section, Eyebrow } from "@/components/shared/Section";
import { TeamCard } from "./TeamCard";

export function TeamSection() {
  return (
    <Section id="team" labelledBy="team-heading" className="bg-ground-soft">
      <Eyebrow>{teamSection.eyebrow}</Eyebrow>
      <h2 id="team-heading" className="mt-5 text-h2 text-ink">
        {teamSection.title}
      </h2>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2">
        {team.map((member) => (
          <TeamCard key={member.slug} member={member} />
        ))}
      </ul>
    </Section>
  );
}
