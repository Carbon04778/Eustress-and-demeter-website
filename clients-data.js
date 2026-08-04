// Client roster — source of truth for the Clients page.
// To add a client: append an entry. category: "Restaurant & Hospitality" | "Non-Restaurant"
// logo: absolute URL, or omit to render an accessible text fallback card.
const LOGO_BASE = 'https://www.eustressanddemeter.com/wp-content/uploads/2024/10/';

export const clients = [
  { name: "Alondra's", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0019_Layer-16.jpg' },
  { name: "Amazon Prime", category: 'Non-Restaurant', featured: true },
  { name: "Apple", category: 'Non-Restaurant', featured: true },
  { name: "Arooga's", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0001_Layer-34.jpg' },
  { name: "Asian Box", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0025_Layer-10.jpg' },
  { name: "BJ's Restaurant & Brewhouse", category: 'Restaurant & Hospitality', featured: true, logo: LOGO_BASE + '0000_Layer-35.jpg' },
  { name: "Bistro 120", category: 'Restaurant & Hospitality' },
  { name: "Black Walnut Cafe", category: 'Restaurant & Hospitality', featured: true },
  { name: "Bottega Louie", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0033_Layer-2.jpg' },
  { name: "Burger Boss", category: 'Restaurant & Hospitality' },
  { name: "Chicken Maison", category: 'Restaurant & Hospitality', featured: true },
  { name: "Chili's", category: 'Restaurant & Hospitality', featured: true, logo: LOGO_BASE + '0002_Layer-33.jpg' },
  { name: "Cowford Chophouse", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0023_Layer-12.jpg' },
  { name: "Darden Restaurants", category: 'Restaurant & Hospitality', featured: true },
  { name: "Del Taco", category: 'Restaurant & Hospitality' },
  { name: "Dink & Dine Pickle Park", category: 'Restaurant & Hospitality', featured: true },
  { name: "Fresh Brothers", category: 'Restaurant & Hospitality', featured: true, logo: LOGO_BASE + '0014_Layer-21.jpg' },
  { name: "Google", category: 'Non-Restaurant', featured: true },
  { name: "Hummus Fit", category: 'Restaurant & Hospitality' },
  { name: "Kayos Ramen Bar", category: 'Restaurant & Hospitality', featured: true },
  { name: "Lawry's The Prime Rib", category: 'Restaurant & Hospitality', featured: true, logo: LOGO_BASE + '0004_Layer-31.jpg' },
  { name: "Lemonade", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0032_Layer-3.jpg' },
  { name: "Lucille's BBQ", category: 'Restaurant & Hospitality' },
  { name: "Magee's Kitchen & House of Nuts", category: 'Restaurant & Hospitality' },
  { name: "Menchie's", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0028_Layer-7.jpg' },
  { name: "Miguel's Jr.", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0008_Layer-27.jpg' },
  { name: "Mountain Mike's Pizza", category: 'Restaurant & Hospitality' },
  { name: "Nautical Bowls", category: 'Restaurant & Hospitality' },
  { name: "Pizzana", category: 'Restaurant & Hospitality', featured: true },
  { name: "Pollo Campero", category: 'Restaurant & Hospitality' },
  { name: "Porto's Bakery", category: 'Restaurant & Hospitality', featured: true, logo: LOGO_BASE + '0009_Layer-26.jpg' },
  { name: "Reef", category: 'Non-Restaurant' },
  { name: "Rise Brands", category: 'Restaurant & Hospitality' },
  { name: "Schmackary's", category: 'Restaurant & Hospitality', featured: true },
  { name: "Stacked", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0029_Layer-6.jpg' },
  { name: "Tartine", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0015_Layer-20.jpg' },
  { name: "Telenav", category: 'Non-Restaurant', logo: LOGO_BASE + '0024_Layer-11.jpg' },
  { name: "Tocaya Organica", category: 'Restaurant & Hospitality', logo: LOGO_BASE + '0034_Layer-1.jpg' },
  { name: "True Food Kitchen", category: 'Restaurant & Hospitality', featured: true, logo: LOGO_BASE + '0010_Layer-25.jpg' },
  { name: "Urbane Cafe", category: 'Restaurant & Hospitality' },
  { name: "V10 Plus", category: 'Non-Restaurant', logo: LOGO_BASE + '0005_Layer-30.jpg' },
  { name: "Vitagenne", category: 'Non-Restaurant', logo: LOGO_BASE + '0013_Layer-22.jpg' },
  { name: "Wetzel's Pretzels", category: 'Restaurant & Hospitality' }
];

// Engagement stories. Client names are intentionally withheld — each entry uses a
// descriptor instead. All entries are executed engagements.
// To add one: descriptor, category, a 50-80 word summary, and 4-5 service tags.
export const caseStudies = [
  {
    clientName: 'A national fast-food chain',
    category: 'Catering Playbook & National Rollout',
    summary: 'A drive-thru brand with hundreds of units and no catering program. We reviewed menu, packaging, technology and operations, then stress-tested three menu builds in a live location with real order volume. From there we wrote the full customer journey: order intake, lead times, contracts, delivery versus pickup, last-minute orders, plus third-party onboarding and platform integration for a system-wide rollout.',
    services: ['Catering Playbook', 'Menu Testing', 'Technology Integration', 'Operations & Training'],
    approved: true
  },
  {
    clientName: 'A national fresh-format restaurant group',
    category: 'Off-Premise Program Development',
    summary: 'A well-loved national brand with individual and catering orders growing faster than the system supporting them. Two days on site reviewed sales process, operations, delivery and guest services; from there we built the menu and packaging strategy, engineered pricing, designed the collateral, and stood up a centralized sales system with CRM, online ordering, house accounts and POS integration.',
    services: ['Off-Premise Strategy', 'Menu & Packaging', 'Centralized Sales', 'CRM & Technology'],
    approved: true
  },
  {
    clientName: 'A century-old fine-dining institution',
    category: 'Ecommerce & Off-Premise Revenue',
    summary: 'A 100-year-old brand facing nationwide closures, with a signature in-room experience that had never existed outside the dining room. We built the at-home program end to end with far-reaching marketing, flawless ordering, documented SOPs and a consistent guest experience. It returned 2x projections in the first month, introducing the brand to an entirely new demographic.',
    services: ['Ecommerce', 'Off-Premise Strategy', 'Marketing Program', 'SOPs & Training'],
    approved: true
  },
  {
    clientName: 'A 25-unit Mediterranean fast-casual brand',
    category: 'Franchise System Build',
    summary: 'With the FDD in legal review and a new production hub secured, the priority became documenting everything a franchisee would see, do, hear, taste and touch in a store. We captured the retail operating system end to end, then built the four systems franchisees run: operations and audit, training and certification, real estate and development standards, and a marketing system with seven playbooks.',
    services: ['Franchise Readiness', 'SOPs & Audit', 'Training & Certification', 'Brand Standards'],
    approved: true
  },
  {
    clientName: 'A multi-state restaurant and tequila group',
    category: 'Off-Premise Program Build',
    summary: 'A six-month build to stand up off-premise revenue across a multi-state group, with more than thirty days on site. Site visits determined catering capacity and hub strategy per store, competitive R&D shaped the menu, and we defined the internal catering lead role, then built centralized order intake, CRM and online ordering, house accounts, POS integration and store-level driver programs.',
    services: ['Off-Premise Strategy', 'Menu & Packaging', 'Centralized Sales', 'Technology'],
    approved: true
  },
  {
    clientName: 'A national frozen yogurt franchise',
    category: 'Catering Program Development',
    summary: 'A franchised system where every store needed to run catering itself. Rather than a corporate program, we built a playbook each location could execute: competitive menu analysis, packages and minimums, packaging through existing vendors, order flow and delivery SOPs, marketing templates, and a sales guide covering canvassing, lead generation and key accounts from schools to offices to weddings.',
    services: ['Catering Program', 'Franchise Playbook', 'Packaging', 'Sales Training'],
    approved: true
  },
  {
    clientName: 'A multi-unit modern Mexican brand',
    category: 'Catering Scale-Up & Third-Party Strategy',
    summary: 'Catering existed but had no system behind it. We reviewed capacity store by store, tested an expanded menu against competitors, then rebuilt the program company-wide: custom packaging, centralized order intake and guest communication, house accounts and POS integration, renegotiated third-party commissions, and a full-year marketing and content calendar.',
    services: ['Catering Program', 'Packaging', 'Third-Party Negotiation', 'Marketing Calendar'],
    approved: true
  },
  {
    clientName: 'A fast-casual pizza chain',
    category: 'Rebrand & Catering Growth',
    summary: 'A regional favorite that had outgrown its identity. We ran brand discovery and competitive analysis into a full standards guide, then used that foundation to rebuild catering: menu engineering, cost analysis, custom packaging, digital and print collateral. A three-day immersive across sales, operations and delivery surfaced the gaps, followed by sales training and a new website.',
    services: ['Brand Discovery', 'Catering Program', 'Sales Training', 'Web Design'],
    approved: true
  },
  {
    clientName: 'A multi-unit burger and sports concept',
    category: 'Catering Assessment & Team Development',
    summary: 'Five days and fifty-two hours embedded with the catering team, working alongside operations, leadership and guests. The assessment surfaced four areas of opportunity: team structure and communication, sales-driving tactics, tactical execution and marketing, with individual coaching plans, role recommendations and a prioritized action list built for throughput and sales, not just observation.',
    services: ['Operational Assessment', 'Team Development', 'Sales Coaching', 'Catering Growth'],
    approved: true
  },
  {
    clientName: 'A chef-driven pizza group',
    category: 'Organizational Design & Profitability',
    summary: 'An executive team aligned on ambition but short on structure. We organized the work under three pillars of people, quality and profits, writing job descriptions for every role, running bi-weekly manager development, restructuring pay and bonus programs, upgrading training materials, building a new-restaurant opening system, and driving commissary and supply chain efficiency.',
    services: ['Organizational Design', 'Leadership Development', 'Training Systems', 'Commissary & Supply Chain'],
    approved: true
  },
  {
    clientName: 'An eatertainment and venue group',
    category: 'Org Design & Event Sales',
    summary: 'Growth had outrun the org chart. A two-day GAP analysis mapped the distance between performance and potential across process, people, strategy, systems and structure, then we rebuilt the event sales function: roles and reporting lines, location-specific pay structures, hiring and onboarding, 30/60/90 success plans, and a new-location opening checklist.',
    services: ['Organizational Design', 'Event Sales', 'Hiring & Onboarding', 'New Openings'],
    approved: true
  },
  {
    clientName: 'A legacy pie and cafe institution',
    category: 'Menu Engineering & Recipe Documentation',
    summary: 'Thriving without formal systems, which is both a blessing and a risk. Recipes lived in the heads of long-tenured cooks, portions were large and expensive, and the menu had grown past 100 items. We protected what made the place special while capturing and costing every recipe, auditing POS against printed menus, engineering the menu by daypart, and planning the holiday production season.',
    services: ['Menu Engineering', 'Recipe Library & Costing', 'Holiday Production', 'Bar Program'],
    approved: true
  },
  {
    clientName: 'A multi-location ramen concept',
    category: 'Local Marketing & Catering',
    summary: 'A complete catering sales system built as a field playbook rather than a strategy deck. It defines the sales role and its KPIs, a lead classification and funnel model, ten outreach verticals from corporate to healthcare to education, canvassing and sampling protocols, a CRM follow-up cadence, and a weekly operating rhythm the coordinator can run without supervision.',
    services: ['Catering Program', 'Local Store Marketing', 'Sales Training', 'CRM & Follow-Up'],
    approved: true
  },
  {
    clientName: 'Two family-owned fast-casual brands',
    category: 'Brand Growth & Marketing Partnership',
    summary: 'Two sister brands under one family, competing for the same internal attention, with catering demand nobody was capturing and a digital presence trailing the food. A three-phase roadmap set strategy and a marketing calendar for each brand, then took on catering, loyalty and CRM, social, a refreshed identity, new website, SEO and food photography, then moving into ongoing execution with monthly reporting.',
    services: ['Brand Strategy', 'Catering', 'Loyalty & CRM', 'Web & SEO', 'Photography'],
    approved: true
  },
  {
    clientName: 'A regional burger concept',
    category: 'Catering Expansion Sprint',
    summary: 'A twelve-week sprint to turn occasional group orders into a real revenue line. Catering-friendly menu items and scalable branded packaging came first, then a built corporate outreach list with first-order incentives, seasonal social campaigns, local sponsorships and pop-ups, a post-order feedback and retention system, and automation to keep follow-up from depending on anyone remembering.',
    services: ['Catering Expansion', 'Corporate Outreach', 'Retention', 'Marketing Automation'],
    approved: true
  },
  {
    clientName: 'A single-unit specialty bakery',
    category: 'Franchise Viability & Development',
    summary: 'A single-product concept with a devoted following and a founder-driven story, weighing whether franchising was the right growth path at all. We ran a viability assessment across operational standardization, unit economics, proprietary process and expansion potential, then built the development strategy: entity structure, fee framework, territory model, quality control, and a phased roadmap with decision gates.',
    services: ['Viability Assessment', 'Franchise Structure', 'Territory Strategy', 'Roadmap'],
    approved: true
  },
  {
    clientName: 'A fresh pasta brand',
    category: 'Brand Identity & Revenue Streams',
    summary: 'Excellent product, no brand foundation. A two-day discovery set the vision, values, identity and messaging framework into a full standards guide, then used that foundation to build profitable revenue streams: a catering program with menu and collateral, sales procedures and scripts, technology selection, and packaging built for retail, catering, gifting and shipping alike.',
    services: ['Brand Guidelines', 'Catering Program', 'Packaging', 'Sales Systems'],
    approved: true
  },
  {
    clientName: 'A plant-based catering brand',
    category: 'Rebrand & Digital Foundation',
    summary: 'A rebrand and a revenue engine in one engagement. We rebuilt the brand from story and mission through voice, logo and a full brand book, developed the catering menu, designed and built the website with integrated catering and third-party ordering, ran the photo shoot, and set up the sales systems: templates, scripts, contact sheets and a growth plan.',
    services: ['Brand Book', 'Catering Menu', 'Web & Ordering', 'Sales Systems'],
    approved: true
  },
  {
    clientName: 'A wellness and beauty consumer brand',
    category: 'Brand Elevation & Ecommerce',
    summary: 'A consumer brand with two sub-brands, an inconsistent identity and a national trade show on the calendar. We audited brand and performance against direct competitors, refreshed identity across the family, rebuilt ecommerce on Shopify with SEO and Klaviyo automation for onboarding, cart recovery and win-back, then prepared the show presence to convert B2B relationships.',
    services: ['Brand Refresh', 'Shopify & SEO', 'Email Automation', 'Trade Show Strategy'],
    approved: true
  },
  {
    clientName: 'A multimedia production company',
    category: 'Business Foundation & New Ventures',
    summary: 'A production studio with real technical talent and no operating structure. We built the business plan on market analysis and measurable KPIs, mapped and streamlined internal workflow, then developed two growth ventures alongside the core business: a VR/AR streaming platform and a brick-and-mortar studio facility positioned as a hub for multimedia work.',
    services: ['Business Planning', 'Process Design', 'New Venture Development', 'Market Analysis'],
    approved: true
  },
  {
    clientName: 'A culinary technology startup',
    category: 'Feasibility & Route to Market',
    summary: 'A proprietary piece of cooking equipment in search of the right business model. We tested the technology and product quality, met manufacturers on cost, minimums and lead time, and spoke with equipment brokers and end users to size the market, then laid out four routes to revenue with competitive and SWOT analysis for each, so the owners could choose with evidence rather than instinct.',
    services: ['Feasibility Study', 'Concept Development', 'Market Analysis', 'Revenue Modeling'],
    approved: true
  }
];

// Only verified quotes from the current eustressanddemeter.com testimonials page.
// Attribution intentionally generic — add name/title once confirmed.
export const testimonials = [
  {
    quote: 'Working with Monica and Nanette at Eustress and Demeter has really transformed the way we think of off-premises sales at Lawry\u2019s Restaurants, because they bring both a comprehensive understanding of the emerging dining segment and the supporting technology, and they pair that with an in-depth operations skill set. They have quickly integrated into our culture and become a seamless extension of our team to grow our business.',
    attribution: 'Tiffany Stith, President & COO, Lawry\u2019s Restaurants',
    featured: true,
    verified: true
  },
  {
    quote: 'Working with Eustress and Demeter helped us organize our catering program to strategically target different markets. We redesigned our menu, then built marketing and outreach programs to capitalize on those markets. We have raised our catering sales 20%.',
    attribution: 'Catering client',
    verified: true
  },
  {
    quote: 'Monica was fantastic to work with. She was incredibly attentive to our detailed and nuanced processes, and devoted herself to finding thoughtful solutions to best maximize our incremental revenue programs.',
    attribution: 'Multi-unit operator',
    verified: true
  }
];
