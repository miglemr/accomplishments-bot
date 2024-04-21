import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('sprint')
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey().notNull())
    .addColumn('code', 'varchar', (c) => c.notNull().unique())
    .addColumn('title', 'varchar', (c) => c.notNull())
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('sprint').execute();
}
