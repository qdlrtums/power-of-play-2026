import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { LinkedInIcon } from "@/components/shared/icons";
import { contactCopy } from "@/content/contact";
import { site } from "@/content/site";
import { Rail } from "@/components/v2/Rail";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about clinical partnerships, pilots, press or careers.`,
};

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="v2-dotfield pb-24 pt-14 sm:pt-20">
      <Rail>
        <h1 id="contact-heading" className="max-w-[14ch] text-d2 font-bold text-ink-warm">
          {contactCopy.title}
        </h1>
        <p className="mt-7 max-w-xl text-lede leading-relaxed text-ink-warm-2">{contactCopy.lede}</p>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-7">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 font-display text-lg font-bold text-ink-warm transition-colors duration-200 hover:text-green-700"
          >
            <Mail className="size-5 shrink-0" aria-hidden="true" />
            {site.email}
          </a>
          <a
            href={site.linkedin}
            className="inline-flex items-center gap-3 font-display text-lg font-bold text-ink-warm transition-colors duration-200 hover:text-green-700"
          >
            <LinkedInIcon className="size-5" />
            {site.name} on LinkedIn
          </a>
        </div>

        <div className="mt-16 max-w-2xl">
          <ContactForm variant="v2" />
        </div>
      </Rail>
    </section>
  );
}
