# AniStop-api
API for AniStop. This is the backend.

[Frontend](https://github.com/resyfer/anistop-client)

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
