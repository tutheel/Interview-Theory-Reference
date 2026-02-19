# Test with curl

```bash
curl -i http://localhost:3010/health
curl -i http://localhost:3010/ready
curl -i http://localhost:3010/limited/config

# IP-based limiting
curl -i http://localhost:3010/limited
curl -i http://localhost:3010/limited

# API-key limiting
curl -i http://localhost:3010/limited -H "x-api-key: demo-key"
curl -i http://localhost:3010/limited -H "x-api-key: demo-key"
```
