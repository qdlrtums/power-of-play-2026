/**
 * `href` is a prop because the v2 shell owns a different `<main>` id — the two
 * designs are on the page one at a time, but they are separate landmarks and
 * a skip link has to point at the one actually rendered.
 */
export function SkipLink({ href = "#main" }: { href?: string }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-[var(--radius-md)] focus:bg-forest focus:px-5 focus:py-3 focus:font-display focus:font-bold focus:text-ink-invert"
    >
      Skip to main content
    </a>
  );
}
