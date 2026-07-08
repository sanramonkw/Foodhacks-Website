# Food Hacks — EDITORIAL MINIMAL variant

A magazine-inspired re-expression of foodhacks.co. Master (untouched):
`/home/diywan/projects/informative-websites-clone/foodhacks.co/` — read its CLAUDE.md for brand,
content and SEO context. This variant keeps every constraint of the master (content verbatim,
same URLs/assets/collections/SEO head/JSON-LD/sitemap/robots/llms.txt, zero JS, srkw.co order
links) and swaps only the design language.

## Concept — "a modern food journal"

The site is set like a small cookbook/food magazine: a calm warm-paper field, huge quiet
Fraunces serif headlines, hairline rules, numbered chapters, small-caps kicker labels,
photography matted on warm-oat plates, and a colophon-style footer. Brand green `#8dbf44`
is the single unmistakable signature — used only for oversized chapter numerals, hairline
accent rules, link underlines and list markers. Ink navy `#092e52` survives as the
`::selection` color.

Chapter system (used on page openers, homepage sections and product kickers):

- **01 — The Idea** → About us (and homepage intro)
- **02 — The Sprays** → Our Products + product pages (specimens "No. 01–03")
- **03 — Questions** → FAQs (set as a Q&A advice column: Q01…Q05)
- **04 — Get in Touch** → Contact
- **Appendix** → Return & Refund Policy

## Tokens (`src/styles/global.css` @theme)

| Token | Value | Role |
|---|---|---|
| `--color-brand` | `#8dbf44` | exact brand green — rules, folio numerals, markers, hovers |
| `--color-brand-deep` | `#56761f` | AA-safe (≈5:1) green for small text: links, kicker numerals |
| `--color-navy` | `#092e52` | exact brand navy — text selection |
| `--color-paper` | `#faf8f2` | page field |
| `--color-oat` | `#f3efe5` | photo plates, form plate, footer |
| `--color-ink` | `#1b1b16` | near-black text |
| `--color-stone` | `#63625a` | captions/kickers (≈6:1) |
| `--color-hairline` | `#e0dbcd` | hairline rules |
| `--font-serif` | Fraunces (variable, opsz 9–144) | the ONE added editorial serif, self-hosted woff2 (roman + italic of the same family, `public/fonts/Fraunces-*.woff2`, preloaded) |
| `--font-body` / `--font-head2` | IBM Plex Sans Arabic (same self-hosted TTFs as master) | body, kickers, nav, buttons |

## Components / primitives

- `.kicker` — 11px letterspaced small-caps label with green `.num`
- `.folio-num` — oversized decorative Fraunces numeral in pure brand green (opsz 144)
- `.rule` / `.rule-green` — hairline dividers
- `.link-ink` (green-underlined running link), `.link-action` (small-caps + arrow action link),
  `.btn-ink` (solid ink submit, green on hover)
- `Header.astro` — static journal masthead: small logo, letterspaced text nav (labels verbatim,
  Order Now keeps its ↗), zero-JS `<details>` mobile menu
- `PageHero.astro` — chapter opener: kicker, huge serif h1, italic deck, right-aligned giant
  green numeral, hairline rules (replaces the green banner)
- `ProductCard.astro` — "tasting specimen": ink top rule + "No. 0X" kicker, render matted with a
  hairline frame on an oat plate (`mix-blend-multiply` melts the studio background into the
  paper), serif title, size caption; hover = plate tint + reveal "View →" + gentle scale
  (motion-reduce safe)
- `Footer.astro` — colophon: hairline top rule, small-caps headings with short green rules,
  socials/phone/email as quiet text links, imprint line ("Kuwait — 100% Natural", aria-hidden)
- FAQ = Q&A column (`.faq-item`): Q01–Q05 numerals, serif questions, +/− marker, answers offset
  behind a green hairline; still native `<details>`
- Contact form keeps CF7 field names/`action="#"` but gains visible small-caps `<label>`s and
  autocomplete attributes (a11y upgrade over placeholder-only)
- `BaseLayout.astro` — SEO head/JSON-LD untouched; added Fraunces preload + skip-to-content link

## Layout notes

- Asymmetric editorial grids (12-col), staggered product columns on lg (`mt-16`/`mt-32` offsets)
- Homepage = cover (kicker, giant "Food Hacks", framed banner photograph) → 01 The Idea
  (intro + matted range photo with caption) → Our Vision as a serif pull-quote spread →
  02 The Sprays tasting grid
- All copy verbatim, including the garbled "Our Vision" sentence and the policy double period
  (deliberate, see master CLAUDE.md); the About page's four numbered aspects are set as
  recipe-card steps on hairlines (same text)

## Jury pass (self-critique) → refinements applied

1. **Craft**: product renders' white/grey studio backgrounds sat as raw boxes inside the oat
   plates → `mix-blend-multiply` + hairline photo frames; now they read as matted photographs.
2. **Non-text contrast**: form-field hairlines were `#e0dbcd` (<3:1) → default underline
   darkened to `#8a877c` (≥3:1), hover ink, focus brand-deep with 2px baseline.
3. **A11y**: mobile menu summary had an `aria-label` ("Open menu") mismatching its visible text
   ("Menu") → label removed; visible text is the accessible name. Skip link, `:focus-visible`
   outlines, `aria-current`, one h1/page, figure captions throughout.
4. **Responsiveness**: 7 letterspaced nav items could overflow ~1024px → nav wraps
   (`flex-wrap justify-end`). Staggering and folio numerals disabled on small screens.
5. **Balance**: product-detail text column floated high against the tall plate → `md:self-center`.
6. **Color discipline**: pure `#8dbf44` fails AA as text on paper (≈2:1) → introduced
   `--color-brand-deep #56761f` for any green that carries small text; pure brand green kept for
   large decorative numerals and rules only.

## Run

```bash
cd /home/diywan/projects/informative-websites-clone/variants/foodhacks-editorial
npm install
npm run build                                   # 9 pages, verified passing
npx astro preview --port 4336 --host 127.0.0.1  # this variant's pinned port
```

Port 4336 belongs to this variant (master preview is 4322; do not touch other ports).
