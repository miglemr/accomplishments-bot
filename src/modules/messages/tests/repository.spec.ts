import createTestDatabase from '@tests/utils/createTestDatabase';
import * as fixtures from './fixtures';
import buildRepository from '../repository';
import { createMessages } from './utils';

const db = await createTestDatabase();
const repository = buildRepository(db);

createMessages(db, fixtures.messages);

afterAll(() => db.destroy());

describe('findAll', () => {
  it('should return all messages', async () => {
    const messages = await repository.findAll();

    expect(messages).toEqual(
      fixtures.messages.map((el) => ({
        ...el,
        id: expect.any(Number),
      }))
    );
  });

  it('should return only messages of specified user', async () => {
    const messages = await repository.findAll({ username: 'imcvitty1' });

    expect(messages).toHaveLength(3);
  });

  it('should return only messages of specified sprint', async () => {
    const messages = await repository.findAll({ sprint: '1.2' });

    expect(messages).toHaveLength(2);
  });

  it('should return only messages of specified user and sprint', async () => {
    const messages = await repository.findAll({
      sprint: '1.2',
      username: 'imcvitty1',
    });

    expect(messages).toHaveLength(2);
  });
});

describe('create', () => {
  const getRandomTemplate = vi.fn(async () => ({
    id: 1,
    text: 'Bravo! We knew you could do it!',
  }));

  const getGifUrl = vi.fn(
    async () =>
      'https://media.tenor.com/Qm0fSYUbafYAAAAC/congratulations-congrats.gif'
  );

  it('should create a message', async () => {
    const message = await repository.create(
      getRandomTemplate,
      getGifUrl,
      'ptarbet0',
      '1.1'
    );

    expect(message).toEqual({
      username: 'ptarbet0',
      gifUrl:
        'https://media.tenor.com/Qm0fSYUbafYAAAAC/congratulations-congrats.gif',
      text: 'Bravo! We knew you could do it!',
      sprintTitle: 'First Steps Into Programming with Python',
    });
  });

  it('should not allow to create a message if username or sprint code is not valid', async () => {
    expect(() =>
      repository.create(getRandomTemplate, getGifUrl, 'ptarbet999', '1.1')
    ).rejects.toThrowError();
  });
});
