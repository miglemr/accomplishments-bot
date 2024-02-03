import createTestDatabase from '@tests/utils/createTestDatabase';
import * as data from '@/database/data';
import buildRepository from '../repository';

const db = await createTestDatabase();
const repository = buildRepository(db);

afterAll(() => db.destroy());

describe('findAll', () => {
  it('should return all templates', async () => {
    const templates = await repository.findAll();

    expect(templates).toHaveLength(5);
    expect(templates).toEqual(
      data.templates.map((el) => ({ ...el, id: expect.any(Number) }))
    );
  });
});

describe('findRandom', () => {
  it('should return a random template', async () => {
    const template = await repository.findRandom();

    expect(template).toEqual({
      id: expect.any(Number),
      text: expect.any(String),
    });
  });
});

describe('create', () => {
  it('should create a template', async () => {
    const value = {
      text: 'Way to go!',
    };

    const template = await repository.create(value);

    expect(template).toEqual({
      id: expect.any(Number),
      text: value.text,
    });
  });
});

describe('update', () => {
  it('should update template', async () => {
    const templateId = 1;
    const updatedTemplate = { text: 'Bravo!' };

    const template = await repository.update(templateId, updatedTemplate);

    expect(template).toEqual({
      id: expect.any(Number),
      text: updatedTemplate.text,
    });
  });

  it('should return undefined if ID is incorrect', async () => {
    const templateId = 10;
    const updatedTemplate = { text: 'Bravo!' };

    const template = await repository.update(templateId, updatedTemplate);

    expect(template).toBeUndefined();
  });
});

describe('remove', () => {
  it('should remove template', async () => {
    const templateId = 3;

    const deletedTemplate = await repository.remove(templateId);

    expect(deletedTemplate).toEqual({
      id: expect.any(Number),
      text: 'You deserve all this success and more!',
    });
  });

  it('should return undefined if template ID is incorrect', async () => {
    const templateId = 10;

    const result = await repository.remove(templateId);

    expect(result).toBeUndefined();
  });
});
