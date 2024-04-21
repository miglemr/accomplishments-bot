import supertest from 'supertest';
import createTestDatabase from '@tests/utils/createTestDatabase';
import * as data from '@/database/data';
import createApp from '@/app';

const db = await createTestDatabase();
const app = createApp(db);

afterAll(() => db.destroy());

describe('GET', () => {
  it('should get all templates', async () => {
    const { body } = await supertest(app).get('/templates').expect(200);

    expect(body).toEqual(
      data.templates.map((el) => ({ ...el, id: expect.any(Number) }))
    );
  });
});

describe('POST', () => {
  it('should create new template', async () => {
    const templateCreate = { text: 'You are unstoppable!' };

    const { body } = await supertest(app)
      .post('/templates')
      .send(templateCreate)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: templateCreate.text,
    });
  });

  it('should not allow to create a template with empty text field', async () => {
    await supertest(app)
      .post('/templates')
      .send({
        text: '',
      })
      .expect(400);
  });

  it('should not allow to create a template if text is not provided', async () => {
    await supertest(app).post('/templates').send({}).expect(400);
  });
});

describe('PATCH', () => {
  it('should allow updating template', async () => {
    const templateUpdate = {
      text: 'Updated Bravo! We knew you could do it!',
    };

    const { body } = await supertest(app)
      .patch('/templates/1')
      .send(templateUpdate)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: templateUpdate.text,
    });
  });

  it('should return 404 if template ID does not exist', async () => {
    const templateUpdate = {
      text: 'Updated Bravo! We knew you could do it!',
    };

    const { body } = await supertest(app)
      .patch('/templates/10')
      .send(templateUpdate)
      .expect(404);

    expect(body.error.message).toMatch(/template/i);
  });

  it('should return the original template if no changes were made', async () => {
    const { body } = await supertest(app)
      .patch('/templates/2')
      .send({})
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: 'Huge congratulations!',
    });
  });
});

describe('DELETE', () => {
  it('should remove template', async () => {
    const { body } = await supertest(app).delete('/templates/3');

    expect(body).toEqual({
      id: expect.any(Number),
      text: 'You deserve all this success and more!',
    });
  });

  it('should throw an error if template does not exist', async () => {
    await supertest(app).delete('/templates/10').expect(404);
  });
});
