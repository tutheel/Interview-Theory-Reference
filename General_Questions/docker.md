# Docker Interview Q&A (Core Concepts) - 25 Questions

## 1) What is Docker, and how is it different from a virtual machine?

**Answer:**

Docker is a container platform that packages an application with its dependencies and runs it as an isolated process.

- Containers share the host OS kernel
- Virtual machines include a full guest OS
- Containers are usually faster to start and lighter in size
- VMs provide stronger isolation, but with more overhead

```text
Containers
+---------------- Host Machine ----------------+
| Host OS                                     |
| Docker Engine                               |
|  +-----------+  +-----------+  +-----------+|
|  | App A     |  | App B     |  | App C     ||
|  | libs      |  | libs      |  | libs      ||
|  +-----------+  +-----------+  +-----------+|
+---------------------------------------------+

Virtual Machines
+---------------- Host Machine ----------------+
| Host OS + Hypervisor                        |
|  +----------------+  +----------------+     |
|  | Guest OS       |  | Guest OS       |     |
|  | App + libs     |  | App + libs     |     |
|  +----------------+  +----------------+     |
+---------------------------------------------+
```

```bash
docker run -d -p 8080:80 nginx
```

This starts an isolated Nginx container without booting a full VM.

---

## 2) What is a Docker image?

**Answer:**

A Docker image is a read-only blueprint used to create containers.

- It contains app code, runtime, libraries, and metadata
- It is built in layers
- It is immutable once built

```text
Docker Image
+---------------------------+
| App code layer            |
| Dependencies layer        |
| Base image layer          |
+---------------------------+
```

```bash
docker pull node:20-alpine
docker image ls
docker history node:20-alpine
```

---

## 3) What is a Docker container?

**Answer:**

A container is a running instance of an image.

- The image is the template
- The container is the live process
- A container gets a thin writable layer on top of the image
- If the container is removed, that writable layer is lost unless data is mounted outside it

```text
             +------------------+
             | node:20-alpine   |
             | image            |
             +------------------+
                 /          \
                /            \
     +----------------+   +----------------+
     | container A    |   | container B    |
     | writable layer |   | writable layer |
     +----------------+   +----------------+
```

```bash
docker run -it --name demo node:20-alpine sh
docker exec -it demo sh
```

---

## 4) What is the difference between a Docker image and a Docker container?

**Answer:**

- **Image**: static, read-only template
- **Container**: running or stopped instance created from an image
- One image can create many containers
- Images are stored in registries or local cache, containers live on the Docker host

```bash
docker image ls
docker ps -a
```

```text
Image -> blueprint
Container -> blueprint + running process + writable layer
```

---

## 5) What is a Dockerfile?

**Answer:**

A Dockerfile is a text file containing instructions for building a Docker image.

Common instructions:

- `FROM` for base image
- `WORKDIR` for working directory
- `COPY` for files
- `RUN` for build-time commands
- `CMD` or `ENTRYPOINT` for the startup command

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t my-node-app .
```

---

## 6) What is the use of the FROM instruction in a Dockerfile?

**Answer:**

`FROM` sets the base image for the build.

- Every Dockerfile starts from some base
- It can be a language runtime like `node:20-alpine`
- It can also start a named stage in multi-stage builds
- In minimal cases, it can even be `scratch`

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
```

```dockerfile
FROM scratch
COPY my-binary /my-binary
CMD ["/my-binary"]
```

Without `FROM`, Docker does not know what filesystem and runtime to build on.

---

## 7) What is the difference between CMD and ENTRYPOINT?

**Answer:**

- `CMD` provides the default command or default arguments
- `ENTRYPOINT` defines the main executable that should always run
- `CMD` is easy to override from `docker run`
- `ENTRYPOINT` is usually used when the container should behave like a fixed executable

```dockerfile
FROM alpine
CMD ["echo", "hello"]
```

```bash
docker run my-image
# runs: echo hello

docker run my-image echo bye
# runs: echo bye
```

```dockerfile
FROM alpine
ENTRYPOINT ["echo"]
CMD ["hello"]
```

```bash
docker run my-image
# runs: echo hello

docker run my-image bye
# runs: echo bye
```

If you want to override `ENTRYPOINT`, use `--entrypoint`.

---

## 8) What is the difference between RUN, CMD, and ENTRYPOINT?

**Answer:**

- `RUN` executes during image build and creates a new image layer
- `CMD` sets the default command for container start
- `ENTRYPOINT` sets the fixed executable for container start

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENTRYPOINT ["node", "server.js"]
CMD ["--port=3000"]
```

```text
Build time
  RUN npm ci

Container start time
  ENTRYPOINT ["node", "server.js"]
  CMD ["--port=3000"]
```

Interview shortcut:

- `RUN` = build time
- `CMD` = default runtime command
- `ENTRYPOINT` = locked runtime executable

---

## 9) What is the purpose of EXPOSE in Docker?

**Answer:**

`EXPOSE` documents which port the container listens on.

- It does not publish the port to the host
- It is mainly image metadata and documentation
- To access the container from outside, you still need `-p` or `--publish`

```dockerfile
EXPOSE 3000
```

```bash
docker run -p 3000:3000 my-app
```

```text
Browser ---> Host port 3000 ---> Container port 3000
                ^
                |
           published with -p
```

---

## 10) What is Docker Hub?

**Answer:**

Docker Hub is Docker's public image registry.

- You can pull official and community images from it
- You can push your own images to it
- It is similar to a package repository for container images

```bash
docker pull redis:7-alpine
docker login
docker tag my-app yourname/my-app:1.0.0
docker push yourname/my-app:1.0.0
```

Other registries also exist, like ECR, GCR, GHCR, and ACR.

---

## 11) What is the difference between COPY and ADD in Dockerfile?

**Answer:**

- `COPY` copies files and folders from the build context into the image
- `ADD` can do everything `COPY` does, plus extra features like extracting local tar files
- In interviews and production, prefer `COPY` unless you specifically need `ADD`

```dockerfile
COPY package*.json ./
COPY src ./src
```

```dockerfile
ADD app.tar.gz /app/
```

Why `COPY` is preferred:

- More predictable
- Easier to read
- Avoids accidental behavior

---

## 12) What is a Docker volume, and why is it used?

**Answer:**

A volume is persistent storage managed by Docker.

- It keeps data outside the container's writable layer
- Data survives container recreation
- It is commonly used for databases, uploads, and logs

```text
+-------------+        +------------------+
| Container    | ----> | Docker Volume    |
| /var/lib/db  |       | persistent data  |
+-------------+        +------------------+
```

```bash
docker volume create postgres_data
docker run -d \
  --name db \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:16
```

If the `db` container is deleted and recreated, the database files remain in the volume.

---

## 13) What is the difference between bind mount, volume, and tmpfs mount?

**Answer:**

- **Bind mount**: maps an exact host path into the container
- **Volume**: managed by Docker and better for persistent app data
- **tmpfs**: stored in memory only, not persisted to disk

```bash
docker run --mount type=bind,src=/host/project,dst=/app my-image
docker run --mount type=volume,src=db_data,dst=/var/lib/postgresql/data postgres:16
docker run --mount type=tmpfs,dst=/tmp my-image
```

```text
Bind mount  -> host folder directly
Volume      -> Docker-managed storage
tmpfs       -> RAM only
```

Typical usage:

- Bind mount for local development
- Volume for database persistence
- tmpfs for temporary sensitive or high-speed files

---

## 14) What is Docker Compose, and why do we use it?

**Answer:**

Docker Compose lets you define and run multi-container applications using a YAML file.

- Good for local development and integration testing
- Starts multiple services with one command
- Creates a shared network for services
- Stores config like ports, volumes, and environment variables in one place

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

```bash
docker compose up -d
```

```text
docker compose
     |
     +--> api service
     |
     +--> db service
```

---

## 15) What is the difference between port mapping like -p 3000:3000 and EXPOSE 3000?

**Answer:**

- `EXPOSE 3000` is documentation inside the image
- `-p 3000:3000` actually publishes the container port to the host

```dockerfile
EXPOSE 3000
```

```bash
docker run my-app
# app may listen on 3000 inside the container, but host cannot access it

docker run -p 3000:3000 my-app
# host port 3000 is now mapped to container port 3000
```

```text
EXPOSE 3000        -> metadata only
-p 3000:3000       -> host networking rule
```

---

## 16) How do you check running containers, stopped containers, images, and logs?

**Answer:**

Use these common commands:

```bash
docker ps
docker ps -a
docker image ls
docker logs my-container
docker logs -f my-container
```

Useful extras:

```bash
docker inspect my-container
docker stats
```

Interview expectation:

- `docker ps` for running containers
- `docker ps -a` for all containers
- `docker image ls` or `docker images` for images
- `docker logs` for stdout and stderr logs

---

## 17) What is the difference between docker stop, docker kill, and docker rm?

**Answer:**

- `docker stop` sends `SIGTERM`, waits, then sends `SIGKILL` if needed
- `docker kill` sends a signal immediately, by default `SIGKILL`
- `docker rm` removes a stopped container from Docker

```bash
docker stop api
docker kill api
docker rm api
docker rm -f api
```

```text
running --docker stop--> exited --docker rm--> removed
running --docker kill--> exited
```

Use `stop` for graceful shutdown and `kill` only when the process is hung or ignores shutdown.

---

## 18) How does networking work in Docker?

**Answer:**

Docker creates virtual networks so containers can talk to each other.

Main network modes:

- `bridge` for normal container-to-container networking on one host
- `host` to share the host network stack
- `none` for no networking
- custom bridge networks for service-to-service DNS by container name

```bash
docker network create app-net

docker run -d --name db --network app-net postgres:16
docker run -d --name api --network app-net -p 3000:3000 my-api
```

Inside the `api` container, the database can be reached by hostname `db`.

```text
Browser -> localhost:3000 -> api container
                              |
                              v
                         db:5432 on app-net
```

In Docker Compose, services automatically get a shared network and can usually reach each other by service name.

---

## 19) How do you reduce Docker image size?

**Answer:**

Common ways:

- Use a smaller base image when compatible
- Use multi-stage builds
- Copy only needed files
- Add a `.dockerignore`
- Install only production dependencies
- Clean up temporary files in the same layer

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src ./src

CMD ["node", "src/server.js"]
```

```gitignore
node_modules
.git
coverage
dist
*.log
```

Good Dockerfiles reduce both image size and rebuild time.

---

## 20) What are multi-stage builds in Docker, and why are they useful?

**Answer:**

Multi-stage builds use multiple `FROM` instructions so you can build in one stage and ship only the final runtime output.

- Keeps build tools out of the final image
- Reduces image size
- Improves security by shipping fewer packages

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
CMD ["node", "dist/server.js"]
```

```text
Stage 1: build
  source code + dev deps -> compiled output

Stage 2: runtime
  only dist/ + prod deps
```

This is one of the most important Docker optimization topics for interviews.

---

## Bonus: 5 Commonly Asked Docker Interview Questions

## 21) What is the difference between Docker Compose and Docker Swarm/Kubernetes?

**Answer:**

- **Docker Compose** is for defining and running multi-container apps, mostly on a single machine
- **Docker Swarm** is Docker's native clustering/orchestration solution
- **Kubernetes** is a full container orchestration platform for large-scale production systems

```text
Compose
  One machine
  app + db + cache

Kubernetes
  Many machines
  scheduler + scaling + self-healing + rolling updates
```

```bash
docker compose up -d
kubectl apply -f deployment.yaml
```

Interview summary:

- Compose = local/dev or simple setups
- Swarm/Kubernetes = production orchestration across multiple nodes

---

## 22) How do you pass environment variables into a container?

**Answer:**

Common ways:

- `-e KEY=value`
- `--env-file .env`
- Compose `environment` or `env_file`

```bash
docker run -e NODE_ENV=production -e PORT=3000 my-app
docker run --env-file .env my-app
```

```yaml
services:
  api:
    image: my-app
    environment:
      NODE_ENV: production
      PORT: 3000
    env_file:
      - .env
```

Do not bake secrets directly into the image. Pass them at runtime or use a secret manager.

---

## 23) How do you debug a container that keeps crashing?

**Answer:**

Start with the basics:

```bash
docker ps -a
docker logs my-container
docker inspect my-container
```

Useful debugging moves:

```bash
docker run -it --entrypoint sh my-image
docker exec -it running-container sh
docker inspect my-container --format '{{.State.ExitCode}}'
```

```text
1. Check exit status
2. Read logs
3. Inspect config and env
4. Start with a shell instead of normal entrypoint
5. Verify files, ports, and permissions inside the container
```

Typical causes:

- wrong startup command
- missing environment variables
- app binds to wrong host or port
- missing files after `COPY`
- permission errors

---

## 24) What is layer caching in Docker?

**Answer:**

Docker caches image layers instruction by instruction.

- If an instruction and its inputs do not change, Docker can reuse the cached layer
- If an early layer changes, the later layers must rebuild
- Dockerfile order matters a lot for build speed

```dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
```

```text
Layer 1: FROM node:20-alpine
Layer 2: COPY package*.json
Layer 3: RUN npm ci
Layer 4: COPY source code
Layer 5: RUN npm run build

If only source code changes:
  reuse layers 1, 2, 3
  rebuild layers 4, 5
```

That is why dependency files are usually copied before application source code.

---

## 25) What are the best practices for writing a production-ready Dockerfile?

**Answer:**

Best practices:

- Pin a clear base image version
- Use multi-stage builds
- Keep the final image small
- Use `.dockerignore`
- Run as a non-root user when possible
- Install only production dependencies
- Use exec-form `CMD` and `ENTRYPOINT`
- Keep secrets out of the image
- Expose only the required port

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

```text
Good production image
  small
  repeatable
  secure
  fast to build
  easy to run
```

This is the interview-friendly answer: small image, fewer attack surfaces, reproducible builds, and clean runtime behavior.
