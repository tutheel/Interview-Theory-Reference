# ASCII Flow

```text
Request
  |
  +--> correlation-id middleware
  +--> request logger middleware
  +--> route-specific middleware:
        - validation middleware
        - auth guard middleware
        - rate limiter middleware
  +--> route handler
  +--> global error handler (if exception)
  +--> standardized response
```
