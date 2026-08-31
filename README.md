# Power of Play

Marketing site for [Power of Play Inc.](https://powerofplayinc.com) — a pediatric rehabilitation company taking a play-based approach to therapy and assessment for young children.

Three public pages: **Home**, **About Us**, **Contact**. Built with Next.js (App Router) and Tailwind CSS, deployed on Netlify.

| | URL |
| --- | --- |
| **New site (this repo)** | https://powerofplayinc.netlify.app |
| **Brand domain (still the old Squarespace site)** | https://powerofplayinc.com |
| **Contact** | [info@powerofplayinc.com](mailto:info@powerofplayinc.com) |
| **LinkedIn** | [power-of-play-pop](https://www.linkedin.com/company/power-of-play-pop/) |

Until DNS is pointed at Netlify, treat `powerofplayinc.netlify.app` as the live preview. `powerofplayinc.com` is still Squarespace.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

Node 20+ is enough locally. Netlify builds on Node 22, pinned in `netlify.toml`.

---

## Design concept: v2, and previewing both designs

Branch `modern-redesign` carries a second, more modern design of the same three
pages. Nothing is replaced — both designs are mounted at once, so the client can
see them next to each other before anyone commits to one.

```bash
npm run dev
```

| | |
| --- | --- |
| **`/compare`** | **Both designs side by side.** Start here. |
| `/` `/about` `/contact` | The current design, exactly as it was |
| `/v2` `/v2/about` `/v2/contact` | The concept |

`/compare` puts the two in iframes driven by one toolbar: switch page, switch
rendered width (390 / 768 / 1280 / 1440, or *Fit* to let each frame be
responsive at its own column width), and scroll them together. Scroll sync is
proportional rather than pixel-for-pixel, because the two designs are different
heights. Below 1024px it stacks the frames instead.

### What actually differs

Same three pages, same copy — every `PLACEHOLDER` in `content/` is still a
placeholder in v2, and neither design invents a fact the other does not have.
The brand anchors are also unchanged: the same lime `#8cda5a` and forest
`#205929` from the Figma. What differs is the system around them.

| | Current | v2 |
| --- | --- | --- |
| Ground | White | Warm paper, so lime reads as ink rather than as decoration |
| Structure | Colour-block sections, 20px radii, squircles | Hairline rules, 2–8px edges; pills kept for accents only |
| Problem section | Three equal cards | Numbered table on a near-black band |
| Approach | Three equal cards | Sticky heading with the steps running past it |
| Recognition | Four-at-a-time crossfade | Seamless marquee, pausable on hover and focus |
| Small type | Display face | JetBrains Mono labels — the main "clinical" signal |
| Lime | Nav CTA, hero pill, stat, closing button | Held back for accents and one full-bleed closing band |
| Newsletter | Button that opens to reveal a field | Field shown, one underlined rule |

### How it is wired

`app/layout.tsx` is now only `<html>`/`<body>` plus fonts and JSON-LD. The
current site moved into the `app/(v1)/` route group — a *group*, so the URLs are
unchanged — and it brings its own header and footer via
`components/site/SiteShell.tsx`. `app/v2/` has its own shell.

`app/theme-v2.css` re-points the shared colour, radius and type tokens under a
`.theme-v2` class. Anything inside that subtree written against the v1 token
vocabulary (`bg-surface`, `text-ink`, `border-line`) comes out in the v2 palette
without being forked — which is why `ContactForm` serves both designs from one
component with a `variant` prop, and the two can never drift apart on
validation, payload or error handling.

`/v2` and `/compare` are `noindex` and disallowed in `robots.txt`: they serve the
same copy as the live pages, and three URLs per page is an SEO problem.

**To ship v2:** move `app/v2/*` up into `app/(v1)/` (renaming the group), delete
the old components, `app/theme-v2.css`, `app/compare/`, `components/compare/`,
and the preview entries in `app/robots.ts`. **To drop it:** delete the branch.

---

## Next steps

Do these in order before calling the site launched. The first three are infrastructure; the rest is copy the client still owes.

### 1. Point `powerofplayinc.com` at this site

The brand domain still serves the old Squarespace site. The Next.js app is already production on Netlify — it just is not the thing people hit when they type the domain.

The client keeps DNS where it is; only two web records change. The zone is served by GoDaddy (`ns55`/`ns56.domaincontrol.com`), so every record below is edited in the **GoDaddy DNS dashboard**. The apex currently points at Squarespace (`76.223.105.230`, `13.248.243.5`) and `www` is a `CNAME` back to the apex.

1. In the Netlify site: **Domain management → Add a domain** → `powerofplayinc.com`. Accept the prompt to also add `www.powerofplayinc.com`.
2. At the DNS host, add the **web** records only:

   | Type | Host | Value |
   | --- | --- | --- |
   | **A** | `@` | `75.2.60.5` |
   | **CNAME** | `www` | `powerofplayinc.netlify.app` |

   The apex uses an `A` record because GoDaddy's DNS has no `ALIAS`/`ANAME`/flattened-`CNAME` type. If the zone ends up somewhere that does support one, prefer `ALIAS @ → apex-loadbalancer.netlify.com`.
3. **Do not touch any mail record.** `info@powerofplayinc.com` runs on Microsoft 365 resold through GoDaddy, and the zone carries at least these:

   | Type | Host | Purpose |
   | --- | --- | --- |
   | **MX** | `@` | `powerofplayinc-com.mail.protection.outlook.com` |
   | **TXT** | `@` | `v=spf1 include:secureserver.net -all` (SPF) |
   | **TXT** | `@` | `NETORG19232798.onmicrosoft.com` (M365 domain verification) |
   | **TXT** | `_dmarc` | `v=DMARC1; p=reject; …` |
   | **CNAME** | `autodiscover` | `autodiscover.outlook.com` |
   | **SRV** | `_sipfederationtls._tcp` | `sipfed.online.lync.com` |

   DMARC is at `p=reject`, so a broken SPF record does not degrade delivery — it hard-bounces their mail. This is the main reason the site is on Netlify rather than Cloudflare; see step 2 below.
4. Remove leftover Squarespace A/CNAME records that still point the apex or `www` at Squarespace, or verification will fail.
5. Wait for DNS (often minutes, sometimes a few hours). Netlify issues Let's Encrypt SSL once the records verify.

After this, `https://powerofplayinc.com` is the site. Open Graph / LinkedIn share cards will then load from the brand domain as well.

### 2. Move the Netlify site onto the client's own team

Hosting itself costs nothing: **Netlify's free plan permits commercial use**, so a client site is within terms as-is. The one prohibition is reselling the hosting — charging for the design and build is fine, charging the client a hosting fee is not.

This is why the site is not on Vercel or Cloudflare:

- **Vercel Hobby is personal, non-commercial only** and can be taken down; Pro is $20/month. That is what this migration was for.
- **Cloudflare** is free and allows commercial use, but a custom apex domain must be a zone *on Cloudflare*, which means re-pointing the client's nameservers and reproducing their whole zone. That zone is a GoDaddy-resold Microsoft 365 setup with SPF, DMARC at `p=reject`, autodiscover and SIP records, some of which GoDaddy manages on the client's behalf. Not worth risking their email on a three-page brochure site. (Cloudflare does *not* require the domain to be registered with them — only that it be served by their nameservers. The registrar can stay GoDaddy.)

Still worth doing: create the Netlify team in the **client's** name (or transfer this site onto theirs) so the deployment outlives the engagement and they are never locked out of their own site.

Free-plan limits are ~100 GB bandwidth and 300 build minutes a month. A three-page marketing site will not approach either.

### 3. Connect the forms (Google Forms) — done

Both forms are wired to Google Forms and live. Enquiries land in **Power of Play — Website enquiries**, signups in **Power of Play — Newsletter signups**; the ids are in `content/contact.ts`. Nothing here is outstanding.

Turn on **Responses → ⋮ → Get email notifications for new responses** in each form if the client wants an email per submission — otherwise the rows only accumulate in the Sheet. See **[Forms](#forms)** below for the setup and the trade-offs.

### 4. Replace placeholder copy

Anything still awaiting the client is marked `draft: true` in `content/` and reads `PLACEHOLDER — …` on the page. Do not launch with those strings live.

The **Placeholder / Reworded / Needs source** badges that used to sit next to this copy were review scaffolding and have been removed from the public pages — the `PLACEHOLDER —` prefix already says the same thing without shouting at a client mid-demo. The badge component survives on `/design-system`, which is `noindex` and internal.

| File | What is still placeholder |
| --- | --- |
| `content/home.ts` | Approach section (body + three steps); “Who we are” teaser; two of the three problem points |
| `content/about.ts` | Story title and both paragraphs |
| `content/team.ts` | Bios and pull-quotes for Deena and Rooaa (names, roles, photos are real). **Not currently rendered** — the About card shows photo, name and role only, so no placeholder prose is on the page. Re-add the paragraph to `components/about/TeamCard.tsx` once the real bios arrive |
| `content/media.ts` | Years, links, and one-line summaries for every recognition entry; the iF Design Award row is **unverified** |

The iF Design Award was cited in the brief, but the files named `iF-Logo_colour.*` are the **Innovation Factory** logo, not iF. Confirm the award was actually won (and supply artwork), or delete that row. Do not invent it.

The “1 in 16 / 63 million kids” figures in `content/home.ts` came from the Figma with no citation. Supply a source, or soften the claim before launch — see the `TODO(client)` above `problem`.

Copy lives in TypeScript modules under `content/`, not in the components. Edit those files and the pages update. They are shaped like a future Sanity `siteSettings` document so a CMS swap later does not rewrite the UI.

### 5. Turn off GitHub Pages — workflow deleted, site still live

`.github/workflows/deploy-pages.yml` was from the old static prototype. It uploaded the repo root as a static site (source and all) rather than building Next.js, and it ran successfully on every push to `main`. **The workflow is deleted, but the published Pages site is not** — it has to be removed through GitHub:

```bash
gh api -X DELETE repos/Agrolax/power-of-play-2026/pages
```

Until that runs, `https://agrolax.github.io/power-of-play-2026/` still serves the last upload. Production deploys are Netlify only (Git integration on `main`).

### 6. After the domain is live

- Share `https://powerofplayinc.com` on LinkedIn and confirm the branded OG card (`/opengraph-image.png`, 1200×630).
- Lock the form down to `powerofplayinc.com` (see Forms).
- Optionally add a Google Search Console property and submit `https://powerofplayinc.com/sitemap.xml`.

---

## Forms

Two forms — the contact form on `/contact` and the newsletter signup in the home hero. Neither has a backend: the browser posts straight to a third party, chosen in `content/contact.ts`.

| Form | Where | Required |
| --- | --- | --- |
| **Contact** | `/contact` | Name, email, at least one reason |
| **Newsletter** | Home hero card | Email |

### Google Forms or Formspree?

**Use Google Forms.** They are not equivalent, and the difference matters for this client.

| | **Google Forms** *(recommended)* | Formspree |
| --- | --- | --- |
| Cost | Free, no cap | Free to **50 submissions/month**, then $10+/month |
| Where answers land | A Google Sheet the client owns, one row per submission | An inbox in a Formspree account, plus email |
| Account needed | The Google account that already owns `info@powerofplayinc.com` | A new third-party account someone has to keep |
| Email notification | Opt-in per form (**Responses → ⋮ → Get email notifications**) | On by default |
| Did it work? | The POST is `no-cors`, so the browser cannot read the reply — the site reports "sent", not "accepted" | Real JSON status, so a rejected submission shows an error |
| Spam | Honeypot only | Honeypot + Formspree's own filtering |

Google Forms wins on the two things that actually bite a small client: it never hits a paywall mid-year, and the data lives in a Sheet they already have access to rather than an account they will forget they own. The `no-cors` blind spot is the real trade-off — worth it here, and the honeypot plus a low-traffic marketing site keeps spam manageable. Pick Formspree instead only if they specifically want each enquiry to arrive as an email with delivery confirmed.

Whichever you choose, it is a paste into `content/contact.ts`. Nothing else changes.

### Wire up Google Forms

1. Create **two** forms at [forms.google.com](https://forms.google.com), signed in as the account that should own the data — one for enquiries, one for signups.

   - **Contact**: short-answer questions for Name, Email, Organization, Message, and a **checkboxes** question for the reasons, whose options match `reasons` in `content/contact.ts` exactly.
   - **Newsletter**: one short-answer question, Email.
   - Mark every question **optional**. The site does its own validation, and a required question Google considers unanswered rejects the whole submission silently.
   - In each form, **Responses → Link to Sheets** so answers accumulate in a spreadsheet, and **Responses → ⋮ → Get email notifications for new responses**.

2. Get the ids. Open the form's **Send → link** (the `.../viewform` URL) and copy the long id between `/d/e/` and `/viewform`:

   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform
                                     ^^^^^^^^^^^^ formId
   ```

   Then, on that same public page, **View source** and search for `entry.` — each question carries an `entry.123456789` name. (Right-click a field → Inspect works too.) Match each one to its question by the label next to it.

3. Paste both into `content/contact.ts`:

   ```ts
   export const googleForm = {
     contact: {
       formId: "1FAIpQLSc...",
       fields: {
         name: "entry.111111111",
         email: "entry.222222222",
         organization: "entry.333333333",
         reasons: "entry.444444444",
         message: "entry.555555555",
       },
     },
     newsletter: {
       formId: "1FAIpQLSd...",
       fields: { email: "entry.666666666" },
     },
   };
   ```

4. `npm run dev`, submit once from `/contact` and once from the home newsletter, and confirm both rows appear in the Sheets.

The checkbox question is sent by repeating its `entry.` key once per ticked option — which is exactly how Google records a multi-select, so the Sheet shows them comma-separated in one cell.

### Wire up Formspree instead

1. Create a free account at [formspree.io](https://formspree.io/register), then a project and a form. The dashboard gives an endpoint like `https://formspree.io/f/xxxxxxxx`.
2. Paste it into `content/contact.ts` and leave `googleForm` as `null` — Google Forms takes precedence when both are set.

   ```ts
   export const formspreeEndpoint: string | null = "https://formspree.io/f/xxxxxxxx";
   ```

3. Submit once and confirm from the Formspree email — it requires this before the form stays open.
4. **Settings → Restrict to Domain**, add `powerofplayinc.com` once the custom domain is live. Add `powerofplayinc.netlify.app` too if deploy previews should still submit.

One endpoint serves both forms; `_subject` (`Website enquiry — …` vs `Newsletter signup — …`) tells them apart in the inbox.

### Fallback: if nothing is configured

If both `googleForm` entries and `formspreeEndpoint` are ever set back to `null`, submit still validates, then opens the visitor's mail client with the answers already written into a message to `info@powerofplayinc.com`. The status line says so plainly, and the enquiry still reaches a real inbox rather than being dropped. **This is no longer the shipping state** — Google Forms is configured, so visitors never see it.

### What each form sends

**Contact** (`components/contact/ContactForm.tsx`)

| Field | |
| --- | --- |
| `name` | Required |
| `email` | Required, format-checked |
| `organization` | Optional |
| `reasons` | One or more of: Clinical partnership, Pilot or trial, Press or media, Investment, Careers, Something else |
| `message` | Optional |
| `company` | Honeypot — hidden off-screen. If filled, the submit is dropped client-side and never sent |

**Newsletter** (`components/home/NewsletterCard.tsx`) sends `email` only.

Delivery itself lives in `lib/forms.ts` — one `sendForm()` that both components call, with the Google Forms, Formspree and mailto paths behind it. Adding a third provider later means one function there, not a rewrite of either form.

### Behaviour visitors see

| State | Contact | Newsletter |
| --- | --- | --- |
| Sent | "Thanks — we'll be in touch." Form resets. | "You're on the list. We'll write when there's news." |
| Network error | Ask them to email `info@powerofplayinc.com` | Same |
| Nothing configured *(not the current state)* | "Opening your email app — hit send and the message reaches us." | "Opening your email app — send that message and you're on the list." |

There is no server route and no database. Submissions go browser → third party. The site never sees the payload after it leaves.

### Plans

Google Forms has no plan to outgrow. Formspree's free tier is 50 submissions a month. Do not swap in a custom API route unless both are a hard no — this site has no backend on purpose.

---

## Site map

| Route | |
| --- | --- |
| `/` | Home — hero, recognition strip, problem, approach, team teaser, contact CTA |
| `/about` | Story, team, recognition, contact CTA |
| `/contact` | Form + mailto / LinkedIn aside |
| `/design-system` | Internal brand reference. Unlisted, `noindex`, omitted from the sitemap |
| `/v2`, `/v2/about`, `/v2/contact` | The v2 design concept. `noindex`, omitted from the sitemap |
| `/compare` | Side-by-side viewer for the two designs. `noindex`, omitted from the sitemap |

`app/robots.ts` allows `/` and disallows `/design-system`, `/v2` and `/compare`. `app/sitemap.ts` lists Home, About, Contact against `site.url`.

---

## Editing content

| File | |
| --- | --- |
| `content/site.ts` | Name, legal name, canonical URL, tagline, email, LinkedIn, nav |
| `content/home.ts` | Hero, newsletter copy, problem, approach, who-we-are teaser |
| `content/about.ts` | Story |
| `content/team.ts` | Team cards |
| `content/media.ts` | Awards, programmes, press |
| `content/logos.ts` | Partner / programme artwork |
| `content/contact.ts` | Where the forms send, contact reasons, contact page copy |
| `content/v2.ts` | v2-only route helpers and labels. Restates existing facts; adds none |

Set `draft: false` and drop the `PLACEHOLDER —` prefix when a string is client-approved.

Brand facts that affect SEO (canonical URL, org JSON-LD, Open Graph `og:url`) all read `site.url` in `content/site.ts`. That stays `https://powerofplayinc.com` even while DNS still points at Squarespace. Share-card *images* use the host that actually serves this app (`DEPLOY_PRIME_URL`, falling back to `URL`, on Netlify), so LinkedIn does not 404 the OG image against the old Squarespace site.

Team photos live in `public/team/`. Partner logos live in `public/logos/`. Brand artwork is in `public/brand/`: `logo-with-name.svg` (mark over the full name, used in the header) and `pop-wordmark.svg` (the "pop" mark on its own).

The browser-tab icon is `app/icon.svg` — the wordmark centred on a forest tile, because a 1.9:1 wordmark shrinks to an illegible smear in a square 16px slot. `app/apple-icon.png` is the same artwork at 180×180 for iOS home screens. Both are Next.js file conventions: drop a replacement at the same path and the `<link>` tags follow. If the mark changes, regenerate `icon.svg` from `public/brand/pop-wordmark.svg` (it is that file inlined inside a square viewBox) rather than hand-editing paths.

---

## Layout of the repo

```
app/                 routes, metadata, favicon, OG image, sitemap, robots
  layout.tsx         <html>/<body>, fonts, JSON-LD — no page chrome
  (v1)/              the current design at /, /about, /contact
  v2/                the design concept at /v2/*
  compare/           side-by-side viewer
  globals.css        design tokens (v1)
  theme-v2.css       token overrides scoped to .theme-v2
components/          UI — home, about, contact, site chrome, v2, compare
content/             all copy and site facts (edit here)
lib/                 cn() helper, form delivery
public/              logos, team photos, brand SVGs
_prototype/          archived static bake-off (not deployed)
```

`_prototype/` never reaches the deployed site: Netlify publishes the `next build` output, and `_prototype/` is not under `public/`. It is the old HTML/CSS design exploration (Playroom, Playwell, Field Notebook, …). Do not ship it.

---

## Deploy

Pushes to `main` on GitHub deploy production on Netlify. Other branches get deploy previews.

Project: [powerofplayinc.netlify.app](https://powerofplayinc.netlify.app)

`netlify.toml` sets only the build command, publish directory, and Node version — Netlify detects the Next.js runtime from the `next` dependency, so no plugin needs to be declared. There are no env vars required for the site to run.

`X-Robots-Tag: noindex, nofollow` on `/design-system` now lives in `next.config.ts` under `headers()` rather than in a host config file, so the rule survives a future change of host.
