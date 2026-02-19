# Setup

1. Copy env file:
```bash
cp .env.example .env
```

2. Start Postgres:
```bash
docker-compose up -d
```

3. Install dependencies:
```bash
npm i
```

4. Run migrations and seed:
```bash
npx prisma migrate deploy
npx prisma db seed
```

5. Start the service:
```bash
npm run dev
```

6. Open Swagger:
- http://localhost:3001/docs
