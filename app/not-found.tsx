import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";

/**
 * Sits above the route groups so that it also catches URLs matching no group,
 * which means it has to bring its own chrome — the root layout is now only
 * `<html>`/`<body>`.
 */
export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-5 py-32 text-center sm:px-8">
        <h1 className="text-h1 text-ink">Page not found</h1>
        <p className="mt-5 text-lede text-ink-muted">
          That page doesn&apos;t exist. It may have moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-[var(--radius-md)] bg-green-400 px-8 py-4 font-display text-lg font-bold text-forest"
        >
          Back to home
        </Link>
      </div>
    </SiteShell>
  );
}
