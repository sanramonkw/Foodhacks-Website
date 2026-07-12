// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // site: 'https://foodhacks.co',
  site: 'https://sanramonkw.github.io',
  base: '/Foodhacks-Website/variants/editorial/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
