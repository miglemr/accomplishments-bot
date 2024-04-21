import { Database } from '../index';
import * as data from '../data';

export async function up(db: Database) {
  await db.insertInto('sprint').values(data.sprints).execute();
}

export async function down(db: Database) {
  await db.deleteFrom('sprint').execute();
}
