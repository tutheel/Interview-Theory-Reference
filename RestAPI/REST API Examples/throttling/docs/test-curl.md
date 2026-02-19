# Test with curl

```bash
curl -i http://localhost:3011/health
curl -i http://localhost:3011/ready
curl -i http://localhost:3011/throttle/config

curl -i http://localhost:3011/throttle
curl -i http://localhost:3011/throttle

curl -i http://localhost:3011/throttle -H "x-api-key: key-one"
```
