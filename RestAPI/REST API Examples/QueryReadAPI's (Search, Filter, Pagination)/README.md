# QueryReadAPI's (Search, Filter, Pagination)

Express + JavaScript query-read service for catalog search/filter/sort/pagination.

## Setup
1. `Copy-Item .env.example .env`
2. `docker-compose up -d`
3. `npm i`
4. `npx prisma migrate deploy`
5. `npx prisma db seed`
6. `npm run dev`

App port: `3007`  
Postgres port: `5439`

## Endpoints
- `GET /items?search=&filter=&sort=&page=&limit=`
- `GET /items/cursor?cursor=&limit=`
- `GET /health`
- `GET /ready`

## Indexes
- `@@index([name])`
- `@@index([category, createdAt])`

## Offset vs Cursor
- Offset is simple and supports random pages (`page` + `limit`) but slows with large offsets.
- Cursor uses a stable key (`id`) and scales better for deep pagination.
