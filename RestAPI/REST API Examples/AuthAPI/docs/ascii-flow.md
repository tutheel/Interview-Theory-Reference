# ASCII Flow

```text
Client
  |
  | POST /auth/login
  v
Express
  +--> validate body (zod)
  +--> find user (Prisma -> Postgres)
  +--> bcrypt compare
  +--> sign access JWT
  +--> sign refresh JWT + save refresh token row
  +--> return tokens

Client
  |
  | POST /auth/refresh
  v
Express
  +--> verify refresh JWT
  +--> fetch refresh token row
  +--> revoke old token
  +--> create + persist new refresh token
  +--> return rotated token pair
```
