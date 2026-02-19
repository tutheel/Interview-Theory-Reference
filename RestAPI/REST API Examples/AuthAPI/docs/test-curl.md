# Test with curl

```bash
curl -i http://localhost:3002/health
curl -i http://localhost:3002/ready

# register
curl -i -X POST http://localhost:3002/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@example.com","password":"Password123!","name":"User One"}'

# login
curl -i -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@example.com","password":"Password123!"}'

# refresh
curl -i -X POST http://localhost:3002/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<REFRESH_TOKEN>"}'

# logout
curl -i -X POST http://localhost:3002/auth/logout \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<REFRESH_TOKEN>"}'

# me
curl -i http://localhost:3002/me -H "Authorization: Bearer <ACCESS_TOKEN>"
```
