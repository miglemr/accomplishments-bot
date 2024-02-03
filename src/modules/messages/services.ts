import { Client, GatewayIntentBits, TextBasedChannel } from 'discord.js';
import { ResponseError } from '@/utils/errors/ResponseError';

export type Message = {
  gifUrl: string;
  text: string;
  username: string;
  sprintTitle: string;
};

const GIF_URL = `https://tenor.googleapis.com/v2/search?q=congratulations&key=${process.env.TENOR_API_KEY}&random=true&contentfilter=medium&limit=1`;

export async function getGifUrl(): Promise<string> {
  const response = await fetchGifApi();

  return response.results[0].url;
}

export async function fetchGifApi(): Promise<any> {
  const response = await fetch(GIF_URL);

  if (!response.ok) {
    throw new ResponseError(response.status, 'Bad GIF fetch response');
  }

  return response.json();
}

export function sendBotMessage(message: Message): Promise<any> {
  return new Promise((resolve, reject) => {
    const { gifUrl, text, username, sprintTitle } = message;
    const content = {
      content: `${gifUrl}\n${username} has just completed the ${sprintTitle}. ${text}`,
    };

    const serverId = process.env.DISCORD_SERVER_ID as string;

    const client = new Client({
      intents: [GatewayIntentBits.Guilds],
    });

    client.on('ready', () => {
      try {
        const channel = client.channels.cache.get(serverId) as TextBasedChannel;

        const messageSent = channel.send(content);

        resolve(messageSent);
      } catch (error) {
        reject(error);
      }
    });

    client.login(process.env.DISCORD_BOT_ID);
  });
}
