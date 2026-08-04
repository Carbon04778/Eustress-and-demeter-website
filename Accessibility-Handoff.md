# Accessibility Handoff — Eustress & Demeter Website

**Prepared for:** the designer/developer implementing this site on its production platform
**Standard targeted:** WCAG 2.1 Level AA
**Last audited:** across all 29 page files in this package

---

## 1. Why this document exists

The static pages in this package were built to WCAG 2.1 AA and audited. When this
design is rebuilt on a CMS (WordPress, Webflow, Shopify, a headless stack, whatever
you use), **most of that work is easy to lose**. Themes inject their own markup.
Page builders wrap content in extra divs. Plugins add widgets with no keyboard
support. Cookie banners trap focus.

This document lists what is already correct so you can preserve it, and what you
must verify after the rebuild.

A note on why this matters commercially, not just ethically: ADA web accessibility
lawsuits against US businesses run in the thousands per year, and professional
services firms are routinely targeted. A demand letter typically cites automated
scan results — exactly the failures listed in section 3 below.

---

## 2. What is already implemented (preserve all of this)

### 2.1 Document structure

| Item | Implementation | WCAG |
|---|---|---|
| Language declared | `<html lang="en">` on every page | 3.1.1 (A) |
| One `<h1>` per page | Verified on all 29 pages | 1.3.1 (A) |
| No heading-level skips | h1 → h2 → h3, never h2 → h4 | 1.3.1 (A) |
| Landmark regions | `<header>`, `<nav>`, `<main id="main">`, `<footer>` | 1.3.1 (A) |
| Descriptive page titles | Unique `<title>` per page | 2.4.2 (A) |
| Labelled navigation | `<nav aria-label="Primary">` | 1.3.1 (A) |

### 2.2 Keyboard and focus

**Skip link.** Every page opens with:

```html
<a href="#main" class="ed-skip">Skip to main content</a>
```

It is positioned off-screen at `left: -9999px` and moves to `left: 12px; top: 12px`
on `:focus`. It must remain the **first focusable element in the DOM**. If your
theme injects a cookie banner, chat widget, or promo bar above it, the skip link
stops doing its job.

**Focus indicators.** A visible 3px outline on every interactive element:

```css
a:focus-visible, button:focus-visible, input:focus-visible,
select:focus-visible, textarea:focus-visible, [tabindex]:focus-visible {
  outline: 3px solid #C4501E;
  outline-offset: 3px;
}
```

⚠️ **Do not let a theme reset add `outline: none`.** This is the single most common
way accessibility is destroyed during a rebuild. WCAG 2.4.7 (AA) requires a visible
focus indicator, and WCAG 2.4.11 (AA, 2.2) sets minimum contrast for it.

**Services dropdown.** Opens on both hover and keyboard focus:

```css
.ed-menu-panel { display: none; }
.ed-menu:hover .ed-menu-panel,
.ed-menu:focus-within .ed-menu-panel { display: block; }
```

The `:focus-within` half is what makes it keyboard-operable. If you replace this
with a JavaScript dropdown, it must open on focus, close on `Escape`, and return
focus to the trigger. See section 4.1 — this needs manual testing.

**No keyboard traps.** No modals, lightboxes, or focus-capturing widgets anywhere
in the current build (2.1.2, A).

### 2.3 Motion

All animation respects the OS-level reduced-motion setting:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

This matters most for the **three sliding logo rows on the Clients page** and the
**client name ticker on the homepage**, which animate continuously. WCAG 2.2.2 (A)
requires a mechanism to pause or stop motion that runs longer than five seconds;
the reduced-motion query satisfies this for users who have set the preference.

Both marquees are also marked `aria-hidden="true"` — the client names are available
as real text elsewhere on the page, so screen readers are not forced through a
scrolling list.

### 2.4 Images

Every `<img>` has an `alt` attribute. Decorative images use `alt=""` plus
`aria-hidden="true"`; meaningful images have descriptive alt text.

Background photographs are applied as CSS `background-image` on `aria-hidden` divs,
which is correct — they are atmosphere, not content.

⚠️ If your CMS re-uploads the photography, **alt text does not travel with the file.**
Re-enter it in the media library.

### 2.5 Colour contrast

The palette was tested and adjusted for AA:

| Combination | Ratio | Use |
|---|---|---|
| `#17190F` on `#F2F0E9` | 15.8:1 | Body text on paper |
| `#3D4034` on `#F2F0E9` | 10.6:1 | Secondary body text |
| `#5B5F4E` on `#F2F0E9` | 6.4:1 | Captions, eyebrows |
| `#A33F14` on `#F2F0E9` | 5.5:1 | Accent — small text |
| `#F2F0E9` on `#A33F14` | 5.5:1 | Primary button |
| `#E0A87C` on `#38452C` | 4.9:1 | Accent on olive |
| `#E0A87C` on `#17190F` | 8.5:1 | Accent on ink |

⚠️ **Two oranges exist deliberately.** `#C4501E` is the brighter ember and is used
**only** for rules, dividers and display type at 24px and above, where WCAG's
large-text threshold (3:1) applies. `#A33F14` is the darker variant used for **all
small text**. Do not consolidate them to one value — using `#C4501E` at 10px fails
AA. This exact mistake was caught and fixed during the build.

### 2.6 Forms (Contact page and homepage contact block)

- Every input has a real `<label>` with a matching `for`/`id`
- Required fields marked both visually (`*`) and programmatically (`required`)
- Native `<select>` arrows retained — a styled select with the arrow stripped gives
  no affordance that it is a dropdown
- Submit feedback is announced via `role="status"` (a polite live region)
- The submit button is described by its help text via `aria-describedby`

⚠️ **The form currently uses a `mailto:` handler.** When you connect it to a real
form service (Formspree, Netlify Forms, HubSpot, a custom endpoint), preserve:
- the label associations
- the `role="status"` live region for the success/error message
- inline error messages tied to their field with `aria-describedby`
- `aria-invalid="true"` on fields that fail validation

Error messages must identify the field and describe the fix (WCAG 3.3.1, 3.3.3).
"Please enter a valid email address" — not "Invalid input."

---

## 3. Known gaps that require a human

These cannot be verified from markup alone. Budget time for them before launch.

### 3.1 Screen reader testing of the Services dropdown

Test with **NVDA + Firefox** (Windows) and **VoiceOver + Safari** (macOS).
Confirm: the menu opens on Tab, all six items are reachable, `Escape` closes it,
and focus returns sensibly. If your rebuild uses a JS menu, consider adding
`aria-expanded` and `aria-haspopup="true"` to the trigger.

### 3.2 Screen reader testing of the contact form

Complete a full submission with a screen reader running. Confirm the success
message is announced, and that validation errors are announced and reachable.

### 3.3 Mobile and zoom

- Test at **320px width** with no horizontal scrolling (WCAG 1.4.10, AA)
- Test at **200% browser zoom** with no content loss (1.4.4, AA)
- Confirm tap targets are at least **44 × 44px** (2.5.5, AAA, but expected practice)

The desktop layouts use fixed multi-column grids. Your responsive implementation
must collapse these — the reference files were authored at desktop width.

### 3.4 Accessibility statement page

Not yet written. Standard practice for a professional services site, and useful
evidence of good-faith effort if compliance is ever questioned. It should state
the standard targeted, known limitations, and a contact address for accessibility
problems. Ask and one can be drafted.

### 3.5 Third-party embeds

Anything added after handoff — chat widgets, cookie consent, booking tools,
analytics overlays, social embeds — must be audited separately. **These are the
most common source of accessibility failures on otherwise compliant sites.**
Cookie banners in particular frequently trap keyboard focus.

---

## 4. Post-rebuild checklist

Run through this after the site is live on its production platform.

**Automated (catches roughly 30% of issues)**
- [ ] axe DevTools browser extension — zero critical/serious violations
- [ ] WAVE (wave.webaim.org) — zero errors
- [ ] Lighthouse accessibility audit — 95+
- [ ] HTML validator (validator.w3.org) — no parse errors

**Manual (catches the rest)**
- [ ] Unplug the mouse. Reach every link, button and form field with Tab alone.
- [ ] Confirm focus is visible at every stop.
- [ ] Confirm tab order follows visual order.
- [ ] Skip link is the first thing that receives focus.
- [ ] Zoom to 200%. Nothing overlaps or disappears.
- [ ] Resize to 320px. No horizontal scroll.
- [ ] Enable OS reduced motion. Marquees stop.
- [ ] Run one page end-to-end with a screen reader.
- [ ] Submit the contact form with errors, then successfully, with a screen reader.
- [ ] Confirm every image in the CMS media library has alt text.

---

## 5. Quick reference — do not break these

1. `<html lang="en">` on every page
2. Skip link first in the DOM
3. Never `outline: none` without a replacement indicator
4. `#A33F14` for small accent text, `#C4501E` only at 24px+
5. `prefers-reduced-motion` block intact
6. `<main id="main">` wrapping page content
7. One `<h1>` per page, no heading skips
8. Alt text on every image
9. Labels on every form field
10. `role="status"` on form feedback

---

## 6. Files in this package

| File | Purpose |
|---|---|
| `E&D Website v2.dc.html` | Homepage |
| `E&D Website v2-print.dc.html` | Print/PDF variant of homepage |
| `E&D Clients.dc.html` | Clients page |
| `The E&D Playbook.dc.html` | Resource library index |
| `Methodology.dc.html` | Growth framework and operating principles |
| `Contact.dc.html` | Contact and qualification form |
| Six service pages | Restaurant Consulting, Catering, LSM, Franchise Consulting, Franchise Readiness, Franchise Sales Support |
| Nineteen guide pages | Playbook articles |
| `assets/` | Logo seal, headshot |
| `SEO-Plan.md` | Keyword map, internal linking, editorial roadmap |
| `Accessibility-Handoff.md` | This document |

Photography is currently hot-linked to `studiohodson.s3.us-west-2.amazonaws.com`.
**Download and self-host these before launch** — external hot-linking is fragile and
slows Largest Contentful Paint.
