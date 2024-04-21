import buildRepository from './repository';
import type { RowSelect } from './repository';
import { Database } from '@/database';
import { TemplateNotFound } from './errors';

export async function getRandomTemplate(db: Database): Promise<RowSelect> {
  const templateRepository = buildRepository(db);

  const randomTemplate = await templateRepository.findRandom();

  if (!randomTemplate) {
    throw new TemplateNotFound();
  }

  return randomTemplate;
}
