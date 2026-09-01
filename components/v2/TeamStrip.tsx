import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whoWeAre } from "@/content/home";
import { founders } from "@/content/team";
import { Band } from "./Rail";

export function TeamStrip() {
  return (
    <Band labelledBy="who-heading" className="bg-paper-2">
      <div className="grid gap-16 lg:grid-cols-[1fr_minmax(0,30rem)] lg:items-center lg:gap-24">
        <div>
          <h2 id="who-heading" className="max-w-[16ch] text-d2 font-bold text-ink-warm">
            {whoWeAre.title}
          </h2>
          <Link
            href={whoWeAre.cta.href}
            className="group mt-10 inline-flex items-center gap-3 border-b-2 border-green-400 pb-2 font-display text-lg font-bold text-ink-warm transition-colors duration-200 hover:text-green-700"
          >
            {whoWeAre.cta.label}
            <ArrowRight
              className="size-5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-5 sm:gap-8">
          {founders.map((member, i) => (
            <li key={member.slug} className={i % 2 === 1 ? "sm:translate-y-12" : undefined}>
              {member.photo && (
                <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-photo)] bg-paper-3">
                  <span className="relative block h-full w-full overflow-hidden">
                  <Image
                    src={member.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 15rem, 45vw"
                    className="object-cover"
                  />
                  </span>
                </div>
              )}
              <p className="mt-4 font-display font-bold leading-tight text-ink-warm">{member.name}</p>
              <p className="v2-label mt-2 text-ink-warm-3">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}
