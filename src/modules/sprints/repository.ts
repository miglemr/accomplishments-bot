import { Insertable, Updateable } from 'kysely';
import type { Database, Sprint } from '@/database';

const TABLE = 'sprint';
type Row = Sprint;
type RowWithoutId = Omit<Row, 'id'>;
type RowInsert = Insertable<RowWithoutId>;
type RowUpdate = Updateable<RowWithoutId>;

export default (db: Database) => ({
  findAll: () => db.selectFrom(TABLE).selectAll().execute(),

  create: (record: RowInsert) =>
    db.insertInto(TABLE).values(record).returningAll().executeTakeFirst(),

  update: (sprintId: number, partial: RowUpdate) => {
    if (Object.keys(partial).length === 0) {
      return db
        .selectFrom(TABLE)
        .selectAll()
        .where('id', '=', sprintId)
        .executeTakeFirst();
    }

    return db
      .updateTable(TABLE)
      .set(partial)
      .where('id', '=', sprintId)
      .returningAll()
      .executeTakeFirst();
  },

  remove: (sprintId: number) =>
    db
      .deleteFrom(TABLE)
      .where('id', '=', sprintId)
      .returningAll()
      .executeTakeFirst(),
});
