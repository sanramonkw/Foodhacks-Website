# Food Hacks — PREMIUM variant ("The Fine Foods House")

Luxury re-expression of foodhacks.co. Master (untouched):
`/home/diywan/projects/informative-websites-clone/foodhacks.co/` — read its CLAUDE.md first.
This folder is a full rsync copy of the master with only the design layer rewritten.

## Concept

A "gourmet pantry / fine-foods house": the brand navy `#092e52` becomes a deep atmospheric
field (radial green glow + faint dot grain), the brand green `#8dbf44` is used sparingly as
the jewel accent (hairlines, eyebrows, one CTA), and warm cream/linen paper carries the
reading sections. The three sprays are staged like premium olive-oil bottles — ivory plinth
cards with elliptical floor shadows, hover lift + green keyline reveal — and the range render
sits in an arched "portrait" frame in a full-viewport hero. Fraunces (variable optical serif)
supplies the display moments; IBM Plex Sans Arabic remains the working voice. Motion is quiet:
IntersectionObserver scroll-reveals (opacity/translate only), a 7s levitation on the hero
bottle, all disabled under `prefers-reduced-motion`.

## Hard-constraint compliance (vs master)

- **Content**: all copy verbatim (incl. the garbled "Our Vision" sentence and policy double
  period). Hero eyebrow "Innovative non-stick cooking sprays" is the master hero's own
  aria-label phrase, not new copy. Same assets, same URLs, same content collections.
- **SEO**: BaseLayout head untouched — titles/descriptions/canonicals/OG/Twitter/JSON-LD graph
  (Organization+WebSite, Product+Offer, FAQPage, ItemList, AboutPage, ContactPage), sitemap,
  robots.txt, llms.txt all identical.
- **Functionality**: same nav (+ external srkw.co Order Now), native `<details>` FAQ accordion
  and mobile menu, contact form UI unchanged (still `action="#"` TODO like master).
- **Brand colors preserved**: green stays the signature (CTA, hairlines, icons, accents);
  `#e6ffc2` kept for FAQ open panels; `#f2f2f2` kept as a token; navy/cream are complementary
  shades of the existing ink token.
- **Fonts**: IBM Plex Sans Arabic (same 4 self-hosted cuts) + ONE added self-hosted face:
  `public/fonts/Fraunces-Variable.woff2` (66 KB, weights 300–700, no CDN).
- **Accessibility**: one h1/page (home's "Food Hacks" promoted h2→h1 — master's home had no
  h1), `:focus-visible` green outline everywhere, sr-only labels on form fields,
  `aria-current` nav, decorative images `aria-hidden`/empty alt. Contrast verified:
  cream on navy 12.6:1, green on navy 6.3:1, `--color-brand-deep #4c6b1d` on cream 5.6:1,
  ink-deep on green button 7.8:1 (green buttons use dark text — white-on-green fails AA).
- **Performance**: static Astro, one ~15-line inline reveal script (no framework JS), lazy
  images below the fold, `fetchpriority=high` on hero/product renders, transform/opacity
  motion only.

## Tokens & components (src/styles/global.css)

- New tokens: `--color-ink-deep #061f3a`, `--color-ink-soft #0f3a63`,
  `--color-brand-deep #4c6b1d`, `--color-cream #f8f5ee`, `--color-linen #efe8da`,
  `--color-ivory #fbfaf5`, `--font-display` (Fraunces).
- House utilities: `.atmosphere` (+`.atmosphere-texture`), `.glass-panel` (backdrop-blur spec
  panel), `.plinth-card` + `.plinth-img` + `.floor-shadow` + `.card-reveal` (product staging),
  `.btn-lux` (green jewel CTA, dark text), `.btn-ghost` (hairline button for navy),
  `.eyebrow`, `.hairline`/`.hairline-left`, `.reveal`/`.levitate` motion, refined
  `.faq-item` ledger accordion and `.field-line` form fields.
- Components redesigned: Header (navy glass bar, logo on ivory label plate, Order Now as the
  single green CTA), Footer (navy atmosphere close, serif column titles, verbatim content),
  PageHero (navy band, serif h1, green hairline, eyebrow subtitle), ProductCard (ivory plinth).
- Page layouts: index (full-viewport hero + arch portrait + banner-image interlude + linen
  Vision + navy product gallery), product/[slug] (immersive navy "atelier": plinth left,
  glass panel right), about (cream/linen alternation, sticky plinth image), products, faqs,
  contact (navy info card + ivory form card), return-refund-policy.

## Jury critique → refinements applied

1. `.font-display` utility was losing to unlayered element rules (serif titles silently
   rendering sans in footer/cards) → base styles moved into `@layer base` + explicit
   `.font-display` rule.
2. Footer `mt-24` produced a stray cream band between navy sections and the navy footer →
   removed; sections own their spacing.
3. Duplicate size eyebrow on product detail (hero + glass panel) → panel copy removed.
4. Visible seam where the renders' studio background met the ivory plinth →
   `mix-blend-multiply` on product/about renders blends them into the card.
5. Contrast audit: white-on-green button of the master fails AA → all green CTAs use
   ink-deep text (7.8:1); green text on light uses `--color-brand-deep` (5.6:1).

Verified after fixes with Playwright screenshots, desktop 1440×900 + mobile 390×844:
home, products, product detail, about, faqs (open panel), contact.

## Run

```bash
npm install
npm run build                                   # 9 pages, passes (last verified 2026-07-06)
npx astro preview --port 4334 --host 127.0.0.1  # THIS variant's pinned port
```

Do not use ports 4321–4324 (master + sibling sites).
