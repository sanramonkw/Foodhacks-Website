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
    /** Locale of this entry — EN entries render at /product/<id>/, AR at /ar/product/<id>/.
        File names ARE the live slugs (the AR saffron file name is its Arabic slug). */
    lang: z.enum(['en', 'ar']).default('en'),
    /** Shared key pairing an EN entry with its AR counterpart (drives hreflang) */
    translationKey: z.string().optional(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    order: z.number(),
    /** Locale of this entry (both locales' Q&As live in one collection) */
    lang: z.enum(['en', 'ar']).default('en'),
  }),
});

export const collections = { products, faqs };
