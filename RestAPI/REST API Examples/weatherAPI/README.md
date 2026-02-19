# weatherAPI

Express + JavaScript weather service using free Open-Meteo APIs (no API key required).

## Setup
1. `Copy-Item .env.example .env`
2. `docker-compose up -d`
3. `npm i`
4. `npx prisma migrate deploy`
5. `npx prisma db seed`
6. `npm run dev`

App port: `3003`  
Postgres port: `5435`

## Endpoints
- `GET /weather?city=...`
- `GET /weather/latlon?lat=...&lon=...`
- `GET /health`
- `GET /ready`

## Notes
- 60-second in-memory cache with Map + TTL.
- Uses geocoding + forecast from Open-Meteo.
