import type { Mock } from 'vitest';
import * as fixtures from './fixtures';
import * as services from '../services';
import { ResponseError } from '@/utils/errors/ResponseError';

afterEach(() => {
  vi.clearAllMocks();
});

describe('getGifUrl', async () => {
  it('should return GIF url string', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(fixtures.gifApiResponse),
      })
    ) as Mock;

    const gifUrl = await services.getGifUrl();

    expect(gifUrl).toEqual(fixtures.gifApiResponse.results[0].url);
  });
});

describe('fetchGifApi', () => {
  it('should return JSON response', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(fixtures.gifApiResponse),
      })
    ) as Mock;

    const response = await services.fetchGifApi();

    expect(response).toEqual(fixtures.gifApiResponse);
  });

  it('should throw an error if response is not OK', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    ) as Mock;

    expect(() => services.fetchGifApi()).rejects.toThrowError(
      new ResponseError(404, 'Bad GIF fetch response')
    );
  });
});

describe('sendBotMessage', () => {
  it('should send message', async () => {
    vi.mock('discord.js', () => ({
      Client: vi.fn(() => ({
        on: vi.fn((event, callback) => {
          if (event === 'ready') {
            callback();
          }
        }),
        login: vi.fn(),
        channels: {
          cache: {
            get: vi.fn(() => ({
              send: vi.fn((content: object) => Promise.resolve(content)),
            })),
          },
        },
      })),
      GatewayIntentBits: {
        Guilds: 1,
      },
    }));

    const mockContent = {
      username: 'ptarbet0',
      gifUrl: 'https://example.com/gif',
      text: 'Congratulations!',
      sprintTitle: 'First Steps Into Programming with Python',
    };

    const result = await services.sendBotMessage(mockContent);

    expect(result).toEqual({
      content: `https://example.com/gif\nptarbet0 has just completed the First Steps Into Programming with Python. Congratulations!`,
    });
  });
});
