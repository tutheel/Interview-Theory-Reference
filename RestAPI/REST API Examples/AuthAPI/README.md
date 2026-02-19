# AuthAPI

Standalone Express + JavaScript auth service with JWT access + refresh tokens.

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
5. Start service:
   - `npm run dev`

App port: `3002`  
Postgres port: `5434`

## Swagger
- `GET /docs`
- `GET /docs.json`

## Endpoints
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /me`
- `GET /health`
- `GET /ready`

## Notes
- Password hashing via bcrypt.
- Refresh token rotation (old token revoked, new token issued).
- Refresh tokens stored in Postgres.
