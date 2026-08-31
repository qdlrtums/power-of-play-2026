import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * The wordmark ships as a single SVG (mark + "POWER OF PLAY" set as outlines).
 * Intrinsic ratio is 313:204 from the source file.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-with-name.svg"
      alt={`${site.name} home`}
      width={313}
      height={204}
      priority
      className={cn("h-12 w-auto lg:h-16", className)}
    />
  );
}
