# CRUD Operations on PostgresDB

Standalone Express + JavaScript CRUD service for users and products on Postgres.

## Setup
1. Copy env:
   - `Copy-Item .env.example .env`
2. Start Postgres:
   - `docker-compose up -d`
3. Install dependencies:
   - `npm i`
4. Run migrations + seed:
   - `npx prisma migrate deploy`
   - `npx prisma db seed`
5. Start server:
   - `npm run dev`

App port: `3001`  
Postgres port: `5433`

## Swagger
- `GET /docs`
- `GET /docs.json`

## Endpoints
- `GET /health`
- `GET /ready`
- `GET /users`
- `POST /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

## Notes
- Standard error format with correlation id.
- Validation via Zod.
- Pagination, filtering, and sorting on list endpoints.
