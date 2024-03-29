# Accomplishments Bot

## About

Accomplishments Bot is a REST API app that sends a congratulatory message to a Discord channel.

App lets you create, update and delete sprints and congratulatory text templates.

## Tech/Framework used

TypeScript

Express.js

Kysely

Zod

## Requests

**Messages**

To send a message to Discord channel provide _username_ and _sprintCode_ in the body.

{

"username": "ptarbet0",

"sprintCode": "WD-1.3"

}

Messages are sent with a random GIF and congratulatory text.

To get all sent messages by user or sprint provide the _username_ and/or _sprint_ in query parameters.

**Sprints**

To create a sprint provide _code_ and _title_ in the request body.

To update a sprint provide **sprint ID** as a parameter and updated _code_ and/or _title_ in the body.

**Templates**

To create a template provide _text_ in the request body.

To update a template provide **template ID** as a parameter and updated _text_ in the body.

## Setup

Install node modules

```bash
npm install
```

Add variables to .env file (see .env.example)

### Migrations

Before running the migrations, we need to create a database. We can do this by running the following command:

```bash
npm run migrate:latest
```

### Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run start
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

[Discord.js](https://old.discordjs.dev/#/docs/discord.js/main/general/welcome)
[Tenor Gif](https://developers.google.com/tenor/guides/quickstart)
