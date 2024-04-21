import * as schema from '../schema';

describe('parseId', () => {
  it('should parse valid id', () => {
    const id = 5;

    expect(schema.parseId(id)).toEqual(id);
  });

  it('should parse valid id if it is a string', () => {
    const id = '5';

    expect(schema.parseId(id)).toEqual(parseInt(id, 10));
  });

  it('should throw an error if id is not valid', () => {
    const id = 'Hello';

    expect(() => schema.parseId(id)).toThrowError();
  });
});

describe('parseCode', () => {
  it('should parse valid code', () => {
    const code = '1.1';

    expect(schema.parseCode(code)).toEqual(code);
  });

  it('should throw an error if code is not valid', () => {
    const code = 5;

    expect(() => schema.parseCode(code)).toThrowError();
  });

  it('should throw an error if code field is empty', () => {
    const code = '';

    expect(() => schema.parseCode(code)).toThrowError();
  });
});

describe('parseInsertable', () => {
  it('should parse insertable sprint', () => {
    const sprint = {
      code: '1.1',
      title: 'First Steps Into Programming with Python',
    };

    expect(schema.parseInsertable(sprint)).toEqual(sprint);
  });

  it('should omit id', () => {
    const sprint = {
      id: 1,
      code: '1.1',
      title: 'First Steps Into Programming with Python',
    };

    expect(schema.parseInsertable(sprint)).not.toHaveProperty('id');
  });
});

describe('parseUpdateable', () => {
  it('should omit id', () => {
    const sprint = {
      id: 1,
      code: '1.1',
      title: 'First Steps Into Programming with Python',
    };

    expect(schema.parseUpdateable(sprint)).not.toHaveProperty('id');
  });
});
