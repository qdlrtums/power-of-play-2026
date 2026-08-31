import { HeroV2 } from "@/components/v2/HeroV2";
import { LogoTicker } from "@/components/v2/LogoTicker";
import { ProblemBand } from "@/components/v2/ProblemBand";
import { ApproachList } from "@/components/v2/ApproachList";
import { TeamStrip } from "@/components/v2/TeamStrip";
import { ClosingCta } from "@/components/v2/ClosingCta";

export default function V2HomePage() {
  return (
    <>
      <HeroV2 />
      <LogoTicker />
      <ProblemBand />
      <ApproachList />
      <TeamStrip />
      <ClosingCta />
    </>
  );
}
