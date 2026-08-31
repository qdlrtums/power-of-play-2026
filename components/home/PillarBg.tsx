/**
 * Decorative brand graphic sitting behind the hero card — a run of rounded
 * columns of alternating height, in brand greens and cream, framing the
 * newsletter card that sits inside the hero. Abstract by design:
 * it carries the playful register without depicting anything.
 */
const pillars = [
  { x: 24, w: 104, h: 300, fill: "var(--color-green-100)" },
  { x: 152, w: 68, h: 180, fill: "var(--color-cream-200)" },
  { x: 244, w: 88, h: 390, fill: "var(--color-green-200)" },
  { x: 356, w: 60, h: 130, fill: "var(--color-green-100)" },
  { x: 800, w: 60, h: 150, fill: "var(--color-green-100)" },
  { x: 884, w: 88, h: 360, fill: "var(--color-green-200)" },
  { x: 996, w: 68, h: 200, fill: "var(--color-cream-200)" },
  { x: 1088, w: 104, h: 320, fill: "var(--color-green-100)" },
];

const H = 420;

export function PillarBg({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 1216 ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
    >
      {pillars.map((p) => (
        <rect
          key={p.x}
          x={p.x}
          y={H - p.h}
          width={p.w}
          height={p.h}
          rx={p.w / 2}
          fill={p.fill}
        />
      ))}
      <circle cx={196} cy={196} r={30} fill="var(--color-green-200)" />
      <circle cx={1040} cy={168} r={24} fill="var(--color-green-200)" />
    </svg>
  );
}
