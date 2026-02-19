# ASCII Flow

```text
Client
  |
  | POST /files (multipart/form-data)
  v
Express
  +--> multer validation (size/type)
  +--> save binary to /uploads
  +--> save metadata in Postgres
  +--> return file id

Client -> GET /files/:id
  +--> read metadata from Postgres
  +--> stream file from disk
```
