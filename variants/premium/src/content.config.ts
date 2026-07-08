import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Markdown-first content — the "better than WordPress" upgrade.
 * Products and FAQs live as .md files; adding one file adds a page/entry.
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    /** Volume, e.g. "200mL" */
    size: z.string(),
    image: z.string(),
    /** Order in grids (matches original site order) */
    order: z.number(),
    /** External purchase link (original "Order Now" target) */
    orderUrl: z.string().url(),
    description: z.string(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    order: z.number(),
  }),
});

export const collections = { products, faqs };
