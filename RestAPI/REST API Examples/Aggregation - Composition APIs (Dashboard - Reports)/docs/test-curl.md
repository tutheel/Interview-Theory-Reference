# Test with curl

```bash
curl -i http://localhost:3008/health
curl -i http://localhost:3008/ready

curl -i "http://localhost:3008/dashboard"
curl -i "http://localhost:3008/dashboard?timeoutMs=600"

curl -i "http://localhost:3008/reports/summary?days=30"
```
