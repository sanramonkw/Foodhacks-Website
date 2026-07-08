# foodhacks.co — Astro rebuild (migrated off WordPress)

## Purpose

Modern rebuild of the owner's site https://foodhacks.co, migrating it off WordPress 7.0
(custom theme `foodhacks-wp` by Surajit Kayal, Yoast SEO 27.2, Polylang EN/AR, Contact Form 7).
Food Hacks is a Kuwaiti brand of 100% natural non-stick cooking sprays, owned by **San Ramon**
(sister brands: Karak Tea, Honey Al-Shahd, Food Experts). It is a small brochure/product site —
**not a blog** — so there is no posts collection and no RSS feed (deliberate; see SEO section).

Snapshot date: 2026-07-02. Raw HTML + theme CSS snapshots live in `source-assets/pages/` and
`source-assets/css/style.css`.

> **Host quirk (important if re-scraping):** the WP shared host intermittently serves *sibling
> tenants'* content (marshmallows.co, karaktea.com) on foodhacks.co URLs. Always verify a fetched
> page/asset is the Food Hacks tenant (e.g. grep for "Food Hacks" in the title, `file`-check
> binaries) and retry if not. Note: the About page legitimately mentions "Karak Tea" as a sister
> brand — that one is not contamination.

## Stack & rationale

- **Astro 5** (static output) — zero-JS pages, fast, no WP/PHP/DB to maintain or patch.
- **Tailwind CSS 4** via `@tailwindcss/vite` — tokens in `src/styles/global.css` `@theme`.
- **@astrojs/sitemap** — auto sitemap at `/sitemap-index.xml` (robots.txt points at it).
- **Content Collections** (`src/content.config.ts`, zod-validated) for `products` and `faqs` —
  markdown-first: add a `.md` file to add a product page or FAQ entry. This replaces WP custom
  post types (`product-sitemap.xml`, `faq-sitemap.xml`).
- Interactive bits (mobile menu, FAQ accordion) use native `<details>` — no JS shipped at all
  (the WP site shipped jQuery, Bootstrap 3, slick, magnific, AOS, isotope...).

## Run

```bash
npm install
npm run dev       # localhost:4321
npm run build     # -> dist/  (must pass; last verified 2026-07-07, 18 pages: 9 EN + 9 AR, + /ar/ redirect)
npm run preview
```

## Local preview

This site's preview is pinned to **port 4322** (sibling site previews occupy 4321/4323/4324):

```bash
npx astro preview --port 4322 --host 127.0.0.1
```

The owner previews it through an SSH tunnel: `ssh cybertruck -L 4322:127.0.0.1:4322`, then
opens http://127.0.0.1:4322. **Never create public tunnels for previews**, and **never touch
the machine's `cybertruck` cloudflared tunnel** — it is a system service that carries the
owner's SSH access.

## Deployment

See **DEPLOYMENT.md** (read before DNS cutover): pure static `dist/` deploy, redirect rules
for old `/faq/<slug>/` URLs, contact-form/newsletter hookups, the shared-host tenant-bleed
retirement check, and the post-launch smoke test.

## Design tokens (extracted from the live theme CSS — keep these exact)

| Token | Value | Original source |
|---|---|---|
| Brand green | `#8dbf44` | `.txt-green`, `.bg-green`, `.btn-default`, `.section-page` bg, `.accordion` borders, `.panel-projects` cards |
| Card hover green | `#acd76e` | `.panel-projects:hover` |
| Ink navy | `#092e52` | `.section-bg1 .content h1/h2`, `.txt-blue3` (unused on rebuilt pages) |
| Headings | inherit body `#000` (theme has **no** heading color rule) | `body` |
| Footer light gray | `#f2f2f2` | footer `.bg-gray` (black text; footer link hover `#999`) |
| FAQ open panel | `#e6ffc2` | `.panel-faq` background |
| Rule gray | `#d9d9d9` | `hr` |
| Link hover | `#404040` (nav links `#787878`) | `a:hover` / `#header .navbar-nav a:hover` |
| Body font | IBM Plex Sans Arabic Regular (`FontBody`), 16px, p line-height 27px | self-hosted TTF |
| Heading font | IBM Plex Sans Arabic Bold (`FontHead`) — h1/h2 only | self-hosted TTF |
| Subhead font | IBM Plex Sans Arabic Medium (`FontHead2`) — h3–h6, buttons, nav | self-hosted TTF |
| Button | green, `border-radius: 12px`, `padding: 15px 30px`, 15px FontHead2, hover = gradient slide to black (`.btn-brand` in global.css); CF7 submit variant is full-width, 20px font, 20px padding | `.btn-default`, `.wpcf7-form input[type=submit]` |
| Card/section radius | `20px` + `margin: 20px` (green page heroes, footer); product cards `16px` with `5px` green padding | `.section-page`, `footer`, `.panel-projects` |
| Container | max-width 1180px | `.container` |

The WP head also loaded Google Fonts **Montserrat 400/700** but the theme CSS never used it
(dead weight from the base theme) — intentionally not carried over.

### Color/layout fidelity pass (2026-07-02)

Playwright 1440×900 computed-style + full-page screenshot comparison of live vs the rebuild
(home, products, product, FAQs, contact — every live fetch tenant-verified). Deviations found
and **corrected** (several first-draft tokens above had been wrong):

- **Footer** was dark `#2d2d2e`/white — live is light `#f2f2f2` with black text, 3/3/4/2
  columns, 16px FontHead2 widget h3 + 60×2px green line, 38px green circular social and
  phone/email icons (hover black/green), plain centered copyright (no top border).
- **Header** was translucent white + small shadow, 80px — live is solid white,
  `box-shadow: 0 0 14px rgba(0,0,0,.2)`, ~90px (logo 150px wide). Spacer div removed:
  content tucks behind the fixed header exactly like the theme (`.section-page` blocks start
  20px from document top; home hero `margin-top: 90px`).
- **Nav** was Regular with a green "active + button Order Now" — live is FontHead2 15px black,
  hover `#787878` + animated green underline; current page green **only off-home**; "Order
  Now" is a plain menu item, not a button. The live nav's language-switcher item (`العربية`
  on EN pages / `EN` on AR pages, last item) is implemented — it links each page to its
  counterpart in the other language.
- **Home hero** was a 20px-rounded, 20px-margined block — live `.section-bg1` is full-bleed,
  square, 500px (320px mobile).
- **Product cards** were white with gray border, 20px radius — live `.panel-projects` is a
  green `#8dbf44` panel, 16px radius, 5px padding, 12px-radius image, black 17px title,
  hover `#acd76e` + soft shadow.
- **Headings**: home "Food Hacks" is brand-green 44px (was 30px dark); "Our Vision" white
  44px on a 10/12-width green block; "Our Products" is a 36px FontHead2 h3; PageHero h1 is
  35px (was 48px) with `pt-140px` green banner; product hero has a white 100×2px line.
- **FAQ accordion** was peach-bordered cards — live is `.accordion` rows with a green
  bottom border, ➕/➖ markers, and an `#e6ffc2` 16px-radius open panel, in a 10/12 column.
- **Contact** hero subtitle is an h3 `span` pill with `rgba(0,0,0,.1)` bg (was white/20 p);
  form sits in the `.section-light` white card (16px radius, soft shadow) with
  **underline-style** CF7 fields (`border-bottom: 1px rgba(0,0,0,.4)`, focus `#bff2fa`) and a
  full-width 20px/20px Submit; phone/email got their fa icons back.
- **Removed** a rebuild-only "Order Now" button under the /products/ grid (not on live).
- Verified matching: green `.section-page` banners (20px radius/margin), `.btn-brand` slide
  hover, body font/size, all page text (headings, nav labels, product names — live shows no
  prices anywhere), footer copy.

Known intentional differences: product detail pages keep the composed description section
(live pages are title-banner-only — documented in Content notes); AOS scroll-fade animations
not replicated (content is simply always visible).

## Page inventory

### Rebuilt (English, all real copy verbatim)
| Route | Source | Notes |
|---|---|---|
| `/` | src/pages/index.astro | Hero banner, brand intro, Our Vision (verbatim incl. the source's garbled sentence — flag to owner), product grid |
| `/about/` | src/pages/about.astro | "About Food Hacks" + "Our Factory" (San Ramon). WP used CSS tabs; rebuilt as stacked sections |
| `/products/` | src/pages/products.astro | Grid from products collection + ItemList schema |
| `/product/[...slug]` | src/pages/product/[...slug].astro | 3 pages from `src/content/products/*.md` with Product JSON-LD |
| `/faqs/` | src/pages/faqs.astro | 5 Q&As from `src/content/faqs/*.md`, native `<details>` accordion + FAQPage JSON-LD |
| `/contact/` | src/pages/contact.astro | Phone/email + form UI (**no backend yet — see TODOs**) |
| `/return-refund-policy/` | src/pages/return-refund-policy.astro | Verbatim policy text |

Nav also carries the external **Order Now** link (per locale: EN
https://srkw.co/en/product-category/food-hacks/, AR `اطلب الان` →
https://srkw.co/product-category/فود-هاكس/) plus the language switcher as the last item.
Orders happen on the srkw.co shop, this site has no cart — that's why product pages on WP were
title-banners only; their WP `content.rendered` is empty, confirmed via REST API.

### Rebuilt (Arabic mirror, migrated 2026-07-07, all real copy verbatim from the live Polylang pages)

Slugs are kept EXACTLY as live (mixed Arabic + Polylang `-ar`/`-2` suffixes; Arabic slugs are
percent-encoded on the wire but written decoded in file names/links — same URL either way).
All AR pages render `<html lang="ar" dir="rtl">`; components take a `lang` prop (no duplicated
markup); shared strings/routes live in `src/i18n.ts`.

| Route (live slug, preserved) | Source | EN counterpart |
|---|---|---|
| `/ar/الرئيسية/` | src/pages/ar/الرئيسية.astro | `/` |
| `/ar/about-ar/` | src/pages/ar/about-ar.astro | `/about/` |
| `/ar/products-ar/` | src/pages/ar/products-ar.astro | `/products/` |
| `/ar/faqs-ar/` | src/pages/ar/faqs-ar.astro (5 AR Q&As from the faqs collection) | `/faqs/` |
| `/ar/contact-ar/` | src/pages/ar/contact-ar.astro (form UI-only, like EN) | `/contact/` |
| `/ar/return-refund-policy-ar/` | src/pages/ar/return-refund-policy-ar.astro | `/return-refund-policy/` |
| `/ar/product/بخاخ-زعفران200-مل-طبيعي-100-فوود-هاكس/` | ar/product/[...slug].astro | `/product/saffron-spray-200ml/` |
| `/ar/product/extra-virgin-olive-oil-spray-200ml-2/` | ar/product/[...slug].astro | `/product/extra-virgin-olive-oil-spray-200ml/` |
| `/ar/product/truffle-flavoured-extra-virgin-olive-oil-spray-125ml-2/` | ar/product/[...slug].astro | `/product/truffle-flavoured-extra-virgin-olive-oil-spray-125ml/` |

`/ar/` itself 301s to `/ar/الرئيسية/` on live WP; reproduced via `redirects` in
`astro.config.mjs` (static meta-refresh page — make it a real 301 on the host, see
DEPLOYMENT.md). Live AR single-FAQ URLs (`/ar/faq/<arabic-slug>/`) are folded into
`/ar/faqs-ar/`, mirroring the EN `/faq/* → /faqs/` decision.

**i18n architecture:** no Astro `i18n` config — plain file-based `/ar/` pages + a `lang`
(`'en' | 'ar'`, default `en`) field on both content collections, filtered per page. AR products
pair with EN via a `translationKey` frontmatter field (drives hreflang + the product-page
switcher). AR product/FAQ `.md` files sit next to the EN ones in the same collections; product
**file names are the live slugs** (the AR saffron file name is its Arabic slug).

**Live-content quirks kept verbatim:** the 2nd/3rd AR product titles are English on the live
AR site too ("Extra Virgin Olive Oil Spray 200mL", "Truffle Flavoured … 125mL"); the AR policy
list items have stray leading periods/word-joiners. One deliberate improvement: live Polylang
left the **saffron** EN↔AR pair unlinked ("no-translation" — its switcher/hreflang fell back to
the AR home); the rebuild links and hreflang-pairs the real counterparts.

### Other WP sitemap items
- WP `footer-sitemap.xml` items (footer-logo/subscribe/contact/social widgets, EN+AR) — content
  already folded into `Footer.astro` (per-locale strings); nothing else to migrate there.

## Content notes

- Product `.md` body text: the live product pages have **no** description copy (verified empty in
  WP REST API too), so the one-line bodies were composed from the site's own homepage copy
  ("Premium Saffron Spray", "100% natural ingredients", etc.). Owner may want to expand these.
- All other copy (about, vision, FAQs, policy, footer) is verbatim from the live site, including
  the typo-laden "Our Vision" paragraph and the double period in the refund policy — kept
  deliberately; ask owner before fixing.
- Contact email `info@foodhacks.co` was Cloudflare-obfuscated on the live site; decoded from the
  `data-cfemail` attribute.

## Assets

See `source-assets/MANIFEST.md` for every file's original URL. Everything the pages need is
copied into `public/images/`, `public/fonts/`, `public/favicon.png` (original filenames kept,
including the odd `_20` URL-encoding artifacts like `Banner_20Home_20Page.png`).

## SEO / GEO implemented

- Per-page `<title>`/description, canonical, OpenGraph + Twitter cards (BaseLayout props).
- JSON-LD graph on every page: `Organization` (with sameAs socials, contactPoint, San Ramon
  parentOrganization) + `WebSite`; page-level additions: `Product` (+Offer) on product pages,
  `FAQPage` on /faqs/, `ItemList` on /products/, `AboutPage`, `ContactPage`.
- **No Recipe/Article schema and no RSS** — evaluated and inapplicable: the site has no recipes
  or articles/posts. If the owner adds a recipes/blog section later, add `@astrojs/rss` + an
  `articles` collection with Article/Recipe schema then.
- `public/robots.txt` (points to `/sitemap-index.xml`), `@astrojs/sitemap` integration.
- `public/llms.txt` — brand/product/facts summary for generative engines (incl. an AR section).
- **hreflang**: every page emits `en` + `ar` + `x-default` (x-default → the EN page) alternates
  in BaseLayout, both directions, plus `og:locale` (`ar_AR` on /ar/) and `og:locale:alternate` —
  matching the live Yoast/Polylang heads (which emitted en+ar; x-default is an addition).
  AR pages carry their own live Yoast titles/descriptions. The sitemap includes all AR URLs
  (percent-encoded).

## Known gaps / TODOs (priority order)

1. **Contact form backend** — WP used Contact Form 7 + reCAPTCHA v3. Wire the form in
   `contact.astro` to Formspree/Basin/serverless before launch (currently `action="#"`).
2. **Redirects** — WP FAQ URLs that changed shape should 301: `/faq/<slug>/` → `/faqs/` and
   `/ar/faq/<slug>/` → `/ar/faqs-ar/`; `/ar/` → `/ar/الرئيسية/` should be a real 301 on the
   host (the build only emits a meta-refresh page). Product URLs kept their live shapes.
3. Product body copy expansion (owner input) + real product photos beyond the 3 renders.
4. Newsletter — footer promises one; hook up a provider (Mailchimp/Buttondown) or remove the blurb.
5. Meta Pixel/analytics: the WP site had none on foodhacks.co pages themselves; ask owner if
   analytics (e.g. Plausible) is wanted.
6. Favicon: currently the original PNG; consider adding ICO/apple-touch sizes.

## Phase-two ideas

- **Full WP content migration script**: `GET https://foodhacks.co/wp-json/wp/v2/{pages,product,faq}?per_page=100&lang=ar`
  → markdown via turndown; the REST API is open (verified). Remember the flaky-tenant retry guard.
- **CMS options** if the owner wants a UI: Keystatic or Decap (git-based, free) fit this repo
  layout as-is; Sanity/Contentful overkill for 8 pages.
- **Newsletter** integration (see TODO 5).
- **web3**: evaluated and unnecessary here — no use case for a brochure/product site.

## Repo map

```
astro.config.mjs        # site: https://foodhacks.co, sitemap, tailwind vite plugin
src/content.config.ts   # products + faqs collections (zod; lang + translationKey fields)
src/content/            # 6 products (3 EN + 3 AR), 10 faqs (5 EN + 5 AR) (markdown)
src/i18n.ts             # EN/AR route pairs, nav (per-locale order), switcher, UI strings
src/layouts/BaseLayout.astro   # SEO head (lang/dir, hreflang, og:locale) + JSON-LD graph builder
src/components/         # Header, Footer, PageHero, ProductCard (lang-aware)
src/pages/              # index, about, products, product/[...slug], faqs, contact, return-refund-policy
src/pages/ar/           # الرئيسية, about-ar, products-ar, faqs-ar, contact-ar, return-refund-policy-ar, product/[...slug]
src/styles/global.css   # @theme tokens, @font-face, .btn-brand
public/                 # images/, fonts/, favicon.png, robots.txt, llms.txt
source-assets/          # originals + MANIFEST.md + raw page snapshots + theme css
```
