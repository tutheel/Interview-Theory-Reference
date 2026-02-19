# REST API Examples

Monorepo with 11 standalone Express + JavaScript backend services for interview prep and Postman testing.

## Services
- `CRUD Operations on PostgresDB` (App: 3001, Postgres: 5433)
- `AuthAPI` (App: 3002, Postgres: 5434)
- `weatherAPI` (App: 3003, Postgres: 5435)
- `SimpleWebhookExample` (App: 3004, Postgres: 5436)
- `FileUploadandDownloadAPI` (App: 3005, Postgres: 5437)
- `middleWareExamples` (App: 3006, Postgres: 5438)
- `QueryReadAPI's (Search, Filter, Pagination)` (App: 3007, Postgres: 5439)
- `Aggregation - Composition APIs (Dashboard - Reports)` (App: 3008, Postgres: 5440)
- `Debouncing` (App: 3009, Postgres: 5441)
- `RateLimiting` (App: 3010, Postgres: 5442)
- `throttling` (App: 3011, Postgres: 5443)

## Common setup per service
```bash
cd "<service-folder>"
cp .env.example .env
docker-compose up -d
npm i
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Swagger UI for every service:
- `GET /docs`

Common non-functional features in every service:
- Zod validation
- Standard error format
- Global error middleware
- Pino logging + `x-correlation-id`
- Helmet + CORS + JSON payload limits
- `GET /health` and `GET /ready`
- Jest + Supertest tests (>= 3)
