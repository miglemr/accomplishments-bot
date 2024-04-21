import createTestDatabase from '@tests/utils/createTestDatabase';
import * as data from '@/database/data';
import buildRepository from '../repository';

const db = await createTestDatabase();
const repository = buildRepository(db);

afterAll(() => db.destroy());

describe('findAll', () => {
  it('should return all sprints', async () => {
    const sprints = await repository.findAll();

    expect(sprints).toHaveLength(5);
    expect(sprints).toEqual(
      data.sprints.map((el) => ({ ...el, id: expect.any(Number) }))
    );
  });
});

describe('create', () => {
  it('should create a sprint', async () => {
    const value = {
      code: '2.2',
      title: 'Improving Websites with Javascript',
    };

    const sprint = await repository.create(value);

    expect(sprint).toEqual({
      id: expect.any(Number),
      code: value.code,
      title: value.title,
    });
  });

  it('should not allow to create a sprint if sprint code already exists', async () => {
    const value = {
      code: '1.1',
      title: 'First Steps Into Programming with Python',
    };

    expect(() => repository.create(value)).rejects.toThrowError();
  });
});

describe('update', () => {
  it('should update sprint', async () => {
    const sprintId = 1;
    const updatedSprint = {
      code: '1.1.1',
      title: 'Updated First Steps Into Programming with Python',
    };

    const sprint = await repository.update(sprintId, updatedSprint);

    expect(sprint).toEqual({
      id: sprintId,
      code: updatedSprint.code,
      title: updatedSprint.title,
    });
  });

  it('should only update sprint code', async () => {
    const sprintId = 2;
    const updatedSprint = {
      code: '1.2.1',
    };

    const sprint = await repository.update(sprintId, updatedSprint);

    expect(sprint).toEqual({
      id: sprintId,
      code: updatedSprint.code,
      title: 'Intermediate Programming with Python',
    });
  });

  it('should update only sprint title', async () => {
    const sprintId = 3;
    const updatedSprint = {
      title: 'Updated Intermediate Programming with Python II',
    };

    const sprint = await repository.update(sprintId, updatedSprint);

    expect(sprint).toEqual({
      id: expect.any(Number),
      code: '1.3',
      title: updatedSprint.title,
    });
  });

  it('should return undefined if ID is incorrect', async () => {
    const sprintId = 10;
    const updatedSprint = {
      code: '9.9',
      title: 'Fundamentals of Computer Science II',
    };

    const sprint = await repository.update(sprintId, updatedSprint);

    expect(sprint).toBeUndefined();
  });
});

describe('remove', () => {
  it('should remove sprint', async () => {
    const sprintId = 4;

    const deletedSprint = await repository.remove(sprintId);

    expect(deletedSprint).toEqual({
      id: expect.any(Number),
      code: '1.4',
      title: 'Fundamentals of Computer Science I',
    });
  });

  it('should return undefined if sprint ID is incorrect', async () => {
    const sprintId = 10;

    const result = await repository.remove(sprintId);

    expect(result).toBeUndefined();
  });
});
