import { Database } from '../index';
import * as data from '../data';

export async function up(db: Database) {
  await db.insertInto('user').values(data.users).execute();
}

export async function down(db: Database) {
  await db.deleteFrom('user').execute();
}
