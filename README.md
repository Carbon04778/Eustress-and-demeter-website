# Eustress & Demeter — Website Package

Reference build of the Eustress & Demeter website: 27 pages, fully written,
SEO-structured and audited to WCAG 2.1 AA. Everything here is production-ready
content and design intent, to be rebuilt on your production platform.

**Start with `Accessibility-Handoff.md`.** It lists what must survive the rebuild.

---

## How to view these files

Every page is a self-contained HTML file. Open any of them directly in a browser —
no build step, no server, no dependencies to install. `support.js` must stay in the
same folder; it is the small runtime the pages load.

Start at **`E&D Website v2.dc.html`** (the homepage) and navigate from there. All
internal links work locally.

---

## Site map

### Core pages

| File | Role |
|---|---|
| `E&D Website v2.dc.html` | **Homepage** |
| `Methodology.dc.html` | The Growth Framework, Readiness Gate, operating principles |
| `E&D Clients.dc.html` | Client roster, capability areas, 22 anonymized engagements |
| `The E&D Playbook.dc.html` | Resource library index, organised by five pillars |
| `Contact.dc.html` | Contact and qualification form |
| `E&D Website v2-print.dc.html` | Print/PDF variant of the homepage |

### Service pages (6)

| File | Primary keyword target |
|---|---|
| `Restaurant Consulting.dc.html` | restaurant consulting / restaurant consultant |
| `Restaurant Catering Consulting.dc.html` | restaurant catering consulting, off-premise |
| `Local Store Marketing.dc.html` | local store marketing, restaurant grand opening |
| `Franchise Consulting.dc.html` | how to franchise a restaurant |
| `Franchise Readiness Assessment.dc.html` | franchise readiness assessment |
| `Franchise Sales Support.dc.html` | franchise sales support, franchise development |

### Playbook guides (19)

**Restaurant Consulting** — `Restaurant Operations Audit Guide`, `Restaurant KPI Dashboard Guide`

**Restaurant Operations** — `Restaurant SOP Guide`, `Restaurant Training Systems`,
`Multi-unit Restaurant Systems`, `Restaurant Organizational Structure`,
`Restaurant Technology Stack Guide`, `Restaurant Opening Checklist`

**Revenue Growth** — `How to Grow Catering Revenue`, `Restaurant Revenue Growth Guide`

**Franchise Development** — `Restaurant Expansion Planning Guide`,
`Franchise Entity Structure Guide`, `Franchise Fees and Unit Economics`,
`Franchise Territory Strategy`

**Franchise Sales** — `How to Qualify a Franchise Candidate`,
`Restaurant Leadership Playbook`, `Restaurant Due Diligence Checklist`

(Remaining guides are indexed on the Playbook page and marked "in production".)

### Supporting files

| File | Purpose |
|---|---|
| `Accessibility-Handoff.md` | **Read first.** WCAG 2.1 AA implementation and what to preserve |
| `SEO-Plan.md` | Keyword map, internal linking, editorial roadmap, launch checklist |
| `E&D Design System v2.dc.html` | Earlier design system reference (colours, type, components) |
| `clients-data.js` | Client roster and case study data, loaded by the Clients page |
| `support.js` | Page runtime — required, do not remove |
| `contact-form.js` | Shared submit handler for every contact form; posts to `api/contact.js` |
| `api/contact.js` | Vercel serverless function; sends via Resend once `RESEND_API_KEY` is set |
| `index.html` | Redirects `/` to the homepage `.dc.html` file |
| `assets/` | Logo seal, founder headshot |

---

## Design system

**Typography**
- Display / headings — **Instrument Serif** (Google Fonts), regular and italic
- Body / UI — **Archivo** (Google Fonts), weights 300 / 400 / 500 / 600
- Signature — **Mrs Saint Delafield** (Google Fonts), used once, in the founder note

**Palette**

| Token | Hex | Use |
|---|---|---|
| Paper | `#F2F0E9` | Primary background |
| Paper alt | `#EAE7DC` | Alternating section background |
| Ink | `#17190F` | Primary text, header, dark sections |
| Olive | `#38452C` | Secondary dark, buttons, accents |
| Olive ramp | `#5B6B47` `#8A9670` `#C9CDB4` | Tints of Olive, for layered diagrams only (e.g. the Scalability Pyramid). All contrast-checked. Not for UI. |
| Body | `#3D4034` | Body copy |
| Muted | `#5B5F4E` | Captions, eyebrows, metadata |
| Ember (display) | `#C4501E` | Rules and type **24px and above only** |
| Ember (text) | `#A33F14` | All small accent text |
| Peach | `#E0A87C` | Accent on dark grounds |
| Hairline | `#DDD8CB` / `#CFCBBC` | Dividers, card borders |

⚠️ The two ember values are deliberate. See `Accessibility-Handoff.md` §2.5.

**Layout conventions**
- Max content width 1320px, 40px horizontal padding
- Section heads use a 64px numeral rail (serif numeral in ember, then the h2)
- Cards sit in 1px `#DDD8CB` grids with paper-coloured cells
- Photography runs full-bleed between sections, never in a gallery grid

---

## Responsive behavior

Every page carries a mobile layer in its `<style>` block, marked `/* mobile */`. Two
breakpoints:

**≤ 900px (tablet and phone)**
- Header stops being sticky; the logo and nav stack, and the nav scrolls horizontally.
- The Services dropdown panel is hidden — the Services link goes straight to the
  Restaurant Consulting hub instead.
- All multi-column grids collapse to a single column.
- Display type scales with `clamp()`: h1 32–70px, h2 27–52px, h3 20–36px.
- Section padding drops from 104px/40px to 56px/20px; large photo bands cap at 260px tall.

**≤ 560px (small phone)**
- Horizontal padding tightens to 16px.
- Form inputs forced to 16px so iOS Safari does not zoom on focus.

The mobile layer works by overriding inline styles with attribute selectors
(`[style*="grid-template-columns"]`, etc.) because the pages are inline-styled. When you
port this into a real template system, replace that layer with proper classes and
breakpoints — it is a compatibility shim, not the intended production approach.

Tested down to 375px width. The client tickers on the homepage and Clients page are
`overflow: hidden` marquees and do not cause horizontal page scroll.

---

## Contact forms (wired, ready for Resend)

Every form on the site — the full form on `Contact.dc.html` and the quick-contact
forms on the homepage and each service page — now POSTs to a Vercel serverless
function at `api/contact.js` instead of using `mailto:`. The shared client-side
handler is `contact-form.js` (loaded by every page right after `support.js`).

**This works with zero configuration.** Until you add a Resend API key, the
function validates each submission, logs it in the Vercel function log, and
returns success — so the forms are fully testable in dev/preview. If the
request ever fails (API not deployed, network error), the visitor's email
client opens instead with the same details, so no inquiry is lost.

**To start actually sending email:**
1. `npm install` (installs the `resend` package already listed in `package.json`)
2. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)
3. In Vercel → Project Settings → Environment Variables, add:
   - `RESEND_API_KEY` — your Resend key
   - `CONTACT_TO_EMAIL` — optional, defaults to `info@eustressanddemeter.com`
   - `CONTACT_FROM_EMAIL` — optional; must be on a domain verified in Resend
     once you have one (Resend's shared `onboarding@resend.dev` sender works
     for testing before that)
4. Redeploy. No code changes needed.

See `.env.example` for the same variables for local `vercel dev`.

## Deploying (VS Code → GitHub → Vercel)

This folder is a plain static site plus one serverless function — no build
step, no framework.

1. Open the folder in VS Code.
2. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Eustress & Demeter website"
   git branch -M main
   git remote add origin https://github.com/<your-org>/<your-repo>.git
   git push -u origin main
   ```
3. In Vercel: **Add New… → Project**, import that GitHub repo, and deploy.
   No framework preset or build command is needed — Vercel serves the static
   `.dc.html`/`.js`/`assets` files as-is and automatically turns `api/contact.js`
   into a serverless function.
4. Add the Resend environment variables above before (or after) the first
   deploy — the site works either way.
5. `index.html` at the project root redirects `/` to the homepage
   (`E&D Website v2.dc.html`) so the bare domain resolves correctly.

## Before launch

1. **Self-host the photography.** All images currently hot-link to
   `studiohodson.s3.us-west-2.amazonaws.com`. Download, compress, and serve locally.
   Credit line for the food photography: **Bob Hodson, Studio Hodson**.
2. **Add your Resend API key** (see above) once you're ready to send real email.
3. **Run the accessibility checklist** in `Accessibility-Handoff.md` §4.
4. **Set canonical URLs and submit a sitemap** — see `SEO-Plan.md`.
5. **Verify the structured data** with Google's Rich Results Test. Every page carries
   JSON-LD (Organization, BreadcrumbList, Article/Service, FAQPage where applicable).

---

## Open items requiring client input

Listed in full in `SEO-Plan.md` §9. The two that block work:

- **Leadership bios** — names, titles, credentials. Blocks the About page, author
  profiles, and Person schema, which is the largest remaining E-E-A-T gap.
- **Off-premise revenue figure** — the site states $60M+; source documents support
  a range depending on the year. Confirm before launch.

---

*Prepared for Eustress & Demeter, LLC · info@eustressanddemeter.com · 213.222.3849*
