# Test with curl

```bash
# health
curl -i http://localhost:3001/health

# ready
curl -i http://localhost:3001/ready

# create user
curl -i -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"email":"new.user@example.com","name":"New User"}'

# list users
curl -i "http://localhost:3001/users?page=1&limit=5&search=alice&sortBy=name&sortOrder=asc"

# create product
curl -i -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse","description":"Wireless","price":59.99}'

# list products
curl -i "http://localhost:3001/products?page=1&limit=5&search=lap&minPrice=10&maxPrice=2000&sortBy=price&sortOrder=asc"
```
