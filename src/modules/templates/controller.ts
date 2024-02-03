import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Database } from '@/database';
import { jsonRoute } from '@/utils/middleware';
import buildRepository from './repository';
import * as schema from './schema';
import { TemplateNotFound } from './errors';

export default (db: Database) => {
  const router = Router();
  const repository = buildRepository(db);

  router
    .route('/')
    .get(jsonRoute(repository.findAll))
    .post(
      jsonRoute((req) => {
        const body = schema.parseInsertable(req.body);

        return repository.create(body);
      }, StatusCodes.CREATED)
    );

  router
    .route('/:id(\\d+)')
    .patch(
      jsonRoute(async (req) => {
        const id = schema.parseId(req.params.id);
        const bodyPatch = schema.parseUpdateable(req.body);
        const template = await repository.update(id, bodyPatch);

        if (!template) {
          throw new TemplateNotFound();
        }

        return template;
      })
    )
    .delete(
      jsonRoute(async (req) => {
        const id = schema.parseId(req.params.id);

        const template = await repository.remove(id);

        if (!template) {
          throw new TemplateNotFound();
        }

        return template;
      })
    );

  return router;
};
