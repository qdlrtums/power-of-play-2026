import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactCta } from "@/content/home";

export function ContactCta() {
  return (
    <section aria-labelledby="cta-heading" className="px-5 pb-4 sm:px-8">
      <div className="on-forest mx-auto flex max-w-[80rem] flex-col items-center gap-6 rounded-[var(--radius-lg)] bg-forest px-8 py-16 text-center shadow-hero lg:py-20">
        <h2 id="cta-heading" className="max-w-2xl text-h2 text-green-400">
          {contactCta.title}
        </h2>
        <p className="max-w-xl text-lede text-ink-invert-dim">{contactCta.body}</p>
        <Link
          href={contactCta.cta.href}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-green-400 px-8 py-4 font-display text-lg font-bold text-forest transition-[transform,box-shadow] duration-200 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-lift"
        >
          {contactCta.cta.label}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
