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

## Design: Bold ("Spray Lab") is the master design (promoted 2026-07-12)

The site previously shipped a faithful white-canvas reproduction of the WordPress
theme as its master, with three alternative design explorations living side-by-side
under `variants/` (`premium`, `bold`, `editorial`). The owner reviewed all three and
picked **Bold** — a food-tech-startup-energy design ("Spray Lab": navy-dominant
canvas, lime/emerald gradient meshes, oversized display type, diagonal `clip-path`
section breaks, sticker/badge motifs, bento grids, a "spray in numbers" animated
counter strip, kinetic scroll reveals). Bold was promoted to become this root
project outright; `variants/bold/` no longer exists. `variants/premium/` and
`variants/editorial/` remain as historical alternatives, untouched.

At the same time as the promotion, **Arabic became the default locale**, served at
the site root with no prefix (previously root was English, and Arabic lived under
`/ar/...`). See "Arabic-default architecture & full URL map" below.

A full pre-promotion snapshot of the repo (old white-canvas master + all three
variants incl. `variants/bold/`, old EN-at-root/AR-under-`/ar/` URL scheme) is kept
on the **`pre-bold-promotion`** git branch — use it to recover old copy/design or to
diff against for content-drift checks.

### Design tokens & primitives (from the promoted Bold design, formerly `variants/bold/VARIANT.md`)

- **Navy-dominant canvas** — the brand's own ink navy `#092e52` (plus a deeper shade
  `#061e37`, token `--color-ink-deep`) is the stage; the signature green `#8dbf44`
  reads as electric on it (6.4:1 contrast, AA for normal text).
- **Lime→emerald gradient meshes** — layered radial gradients of brand-green shades
  over navy (`.mesh-navy`), with a faint lime dot-grid texture (`.dotgrid`).
- **Oversized display type** — IBM Plex Sans Arabic Bold pushed to
  `clamp(56px…124px)`, uppercase (Latin)/tight-leading (Arabic), via `.display`.
- **Diagonal section breaks** — `clip-path` wedges (`.diag-top/.diag-bottom/.diag-both`).
- **Sticker/badge motifs** — dashed-outline chips (`.sticker`) and solid green chips
  with a hard offset shadow (`.sticker-solid`), rotated a few degrees.
- **Asymmetric overlapping product renders** — rotated "polaroid" cards
  (`.render-card`) with deep drop shadows, gently floating (`.floaty`,
  transform-only, `prefers-reduced-motion`-aware).
- **"Spray in numbers" animated counter strip** — figures sourced from the site's
  own copy, animated via `IntersectionObserver`, honoring reduced-motion.
- **Bento grid** on the home page: product tiles + a benefit tile + a FAQ-teaser
  tile + a "Shop All" CTA tile, staggered offsets.
- **Kinetic scroll reveals** — `.reveal` elements fade/slide in on intersection.
- **Sticky Order Now CTA** — fixed pill on every page (external srkw.co shop link,
  per-locale URL), positioned with `inset-inline-end` (not physical `right`) so it
  sits correctly in both LTR and RTL.
- New color tokens in `src/styles/global.css` `@theme`: `--color-ink-deep #061e37`,
  `--color-lime #d7f5a2`, `--color-emerald #3f8f56`, `--color-brand-deep #567f2b`
  (AA 4.7:1 green for text on white). Original brand green/hover, navy, footer/FAQ/
  rule tokens (table below) are preserved unchanged.
- Primitives: `.display`, `.eyebrow`, `.mesh-navy`, `.mesh-green`, `.dotgrid`,
  `.diag-*`, `.btn-cta`, `.btn-ghost`, `.sticker`, `.sticker-solid`, `.tile`/
  `.tile-hover`, `.render-card`, `.floaty`, `.reveal` (+ delays), `.faq-item`, a
  global `:focus-visible` ring (green on light, lime on dark via `.on-dark`).

### RTL implementation notes

Every directional CSS/Tailwind rule uses **logical properties**, not physical
`left`/`right`: `inset-inline-start/end` (Tailwind `start-*`/`end-*`),
`margin-inline-start/end` (`ms-*`/`me-*`), `padding-inline-start/end` (`ps-*`/`pe-*`),
`text-align: start/end` (`text-start`/`text-end`), `border-inline-start/end`. This
makes the whole Bold design (bento grids, header/footer, sticky CTA, product-card
size stickers) mirror correctly under `dir="rtl"` with zero per-locale CSS
duplication. Two exceptions, both intentional:
- The `ProductCard` arrow-chip icon (points toward "more") swaps its SVG path and
  hover-translate direction based on the `lang` prop — a purely visual mirror that
  isn't expressible as a CSS logical property (it's a drawn arrow, not a layout rule).
- `.nav-link::after`'s underline `transform-origin` has no logical-property
  equivalent in stable CSS, so it uses one explicit `[dir='rtl']` override.

### Run

```bash
npm install
npm run dev       # localhost:4321
npm run build     # -> dist/  (must pass; last verified 2026-07-12, ~20 files: 9 EN + 9 AR real pages + 2 legacy redirect stubs)
npm run preview
```

### Base-path / deploy targets (`DEPLOY_TARGET`)

`astro.config.mjs` reads one env var, `DEPLOY_TARGET`, to pick the build target:

- **unset (default, production):** `site: 'https://foodhacks.co'`, `base: '/'`. Plain
  `npm run build` — this is what ships to foodhacks.co. **Never set `DEPLOY_TARGET` for a
  production build.**
- **`DEPLOY_TARGET=pages`:** `site: 'https://sanramonkw.github.io'`,
  `base: '/Foodhacks-Website/'` — used only for the GitHub Pages owner-review deploy (see
  DEPLOYMENT.md's "GitHub Pages review deploys" section; `npm run build:all` / `deploy:all`).

Every internal href/asset in `src/` goes through `withBase()` (`src/utils/paths.ts`), which
prefixes a root-relative path with `import.meta.env.BASE_URL` — this is what lets the same
components/pages serve correctly at the domain root (production) or under
`/Foodhacks-Website/` (Pages review), with no per-target branching in the components
themselves. `Header`/`Footer`/`BaseLayout`/`ProductCard` and every page under `src/pages/`
(both locales) call it for nav links, the logo, product images, favicon/sitemap links, OG
image URLs and the two legacy-URL redirect stubs. CSS-referenced fonts live in
`src/assets/fonts/` (not `public/fonts/`) so Vite bundles + base-prefixes them automatically
via `@font-face` `url()` — no `withBase()` needed there.

`variants/premium/` and `variants/editorial/` each have their own `astro.config.mjs` hardcoded
to the Pages site (they have no production deploy of their own), unaffected by
`DEPLOY_TARGET`.

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

## Arabic-default architecture & full URL map

Since the 2026-07-12 Bold promotion, **Arabic is the default locale, served at the
site root with no prefix**; English moved to `/en/`. This is a deliberate flip from
the pre-promotion scheme (English at root, Arabic under `/ar/...`) — see the
"301 redirects" section of DEPLOYMENT.md for the full old→new mapping needed at the
host level, and the `pre-bold-promotion` git branch for the old scheme's source.

### Full route list (18 real pages + 2 legacy-URL redirects)

| Arabic (default, root, dir=rtl) | Source | English counterpart (`/en/...`, dir=ltr) | Source |
|---|---|---|---|
| `/` | src/pages/index.astro | `/en/` | src/pages/en/index.astro |
| `/about-ar/` | src/pages/about-ar.astro | `/en/about/` | src/pages/en/about.astro |
| `/products-ar/` | src/pages/products-ar.astro | `/en/products/` | src/pages/en/products.astro |
| `/faqs-ar/` | src/pages/faqs-ar.astro | `/en/faqs/` | src/pages/en/faqs.astro |
| `/contact-ar/` | src/pages/contact-ar.astro (form UI-only) | `/en/contact/` | src/pages/en/contact.astro (form UI-only) |
| `/return-refund-policy-ar/` | src/pages/return-refund-policy-ar.astro | `/en/return-refund-policy/` | src/pages/en/return-refund-policy.astro |
| `/product/بخاخ-زعفران200-مل-طبيعي-100-فوود-هاكس/` | src/pages/product/[...slug].astro (filters `lang==='ar'`) | `/en/product/saffron-spray-200ml/` | src/pages/en/product/[...slug].astro (filters `lang==='en'`) |
| `/product/extra-virgin-olive-oil-spray-200ml-2/` | ″ | `/en/product/extra-virgin-olive-oil-spray-200ml/` | ″ |
| `/product/truffle-flavoured-extra-virgin-olive-oil-spray-125ml-2/` | ″ | `/en/product/truffle-flavoured-extra-virgin-olive-oil-spray-125ml/` | ″ |

Legacy-URL redirects (Astro `redirects` in `astro.config.mjs`, static meta-refresh
stubs — prefer real host-level 301s per DEPLOYMENT.md): `/ar` → `/`, `/ar/الرئيسية` → `/`.

Slugs are kept EXACTLY as the original live Polylang site (mixed Arabic +
`-ar`/`-2` suffixes; Arabic slugs are percent-encoded on the wire but written
decoded in file names/links — same URL either way). Live AR single-FAQ URLs
(`/ar/faq/<arabic-slug>/`) are folded into `/faqs-ar/`, mirroring the EN
`/faq/* → /en/faqs/` decision.

Nav carries the external **Order Now** link (per locale: EN
https://srkw.co/en/product-category/food-hacks/, AR `اطلب الان` →
https://srkw.co/product-category/فود-هاكس/, rendered as a sticky bottom pill on every
page via BaseLayout) plus a bidirectional language switcher in the Header (AR page →
its EN counterpart and vice versa, driven by `altHref`/`routes` in `src/i18n.ts`).
Orders happen on the srkw.co shop, this site has no cart.

**i18n architecture:** no Astro `i18n` config — plain file-based pages (AR at root,
EN under `src/pages/en/`) + a `lang` (`'en' | 'ar'`, default `en`) field on both
content collections, filtered per page. AR products pair with EN via a
`translationKey` frontmatter field (drives hreflang + the product-page switcher). AR
product/FAQ `.md` files sit next to the EN ones in the same collections (reused
unchanged from the pre-promotion AR mirror — no content was recreated or
retranslated during the Bold merge); product **file names are the live slugs** (the
AR saffron file name is its Arabic slug). `src/i18n.ts` also carries Bold-only UI
strings that didn't exist before this promotion (bento-grid labels, counter-strip
captions, cross-sell headings, etc.) — translated into Arabic as part of this
merge; see the `t.ar`/`t.en` records for the exact pairs (search for "Bold-variant-
only UI additions").

**Live-content quirks kept verbatim:** the 2nd/3rd AR product titles are English on
the live AR site too ("Extra Virgin Olive Oil Spray 200mL", "Truffle Flavoured …
125mL"); the AR policy list items have stray leading periods/word-joiners. One
deliberate improvement carried over from the original AR migration: live Polylang
left the **saffron** EN↔AR pair unlinked ("no-translation"); this rebuild links and
hreflang-pairs the real counterparts.

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
- `public/robots.txt` (points to `/sitemap-index.xml`), `@astrojs/sitemap` integration —
  regenerated automatically on every build from the current page set (18 URLs: 9 AR + 9 EN,
  no `/ar/` prefixes, no redirect stubs).
- `public/llms.txt` — brand/product/facts summary for generative engines, updated for the
  new URL structure (Arabic section uses root URLs, English section uses `/en/...`).
- **hreflang**: every page emits `ar` + `en` + `x-default` alternates in BaseLayout, both
  directions, **x-default now points at the Arabic URL** (flipped 2026-07-12 — Arabic is the
  default locale; previously x-default pointed at EN), plus `og:locale` (`ar_AR` on Arabic
  pages, `en_US` on `/en/...`) and `og:locale:alternate`. AR pages carry their own live Yoast
  titles/descriptions. The sitemap includes the AR product URL that needs percent-encoding.

## Known gaps / TODOs (priority order)

1. **Contact form backend** — WP used Contact Form 7 + reCAPTCHA v3. Wire the forms in
   `src/pages/en/contact.astro` and `src/pages/contact-ar.astro` to Formspree/Basin/serverless
   before launch (currently `action="#"`).
2. **Redirects** — see DEPLOYMENT.md's "301 redirects" section for the full old→new URL map
   (old EN-root pages → `/en/...`, old `/ar/...` pages → new AR-at-root) that must be added
   at the host level before launch, plus the pre-existing WP FAQ-URL redirects
   (`/faq/<slug>/` → `/en/faqs/`, `/ar/faq/<slug>/` → `/faqs-ar/`).
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
astro.config.mjs        # site: https://foodhacks.co, sitemap, tailwind vite plugin,
                         # redirects (/ar -> /, /ar/الرئيسية -> /)
src/content.config.ts   # products + faqs collections (zod; lang + translationKey fields)
src/content/            # 6 products (3 EN + 3 AR), 10 faqs (5 EN + 5 AR) (markdown) — reused
                         # verbatim across the Bold promotion, unchanged
src/i18n.ts             # EN/AR route pairs (AR at root, EN under /en/), nav (per-locale
                         # order), switcher, UI strings incl. Bold-only bento/counter copy
src/layouts/BaseLayout.astro   # Bold design (skip-link, sticky Order-Now CTA, reveal/counter
                         # script) + SEO head (lang/dir, hreflang w/ x-default->AR, og:locale)
                         # + JSON-LD graph builder
src/components/         # Header, Footer, PageHero, ProductCard — Bold-styled, lang-aware,
                         # RTL-safe via CSS logical properties
src/pages/              # index.astro (AR home, root), about-ar, products-ar, faqs-ar,
                         # contact-ar, return-refund-policy-ar, product/[...slug] (AR)
src/pages/en/           # index, about, products, faqs, contact, return-refund-policy,
                         # product/[...slug] (EN, all under /en/)
src/styles/global.css   # @theme tokens (incl. Bold's ink-deep/lime/emerald/brand-deep),
                         # @font-face (fonts in src/assets/fonts/, Vite-bundled + base-
                         # prefixed), Bold primitives (.display/.mesh-navy/.tile/.reveal/...),
                         # logical-property rules throughout (no left/right)
src/utils/paths.ts      # withBase() — prefixes root-relative hrefs/assets with BASE_URL
                         # (production base "/", GitHub Pages review base
                         # "/Foodhacks-Website/" — see DEPLOY_TARGET below)
public/                 # images/, favicon.png, robots.txt, llms.txt (URLs updated for the
                         # AR-at-root/EN-under-/en/ scheme), .nojekyll (lets GitHub Pages
                         # serve the _astro/ underscore-prefixed asset dir)
scripts/build-all.sh,    # one-command combined GitHub Pages review build/deploy (master +
scripts/publish-dist.sh # premium/editorial variants) — see DEPLOYMENT.md
source-assets/           # originals + MANIFEST.md + raw page snapshots + theme css
variants/premium/, variants/editorial/   # remaining alternative design explorations
                         # (variants/bold/ no longer exists — promoted to become this
                         # root project on 2026-07-12); each has its own astro.config.mjs
                         # hardcoded to the Pages site, unaffected by DEPLOY_TARGET
```

A full pre-promotion snapshot (old white-canvas master, old EN-root/AR-under-`/ar/`
URL scheme, and `variants/bold/` itself) is preserved on the **`pre-bold-promotion`**
git branch.
