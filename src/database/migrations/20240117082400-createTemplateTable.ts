import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('template')
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey().notNull())
    .addColumn('text', 'varchar', (c) => c.notNull())
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('template').execute();
}
