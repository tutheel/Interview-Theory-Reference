# Setup

```bash
cp .env.example .env
docker-compose up -d
npm i
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Swagger: http://localhost:3005/docs
