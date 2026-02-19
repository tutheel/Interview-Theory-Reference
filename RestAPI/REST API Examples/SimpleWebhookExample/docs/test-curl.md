# Test with curl

```bash
curl -i http://localhost:3004/health
curl -i http://localhost:3004/ready

BODY='{"eventId":"evt-1001","type":"demo.created","payload":{"a":1}}'
SIG=$(printf "%s" "$BODY" | openssl dgst -sha256 -hmac "demo-webhook-secret" -binary | xxd -p -c 256)

curl -i -X POST http://localhost:3004/webhooks/demo \
  -H "Content-Type: application/json" \
  -H "x-webhook-signature: $SIG" \
  -d "$BODY"

curl -i "http://localhost:3004/webhooks/events?page=1&limit=20"
```
