# ASCII Flow

```text
Client
  |
  | HTTP request (/users or /products)
  v
Express App
  |
  +--> Security middleware (helmet, cors, body limit)
  +--> Correlation ID + logger
  +--> Zod validation
  +--> Route handler
          |
          +--> Prisma query/mutation
                  |
                  +--> Postgres (5433)
          |
          +--> JSON response (data or standardized error)
```
