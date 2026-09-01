import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactCta } from "@/content/home";

export function ContactCta({ basePath = "" }: { basePath?: string }) {
  const href = basePath ? `${basePath}${contactCta.cta.href}` : contactCta.cta.href;
  return (
    <section aria-labelledby="cta-heading" className="on-forest mt-12 bg-forest px-5 sm:px-8 lg:mt-16">
      <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-5 px-8 py-12 text-center lg:py-14">
        <h2 id="cta-heading" className="max-w-2xl text-h2 text-green-400">
          {contactCta.title}
        </h2>
        <p className="max-w-xl text-lede text-ink-invert-dim">{contactCta.body}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-green-400 px-7 py-3.5 font-display text-base font-bold text-forest transition-[transform,box-shadow] duration-200 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-lift"
        >
          {contactCta.cta.label}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
