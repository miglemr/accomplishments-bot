import supertest from 'supertest';
import createTestDatabase from '@tests/utils/createTestDatabase';
import * as data from '@/database/data';
import createApp from '@/app';

const db = await createTestDatabase();
const app = createApp(db);

afterAll(() => db.destroy());

describe('GET', () => {
  it('should get all sprints', async () => {
    const { body } = await supertest(app).get('/sprints').expect(200);

    expect(body).toEqual(
      data.sprints.map((el) => ({ ...el, id: expect.any(Number) }))
    );
  });
});

describe('POST', () => {
  it('should create new sprint', async () => {
    const sprintCreate = {
      code: '2.2',
      title: 'Improving Websites with Javascript',
    };

    const { body } = await supertest(app)
      .post('/sprints')
      .send(sprintCreate)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      code: sprintCreate.code,
      title: sprintCreate.title,
    });
  });

  it('should not allow to create a sprint if title is missing', async () => {
    const sprintCreate = {
      code: '2.3',
    };

    await supertest(app).post('/sprints').send(sprintCreate).expect(400);
  });

  it('should not allow to create a sprint if code field is empty', async () => {
    await supertest(app)
      .post('/sprints')
      .send({
        code: '',
        title: 'Learning Your First Framework - Vue.js',
      })
      .expect(400);
  });

  it('should not allow to create a sprint if code and title is not provided', async () => {
    await supertest(app).post('/sprints').send({}).expect(400);
  });
});

describe('PATCH', () => {
  it('should allow updating sprint', async () => {
    const sprintUpdate = {
      code: '1.1.1',
      title: 'Updated First Steps Into Programming with Python',
    };

    const { body } = await supertest(app)
      .patch('/sprints/1')
      .send(sprintUpdate)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      code: sprintUpdate.code,
      title: sprintUpdate.title,
    });
  });

  it('should allow to only change title', async () => {
    const sprintUpdate = {
      title: 'Updated Intermediate Programming with Python',
    };

    const { body } = await supertest(app)
      .patch('/sprints/2')
      .send(sprintUpdate)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      code: '1.2',
      title: sprintUpdate.title,
    });
  });

  it('should return 404 if sprint ID does not exist', async () => {
    const sprintUpdate = {
      title: 'Intermediate Programming with Python',
    };

    const { body } = await supertest(app)
      .patch('/sprints/10')
      .send(sprintUpdate)
      .expect(404);

    expect(body.error.message).toMatch(/sprint/i);
  });

  it('should return the original sprint if no changes were made', async () => {
    const { body } = await supertest(app)
      .patch('/sprints/3')
      .send({})
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      code: '1.3',
      title: 'Intermediate Programming with Python II',
    });
  });
});

describe('DELETE', () => {
  it('should remove sprint', async () => {
    const { body } = await supertest(app).delete('/sprints/4');

    expect(body).toEqual({
      id: expect.any(Number),
      code: '1.4',
      title: 'Fundamentals of Computer Science I',
    });
  });

  it('should throw an error if sprint does not exist', async () => {
    await supertest(app).delete('/sprints/10').expect(404);
  });
});
