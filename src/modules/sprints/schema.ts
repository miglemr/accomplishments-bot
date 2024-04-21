import { z } from 'zod';

export const schema = z.object({
  id: z.coerce.number().int().positive(),
  code: z.string().min(1).max(500),
  title: z.string().min(1).max(500),
});

const insertable = schema.omit({
  id: true,
});

const updateable = insertable.partial();

export const parseId = (id: unknown) => schema.shape.id.parse(id);
export const parseCode = (record: unknown) => schema.shape.code.parse(record);
export const parseInsertable = (record: unknown) => insertable.parse(record);
export const parseUpdateable = (record: unknown) => updateable.parse(record);
