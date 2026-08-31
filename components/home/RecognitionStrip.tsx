import { Section } from "@/components/shared/Section";
import { LogoSpotlight } from "./LogoSpotlight";
import { LogoWall } from "./LogoWall";

export function RecognitionStrip() {
  return (
    <Section className="py-16 lg:py-20">
      <LogoSpotlight />
      <LogoWall />
    </Section>
  );
}
