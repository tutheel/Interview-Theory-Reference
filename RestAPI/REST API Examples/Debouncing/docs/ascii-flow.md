# ASCII Flow

```text
Client
  |
  | POST /search {query,userId}
  v
Express
  +--> validate body
  +--> create requestId + pending state
  +--> clear existing timer for same userId
  +--> start new timer (debounce window)
  +--> return requestId immediately

Timer fires
  +--> execute in-memory search
  +--> mark request completed
  +--> write audit row to Postgres

Client polls GET /search/:requestId for status/result
```
