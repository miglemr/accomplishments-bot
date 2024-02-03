import { z } from 'zod';

export const schema = z.object({
  id: z.coerce.number().int().positive(),
  templateId: z.coerce.number().int().positive(),
  gifUrl: z.string().url(),
  userId: z.coerce.number().int().positive(),
  sprintId: z.coerce.number().int().positive(),
});
