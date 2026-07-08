# Food Hacks — BOLD INNOVATION variant ("Spray Lab")

Design variant of the master rebuild at `../../foodhacks.co/` (do not modify the master).
Same content, assets, URLs, collections, SEO head/JSON-LD, and functionality — a completely
different design language: **food-tech startup energy**.

## Concept

The master is a faithful, white-canvas reproduction of the WordPress theme. This variant
re-expresses the same brand as a 2025-26 food-tech launch site:

- **Navy-dominant canvas** — the brand's own ink navy `#092e52` (plus a deeper shade
  `#061e37`) becomes the stage; the signature green `#8dbf44` reads as electric on it
  (6.4:1 contrast, AA for normal text).
- **Lime→emerald gradient meshes** — layered radial gradients of brand-green shades over
  navy (`.mesh-navy`), with a faint lime dot-grid texture (`.dotgrid`).
- **Oversized display type** — IBM Plex Sans Arabic Bold pushed to `clamp(56px…124px)`,
  uppercase, tight leading (`.display`). Hero moment: "FOOD HACKS — 100% NATURAL. ZERO GUILT."
- **Diagonal section breaks** — `clip-path` wedges (`.diag-top/.diag-bottom/.diag-both`)
  between navy fields, green bands, and white sections.
- **Sticker/badge motifs** — dashed-outline chips (`.sticker`) and solid green chips with a
  hard offset shadow (`.sticker-solid`) rotated a few degrees ("100% NATURAL", "LESS FAT",
  size badges).
- **Asymmetric overlapping product renders** — the studio renders as rotated "polaroid"
  cards (`.render-card`) with deep drop shadows, gently floating (`.floaty`, transform-only,
  reduced-motion aware).
- **"Spray in numbers" animated counter strip** — 100% natural ingredients / 3 signature
  sprays / 24h delivery / 0 artificial preservatives — every figure sourced from the site's
  own copy (homepage, FAQs). Counters animate via IntersectionObserver.
- **Bento grid** on the home page: 3 product tiles + a benefit tile + a FAQ-teaser tile
  (real questions from the collection) + a "Shop All" CTA tile, with staggered offsets.
- **Kinetic scroll reveals** — `.reveal` elements fade/slide in on intersection.
- **Bold sticky Order Now CTA** — fixed bottom-right pill on every page (external srkw.co
  shop link, same as the nav item).

## What stayed identical (hard constraints)

- All 9 pages, same routes, same copy verbatim (including the garbled "Our Vision"
  paragraph and the policy double period), same images/fonts (no new assets, no CDNs).
- `BaseLayout.astro` head: title/description/canonical/OG/Twitter + the full JSON-LD graph
  (Organization, WebSite, Product+Offer, FAQPage, ItemList, AboutPage, ContactPage),
  sitemap integration, robots.txt, llms.txt.
- Content collections (`products`, `faqs`) and `content.config.ts` untouched.
- Nav labels/links, external Order Now URL, FAQ `<details>` accordion, contact form UI
  (still `action="#"` — backend TODO carried over), footer widget copy and socials.
- IBM Plex Sans Arabic (4 self-hosted cuts). The optional "+1 added face" was not used —
  no suitable self-hosted woff2 display font was available and CDNs are forbidden; the
  display voice comes from Plex Bold at scale instead.

## Token & component changes

`src/styles/global.css`:
- New tokens: `--color-ink-deep #061e37`, `--color-lime #d7f5a2` (light green shade for
  accents on navy), `--color-emerald #3f8f56` (gradient partner), `--color-brand-deep
  #567f2b` (AA 4.7:1 green for text on white). Brand green/hover, navy, footer/FAQ/rule
  tokens preserved.
- New primitives: `.display`, `.eyebrow`, `.mesh-navy`, `.mesh-green`, `.dotgrid`,
  `.diag-*`, `.btn-cta`, `.btn-ghost`, `.sticker`, `.sticker-solid`, `.tile`/`.tile-hover`,
  `.render-card`, `.floaty`, `.reveal` (+ delays), bold `.faq-item` restyle, global
  `:focus-visible` ring (green on light, lime on dark via `.on-dark`).

Components: Header (fixed navy bar, logo on a white sticker chip — the logo art is
green+black and needs a light surface; Order Now as solid CTA; restyled `<details>` mobile
menu), Footer (navy mesh, diagonal top, lime headings), PageHero (mesh hero + giant h1 +
sticker subtitle), ProductCard (navy bento tile, size sticker, arrow chip).

JS (single tiny inline script in BaseLayout): `IntersectionObserver` for reveals and
counters, transform/opacity only, no-JS fallback (`html.js` gate keeps content visible
without JS), `prefers-reduced-motion` fully honored (no reveals, no float, counters render
final values).

Additions beyond the master (allowed, additive): home FAQ-teaser/benefit/Shop-All bento
tiles, "More flavours" cross-sell on product pages (from the products collection), FAQ page
"Contact Us" CTA, skip-to-content link, sticky Order Now pill.

## Jury critique (self-run) → refinements

1. **Reveal dead zones**: IO threshold 0.25 left mid-page sections invisible after jump
   scrolls → threshold 0.12 + generous rootMargin.
2. **Invalid `<dl>` order** (dd before dt) in the counter strip → plain stat blocks.
3. **WCAG AA fail**: 12px navy labels on the emerald end of the green band (3.5:1) →
   `.mesh-green` lightened to brand-hover→brand (≥4.5:1 for ink text across the run).
4. **Invalid HTML**: `h3` inside `span` in ProductCard → `div`.
5. **Specificity conflict**: unlayered `.reveal.is-in { transform:none }` killed
   transform-based hover lifts → `reveal` moved to wrapper divs (FAQ rows, Shop-All tile).
6. **Utility override bug**: unlayered `.sticker-solid { display:inline-flex }` beat the
   layered Tailwind `hidden` utility, so the Vision chip showed on mobile → wrapped in a
   `hidden md:block` positioning span.
7. **Product page too thin** (hero-only) → "More flavours" cross-sell strip.
8. **Mobile hero overflow**: render cluster clipped into the diagonal → container height bump.

Verified after fixes: one `h1` per page (all 9), every `img` has `alt`, JSON-LD present,
`npm run build` green (9 pages), desktop 1440×900 + mobile 390×844 screenshots of home,
products, and a product page.

## Run

```bash
npm install
npm run build          # must produce 9 pages
npx astro preview --port 4335 --host 127.0.0.1   # this variant's pinned port
```

Do not use ports 4321-4324 (master + sibling sites).
