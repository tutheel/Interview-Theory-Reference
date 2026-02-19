# middleWareExamples

Express middleware pattern demo service.

## Setup
1. `Copy-Item .env.example .env`
2. `docker-compose up -d`
3. `npm i`
4. `npx prisma migrate deploy`
5. `npx prisma db seed`
6. `npm run dev`

App port: `3006`  
Postgres port: `5438`

## Endpoints
- `GET /middleware/correlation`
- `POST /middleware/validate`
- `GET /middleware/protected`
- `GET /middleware/rate-limited`
- `GET /middleware/error`
- `GET /health`
- `GET /ready`

## Notes
- Demonstrates correlation id, logging, validation, auth guard, rate limiting, and global error handling.
