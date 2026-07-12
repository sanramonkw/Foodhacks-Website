# Deploying foodhacks.co

Read this before the DNS cutover. The site is a **pure static build** — `dist/` is plain
HTML/CSS/images and can be served by any static host or web server. There is no server
runtime, no database, and no admin panel (content lives in this repo, see CLAUDE.md).

## Build

- **Node 20+** (Astro 5 requirement).
- ```bash
  npm ci
  npm run build   # -> dist/ ; expect ~20 files in dist/ (18 real pages: 9 AR + 9 EN)
                  # + 2 legacy-URL redirect stubs (/ar/, /ar/الرئيسية/) + sitemap-index.xml
  ```
- **No environment variables** are needed (no secrets, no API keys).
- The canonical origin is hardcoded as `site: 'https://foodhacks.co'` in `astro.config.mjs`
  (drives canonicals, og:url, sitemap and JSON-LD URLs). Deploy previews will carry
  production canonicals — fine for previews, but don't index them.

## Deploy targets

Anything that serves static files works:

- **Cloudflare Pages / Netlify / Vercel (static)** — build command `npm run build`,
  output dir `dist/`. Recommended: gives you HTTPS, HTTP/2 and redirect support out of the box.
- **GitHub Pages** — works; put redirects on the host in front if you need real 301s.
- **Plain nginx/Apache** — copy `dist/` to the docroot.

### Trailing slashes

`trailingSlash` is **not** configured (Astro default `"ignore"`), and the build emits
directory-style URLs (`/about/index.html`). All internal links use trailing slashes
(`/about/`, `/product/<slug>/`), matching the old WordPress URLs. Any host that serves
`index.html` per directory is fine; don't enable a "strip trailing slash" rewrite,
or you'll bounce every page through a redirect.

## Forms, captcha & email (SMTP) — read before launch

**Current state — do NOT launch with the forms as-is:** the contact forms
(`src/pages/en/contact.astro` and the Arabic `src/pages/contact-ar.astro`) are
UI-only (`action="#"`); submitting does NOTHING, so inquiries would be
silently lost. The WordPress site used Contact
Form 7 + reCAPTCHA v3; neither survived the migration (the reCAPTCHA keys live
in the owner's Google account and were not ported). Do not re-add Google
reCAPTCHA — the agreed replacement is **Cloudflare Turnstile**.

**The relay Worker is already built** at `../form-relay-worker/` — follow its
README (developer runbook: deploy commands, secret injection, and the full
per-site form-wiring guide).

**Agreed plan (2026-07-03; owner decisions tracked in
`../progress/QUESTIONS.md`):** one shared **Cloudflare Worker form relay** for
all four sites + Turnstile.

> **Owner confirmed (2026-07-05): Turnstile is already in use in their
> Cloudflare account.** Get the site + secret key from the owner's existing
> setup (verify the widget's hostname list covers all four domains —
> karaktea.com, foodhacks.co, sanramonkw.com, marshmallows.co — or have them
> add a widget for these domains). Do not introduce any other captcha.

To enable — REQUIRED before launch:

1. **Turnstile keys** from the owner's Cloudflare dashboard (one widget
   covering all four domains). Site key → baked into the form markup at build;
   secret key → ONLY the Worker env, never this repo.
2. **Deploy the form relay Worker** and set the form `action` to its endpoint.
   If the relay is not ready by launch day, at minimum convert this form to
   the mailto fallback the sibling sites use, so submissions aren't lost.
3. **SMTP / email delivery settings** live in the Worker env, not here
   (Resend/MailChannels API key, or SMTP host + user + password). Destination
   inbox: **info@foodhacks.co** (the address shown on the contact page).
4. **Test end-to-end:** a real submission arrives, Turnstile verifies, and a
   bot-style instant submission (honeypot) is rejected.

**Newsletter:** the footer's "join our newsletter" blurb is text-only — the
live WP site never collected emails either, so this is a NEW feature awaiting
an owner decision on a provider (Brevo/Buttondown/Mailchimp — see
QUESTIONS.md). Don't block launch on it; wire it only when the owner picks a
provider, or remove the blurb.

## Pre-launch checklist

1. **DNS cutover + tenant-bleed warning.** The old WordPress shared host intermittently
   served *other tenants'* sites (marshmallows.co, karaktea.com) on foodhacks.co URLs.
   After cutover, verify the old origin is **fully retired** (or at least detached from the
   domain) so no cached/alternate path can serve another tenant's content on this domain.
   Purge any CDN/proxy cache after the switch, then spot-check that every page `<title>`
   contains "Food Hacks".
2. **301 redirects — full map, required at the host level.** The 2026-07-12 Bold
   promotion made Arabic the default locale at the root and moved English under
   `/en/`. Any inbound links/bookmarks/search results pointing at the **old**
   (pre-promotion) URL shapes must 301 to the **new** shapes below. Astro's static
   `redirects` config only covers the two AR-home legacy slugs (it emits
   meta-refresh stub pages at build time — turn those into real 301s too, don't
   rely on the meta-refresh); every other mapping below must be added as a
   host-level redirect rule (Cloudflare Pages/Netlify `_redirects`, nginx
   `rewrite`, etc.), since the old routes no longer exist as Astro pages at all.

   **Old EN root → new `/en/...`:**
   ```
   /                                              /en/                                            301
   /about/                                        /en/about/                                      301
   /products/                                     /en/products/                                    301
   /faqs/                                         /en/faqs/                                        301
   /contact/                                      /en/contact/                                     301
   /return-refund-policy/                         /en/return-refund-policy/                        301
   /product/saffron-spray-200ml/                  /en/product/saffron-spray-200ml/                 301
   /product/extra-virgin-olive-oil-spray-200ml/   /en/product/extra-virgin-olive-oil-spray-200ml/  301
   /product/truffle-flavoured-extra-virgin-olive-oil-spray-125ml/  /en/product/truffle-flavoured-extra-virgin-olive-oil-spray-125ml/  301
   ```
   > **Caution:** `/` → `/en/` would make English the default for anyone hitting
   > the bare domain with no locale preference, which **contradicts the
   > Arabic-default goal** — do NOT add a host-level redirect for `/` itself.
   > `/` must keep serving the Arabic homepage directly (it's now an Astro page,
   > not a redirect). Only add the more-specific old-EN-page redirects above
   > (`/about/`, `/products/`, etc.), which don't collide with `/`.

   **Old `/ar/...` (Polylang prefix) → new AR-at-root:**
   ```
   /ar/                                            /                                                301
   /ar/الرئيسية/                                   /                                                301
   /ar/about-ar/                                   /about-ar/                                       301
   /ar/products-ar/                                /products-ar/                                    301
   /ar/faqs-ar/                                    /faqs-ar/                                         301
   /ar/contact-ar/                                 /contact-ar/                                      301
   /ar/return-refund-policy-ar/                    /return-refund-policy-ar/                         301
   /ar/product/بخاخ-زعفران200-مل-طبيعي-100-فوود-هاكس/           /product/بخاخ-زعفران200-مل-طبيعي-100-فوود-هاكس/            301
   /ar/product/extra-virgin-olive-oil-spray-200ml-2/            /product/extra-virgin-olive-oil-spray-200ml-2/             301
   /ar/product/truffle-flavoured-extra-virgin-olive-oil-spray-125ml-2/  /product/truffle-flavoured-extra-virgin-olive-oil-spray-125ml-2/  301
   ```
   (`/ar/` and `/ar/الرئيسية/` are also handled by Astro's own `redirects` in
   `astro.config.mjs` as a static fallback, but prefer the host-level 301 above
   so search engines see a real 301 instead of a meta-refresh.)

   **Still-changed-shape WP legacy URLs** (pre-dating even the pre-promotion
   master — carried over from the original WP→Astro migration, unaffected by the
   Bold promotion): the WP single-FAQ pages no longer exist — 301
   `/faq/<slug>/` → `/en/faqs/` and `/ar/faq/<slug>/` → `/faqs-ar/`.
3. **Contact forms are UI-only** (EN `src/pages/en/contact.astro` and AR
   `src/pages/contact-ar.astro`, both `action="#"`). Wire them to the form relay
   **before launch**, or submissions silently go nowhere.
4. **Newsletter.** The footer promises a newsletter but no provider is hooked up
   (Mailchimp/Buttondown/etc.), and there is no signup input yet — hook one up or leave the
   blurb as-is knowingly.
5. **Percent-encoded Arabic URLs must survive the host/proxy** (same note as the sibling
   sites). One URL contains an Arabic path segment —
   `/product/بخاخ-زعفران200-مل-طبيعي-100-فوود-هاكس/` — served
   percent-encoded on the wire and stored as a UTF-8 directory name in `dist/`. Verify the
   host/CDN maps the encoded path to that directory without double-encoding or mangling
   (`curl -sI "https://foodhacks.co/product/%D8%A8%D8%AE%D8%A7%D8%AE-%D8%B2%D8%B9%D9%81%D8%B1%D8%A7%D9%86200-%D9%85%D9%84-%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A-100-%D9%81%D9%88%D9%88%D8%AF-%D9%87%D8%A7%D9%83%D8%B3/"`
   → 200). Don't add any rewrite that re-encodes `%` in paths. hreflang ar/en/x-default
   triples are emitted on every page, x-default pointing at the **Arabic** URL (Arabic is
   the default locale — see CLAUDE.md SEO notes).
6. **robots/sitemap + Search Console.** `public/robots.txt` points at
   `https://foodhacks.co/sitemap-index.xml` (generated by `@astrojs/sitemap`). After launch,
   submit the sitemap in Google Search Console and monitor the old
   `product-sitemap.xml`/`faq-sitemap.xml` URLs dropping out of the index.
7. **Orders route to srkw.co.** There is no cart on this site — the nav "Order Now" and the
   product-page buttons link to `https://srkw.co/en/product-category/food-hacks/`.
   Confirm that category URL is still live before launch.

## Post-launch smoke test

- `curl -s https://foodhacks.co/ | grep '<title>'` → contains "فود هاكز" (Arabic is the
  default homepage now — tenant check + locale check in one).
- Arabic (default, root, dir=rtl): `/`, `/about-ar/`, `/products-ar/`, `/faqs-ar/`,
  `/contact-ar/`, `/return-refund-policy-ar/`, and the 3 `/product/<ar-slug>/` pages
  (one is percent-encoded: `/product/%D8%A8%D8%AE%D8%A7%D8%AE-%D8%B2%D8%B9%D9%81%D8%B1%D8%A7%D9%86200-%D9%85%D9%84-%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A-100-%D9%81%D9%88%D9%88%D8%AF-%D9%87%D8%A7%D9%83%D8%B3/`)
  — 200s, `<html lang="ar" dir="rtl">`, bento grid / counter strip / marquee-style
  reveals render correctly mirrored (not just LTR content with dir="rtl").
- English (`/en/`): `/en/`, `/en/about/`, `/en/products/`, `/en/faqs/`, `/en/contact/`,
  `/en/return-refund-policy/`, and the 3 `/en/product/<en-slug>/` pages — 200s,
  `<html lang="en" dir="ltr">`.
- Legacy AR-home redirects: `/ar/` → 301 → `/`; `/ar/الرئيسية/` (percent-encoded:
  `/ar/%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9/`) → 301 → `/`.
- All the old-URL redirects in the "301 redirects" section above resolve to their new
  targets (spot-check a handful: old `/about/` → `/en/about/`, old `/ar/about-ar/` →
  `/about-ar/`).
- Language switcher (header, both locales) swaps to the correct counterpart page, not
  just the other locale's homepage.
- hreflang triples present on every page pair, x-default → the Arabic URL
  (`curl -s https://foodhacks.co/en/ | grep hreflang`).
- `/sitemap-index.xml` and `/robots.txt` respond 200; sitemap lists the 18 real pages
  (no `/ar/` prefixes, no redirect stubs).
- `/faq/what-makes-food-hacks-healthy/` → 301 → `/en/faqs/`; an `/ar/faq/...` URL → 301 → `/faqs-ar/`.
- Click "Order Now" (sticky pill, both locales) → correct per-locale srkw.co category page loads.
- Submit the contact form (both locales) → the wired form backend receives it.
- FAQ accordion opens/closes; mobile menu works (both are no-JS `<details>` elements) in
  both locales, RTL-mirrored correctly in Arabic.
