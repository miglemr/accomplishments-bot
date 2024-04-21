import { Insertable, Updateable, Selectable, sql } from 'kysely';
import type { Database, Template } from '@/database';

const TABLE = 'template';
type Row = Template;
type RowWithoutId = Omit<Row, 'id'>;
type RowInsert = Insertable<RowWithoutId>;
type RowUpdate = Updateable<RowWithoutId>;
export type RowSelect = Selectable<Row>;

export default (db: Database) => ({
  findAll: () => db.selectFrom(TABLE).selectAll().execute(),

  findRandom: (): Promise<RowSelect | undefined> =>
    db
      .selectFrom(TABLE)
      .selectAll()
      .orderBy(sql`random()`)
      .limit(1)
      .executeTakeFirst(),

  create: (record: RowInsert) =>
    db.insertInto(TABLE).values(record).returningAll().executeTakeFirst(),

  update: (templateId: number, partial: RowUpdate) => {
    if (Object.keys(partial).length === 0) {
      return db
        .selectFrom(TABLE)
        .selectAll()
        .where('id', '=', templateId)
        .executeTakeFirst();
    }

    return db
      .updateTable(TABLE)
      .set(partial)
      .where('id', '=', templateId)
      .returningAll()
      .executeTakeFirst();
  },

  remove: (templateId: number) =>
    db
      .deleteFrom(TABLE)
      .where('id', '=', templateId)
      .returningAll()
      .executeTakeFirst(),
});
