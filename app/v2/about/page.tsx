import type { Metadata } from "next";
import { StoryV2 } from "@/components/v2/StoryV2";
import { TeamV2 } from "@/components/v2/TeamV2";
import { RecognitionV2 } from "@/components/v2/RecognitionV2";
import { ClosingCta } from "@/components/v2/ClosingCta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The team behind Power of Play, and the competitions, programmes and press that have recognised the work.",
  robots: { index: false, follow: false },
};

export default function V2AboutPage() {
  return (
    <>
      <StoryV2 />
      <TeamV2 />
      <RecognitionV2 />
      <ClosingCta />
    </>
  );
}
