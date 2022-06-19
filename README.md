# AniStop-api
API for AniStop. This is the backend.

AniStop is a multimedia streaming and management platform where you can keep track of all the shows you've watched as well the ratings for them. It also lets you check on the characters, their voice actors, the shows they're in as well. AniStop utilizes PostgreSQL's full-text search to bring a search that searches show that feels like it read your mind.

[Frontend](https://github.com/resyfer/anistop-client)

## Tech Stack
- TypeScript
- Vue 3
- SASS
- Vite
- AWS S3
- NodeJS
- Express
- Prisma
- PostgreSQL

## Installation
- Ensure postgres is installed.

- Copy `.env.example` as `.env` in the same location and replace values as needed.

- Clone the repo and then
```
yarn install
yarn prisma:migrate
```
to setup the server.

- To start up the server
```
yarn dev
```

NOTE: The front end is separately started and instructions are given in the [front-end repo](https://github.com/resyfer/anistop-client)
