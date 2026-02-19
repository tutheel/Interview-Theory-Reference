# ASCII Flow

```text
Client
  |
  | GET /items?search=&filter=&sort=&page=&limit=
  v
Express
  +--> validate query
  +--> build WHERE + ORDER BY
  +--> Prisma findMany + count
  +--> Postgres indexes on name/category
  +--> return offset pagination payload

Client -> GET /items/cursor
  +--> cursor query by id
  +--> fetch limit+1
  +--> compute nextCursor
```
