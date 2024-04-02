## Getting started

This is an instruction of how to run project locally.
To get a local copy up and running follow these simple example steps.

### Run with Docker

This is instruction how to run locally with docker

1. Rename `.env-example` to `.env`. If you want to use your own db, just change env credentials.
2. Run the command
   ```sh
   docker compose up
   ```

### Run locally with npm

1. Rename `.env-example` to `.env` and provide needed credentials.
2. Install dependencies
   ```sh
   npm install
   ```
3. Run the project to init models
   ```sh
   npm run start
   ```
4. Run migrations
   ```sh
   npm run db:migrate
   ```
5. Start the project
   ```sh
   npm run start
   ```
