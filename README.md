# Power of Play

Investor and clinical calling card for a child-friendly pediatric hand-strength measurement tool.

> Taking a play-based approach to pediatric rehabilitation.

Playroom and Playwell are the primary directions. Playroom is the canonical
shared system: spacious full-bleed bands, chunky outlines, and selectable
abstract hero motifs; Playwell is its photo-led counterpart.

```
index.html                     the designs, side by side
shared/                        the pool everything draws from
  css/tokens.css               green ramp maths, spacing, fluid type steps
  css/base.css                 elements, utilities, masthead, colophon
  css/layout.css               wrap, stack, grid, band, spine, column
  css/components.css           every component, driven entirely by tokens
  css/palettes.css             Meadow, Studio, and Seaside colour packs
  js/site.js                   design dropdown, theme toggle, stored tuning
  js/bench.js                  the components-page dials
variants/
  field-notebook/
    theme.css                  ← this design's entire identity
    index.html about.html contact.html components.html
  playroom/
    theme.css
    index.html about.html contact.html components.html
```

No build step, no dependencies. Open `index.html` directly, or serve the folder:

```
python3 -m http.server 8000
```

## How a variant works

A page loads the shared pool first, then its own `theme.css` last:

```html
<html lang="en" data-variant="field-notebook">
<link rel="stylesheet" href="../../shared/css/tokens.css">
<link rel="stylesheet" href="../../shared/css/base.css">
<link rel="stylesheet" href="../../shared/css/layout.css">
<link rel="stylesheet" href="../../shared/css/components.css">
<link rel="stylesheet" href="theme.css">
```

Nothing in `shared/` hard-codes a colour, a typeface, a radius, or a shadow —
it reads tokens. So `theme.css` is mostly a list of values: the two green dials,
the ramp mapped onto semantic roles, three font families, and a block of
component tuning (`--btn-radius`, `--pill-dot`, `--steps-cols`, and so on). Only
the handful of things no token could express — a ruled background, a hero
layout — are written as real rules at the bottom of the file.

`data-variant` on `<html>` namespaces that design's stored theme and colour
tuning, so tuning one never disturbs another.

## Tuning the green

Each design derives its whole identity from two numbers at the top of its
`theme.css`:

```css
--green-h: 148;    /* 110 grass · 148 forest · 185 pine */
--green-c: 0.085;  /* 0.02 institutional · 0.15 toy-brand */
```

Every surface, border, shadow and state colour is an OKLCH expression over those
two values, so changing them retunes that design entirely — light and dark
themes together.

Rather than guessing: open a **Components** page, drag the two dials, and watch
the real components retune live. The setting persists and follows you onto that
design's other pages, so you can judge the green in context. When you like it,
hit **Copy tokens** and paste the block back into `theme.css`.

## Adding a design

```
cp -R variants/field-notebook variants/your-name
```

1. In the new folder, set `data-variant="your-name"` on `<html>` in all four pages.
2. Rewrite `theme.css` — the tokens first, layout rules after.
3. Add one line to `VARIANTS` in `shared/js/site.js`.

Every page's dropdown picks it up automatically. Add it to the root
`index.html` too, so it has a card on the front page.

## Notes

- Fonts load from Google Fonts. Every stack has a real local fallback, so the
  pages hold up offline — but they will look different. Self-host before
  shipping.
- Both colour schemes are designed, not inverted. The header toggle overrides
  the OS preference in either direction.
- The contact forms have no backend; they validate and lay out, nothing more.
- All copy is placeholder written to the right shape and voice. The statistics,
  outcomes, and people are invented — replace them before this goes anywhere
  public.
