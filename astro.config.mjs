// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // site: 'https://foodhacks.co',
  site: 'https://sanramonkw.github.io',
  base: '/Foodhacks-Website/',
  // live WP 301s /ar/ -> /ar/الرئيسية/ (the Polylang AR home slug); static
  // build emits a meta-refresh page here — turn it into a real 301 on the host.
  // NOTE: Astro does not apply `base` to redirect targets, so the target is
  // written with the /Foodhacks-Website/ prefix explicitly for the subpath deploy.
  redirects: {
    '/ar': '/Foodhacks-Website/ar/الرئيسية',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
