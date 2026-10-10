import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const animals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/animals' }),
  schema: z.object({
    name: z.string(),
    species: z.string().default('Dog'),
    status: z.enum(['Available for adoption', 'In foster care', 'Adoption pending', 'Adopted', 'Sanctuary resident']),
    photo: z.string().optional(),
    // Which part of the photo to keep when cropped into a card, e.g. "center 80%" to favor the bottom.
    photoPosition: z.string().optional(),
    breed: z.string().optional(),
    age: z.string().optional(),
    sex: z.string().optional(),
    // Which organization handles adoption inquiries for this animal.
    adoptVia: z.string().optional(),
    adoptLink: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // When set, shown instead of the exact date (e.g. "Early December — date TBA").
    dateText: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { animals, events };
