import type { Metadata } from "next";
import Image from "next/image";
import { HeroPill } from "@/components/home/HeroPill";
import { PillarBg } from "@/components/home/PillarBg";
import { DraftBadge } from "@/components/shared/DraftBadge";
import { logos } from "@/content/logos";
import { team } from "@/content/team";

/**
 * Internal reference page. Unlisted (not in the nav, not in the sitemap) and
 * explicitly noindex — it exists so brand decisions stay visible in one place
 * as the site grows.
 */
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const greens = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
const creams = ["50", "100", "200", "300"];

const semantic = [
  ["brand", "Pill, primary CTA, accent — Figma #8cda5a"],
  ["brand-ink", "Text on lime — Figma #1b5e20, 4.61:1"],
  ["forest", "Hero card ground, nav ink — Figma #205929"],
  ["accent", "Warm note, from the logo cream"],
  ["ground", "Page background"],
  ["ground-soft", "Alternating section background"],
  ["ink", "Body text"],
  ["ink-muted", "Secondary text"],
  ["ink-faint", "Placeholders, hints"],
  ["line", "Hairlines — Figma #d9d9d9"],
  ["line-soft", "Card borders"],
  ["focus", "Focus ring"],
  ["danger", "Form errors"],
];

const radii = ["sm", "md", "lg", "xl", "2xl", "pill"];
const shadows = ["card", "lift", "hero", "pill"];
const typeScale = [
  ["hero", "Hero headline"],
  ["h1", "Page title"],
  ["h2", "Section title"],
  ["h3", "Card title"],
  ["lede", "Lede paragraph"],
  ["eyebrow", "Eyebrow / label"],
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-10">
      <h2 className="text-h2 text-ink">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-16 px-5 py-20 sm:px-8">
      <header>
        <p className="font-display text-eyebrow font-bold uppercase tracking-[0.18em] text-green-700">
          Internal reference
        </p>
        <h1 className="mt-4 text-h1 text-ink">Design system</h1>
        <p className="mt-5 max-w-2xl text-lede text-ink-muted">
          Every value below is defined once, in <code>app/globals.css</code>. Nothing in the
          codebase hard-codes a colour, radius, shadow or type size. This page is unlisted and
          noindexed.
        </p>
      </header>

      <Block title="Brand ramp">
        <p className="text-ink-muted">
          Interpolated in OKLCH between the two Figma anchors — lime at 400, forest at 800.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {greens.map((step) => (
            <li key={step} className="overflow-hidden rounded-[var(--radius-md)] border border-line">
              <div className="h-16" style={{ background: `var(--color-green-${step})` }} />
              <p className="px-3 py-2 font-mono text-xs text-ink-muted">green-{step}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-ink-muted">Warm accent — the cream family from the logo.</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {creams.map((step) => (
            <li key={step} className="overflow-hidden rounded-[var(--radius-md)] border border-line">
              <div className="h-16" style={{ background: `var(--color-cream-${step})` }} />
              <p className="px-3 py-2 font-mono text-xs text-ink-muted">cream-{step}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Semantic roles">
        <ul className="grid gap-3 sm:grid-cols-2">
          {semantic.map(([name, use]) => (
            <li key={name} className="flex items-center gap-4 rounded-[var(--radius-md)] border border-line p-3">
              <span
                className="size-12 shrink-0 rounded-[var(--radius-sm)] border border-line"
                style={{ background: `var(--color-${name})` }}
              />
              <span>
                <span className="block font-mono text-sm text-ink">{name}</span>
                <span className="block text-sm text-ink-muted">{use}</span>
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Type scale">
        <ul className="space-y-6">
          {typeScale.map(([name, use]) => (
            <li key={name}>
              <p className="font-mono text-xs text-ink-muted">
                text-{name} — {use}
              </p>
              <p
                className="mt-1 font-display font-bold text-ink"
                style={{ fontSize: `var(--text-${name})`, lineHeight: 1.1 }}
              >
                Play is the assessment
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs text-ink-muted">font-display — Poppins</p>
            <p className="mt-1 font-display text-h3 font-bold text-ink">Headlines, nav, buttons, the pill</p>
          </div>
          <div>
            <p className="font-mono text-xs text-ink-muted">font-sans — Poppins</p>
            <p className="mt-1 text-lede text-ink">Body copy, form fields, anything read at length</p>
          </div>
        </div>
      </Block>

      <Block title="Radii & shadows">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {radii.map((r) => (
            <li key={r} className="text-center">
              <div
                className="h-20 border-2 border-forest bg-green-100"
                style={{ borderRadius: `var(--radius-${r})` }}
              />
              <p className="mt-2 font-mono text-xs text-ink-muted">radius-{r}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shadows.map((s) => (
            <li key={s}>
              <div
                className="h-20 rounded-[var(--radius-lg)] bg-surface"
                style={{ boxShadow: `var(--shadow-${s})` }}
              />
              <p className="mt-3 font-mono text-xs text-ink-muted">shadow-{s}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="The hero pill">
        <p className="text-ink-muted">
          Static −2.5° tilt at rest; springs toward level with a lime shadow bloom on hover. Hover it.
        </p>
        <div className="on-forest mt-6 rounded-[var(--radius-lg)] bg-forest p-12 text-center">
          <p className="font-display text-h1 font-bold leading-[1.12] text-green-400">
            Play is the <HeroPill delay={0}>assessment</HeroPill>
          </p>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-[var(--radius-md)] bg-green-400 px-8 py-4 font-display text-lg font-bold text-forest shadow-card">
            Primary
          </span>
          <span className="rounded-[var(--radius-md)] bg-forest px-8 py-4 font-display text-lg font-bold text-ink-invert">
            Solid forest
          </span>
          <span className="rounded-[var(--radius-md)] border-2 border-forest px-8 py-4 font-display text-lg font-bold text-forest">
            Outline
          </span>
          <span className="rounded-[var(--radius-pill)] bg-green-400 px-7 py-3 font-display font-bold text-brand-ink">
            Pill
          </span>
          <DraftBadge />
        </div>
      </Block>

      <Block title="Decorative graphic">
        <p className="text-ink-muted">
          <code>PillarBg</code> — abstract columns behind the hero card. No product depiction.
        </p>
        <div className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-ground">
          <PillarBg className="h-56 w-full" />
        </div>
      </Block>

      <Block title="Logo">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-line bg-ground p-10">
            <Image src="/brand/logo-with-name.svg" alt="Power of Play" width={313} height={204} className="h-24 w-auto" />
            <p className="mt-4 font-mono text-xs text-ink-muted">/brand/logo-with-name.svg — on light</p>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-forest p-10">
            <Image
              src="/brand/logo-with-name.svg"
              alt="Power of Play"
              width={313}
              height={204}
              className="h-24 w-auto brightness-0 invert"
            />
            <p className="mt-4 font-mono text-xs text-ink-invert-dim">
              on forest — knocked out with brightness-0 invert
            </p>
          </div>
        </div>
      </Block>

      <Block title="Recognition logos">
        <ul className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <li key={logo.id} className="text-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="mx-auto h-11 w-auto object-contain"
              />
              <p className="mt-3 font-mono text-[0.65rem] text-ink-muted">{logo.src}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Team photography">
        <ul className="flex flex-wrap gap-8">
          {team.map((m) =>
            m.photo ? (
              <li key={m.slug}>
                <Image
                  src={m.photo.src}
                  alt={m.name}
                  width={m.photo.width}
                  height={m.photo.height}
                  className="size-40 rounded-[var(--radius-lg)] object-cover"
                />
                <p className="mt-3 font-mono text-xs text-ink-muted">
                  {m.photo.width}×{m.photo.height}
                  {m.photo.width < 800 && <DraftBadge>Low res</DraftBadge>}
                </p>
              </li>
            ) : null,
          )}
        </ul>
      </Block>
    </div>
  );
}
