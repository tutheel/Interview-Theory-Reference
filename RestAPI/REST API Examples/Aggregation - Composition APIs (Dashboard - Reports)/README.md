# Aggregation - Composition APIs (Dashboard - Reports)

Express + JavaScript composition service demonstrating Promise.all, timeouts, and partial failures.

## Setup
1. `Copy-Item .env.example .env`
2. `docker-compose up -d`
3. `npm i`
4. `npx prisma migrate deploy`
5. `npx prisma db seed`
6. `npm run dev`

App port: `3008`  
Postgres port: `5440`

## Endpoints
- `GET /dashboard`
- `GET /reports/summary`
- `GET /health`
- `GET /ready`

## Notes
- `/dashboard` runs one DB query and one external API call in parallel.
- Includes timeout wrapper and partial failure warnings.
