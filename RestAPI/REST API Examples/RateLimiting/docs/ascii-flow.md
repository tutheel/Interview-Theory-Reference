# ASCII Flow

```text
Client
  |
  | GET /limited
  v
Express
  +--> if x-api-key exists: use API-key limiter
  +--> else: use IP limiter
  +--> limit exceeded => 429
  +--> else => 200
```
