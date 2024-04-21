import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Database } from '@/database';
import { jsonRoute } from '@/utils/middleware';
import buildRepository from './repository';
import * as userSchema from '@/modules/users/schema';
import * as sprintSchema from '@/modules/sprints/schema';
import { getGifUrl, sendBotMessage } from './services';
import { getRandomTemplate } from '../templates/services';

export default (db: Database) => {
  const router = Router();
  const repository = buildRepository(db);

  router
    .route('/')
    .get(
      jsonRoute(async (req) => {
        const messages = await repository.findAll(req.query);

        return messages;
      })
    )
    .post(
      jsonRoute(async (req) => {
        const username = userSchema.parseUsername(req.body.username);
        const sprintCode = sprintSchema.parseCode(req.body.sprintCode);

        const message = await repository.create(
          getRandomTemplate,
          getGifUrl,
          username,
          sprintCode
        );

        try {
          await sendBotMessage(message);
        } catch (error) {
          throw new Error('Failed to send the message');
        }

        return message;
      }, StatusCodes.CREATED)
    );

  return router;
};
