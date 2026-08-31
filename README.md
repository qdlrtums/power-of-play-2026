# Power of Play

Marketing site for [Power of Play Inc.](https://powerofplayinc.com) — a pediatric rehabilitation company taking a play-based approach to therapy and assessment for young children.

Three public pages: **Home**, **About Us**, **Contact**. Built with Next.js (App Router) and Tailwind CSS, deployed on Vercel.

| | URL |
| --- | --- |
| **New site (this repo)** | https://powerofplayinc.vercel.app |
| **Brand domain (still the old Squarespace site)** | https://powerofplayinc.com |
| **Contact** | [info@powerofplayinc.com](mailto:info@powerofplayinc.com) |
| **LinkedIn** | [power-of-play-pop](https://www.linkedin.com/company/power-of-play-pop/) |

Until DNS is pointed at Vercel, treat `powerofplayinc.vercel.app` as the live preview. `powerofplayinc.com` is still Squarespace.

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

Node 20+ is enough locally. Vercel builds on Node 24.

---

## Next steps

Do these in order before calling the site launched. The first three are infrastructure; the rest is copy the client still owes.

### 1. Point `powerofplayinc.com` at this site

The brand domain still serves the old Squarespace site. The Next.js app is already production on Vercel — it just is not the thing people hit when they type the domain.

1. In the Vercel project: **Settings → Domains → Add** `powerofplayinc.com`. Accept the prompt to also add `www.powerofplayinc.com`.
2. At the DNS host (currently Squarespace), replace the **web** records only. Typical values (confirm against the Vercel domain card — they can differ per project):

   | Type | Host | Value |
   | --- | --- | --- |
   | **A** | `@` | `76.76.21.21` |
   | **CNAME** | `www` | `cname.vercel-dns.com` |

3. **Do not touch MX, SPF, DKIM, or other mail records.** `info@powerofplayinc.com` must keep working.
4. Remove leftover Squarespace A/CNAME records that still point the apex or `www` at Squarespace, or verification will fail.
5. Wait for DNS (often minutes, sometimes a few hours). Vercel issues SSL once the records verify.

After this, `https://powerofplayinc.com` is the site. Open Graph / LinkedIn share cards will then load from the brand domain as well.

### 2. Put the project on a Vercel Pro team

This is a commercial client site. Vercel Hobby is for personal, non-commercial use and can be taken down. Pro is **$20/month** — same ballpark as Squarespace, and it keeps the current Next.js setup, custom domain, and `next/image`.

- Ask the client to pay for a **new** Pro team named for Power of Play (or Agrolax), then transfer the Vercel project onto that team.
- **Do not put this project on the Rellia Health Pro team.** Different client, different billing.

Hobby bandwidth would be plenty for a three-page marketing site. Pro is the license, not extra horsepower.

### 3. Connect the forms (Google Forms)

The contact form and the home-page newsletter already validate and send. They are waiting for one form id. Until that id is set, submitting opens a pre-filled email to [info@powerofplayinc.com](mailto:info@powerofplayinc.com) — clunky, but the enquiry still lands in a real inbox.

**Google Forms is the recommendation.** See **[Forms](#forms)** below for why, and for the setup.

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

### 5. Turn off the leftover GitHub Pages workflow

`.github/workflows/deploy-pages.yml` is from the old static prototype. It uploads the repo root as a static site and will not build Next.js. Disable or delete it so a push to `main` cannot clobber anything. Production deploys are Vercel only (Git integration on `main`).

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
4. **Settings → Restrict to Domain**, add `powerofplayinc.com` once the custom domain is live. Add `powerofplayinc.vercel.app` too if preview deploys should still submit.

One endpoint serves both forms; `_subject` (`Website enquiry — …` vs `Newsletter signup — …`) tells them apart in the inbox.

### While nothing is configured

Submit still validates, then opens the visitor's mail client with the answers already written into a message to `info@powerofplayinc.com`. The status line says so plainly. It costs the visitor one extra click and it reaches a real inbox — no enquiry is dropped silently. This is the state the site ships in today.

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
| Sent | "Thanks — we'll be in touch." Form resets. | "Thanks — you're on the list." |
| Network error | Ask them to email `info@powerofplayinc.com` | Same |
| Nothing configured | "Opening your email app — hit send and the message reaches us." | "Opening your email app — send that message and you're on the list." |

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

`app/robots.ts` allows `/` and disallows `/design-system`. `app/sitemap.ts` lists Home, About, Contact against `site.url`.

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

Set `draft: false` and drop the `PLACEHOLDER —` prefix when a string is client-approved.

Brand facts that affect SEO (canonical URL, org JSON-LD, Open Graph `og:url`) all read `site.url` in `content/site.ts`. That stays `https://powerofplayinc.com` even while DNS still points at Squarespace. Share-card *images* use the host that actually serves this app (`VERCEL_PROJECT_PRODUCTION_URL` on Vercel), so LinkedIn does not 404 the OG image against the old Squarespace site.

Team photos live in `public/team/`. Partner logos live in `public/logos/`. Brand artwork is in `public/brand/`: `logo-with-name.svg` (mark over the full name, used in the header) and `pop-wordmark.svg` (the "pop" mark on its own).

The browser-tab icon is `app/icon.svg` — the wordmark centred on a forest tile, because a 1.9:1 wordmark shrinks to an illegible smear in a square 16px slot. `app/apple-icon.png` is the same artwork at 180×180 for iOS home screens. Both are Next.js file conventions: drop a replacement at the same path and the `<link>` tags follow. If the mark changes, regenerate `icon.svg` from `public/brand/pop-wordmark.svg` (it is that file inlined inside a square viewBox) rather than hand-editing paths.

---

## Layout of the repo

```
app/                 routes, metadata, favicon, OG image, sitemap, robots
components/          UI — home, about, contact, site chrome
content/             all copy and site facts (edit here)
lib/                 cn() helper, form delivery
public/              logos, team photos, brand SVGs
_prototype/          archived static bake-off (not deployed)
```

`_prototype/` is excluded from Vercel via `.vercelignore`. It is the old HTML/CSS design exploration (Playroom, Playwell, Field Notebook, …). Do not ship it.

---

## Deploy

Pushes to `main` on GitHub deploy production on Vercel. Other branches get preview URLs.

Project: [powerofplayinc.vercel.app](https://powerofplayinc.vercel.app)

`vercel.json` only sets `X-Robots-Tag: noindex, nofollow` on `/design-system`. There are no cron jobs, rewrites, or env vars required for the site to run.
