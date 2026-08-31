export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-[var(--radius-md)] focus:bg-forest focus:px-5 focus:py-3 focus:font-display focus:font-bold focus:text-ink-invert"
    >
      Skip to main content
    </a>
  );
}
