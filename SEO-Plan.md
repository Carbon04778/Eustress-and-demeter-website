# Eustress & Demeter — Website, SEO & Content Plan
_Last updated: February 2026_

---

## 1. Sitemap

**Built and live in this project**

| Page | URL slug | File |
|---|---|---|
| Home | `/` | `E&D Website v2.dc.html` |
| Restaurant Consulting | `/restaurant-consulting` | `Restaurant Consulting.dc.html` |
| Restaurant Catering Consulting | `/restaurant-catering-consulting` | `Restaurant Catering Consulting.dc.html` |
| Local Store Marketing | `/restaurant-local-store-marketing` | `Local Store Marketing.dc.html` |
| Franchise Consulting | `/franchise-consulting` | `Franchise Consulting.dc.html` |
| Franchise Readiness Assessment | `/franchise-readiness-assessment` | `Franchise Readiness Assessment.dc.html` |
| Franchise Sales Support | `/franchise-sales-support` | `Franchise Sales Support.dc.html` |
| Clients | `/clients` | `E&D Clients.dc.html` |
| Contact | `/contact` | `Contact.dc.html` |

**Planned — blocked or queued**

| Page | URL slug | Status |
|---|---|---|
| About | `/about` | **Blocked** — needs approved leadership names, titles and bios |
| Restaurant Operations Consulting | `/restaurant-operations-consulting` | Queued |
| Restaurant Revenue Growth | `/restaurant-revenue-growth` | Queued |
| Restaurant Concept Development | `/restaurant-concept-development` | Queued |
| Multi-Unit Restaurant Consulting | `/multi-unit-restaurant-consulting` | Queued |
| Restaurant Franchise Development | `/restaurant-franchise-development` | Queued |
| Franchise Operations Manuals | `/franchise-operations-manual` | Queued |
| Franchise Marketing Strategy | `/franchise-marketing-strategy` | Queued |
| Insights hub | `/insights` | Queued — depends on editorial roadmap below |
| Privacy / Terms / Accessibility | `/privacy`, `/terms`, `/accessibility` | Needs legal review |

**Cannibalization note.** `/restaurant-consulting` is the hub. When `/restaurant-operations-consulting` and `/restaurant-revenue-growth` are added they must go **deeper**, not wider — operations gets workflow, staffing structures, SOPs and audits; revenue gets channel assessment, dayparts and retention. The hub links down to both and keeps only summary treatment of each.

---

## 2. Keyword-to-page map

One primary target per page. No two pages compete for the same head term.

| Page | Primary target | Secondary targets | Question targets |
|---|---|---|---|
| Home | restaurant consulting firm | hospitality consulting firm, restaurant growth consultant, franchise development consultant | what does a restaurant consulting firm do |
| Restaurant Consulting | restaurant consultant / restaurant consulting | restaurant business consultant, restaurant operations consultant, restaurant profitability consultant, restaurant turnaround consultant | what does a restaurant consultant do; when should a restaurant hire a consultant; what should a restaurant operational assessment include |
| Catering Consulting | restaurant catering consultant | catering sales consultant, restaurant off-premise strategy, restaurant catering program development, ezCater strategy | how to grow restaurant catering sales; how to build a restaurant catering program; should restaurants use ezCater |
| Local Store Marketing | restaurant local store marketing | local store marketing consultant, restaurant grassroots marketing, restaurant grand opening marketing, restaurant field marketing | what is local store marketing; local store marketing ideas for restaurants; restaurant grand opening marketing checklist |
| Franchise Consulting | franchise consulting firm / restaurant franchise consultant | franchise development consultant, franchise system development, franchise unit economics, franchise fee and royalty strategy | how to franchise a restaurant; how much does it cost to franchise a restaurant; what are typical franchise fees and royalties |
| Franchise Readiness | franchise readiness assessment | how to franchise a restaurant, franchise readiness checklist, emerging franchise consultant | is my restaurant ready to franchise; how many locations before franchising; what is owner dependence |
| Franchise Sales Support | franchise sales consultant / franchise sales support | franchisee recruitment strategy, franchise lead qualification, outsourced franchise sales support, franchise CRM strategy | how do franchise sales work; why do franchise leads not convert; how long does it take to sell a franchise |
| Clients | restaurant consulting clients | restaurant consulting case studies | — |
| Contact | restaurant consulting consultation | — | — |

---

## 3. Internal linking map

```
Home
 ├── Restaurant Consulting ──┬── Catering Consulting
 │                           ├── Local Store Marketing
 │                           └── Franchise Readiness
 ├── Catering Consulting ────┬── Local Store Marketing
 │                           ├── Franchise Sales Support
 │                           └── Clients
 ├── Local Store Marketing ──┬── Catering Consulting
 │                           ├── Restaurant Consulting
 │                           └── Franchise Consulting
 ├── Franchise Consulting ───┬── Franchise Readiness
 │                           ├── Franchise Sales Support
 │                           └── Restaurant Consulting
 ├── Franchise Readiness ────┬── Franchise Consulting
 │                           ├── Franchise Sales Support
 │                           └── Restaurant Consulting
 ├── Franchise Sales Support ┬── Franchise Readiness
 │                           ├── Catering Consulting
 │                           └── Clients
 ├── Clients ────────────────── all service pages
 └── Contact ────────────────── four service entry points
```

Every service page carries: breadcrumb up, a three-to-four card Related row, at least one in-body contextual link, and a service-specific CTA. No orphan pages.

---

## 4. Structured data implemented

| Page | Types |
|---|---|
| Home | Organization / ProfessionalService, WebSite, FAQPage |
| Each service page | Service (name, description, serviceType, provider, areaServed, url), BreadcrumbList, FAQPage |
| Contact | ContactPage, Organization with ContactPoint, BreadcrumbList |
| Clients | WebPage, BreadcrumbList |

**Rules being followed:** every FAQPage answer string matches visible on-page text verbatim; no reviews, ratings or awards markup; no LocalBusiness (no public storefront); no hidden-content markup; leadership Person schema deferred until bios are approved.

**Validate before launch:** Google Rich Results Test and Schema.org validator on every page.

---

## 5. Thirty-topic editorial roadmap

Publishing cadence: **two per month**, prioritized top-down. Each maps to a service page and carries an internal link plus a CTA.

### Franchise development cluster

| # | Title | Slug | Intent | Links to | Schema |
|---|---|---|---|---|---|
| 1 | How to Franchise a Restaurant: The Complete Sequence | `/insights/how-to-franchise-a-restaurant` | Informational | Franchise Consulting | Article |
| 2 | Is My Restaurant Ready to Franchise? | `/insights/is-my-restaurant-ready-to-franchise` | Commercial investigation | Franchise Readiness | Article + FAQPage |
| 3 | Restaurant Franchise Readiness Checklist | `/insights/franchise-readiness-checklist` | Informational, lead magnet | Franchise Readiness | Article |
| 4 | How Much Does It Cost to Franchise a Restaurant Concept? | `/insights/cost-to-franchise-a-restaurant` | Informational | Franchise Consulting | Article + FAQPage |
| 5 | Restaurant Franchise Fees and Royalties Explained | `/insights/franchise-fees-and-royalties` | Informational | Franchise Consulting | Article |
| 6 | What Goes Into a Franchise Operations Manual? | `/insights/franchise-operations-manual-contents` | Informational | Franchise Consulting | Article |
| 7 | Restaurant Systems Needed Before Opening a Second Location | `/insights/systems-before-second-location` | Informational | Restaurant Consulting | Article |
| 8 | How to Prepare a Restaurant Brand for Multi-Unit Growth | `/insights/prepare-for-multi-unit-growth` | Informational | Restaurant Consulting | Article |

### Franchise sales cluster

| # | Title | Slug | Intent | Links to | Schema |
|---|---|---|---|---|---|
| 9 | The Franchise Sales Process From Lead to Signing | `/insights/franchise-sales-process` | Informational | Franchise Sales Support | Article |
| 10 | Why Franchise Leads Do Not Convert | `/insights/why-franchise-leads-dont-convert` | Problem-aware | Franchise Sales Support | Article |
| 11 | How to Qualify a Franchise Candidate | `/insights/qualify-a-franchise-candidate` | Informational | Franchise Sales Support | Article |
| 12 | How to Create an Ideal Franchisee Profile | `/insights/ideal-franchisee-profile` | Informational | Franchise Sales Support | Article |
| 13 | Franchise Sales Versus Franchise Marketing | `/insights/franchise-sales-vs-marketing` | Informational | Franchise Sales Support | Article |
| 14 | How to Build a Franchise Sales Pipeline | `/insights/franchise-sales-pipeline` | Informational | Franchise Sales Support | Article |
| 15 | How Long Does It Take to Sell a Franchise? | `/insights/how-long-to-sell-a-franchise` | Informational | Franchise Sales Support | Article + FAQPage |

### Catering and off-premise cluster

| # | Title | Slug | Intent | Links to | Schema |
|---|---|---|---|---|---|
| 16 | How to Grow Restaurant Catering Sales | `/insights/grow-restaurant-catering-sales` | Informational | Catering Consulting | Article |
| 17 | How to Build a Restaurant Catering Program From Zero | `/insights/build-a-catering-program` | Informational | Catering Consulting | Article |
| 18 | Restaurant Catering Menu and Packaging Guide | `/insights/catering-menu-and-packaging` | Informational | Catering Consulting | Article |
| 19 | How to Improve ezCater Performance | `/insights/improve-ezcater-performance` | Informational | Catering Consulting | Article |
| 20 | Restaurant Revenue Channels Beyond Dine-In | `/insights/revenue-channels-beyond-dine-in` | Informational | Restaurant Consulting | Article |

### Local marketing cluster

| # | Title | Slug | Intent | Links to | Schema |
|---|---|---|---|---|---|
| 21 | Local Store Marketing Ideas for Restaurants | `/insights/local-store-marketing-ideas` | Informational | Local Store Marketing | Article |
| 22 | Restaurant Community Outreach Strategy | `/insights/restaurant-community-outreach` | Informational | Local Store Marketing | Article |
| 23 | Restaurant Grand Opening Marketing Checklist | `/insights/grand-opening-marketing-checklist` | Informational, lead magnet | Local Store Marketing | Article |
| 24 | How to Build a Restaurant Sales Culture | `/insights/restaurant-sales-culture` | Informational | Local Store Marketing | Article |

### Operations cluster

| # | Title | Slug | Intent | Links to | Schema |
|---|---|---|---|---|---|
| 25 | What Does a Restaurant Consultant Do? | `/insights/what-does-a-restaurant-consultant-do` | Informational | Restaurant Consulting | Article + FAQPage |
| 26 | When Should a Restaurant Hire a Consultant? | `/insights/when-to-hire-a-restaurant-consultant` | Commercial investigation | Restaurant Consulting | Article |
| 27 | Restaurant Operational Assessment Checklist | `/insights/operational-assessment-checklist` | Informational, lead magnet | Restaurant Consulting | Article |
| 28 | How to Improve Multi-Unit Restaurant Consistency | `/insights/multi-unit-consistency` | Informational | Restaurant Consulting | Article |
| 29 | How to Create Restaurant Standard Operating Procedures | `/insights/restaurant-sops` | Informational | Restaurant Consulting | Article |
| 30 | Restaurant Technology Stack Assessment | `/insights/restaurant-technology-stack` | Informational | Restaurant Consulting | Article |

**Article template.** Answer the title question in the first 40 words. Descriptive H2s. Define terms. Steps in sequence. One real anonymized example. Short FAQ. Two or three internal links. Named author or reviewer. Visible updated date. No superlatives.

---

## 6. Lead magnets

Ungated on the page, gated only for the downloadable version — enough substance stays crawlable.

1. Restaurant Operational Assessment Checklist
2. Catering Growth Checklist
3. Franchise Readiness Scorecard (the twelve-point list, as a scored worksheet)
4. Franchise Sales Process Checklist
5. Multi-Unit Growth Readiness Guide

---

## 7. Technical launch checklist

**On the site**
- [ ] Server-rendered or static HTML for every page
- [ ] One H1 per page, logical H2/H3 order — done on all built pages
- [ ] Unique title and meta description per page — done
- [ ] Canonical URL per page — done
- [ ] Open Graph and Twitter card metadata — done
- [ ] Breadcrumb navigation and BreadcrumbList markup — done
- [ ] Descriptive alt text on every image — done
- [ ] Photography converted to WebP or AVIF, responsive `srcset`
- [ ] SVG logo file (currently PNG)
- [ ] Lazy loading below the fold
- [ ] XML sitemap at `/sitemap.xml`
- [ ] `robots.txt` allowing Googlebot, Bingbot, and the AI crawlers you choose
- [ ] Custom 404 page
- [ ] HTTPS with HSTS
- [ ] Core Web Vitals pass on mobile

**Search and AI discovery**
- [ ] Google Search Console verified, sitemap submitted
- [ ] Bing Webmaster Tools verified, sitemap submitted
- [ ] IndexNow key deployed, submission on publish
- [ ] GA4 with conversion events: form submit, email click, phone click, lead-magnet download
- [ ] Structured data validated on every page
- [ ] Broken-link and crawl-error monitoring
- [ ] Brand-mention monitoring

**Crawler access — your decision, not ours.** `robots.txt` controls whether AI systems may read the site. Blocking GPTBot, ClaudeBot, PerplexityBot or Google-Extended removes your pages from those systems' answers. Allowing them means your content may be summarized without a click. This is a business and licensing decision; flagging it rather than deciding it.

**Redirects.** Map every existing URL on the current site to its new equivalent as a 301 before launch. Nothing should 404.

---

## 8. Measurement framework

Not traffic. These:

- Qualified organic leads, split franchise vs. restaurant consulting
- Consultation form submissions and calls from organic
- Conversion rate by landing page
- Non-branded organic visibility on the high-intent terms in section 2
- Branded search volume growth
- Google Search Console impressions and clicks by page
- Bing Webmaster Tools AI performance reporting
- Pages surfaced or cited in AI answers, where measurable
- Case-study engagement and lead-magnet downloads
- Assisted conversions

---

## 9. Still requires your approval

Nothing below has been invented or published without a hedge. Each item unlocks stronger content.

1. **Verified business location.** Required for `Based in [location] and supporting brands across the United States`, Organization schema, and any geographic pages. Currently absent site-wide.
2. **Leadership names, titles and bios.** Blocks the About page and all Person schema. Also blocks named article authorship, which is a significant E-E-A-T signal.
3. **Named testimonial approval.** Six named quotes exist in your services guide. Currently running anonymized. Attributed quotes are worth substantially more.
4. ~~**Off-premise revenue figure.**~~ **Resolved February 2026: $60M+.** Applied consistently across the homepage stat band, the homepage Off-Premise capability card, and the catering page hero. Any new page or article must use $60M+.
5. **Client result figures.** The $3.7M / 27% and $50K-to-$200K figures come from your own proposals. Confirm they may be used publicly, even anonymized.
6. **Client logo and naming permission.** The roster names clients. Confirm the list is cleared.
7. **Social profile URLs** for Organization `sameAs`.
8. **Association memberships, speaking, teaching or board service** — verified only.
9. **Founding year**, if you want it in schema.
10. **Privacy policy, terms and accessibility statement** — need legal review before publishing.

---

## 10. Ninety-day post-launch plan

**Days 1–30.** Submit sitemaps, verify indexing of all nine pages, fix crawl errors, publish articles 1, 2, 16 and 25. Baseline rankings on the section 2 terms.

**Days 31–60.** Publish articles 3, 9, 21 and 26. Build the About page assuming bios are approved. Add Restaurant Operations Consulting and Restaurant Franchise Development. Launch the first two lead magnets.

**Days 61–90.** Publish articles 4, 10, 17 and 27. Add Franchise Operations Manuals and Franchise Marketing Strategy. First quarterly review: which pages earn impressions, which earn clicks, which earn leads — and rewrite the ones earning impressions without clicks.
