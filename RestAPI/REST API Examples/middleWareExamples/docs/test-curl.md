# Test with curl

```bash
curl -i http://localhost:3006/health
curl -i http://localhost:3006/ready

curl -i http://localhost:3006/middleware/correlation

curl -i -X POST http://localhost:3006/middleware/validate \
  -H "Content-Type: application/json" \
  -d '{"name":"Middleware Demo"}'

curl -i http://localhost:3006/middleware/protected \
  -H "Authorization: Bearer demo-token"

curl -i http://localhost:3006/middleware/rate-limited
curl -i http://localhost:3006/middleware/error
```
