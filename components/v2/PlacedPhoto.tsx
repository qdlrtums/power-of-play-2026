import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A photograph placed by hand rather than snapped to the grid: the caller
 * supplies the size, the tilt and where it sits. Nothing is set on type, so
 * there is no wash over the picture — earlier passes overlapped headlines onto
 * these and had to bleach half of each photograph to keep the words readable.
 */
export function PlacedPhoto({
  src,
  alt,
  sizes,
  className,
  priority,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  return (
    <figure className={cn("v2-placed-photo", className)}>
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
