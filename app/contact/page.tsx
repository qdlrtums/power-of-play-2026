import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { LinkedInIcon } from "@/components/shared/icons";
import { Section, Eyebrow } from "@/components/shared/Section";
import { contactCopy } from "@/content/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about clinical partnerships, pilots, press or careers.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section labelledBy="contact-heading">
      <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Eyebrow>{contactCopy.eyebrow}</Eyebrow>
          <h1 id="contact-heading" className="mt-5 text-h1 text-ink">
            {contactCopy.title}
          </h1>
          <p className="mt-6 max-w-xl text-lede text-ink-muted">{contactCopy.lede}</p>

          <div className="mt-12">
            <ContactForm />
          </div>
        </div>

        <aside className="lg:pt-24">
          <div className="rounded-[var(--radius-lg)] border border-line-soft bg-ground-soft p-8">
            <h2 className="text-h3 text-ink">Prefer not to use a form?</h2>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 font-display font-bold text-forest underline-offset-4 hover:underline"
                >
                  <Mail className="size-5 shrink-0" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  className="inline-flex items-center gap-3 font-display font-bold text-forest underline-offset-4 hover:underline"
                >
                  <LinkedInIcon className="size-5 shrink-0" />
                  Power of Play on LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
