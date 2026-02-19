# ASCII Flow

```text
Client
  |
  | GET /throttle
  v
Express
  +--> identify key (x-api-key or IP)
  +--> refill tokens based on elapsed time
  +--> if tokens >= 1 consume one and return 200
  +--> else return 429 + Retry-After
```
