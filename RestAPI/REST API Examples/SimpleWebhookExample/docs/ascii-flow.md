# ASCII Flow

```text
Webhook Sender
  |
  | POST /webhooks/demo + x-webhook-signature
  v
Express
  +--> validate payload
  +--> verify HMAC SHA256 signature
  +--> check idempotency by eventId in Postgres
        |
        +--> duplicate => return 200 duplicate
        +--> new => insert event row
                  +--> async Promise delay
                  +--> update processedAt
                  +--> return 202 accepted
```
