# Accomplishments Bot API

## About

Accomplishments Bot is a REST API for sending customized congratulatory messages from a bot to Discord server.

The purpose of this app is to congratulate students for finishing study program sprints.

API lets you create, update and delete sprint titles and congratulatory text templates.

## Built With

<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>

## Endpoints

### Messages

- To send a message to Discord channel make a POST request and provide _username_ and _sprint code_ in the request body. Messages are sent with a random GIF and congratulatory text

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/31a539c0-5650-4b6e-ad7d-d7f791aaab5d)

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/cc673fc4-ed4d-43d2-b631-58c0bcf64458)

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/6c208905-c2f5-4232-bc60-5bce41f289e0)

- To retrieve all sent messages make a GET request. To filter messages by user or sprint provide _username_ and/or _sprint_ in query parameters

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/d37c5f7d-a4ad-4999-bac6-e11290f33b40)

### Sprints

- **Retrieve**: make a GET request

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/9299850a-6ef2-4d0f-b75b-ad7b7225682e)

- **Create**: make a POST request and provide _code_ and _title_ in the request body

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/fb3e9b9a-e9d4-4951-8c0c-d0aebc649a55)

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/a5b1d796-5c1d-4934-811f-566021f12c87)

- **Update**: make a PATCH request and provide _sprint ID_ as a parameter and updated _code_ and/or _title_ in the body

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/29eeaf16-8f3a-44ba-a0b3-3e58077333ed)

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/24fdfcf0-1f92-4fc9-bebd-f3c1aa8ad39b)

- **Delete**: make a DELETE request and provide _sprint id_ as a parameter

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/362e0aa0-3591-4b3e-a50f-3db83140b250)

### Templates

- **Retrieve**: make a GET request

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/3af38849-034e-4170-ae75-d6f9487e2db2)

- **Create**: make a POST request and provide _text_ in the request body

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/616ce8e4-424c-4613-bfca-6368ce659446)

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/a264a735-35cd-47a2-8a29-4b043caef1bc)

- **Update**: make a PATCH request and provide _template ID_ as a parameter and updated _text_ in the request body

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/e26cc9ed-0b31-434a-a741-3f2b3d43cfce)

![image](https://github.com/miglemr/accomplishments-bot/assets/113340648/fb53cdef-cfce-4e7f-ab08-610c1a51a2da)

## Setup

Install node modules `npm install`

Add variables to .env file (see .env.example)

### Migrations

Before running the migrations create a database. Do this by running the following command:

```bash
npm run migrate:latest
```

### Running the server

In development mode:

```bash
npm run dev
```

### Updating types

If you make changes to the database schema, you will need to update the types. You can do this by running the following command:

```bash
npm run gen:types
```

## Tests

### Running tests

```bash
npm run test
```

### Running test coverage

```bash
npm run coverage
```

## API reference

[Discord.js](https://old.discordjs.dev/#/docs/discord.js/main/general/welcome) Node.js module that allows you to interact with the Discord API very easily <br>
[Tenor Gif](https://developers.google.com/tenor/guides/quickstart) Tenor GIF API seamlessly integrates all of the best features of Tenor's GIF library into your app

