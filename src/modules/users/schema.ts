import { z } from 'zod';

export const schema = z.object({
  id: z.coerce.number().int().positive(),
  username: z.string().min(1).max(500),
});

export const parseUsername = (record: unknown) =>
  schema.shape.username.parse(record);
