# Deploying foodhacks.co

Read this before the DNS cutover. The site is a **pure static build** — `dist/` is plain
HTML/CSS/images and can be served by any static host or web server. There is no server
runtime, no database, and no admin panel (content lives in this repo, see CLAUDE.md).

## Build

- **Node 20+** (Astro 5 requirement).
- ```bash
  npm ci
  npm run build   # -> dist/ ; expect "9 page(s) built" + sitemap-index.xml
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

**Current state — do NOT launch with the form as-is:** the contact form
(`src/pages/contact.astro`) is UI-only (`action="#"`); submitting does
NOTHING, so inquiries would be silently lost. The WordPress site used Contact
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
2. **301 redirects for changed URL shapes** (see CLAUDE.md TODO 3): the WP single-FAQ pages
   `/faq/<slug>/` no longer exist — 301 them to `/faqs/`. Product URLs (`/product/<slug>/`)
   kept the same shape, no redirect needed. Example (Netlify `_redirects` /
   Cloudflare Pages `_redirects`):
   ```
   /faq/*  /faqs/  301
   ```
3. **Contact form is UI-only.** The WP site used Contact Form 7 + reCAPTCHA v3; the rebuilt
   form in `src/pages/contact.astro` still has `action="#"`. Wire it to a form service
   (Formspree/Basin/Web3Forms or a serverless endpoint) **before launch**, or submissions
   silently go nowhere.
4. **Newsletter.** The footer promises a newsletter but no provider is hooked up
   (Mailchimp/Buttondown/etc.), and there is no signup input yet — hook one up or leave the
   blurb as-is knowingly.
5. **Arabic mirror `/ar/` is still pending migration.** The live WP site serves a full
   Polylang Arabic mirror; the rebuild does not yet (the nav's `العربية` item is deliberately
   omitted). Decide: either keep `/ar/` URLs alive some other way or accept the 404s until
   the mirror lands. When it lands, add `hreflang` alternates in `BaseLayout.astro`
   (see CLAUDE.md SEO notes).
6. **robots/sitemap + Search Console.** `public/robots.txt` points at
   `https://foodhacks.co/sitemap-index.xml` (generated by `@astrojs/sitemap`). After launch,
   submit the sitemap in Google Search Console and monitor the old
   `product-sitemap.xml`/`faq-sitemap.xml` URLs dropping out of the index.
7. **Orders route to srkw.co.** There is no cart on this site — the nav "Order Now" and the
   product-page buttons link to `https://srkw.co/en/product-category/food-hacks/`.
   Confirm that category URL is still live before launch.

## Post-launch smoke test

- `curl -s https://foodhacks.co/ | grep '<title>'` → contains "Food Hacks" (tenant check).
- Load `/`, `/about/`, `/products/`, `/product/saffron-spray-200ml/`, `/faqs/`, `/contact/`,
  `/return-refund-policy/` — 200s, correct titles, no mixed-content warnings.
- `/sitemap-index.xml` and `/robots.txt` respond 200.
- `/faq/what-makes-food-hacks-healthy/` → 301 → `/faqs/`.
- Click "Order Now" → srkw.co category page loads.
- Submit the contact form → the wired form backend receives it.
- FAQ accordion opens/closes; mobile menu works (both are no-JS `<details>` elements).
