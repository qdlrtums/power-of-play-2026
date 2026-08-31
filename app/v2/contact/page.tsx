import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { LinkedInIcon } from "@/components/shared/icons";
import { contactCopy } from "@/content/contact";
import { contactChannels } from "@/content/v2";
import { site } from "@/content/site";
import { Rail } from "@/components/v2/Rail";
import { SectionLabel, Label } from "@/components/v2/Label";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about clinical partnerships, pilots, press or careers.`,
  robots: { index: false, follow: false },
};

/**
 * The direct channels move above the form rather than into a sidebar box: a
 * clinician who already knows what they want to say should not have to scroll
 * past a form to find an address.
 */
export default function V2ContactPage() {
  return (
    <section aria-labelledby="v2-contact-heading" className="v2-dotfield pb-24 pt-14 sm:pt-20">
      <Rail>
        <SectionLabel>{contactCopy.eyebrow}</SectionLabel>

        <h1 id="v2-contact-heading" className="mt-8 max-w-[14ch] text-d2 font-bold text-ink-warm">
          {contactCopy.title}
        </h1>
        <p className="mt-7 max-w-xl text-lede leading-relaxed text-ink-warm-2">{contactCopy.lede}</p>

        <div className="mt-12 grid gap-6 border-y border-line py-7 sm:grid-cols-[10rem_1fr] sm:items-center">
          <div>
            <Label>{contactChannels.eyebrow}</Label>
            <p className="mt-2 text-sm text-ink-warm-3">{contactChannels.body}</p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
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
              <LinkedInIcon className="size-5 shrink-0" />
              {site.name} on LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-16 max-w-2xl">
          <ContactForm variant="v2" />
        </div>
      </Rail>
    </section>
  );
}
