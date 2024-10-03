import { z } from 'zod';

const envSchema = z.object({
  MODE: z.enum(['development', 'test', 'production']),
  VITE_API_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
