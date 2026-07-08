// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://foodhacks.co',
  // live WP 301s /ar/ -> /ar/الرئيسية/ (the Polylang AR home slug); static
  // build emits a meta-refresh page here — turn it into a real 301 on the host
  redirects: {
    '/ar': '/ar/الرئيسية',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
