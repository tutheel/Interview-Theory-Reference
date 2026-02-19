# RateLimiting

Express + JavaScript service demonstrating IP-based and API-key-based rate limiting.

## Setup
1. `Copy-Item .env.example .env`
2. `docker-compose up -d`
3. `npm i`
4. `npx prisma migrate deploy`
5. `npx prisma db seed`
6. `npm run dev`

App port: `3010`  
Postgres port: `5442`

## Endpoints
- `GET /limited`
- `GET /limited/config`
- `GET /health`
- `GET /ready`

## Notes
- `/limited` uses IP limiter by default.
- If `x-api-key` header exists, API-key limiter is used.
- Exceeded quota returns `429`.
