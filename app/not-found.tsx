import Link from "next/link";
import { SkipLink } from "@/components/site/SkipLink";
import { V2Header } from "@/components/v2/V2Header";
import { V2Footer } from "@/components/v2/V2Footer";
import { monoLabel } from "@/lib/fonts";

export default function NotFound() {
  return (
    <div className={`${monoLabel.variable} theme-v2 flex flex-1 flex-col bg-paper`}>
      <SkipLink href="#main" />
      <V2Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-32 sm:px-10">
          <h1 className="text-d2 font-bold text-ink-warm">Page not found</h1>
          <p className="mt-5 text-lede text-ink-warm-2">
            That page doesn&apos;t exist. It may have moved.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex rounded-[var(--radius-pill)] bg-obsidian px-8 py-4 font-display text-lg font-bold text-paper"
          >
            Back to home
          </Link>
        </div>
      </main>
      <V2Footer />
    </div>
  );
}
