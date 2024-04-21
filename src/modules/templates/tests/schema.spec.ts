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

describe('parseInsertable', () => {
  it('should parse insertable template', () => {
    const template = {
      text: 'Bravo! We knew you could do it!',
    };

    expect(schema.parseInsertable(template)).toEqual(template);
  });

  it('should omit id', () => {
    const template = {
      id: 1,
      text: 'Bravo! We knew you could do it!',
    };

    expect(schema.parseInsertable(template)).not.toHaveProperty('id');
  });
});

describe('parseUpdateable', () => {
  it('should omit id', () => {
    const template = {
      id: 1,
      text: 'Udated Bravo! We knew you could do it!',
    };

    expect(schema.parseUpdateable(template)).not.toHaveProperty('id');
  });
});
