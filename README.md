# Food Hacks — foodhacks.co (Astro rebuild)

Modern Astro 5 + Tailwind 4 rebuild of foodhacks.co, migrated off WordPress. The
**Bold ("Spray Lab") design was promoted to master on 2026-07-12** — see CLAUDE.md.
**Arabic is the default locale**, served at the site root with no prefix; English
lives under `/en/`. Fully bilingual, content collections for products/FAQs, full
SEO/GEO layer (hreflang ar/en/x-default, x-default → Arabic).

- **Start here:** `CLAUDE.md` (context, tokens, full URL map) and `DEPLOYMENT.md`
  (read before deploying — the contact form must be wired before launch, and the
  old-URL 301 redirect map lives there).
- **Run:** `npm install && npm run dev` · `npm run build` (static `dist/`).
- **`variants/premium/`, `variants/editorial/`** — two remaining alternative design
  directions (same content/URLs/SEO, different visual language), each with its own
  `VARIANT.md`. **`variants/bold/` no longer exists** — it was promoted to become
  the root project itself. A pre-promotion snapshot of the whole repo is kept on
  the `pre-bold-promotion` git branch.
