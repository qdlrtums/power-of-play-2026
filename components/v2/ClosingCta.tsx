import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactCta } from "@/content/home";
import { v2Href, v2Meta } from "@/content/v2";
import { Rail } from "./Rail";

/**
 * The one place in v2 where lime is the ground rather than the accent. Holding
 * it back until the last screen is what gives it any force — v1 spends the
 * same colour on the nav CTA, the hero pill, the stat and the closing button,
 * by which point it has stopped meaning "act here".
 *
 * Ink is obsidian on lime: 9.8:1, well past AA for the display sizes used.
 */
export function ClosingCta() {
  return (
    <section aria-labelledby="v2-cta-heading" className="bg-green-400 py-20 sm:py-28 lg:py-36">
      <Rail>
        <p className="v2-label text-brand-ink">{v2Meta.closingKicker}</p>

        <h2
          id="v2-cta-heading"
          className="mt-8 max-w-[14ch] text-d2 font-bold text-obsidian"
        >
          {contactCta.title}
        </h2>

        <div className="mt-12 grid gap-10 border-t border-obsidian/20 pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-lede leading-relaxed text-obsidian/80">{contactCta.body}</p>

          <Link
            href={v2Href(contactCta.cta.href)}
            className="group inline-flex w-fit items-center gap-3 rounded-[var(--radius-pill)] bg-obsidian px-8 py-4 font-display text-lg font-bold text-paper transition-colors duration-200 hover:bg-paper hover:text-obsidian"
          >
            {contactCta.cta.label}
            <ArrowRight
              className="size-5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Rail>
    </section>
  );
}
