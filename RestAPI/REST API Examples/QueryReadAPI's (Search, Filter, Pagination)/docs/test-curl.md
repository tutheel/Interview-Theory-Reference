# Test with curl

```bash
curl -i http://localhost:3007/health
curl -i http://localhost:3007/ready

curl -i "http://localhost:3007/items?search=desk&filter=home&sort=price:asc&page=1&limit=5"

curl -i "http://localhost:3007/items/cursor?limit=3"
curl -i "http://localhost:3007/items/cursor?cursor=<NEXT_CURSOR>&limit=3"
```
