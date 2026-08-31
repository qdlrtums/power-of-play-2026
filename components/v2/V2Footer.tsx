import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/shared/icons";
import { site } from "@/content/site";
import { v2Nav, v2NavCta } from "@/content/v2";
import { Label } from "./Label";
import { Rail } from "./Rail";

/**
 * Near-black close. The wordmark is set large and cropped by the rail so the
 * page ends on the brand rather than on a copyright line.
 */
export function V2Footer() {
  return (
    <footer className="on-dark bg-obsidian text-paper">
      <Rail className="py-16 lg:py-20">
        <div className="grid gap-12 border-b border-hairline-dark pb-14 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/logo-with-name.svg"
              alt={site.name}
              width={313}
              height={204}
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-sm text-lg leading-snug text-paper-dim">
              {site.tagline}.
            </p>
          </div>

          <nav aria-labelledby="v2-footer-site">
            <Label as="h2" id="v2-footer-site" className="text-green-400">
              Site
            </Label>
            <ul className="mt-5 space-y-3">
              {[...v2Nav, v2NavCta].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper-dim transition-colors duration-200 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Label as="h2" className="text-green-400">
              Contact
            </Label>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-paper-dim transition-colors duration-200 hover:text-paper"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  className="inline-flex items-center gap-2 text-paper-dim transition-colors duration-200 hover:text-paper"
                >
                  <LinkedInIcon className="size-4 shrink-0" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
          <p className="v2-label text-paper-dim">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <Link href="/" className="v2-label text-paper-dim transition-colors duration-200 hover:text-green-400">
            View the current design ↗
          </Link>
        </div>
      </Rail>
    </footer>
  );
}
