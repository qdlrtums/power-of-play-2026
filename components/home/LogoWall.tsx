import Image from "next/image";
import { logos } from "@/content/logos";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/**
 * The full set, grayscale until hovered, staggered as it scrolls into view.
 * Rendered server-side and visible without JS — see ScrollReveal.
 */
export function LogoWall() {
  return (
    <ul className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
      {logos.map((logo, i) => (
        <ScrollReveal
          as="li"
          key={logo.id}
          delay={i * 0.07}
          className="flex items-center justify-center"
        >
          <Image
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className="h-12 w-auto max-w-[10rem] object-contain grayscale transition duration-300 ease-[var(--ease-brand)] hover:grayscale-0"
          />
        </ScrollReveal>
      ))}
    </ul>
  );
}
