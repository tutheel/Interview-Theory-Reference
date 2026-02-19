# ASCII Flow

```text
Client
  |
  | GET /dashboard
  v
Express
  +--> validate query
  +--> Promise.all([
         DB query (team stats),
         external API call with timeout wrapper
       ])
  +--> one failure -> partial data + warnings[]
  +--> both failures -> 503
  +--> return composed response
```
