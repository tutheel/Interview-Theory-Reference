# FileUploadandDownloadAPI

Express + JavaScript file API with disk uploads and Postgres metadata.

## Setup
1. `Copy-Item .env.example .env`
2. `docker-compose up -d`
3. `npm i`
4. `npx prisma migrate deploy`
5. `npx prisma db seed`
6. `npm run dev`

App port: `3005`  
Postgres port: `5437`

## Endpoints
- `POST /files` (multipart upload)
- `GET /files`
- `GET /files/:id`
- `DELETE /files/:id`
- `GET /health`
- `GET /ready`

## Notes
- Uploaded files stored in `/uploads`.
- Metadata stored in Postgres.
- File size/type restrictions configured via env.
