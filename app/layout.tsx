import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Display face. Only the axes actually used are requested (`wght` is implicit
 * for a variable font); `opsz` and `wdth` are what give the headline and the
 * hero pill their character.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
  display: "swap",
});

/** Body face — paragraphs, form fields, anything read at length. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Label face, used only by the v2 design (`/v2`): eyebrows, step numbers,
 * the small clinical captions. Two weights, no italics — it never sets a
 * paragraph, so the rest of the family would be dead weight.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-label",
  display: "swap",
});

/** Absolute OG/Twitter URLs must be hosted where this app actually runs.
 *  Netlify sets `DEPLOY_PRIME_URL` on branch and preview deploys and `URL` on
 *  production; locally neither exists, so fall back to the brand domain.
 *  Canonical `og:url` still uses `site.url` (the brand domain). */
const metadataBase = new URL(
  process.env.DEPLOY_PRIME_URL ?? process.env.URL ?? site.url,
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/brand/logo-with-name.svg`,
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
