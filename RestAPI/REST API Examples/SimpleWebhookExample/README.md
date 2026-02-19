# SimpleWebhookExample

Express + JavaScript webhook demo with HMAC verification and idempotency.

## Setup
1. `Copy-Item .env.example .env`
2. `docker-compose up -d`
3. `npm i`
4. `npx prisma migrate deploy`
5. `npx prisma db seed`
6. `npm run dev`

App port: `3004`  
Postgres port: `5436`

## Endpoints
- `POST /webhooks/demo`
- `GET /webhooks/events`
- `GET /health`
- `GET /ready`

## Notes
- HMAC SHA256 signature header: `x-webhook-signature`
- Idempotency by `eventId`.
- Async processing simulated with Promise delay in same Node process.
