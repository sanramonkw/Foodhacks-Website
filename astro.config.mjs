// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Production (default): served at the domain root.
// GitHub Pages review deploys: set DEPLOY_TARGET=pages to build against the
// sanramonkw.github.io project-pages URL + /Foodhacks-Website/ base instead.
// NEVER set DEPLOY_TARGET when building for production (foodhacks.co) —
// see DEPLOYMENT.md.
const isPagesDeploy = process.env.DEPLOY_TARGET === 'pages';

const site = isPagesDeploy ? 'https://sanramonkw.github.io' : 'https://foodhacks.co';
const base = isPagesDeploy ? '/Foodhacks-Website/' : '/';

// Arabic is the default locale, served at the root with no prefix (Bold-design
// promotion, 2026-07-12). Both legacy Polylang AR-home URLs now land on "/" —
// static build emits meta-refresh pages here, turn them into real 301s on the
// host. NOTE: Astro does not apply `base` to redirect targets, so under the
// Pages review deploy the target is written with the /Foodhacks-Website/
// prefix explicitly.
const redirectHome = isPagesDeploy ? `${base}` : '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  redirects: {
    '/ar': redirectHome,
    '/ar/الرئيسية': redirectHome,
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
