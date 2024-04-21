import supertest from 'supertest';
import createTestDatabase from '@tests/utils/createTestDatabase';
import * as fixtures from './fixtures';
import * as services from '../services';
import { createMessages } from './utils';
import createApp from '@/app';

const db = await createTestDatabase();
const app = createApp(db);

afterAll(() => db.destroy());

createMessages(db, fixtures.messages);

describe('GET', () => {
  it('should return all messages', async () => {
    const { body } = await supertest(app).get('/messages').expect(200);

    expect(body).toEqual(
      fixtures.messages.map((el) => ({
        ...el,
        id: expect.any(Number),
      }))
    );
  });

  it('should return only messages of specified sprint', async () => {
    const { body } = await supertest(app)
      .get('/messages?sprint=1.2')
      .expect(200);

    expect(body).toHaveLength(2);
  });

  it('should return only messages of specified user', async () => {
    const { body } = await supertest(app)
      .get('/messages?username=imcvitty1')
      .expect(200);

    expect(body).toHaveLength(3);
  });

  it('should return only messages of specified sprint and user', async () => {
    const { body } = await supertest(app)
      .get('/messages?sprint=1.2&username=imcvitty1')
      .expect(200);

    expect(body).toHaveLength(2);
  });

  it('should return no results if sprint is not valid', async () => {
    const { body } = await supertest(app)
      .get('/messages?sprint=9.9')
      .expect(200);

    expect(body).toEqual([]);
  });

  it('should return no results if user is not valid', async () => {
    const { body } = await supertest(app)
      .get('/messages?username=imcvitty999')
      .expect(200);

    expect(body).toEqual([]);
  });
});

describe('POST', () => {
  afterAll(async () => {
    await db.deleteFrom('message').execute();
    createMessages(db, fixtures.messages);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('../services', () => ({
    getGifUrl: () => 'https://tenor.com/wbfUq80ZG1.gif',
    sendBotMessage: () => vi.fn(),
  }));

  vi.mock('@/modules/templates/services', () => ({
    getRandomTemplate: () => ({
      id: 1,
      text: 'Bravo! We knew you could do it!',
    }),
  }));

  const sendBotMessageSpy = vi.spyOn(services, 'sendBotMessage');

  it('should create a new message and send it', async () => {
    const { body } = await supertest(app)
      .post('/messages')
      .send({
        username: 'ptarbet0',
        sprintCode: '1.1',
      })
      .expect(201);

    expect(body).toEqual({
      username: 'ptarbet0',
      gifUrl: 'https://tenor.com/wbfUq80ZG1.gif',
      text: 'Bravo! We knew you could do it!',
      sprintTitle: 'First Steps Into Programming with Python',
    });
    expect(sendBotMessageSpy).toBeCalledTimes(1);
    expect(sendBotMessageSpy).toHaveBeenCalledWith({
      username: 'ptarbet0',
      gifUrl: 'https://tenor.com/wbfUq80ZG1.gif',
      text: 'Bravo! We knew you could do it!',
      sprintTitle: 'First Steps Into Programming with Python',
    });
  });

  it('should not create a new message if sprint code is not provided', async () => {
    await supertest(app)
      .post('/messages')
      .send({
        username: 'ptarbet0',
      })
      .expect(400);

    expect(sendBotMessageSpy).not.toHaveBeenCalled();
  });

  it('should not create a new message if username is not valid', async () => {
    await supertest(app)
      .post('/messages')
      .send({
        username: 'ptarbet999',
        sprintCode: '1.1',
      })
      .expect(500);

    expect(sendBotMessageSpy).not.toHaveBeenCalled();
  });
});
