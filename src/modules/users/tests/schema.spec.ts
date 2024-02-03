import * as schema from '../schema';

describe('parseUsername', () => {
  it('parses a valid username', () => {
    const username = 'ptarbet0';

    expect(schema.parseUsername(username)).toEqual(username);
  });

  it('throws an error due to empty username field', () => {
    const username = '';

    expect(() => schema.parseUsername(username)).toThrowError();
  });

  it('throws an error if number is passed as username', () => {
    const username = 2;

    expect(() => schema.parseUsername(username)).toThrowError();
  });
});
