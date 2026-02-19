# ASCII Flow

```text
Client
  |
  | GET /weather?city=Seattle
  v
Express
  +--> validation
  +--> cache lookup (Map + TTL 60s)
        |
        +--> cache hit -> return cached=true
        |
        +--> cache miss:
              1) Open-Meteo geocoding API
              2) Open-Meteo forecast API
              3) cache result for 60s
              4) return cached=false
```
