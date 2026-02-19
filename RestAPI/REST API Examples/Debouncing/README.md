# Debouncing

Express + JavaScript demo of server-side debouncing by userId.

## Setup
1. `Copy-Item .env.example .env`
2. `docker-compose up -d`
3. `npm i`
4. `npx prisma migrate deploy`
5. `npx prisma db seed`
6. `npm run dev`

App port: `3009`  
Postgres port: `5441`

## Endpoints
- `POST /search` body: `{ query, userId }`
- `GET /search/:requestId`
- `GET /health`
- `GET /ready`

## Notes
- Server waits a debounce window per `userId` before running search.
- Returns `requestId` immediately; poll status/result via GET endpoint.
- This is a concept demo; debouncing is usually client-side.
