import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
      className={`${poppins.variable} h-full antialiased`}
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
