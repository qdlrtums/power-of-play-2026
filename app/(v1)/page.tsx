import { Hero } from "@/components/home/Hero";
import { RecognitionStrip } from "@/components/home/RecognitionStrip";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { WhoWeAreTeaser } from "@/components/home/WhoWeAreTeaser";
import { ContactCta } from "@/components/home/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RecognitionStrip />
      <ProblemSection />
      <ApproachSection />
      <WhoWeAreTeaser />
      <ContactCta />
    </>
  );
}
