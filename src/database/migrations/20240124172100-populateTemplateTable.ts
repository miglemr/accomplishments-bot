import { Database } from '../index';
import * as data from '../data';

export async function up(db: Database) {
  await db.insertInto('template').values(data.templates).execute();
}

export async function down(db: Database) {
  await db.deleteFrom('template').execute();
}
