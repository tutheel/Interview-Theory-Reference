# Test with curl

```bash
curl -i http://localhost:3003/health
curl -i http://localhost:3003/ready

curl -i "http://localhost:3003/weather?city=Seattle"
curl -i "http://localhost:3003/weather/latlon?lat=47.6062&lon=-122.3321"
```
