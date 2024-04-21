import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('message')
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey().notNull())
    .addColumn('template_id', 'integer', (c) =>
      c.references('template.id').notNull()
    )
    .addColumn('gif_url', 'varchar', (c) => c.notNull())
    .addColumn('user_id', 'integer', (c) => c.references('user.id').notNull())
    .addColumn('sprint_id', 'integer', (c) =>
      c.references('sprint.id').notNull()
    )
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('message').execute();
}
