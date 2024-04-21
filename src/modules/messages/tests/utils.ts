import { Insertable } from 'kysely';
import { Database, Message } from '@/database';

export const createMessages = (
  db: Database,
  messages: Insertable<Message> | Insertable<Message>[]
) => db.insertInto('message').values(messages).returningAll().execute();
