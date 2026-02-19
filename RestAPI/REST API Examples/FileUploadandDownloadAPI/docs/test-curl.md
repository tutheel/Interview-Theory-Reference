# Test with curl

```bash
curl -i http://localhost:3005/health
curl -i http://localhost:3005/ready

curl -i -X POST http://localhost:3005/files \
  -F "file=@./README.md"

curl -i "http://localhost:3005/files?page=1&limit=10"

curl -i http://localhost:3005/files/<FILE_ID> -o downloaded.bin
curl -i -X DELETE http://localhost:3005/files/<FILE_ID>
```
