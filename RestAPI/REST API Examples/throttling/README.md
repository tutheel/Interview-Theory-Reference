# throttling

Express + JavaScript token-bucket throttling demo.

## Setup
1. `Copy-Item .env.example .env`
2. `docker-compose up -d`
3. `npm i`
4. `npx prisma migrate deploy`
5. `npx prisma db seed`
6. `npm run dev`

App port: `3011`  
Postgres port: `5443`

## Endpoints
- `GET /throttle`
- `GET /throttle/config`
- `GET /health`
- `GET /ready`

## Notes
- In-memory token bucket by IP (or by API key if header is present).
- Configurable capacity/refill via env.
- Throttling limits instantaneous burst rate; rate limiting caps count per window.
