/**
 * The highlighted keyword in the hero headline, on a tilted lime pill.
 *
 *  1. Rest — a static −2.5° tilt. Decoration, not motion, so it survives
 *     prefers-reduced-motion.
 *  2. Entrance — the pill is "drawn" in behind the word, scaleX 0 → 1 from
 *     the left.
 *  3. Hover — springs toward level, lifts, and blooms a lime shadow.
 *
 * Deliberately CSS-only (see `.hero-pill` in globals.css) rather than
 * framer-motion: this is the most important word on the site and it is dark
 * green, so if the lime pill behind it depended on hydration a slow or failed
 * JS load would leave it invisible. Being a server component also keeps the
 * whole hero free of client JS.
 *
 * The word stays inside the <h1> text content, so the heading's accessible
 * name is still the single string "Play is the assessment".
 */
export function HeroPill({
  children,
  delay = 0.45,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span
      className="hero-pill group relative isolate inline-block whitespace-nowrap px-[0.3em] pb-[0.04em] text-brand-ink"
      style={{ "--pill-delay": `${delay}s` } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="hero-pill__bg absolute inset-0 -z-10 rounded-[var(--radius-pill)] bg-green-400"
      />
      {children}
    </span>
  );
}
