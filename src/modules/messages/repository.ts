import { OperandValueExpression, Selectable } from 'kysely';
import type { DB, Database, Sprint, Template } from '@/database';

const TABLE = 'message';

type Query = {
  sprint: OperandValueExpression<DB, 'sprint', 'sprint.code'>;
  username: OperandValueExpression<DB, 'user', 'user.username'>;
};

type TemplateSelect = Selectable<Template>;

export default (db: Database) => ({
  findAll: (queryParams: Partial<Query> | undefined = undefined) => {
    let query = db.selectFrom(TABLE);

    if (queryParams?.sprint) {
      query = query
        .innerJoin('sprint', 'sprint.id', 'message.sprintId')
        .where('sprint.code', '=', queryParams.sprint);
    }

    if (queryParams?.username) {
      query = query
        .innerJoin('user', 'user.id', 'message.userId')
        .where('user.username', '=', queryParams.username);
    }

    return query
      .select(['message.id', 'templateId', 'gifUrl', 'userId', 'sprintId'])
      .execute();
  },

  create: async (
    getTemplate: (db: Database) => Promise<TemplateSelect>,
    getGifUrl: () => Promise<string>,
    username: string,
    sprintCode: string
  ) => {
    const template = await getTemplate(db);

    const gifUrl = await getGifUrl();

    try {
      await db
        .insertInto(TABLE)
        .values(({ selectFrom }) => ({
          templateId: template.id,
          gifUrl,
          userId: selectFrom('user')
            .select('user.id')
            .where('user.username', '=', username),
          sprintId: selectFrom('sprint')
            .select('sprint.id')
            .where('sprint.code', '=', sprintCode),
        }))
        .executeTakeFirstOrThrow();

      const { title } = (await db
        .selectFrom('sprint')
        .select('title')
        .where('code', '=', sprintCode)
        .executeTakeFirst()) as Pick<Sprint, 'title'>;

      const message = {
        username,
        gifUrl,
        text: template.text,
        sprintTitle: title,
      };

      return message;
    } catch (error) {
      throw new Error('Failed to save the message');
    }
  },
});
