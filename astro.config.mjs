// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://foodhacks.co',
  // Arabic is now the default locale, served at the root with no prefix
  // (Bold-design promotion, 2026-07-12). Both legacy Polylang AR-home URLs
  // now land on "/" — static build emits meta-refresh pages here, turn them
  // into real 301s on the host.
  redirects: {
    '/ar': '/',
    '/ar/الرئيسية': '/',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
