# Test with curl

```bash
curl -i http://localhost:3009/health
curl -i http://localhost:3009/ready

curl -i -X POST http://localhost:3009/search \
  -H "Content-Type: application/json" \
  -d '{"query":"api","userId":"user-1"}'

curl -i http://localhost:3009/search/<REQUEST_ID>
```

Note: server-side debouncing is used here only as a concept demo.
