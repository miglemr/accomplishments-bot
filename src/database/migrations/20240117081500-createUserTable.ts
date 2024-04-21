import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey().notNull())
    .addColumn('username', 'varchar', (c) => c.notNull().unique())
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('user').execute();
}
