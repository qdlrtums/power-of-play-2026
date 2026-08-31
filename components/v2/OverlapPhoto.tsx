import Image from "next/image";
import { cn } from "@/lib/utils";

type Fade = "hero" | "west";

/**
 * A photograph that sits under type. No polaroid chip. Rotation and placement
 * come from the caller; the wash keeps overlapping copy readable.
 */
export function OverlapPhoto({
  src,
  alt,
  sizes,
  className,
  fade,
  priority,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  fade?: Fade;
  priority?: boolean;
  objectPosition?: string;
}) {
  return (
    <figure
      className={cn(
        "v2-overlap-photo",
        fade === "hero" && "v2-overlap-photo--hero",
        fade === "west" && "v2-overlap-photo--west",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition }}
      />
    </figure>
  );
}
