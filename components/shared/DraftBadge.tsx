/**
 * Marks copy that is still awaiting the client. Deliberately loud — placeholder
 * text must never be mistaken for finished copy during review.
 */
export function DraftBadge({ children = "Placeholder" }: { children?: string }) {
  return (
    <span className="ml-2 inline-block rounded-[var(--radius-pill)] border border-dashed border-ink-faint px-2 py-0.5 align-middle font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-ink-faint">
      {children}
    </span>
  );
}
