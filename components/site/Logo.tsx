import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Wordmark PNG (mark + "POWER OF PLAY"). Intrinsic ratio is 234:154.
 * On a dark ground, sit it on a paper chip rather than inverting — the file
 * has a white field, so invert would turn that field black.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/pop-logo.png"
      alt={`${site.name} home`}
      width={234}
      height={154}
      priority
      className={cn("h-9 w-auto lg:h-11", className)}
    />
  );
}
