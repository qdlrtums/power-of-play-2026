# Power of Play — page candidates

Candidate landing, about, and contact pages for the Power of Play site, built
in parallel design directions so they can be compared page by page. Candidates
for the same page are interchangeable: the Playroom landing page and the Field
Notebook contact page is a legitimate combination.

```
index.html                  the shelves — pick a page, compare its candidates
options/
  option-a/                 direction A · "Field Notebook"
    index.html              landing page candidate A
    about.html              about candidate A
    contact.html            contact candidate A
    components.html         component set A + palette dials
    css/tokens.css          ← palette, type scale, spacing. Start here.
    css/base.css            elements, layout primitives, site chrome
    css/components.css      the component library
    js/site.js              theme toggle + applies the tuned green
    js/bench.js             the workbench dials
  option-b/                 direction B · "Playroom" (same file layout)
```

Every page carries a switcher strip at the very top — `Home candidates · A · B ·
All pages` — so you can flip between candidates for that page without returning
to the index.

No build step, no dependencies. Open `index.html` directly, or serve the folder:

```
python3 -m http.server 8000
```

## The two directions

|                | A · Field Notebook                  | B · Playroom                          |
| -------------- | ----------------------------------- | ------------------------------------- |
| Display face   | Fraunces (serif, WONK axis on)      | Bricolage Grotesque (wide grotesque)  |
| Body face      | Source Sans 3 (sans)                | Newsreader (serif)                    |
| Ground         | One quiet light green, faintly ruled | Full-bleed bands, some inverted forest |
| Surfaces       | Shadowed cards, hairline borders     | Flat, 2px ink borders, no shadows      |
| Layout         | Asymmetric margin rail, left-aligned | Centred column, colour-blocked         |

They are deliberate opposites, so a preference between them is informative.
Both use light green grounds with forest green as the working colour.

## Tuning the green

Each direction derives its whole identity from two numbers at the top of its
`css/tokens.css`:

```css
--green-h: 148;    /* 110 grass · 148 forest · 185 pine */
--green-c: 0.085;  /* 0.02 institutional · 0.14 toy-brand */
```

Every surface, border, shadow and state colour is an OKLCH expression over
those two values, so changing them retunes that direction entirely — light and
dark themes together — without touching another line.

Rather than guessing: open a **Components** page, drag the two dials, and watch
the real components retune live. The setting persists to `localStorage` and
follows you onto that direction's other pages, so you can judge the green in
context. When you like it, hit **Copy tokens** and paste the block back into
`tokens.css` to make it the default. Each direction stores its tuning under its
own key, so tuning one never disturbs the other.

## Adding a candidate

```
cp -R options/option-a options/option-c
```

Work outward from `css/tokens.css` — palette and type first, layout second —
then add the new pages to the shelves in the root `index.html` and to the
switcher strip at the top of each existing page. If a direction wants a
genuinely different structure, change the markup too; candidates are not meant
to converge.

## Notes

- Fonts load from Google Fonts. Every stack has a real local fallback, so the
  pages hold up offline — but they will look different. Self-host before
  shipping.
- Both colour schemes are designed, not inverted. The toggle in the masthead
  overrides the OS preference in either direction.
- The contact forms have no backend; they validate and lay out, nothing more.
- All copy is placeholder written to the right shape and voice. The statistics,
  studies, and people are invented — replace them before this goes anywhere
  public.
