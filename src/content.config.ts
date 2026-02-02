import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    featured: z.boolean().default(false),
    description: z.string(),
    lang: z.enum(['es', 'en']),
    slug: z.string(),
  }),
});

export const collections = { projects };
