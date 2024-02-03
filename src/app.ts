import express from 'express';
import templates from '@/modules/templates/controller';
import sprints from '@/modules/sprints/controller';
import messages from '@/modules/messages/controller';
import jsonErrorHandler from './middleware/jsonErrors';
import { Database } from '@/database';
import MethodNotAllowed from './utils/errors/MethodNotAllowed';

export default function createApp(db: Database) {
  const app = express();

  app.use(express.json());
  app.use('/templates', templates(db));
  app.use('/sprints', sprints(db));
  app.use('/messages', messages(db));
  app.use('*', (_req, _res, next) => {
    next(new MethodNotAllowed());
  });

  app.use(jsonErrorHandler);

  return app;
}
