# Docker Interview Q&A (Combined Core Concepts and Additional Topics)

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

---

## Additional Docker Interview Questions

## 26) What are the main features of Docker?

**Answer:**

Docker is popular because it makes applications portable and consistent across environments.

- It packages the app and its dependencies together
- Containers start faster than virtual machines
- Images are versioned and easy to share through registries
- Containers isolate processes and filesystem changes
- Docker works well with CI/CD and modern DevOps workflows

```text
Build once -> ship image -> run consistently
```

---

## 27) What are the pros and cons of Docker?

**Answer:**

**Pros:**

- Consistent behavior across dev, test, and production
- Lightweight compared with full virtual machines
- Fast startup and simpler deployment packaging
- Easy image versioning and rollback

**Cons:**

- Containers share the host kernel, so isolation is weaker than VMs
- Storage and networking need careful setup
- Misconfigured images or privileges can create security risks
- Large multi-container systems usually need orchestration

Interview summary:
Docker improves portability and deployment speed, but you still need good practices around security, persistence, and operations.

---

## 28) What are the main components of Docker?

**Answer:**

Core Docker components include:

- **Docker Client**: the `docker` CLI used to send commands
- **Docker Daemon**: the background service that builds and runs containers
- **Images**: reusable templates for containers
- **Containers**: running instances of images
- **Registries**: places to store and pull images, like Docker Hub
- **Volumes and Networks**: persistent storage and communication layers

```text
docker CLI -> Docker daemon -> images / containers / volumes / networks
```

---

## 29) What are the common states of a Docker container?

**Answer:**

Common container states are:

- `created`
- `running`
- `paused`
- `restarting`
- `exited`

```bash
docker ps -a --format "table {{.Names}}\t{{.Status}}"
```

Interview shortcut:

- running = active process
- paused = frozen temporarily
- exited = stopped process

---

## 30) What is the role of a hypervisor?

**Answer:**

A hypervisor is the software layer that lets multiple virtual machines run on one physical host.

- It creates and manages guest operating systems
- It allocates CPU, memory, storage, and networking to each VM
- It provides stronger isolation than containers, but with more overhead

This is one reason VMs are heavier than Docker containers.

---

## 31) When can data stored inside a container be lost?

**Answer:**

Data written into the container's writable layer is ephemeral.

- It can be lost when the container is removed
- Recreating the container does not preserve that writable layer
- This is why databases and uploads should use volumes or bind mounts

```bash
docker run -d -v pg_data:/var/lib/postgresql/data postgres:16
```

If the container is replaced, the data in `pg_data` still remains.

---

## 32) How do you export and import a Docker image as a tar archive?

**Answer:**

Use `docker save` to export an image and `docker load` to import it on another host.

```bash
docker save -o my-app.tar my-app:1.0
docker load -i my-app.tar
```

Important distinction:

- `save` and `load` are for images
- `export` and `import` are for container filesystems

---

## 33) Can a paused container be removed?

**Answer:**

The safe interview answer is: unpause it, stop it, then remove it.

```bash
docker unpause my-container
docker stop my-container
docker rm my-container
```

That is clearer and safer than trying to remove a paused container directly.

---

## 34) How do you count running, paused, and stopped containers?

**Answer:**

Use `docker ps` with filters and count the results.

```bash
docker ps -q | wc -l
docker ps -aq -f "status=paused" | wc -l
docker ps -aq -f "status=exited" | wc -l
```

This is useful in scripts, dashboards, and quick health checks.

---

## 35) What is the difference between daemon-level logging and container-level logging?

**Answer:**

- **Daemon-level logging** refers to logs and logging configuration for the Docker service itself
- **Container-level logging** refers to stdout and stderr logs produced by a specific container

```bash
docker logs my-container
```

Interview shortcut:

- daemon level = Docker engine behavior
- container level = application output for one container

---

## 36) What does the `docker info` command do?

**Answer:**

`docker info` gives a high-level summary of the current Docker environment.

It typically shows:

- number of containers and images
- storage driver
- logging driver
- CPU and memory availability
- runtimes and other host details

```bash
docker info
```

---

## 37) Where are Docker volumes stored?

**Answer:**

On a typical Linux installation, named volumes are usually stored under:

```text
/var/lib/docker/volumes/
```

Important note:

- the exact location depends on the host OS and Docker backend
- with Docker Desktop, volumes are usually managed inside Docker's internal VM

In practice, teams usually manage volumes with Docker commands rather than browsing the filesystem path directly.

---

## 38) What is the difference between a Docker image and an image layer?

**Answer:**

- A Docker image is the final packaged artifact used to create containers
- A layer is one filesystem change inside that image
- Multiple images can share common layers

```text
Image = ordered stack of layers + metadata
```

This layered design is why Docker builds can reuse cache efficiently.

---

## 39) Can a container restart automatically?

**Answer:**

Yes. Docker supports restart policies that automatically restart containers in specific situations.

```bash
docker run -d --restart unless-stopped nginx
```

Common reasons to use restart policies:

- recover from app crashes
- restart after the Docker daemon restarts
- keep long-running services available

---

## 40) What are Docker object labels?

**Answer:**

Labels are key-value metadata attached to Docker objects such as images, containers, volumes, and networks.

Typical uses:

- environment tagging
- ownership and team mapping
- automation and filtering
- version or service metadata

```bash
docker run -d --label environment=prod --label team=payments nginx
```

---

## 41) How do you check Docker client and server versions?

**Answer:**

Use the `docker version` command.

```bash
docker version
```

It shows:

- client version
- server version
- API version
- platform details

---

## 42) What does `docker system prune` do?

**Answer:**

`docker system prune` removes unused Docker resources and helps free disk space.

It can clean:

- stopped containers
- unused networks
- dangling or unused images
- build cache

```bash
docker system prune
docker system prune -a
```

Use it carefully because it deletes resources Docker considers unused.

---

## 43) What is Docker Swarm?

**Answer:**

Docker Swarm is Docker's built-in orchestration mode for managing services across multiple nodes.

It provides:

- service replicas
- rolling updates
- service discovery
- built-in load balancing

```bash
docker swarm init
docker service create --name web -p 80:80 nginx
```

Compared with Kubernetes, Swarm is simpler but less feature-rich.

---

## 44) How do you scale Docker containers horizontally?

**Answer:**

Horizontal scaling means running multiple instances of the same service.

Examples:

```bash
docker compose up -d --scale web=3
docker service scale web=5
```

Why teams do this:

- handle more traffic
- improve availability
- reduce single-container bottlenecks

---

## 45) What is the difference between restart policies `no`, `on-failure`, and `always`?

**Answer:**

- `no`: never restart automatically
- `on-failure`: restart only if the container exits with a non-zero status
- `always`: restart regardless of how it exited

```bash
docker run --restart no my-app
docker run --restart on-failure:3 my-app
docker run --restart always my-app
```

One more policy often seen in practice is `unless-stopped`.

---

## 46) How do you inspect Docker image metadata?

**Answer:**

Use `docker inspect` on the image.

```bash
docker inspect nginx:latest
```

This helps you view:

- labels
- environment variables
- entrypoint and command
- architecture and OS
- low-level config metadata

---

## 47) How do you limit CPU and memory for a Docker container?

**Answer:**

Set resource limits when starting the container.

```bash
docker run --cpus="2.0" -m 1g my-app
```

This helps:

- protect the host from noisy containers
- prevent one service from consuming all resources
- make performance behavior more predictable

---

## 48) What is the purpose of `docker checkpoint`?

**Answer:**

`docker checkpoint` captures the runtime state of a container so it can later be restored on a compatible system.

```bash
docker checkpoint create my-container checkpoint-1
```

Important interview note:

- it is a specialized feature
- it depends on runtime and kernel support
- it is not part of most everyday Docker workflows

---

## 49) What is the lifecycle of a Docker container?

**Answer:**

A container usually moves through these stages:

- created
- running
- paused
- exited
- removed

```text
create -> start -> running -> stop -> exited -> rm
```

If a restart policy is set, the container can move back into `running` automatically.

---

## 50) How do you control startup order in Docker Compose?

**Answer:**

Use `depends_on` to declare service dependencies.

```yaml
services:
  api:
    build: .
    depends_on:
      - db

  db:
    image: postgres:16
```

Important detail:

- `depends_on` controls startup order
- it does not guarantee the dependency is fully ready
- use health checks or retry logic if readiness matters

---

## 51) How does Docker handle isolation and security?

**Answer:**

Docker uses Linux kernel features and runtime restrictions to isolate containers.

Key mechanisms:

- namespaces for process, network, and filesystem isolation
- cgroups for resource limits
- capabilities to reduce privileges
- seccomp and other runtime security options

Interview summary:
containers give process-level isolation, but not the same boundary as a full virtual machine.

---

## 52) How do the Docker client and Docker daemon communicate?

**Answer:**

The Docker client sends requests to the Docker daemon through the Docker API.

This usually happens over:

- a Unix socket on Linux
- a named pipe on Windows
- optionally a TCP endpoint

```text
docker CLI -> Docker API -> dockerd
```

The daemon then builds images, starts containers, and manages networks and volumes.

---

## 53) How is Docker used in CI/CD pipelines?

**Answer:**

Docker makes CI/CD more predictable because builds, tests, and deployments can use the same packaged environment.

Common pattern:

- build the image in CI
- run tests inside the image
- push the image to a registry
- deploy the same image to staging and production

```text
build -> test -> push -> deploy
```

---

## 54) Is it a good practice to run stateful applications in Docker?

**Answer:**

Yes, but it requires more care than running stateless services.

Good practices:

- use persistent volumes or external storage
- plan backups and restore procedures
- monitor disk, latency, and I/O
- understand failover and scheduling behavior

Interview answer:
Docker is easiest with stateless apps, but stateful workloads are common when storage is designed properly.

---

## 55) What is the purpose of Docker Secrets?

**Answer:**

Docker Secrets is used to pass sensitive data to services without baking it into the image.

Typical examples:

- database passwords
- API keys
- certificates

```bash
docker secret create db_password db_password.txt
```

This topic is most commonly discussed with Docker Swarm services.

---

## 56) How do you update a Docker container without losing data?

**Answer:**

Keep persistent data outside the container, then replace the old container with a new one built from the updated image.

Typical pattern:

- store data in a volume or bind mount
- stop and remove the old container
- start a new container using the same data mount

```bash
docker run -d -v app_data:/app/data my-app:2.0
```

Containers should be replaceable. The data should not live only inside the container layer.

---

## 57) How does service discovery work in Docker Swarm mode?

**Answer:**

Swarm provides built-in service discovery through an internal DNS system.

That means:

- services get DNS names
- containers can reach other services by service name
- requests can be balanced across service tasks

```text
web service -> resolves db -> connects over overlay network
```

---

## 58) How do you access a running container?

**Answer:**

Use `docker exec` to run a shell or command inside a running container.

```bash
docker exec -it my-container sh
docker exec -it my-container bash
```

Use `sh` when `bash` is not installed, which is common in minimal images like Alpine.

---

## 59) What factors determine how many containers a host can run?

**Answer:**

There is no fixed number. It depends on:

- available CPU and memory
- per-container limits
- application workload
- storage and network load
- file descriptor and process limits

Interview shortcut:
the limit depends on the workload profile, not just the amount of RAM.

---

## 60) How do you monitor Docker in production?

**Answer:**

Use a combination of metrics, logs, and alerts.

Common monitoring inputs:

- `docker stats` for quick live usage
- Prometheus and Grafana for metrics
- centralized logging like ELK or Loki
- health checks and restart monitoring

```bash
docker stats
```

You usually want visibility into CPU, memory, disk, restart count, health status, and container logs.

---

## 61) How does load balancing work across containers and hosts?

**Answer:**

Load balancing distributes traffic across multiple healthy container instances.

This can be handled by:

- reverse proxies like Nginx or Traefik
- Docker Swarm routing mesh
- orchestration platforms like Kubernetes

Benefits:

- better throughput
- higher availability
- smoother horizontal scaling

---

## 62) How do containers share data in Docker?

**Answer:**

The normal way is to mount the same volume into multiple containers.

```bash
docker volume create shared_data
docker run -d --name c1 -v shared_data:/data alpine sleep 1000
docker run -d --name c2 -v shared_data:/data alpine sleep 1000
```

You can also use bind mounts when containers need access to a specific host path.

---

## 63) How do you perform live migration of Docker containers between hosts?

**Answer:**

In most real systems, ordinary Docker containers are not live-migrated the way virtual machines are.

Common practice is:

- start a replacement container on another host
- reattach persistent data if needed
- shift traffic using a load balancer or orchestrator

For true stateful migration, checkpoint and restore on compatible Linux systems may be required, but that is a specialized workflow rather than the default Docker model.

---

## 64) How do you start, stop, and kill a container?

**Answer:**

Use these commands:

```bash
docker start my-container
docker stop my-container
docker kill my-container
```

Interview shortcut:

- `start` runs an existing stopped container
- `stop` asks the container to shut down gracefully
- `kill` stops it immediately by sending a signal, usually `SIGKILL`

---

## 65) What are the essential Docker commands and what do they do?

**Answer:**

Some commonly used Docker commands are:

- `docker build`: build an image from a Dockerfile
- `docker pull`: download an image from a registry
- `docker run`: create and start a container
- `docker ps`: list running containers
- `docker exec`: run a command inside a running container
- `docker logs`: view container logs
- `docker inspect`: view detailed metadata
- `docker stop`: stop a container
- `docker rm`: remove a container
- `docker image ls`: list images

```bash
docker build -t my-app .
docker run -d --name app my-app
docker ps
docker logs app
```

---

## 66) What are the differences between Docker Community Edition (CE) and Docker Enterprise Edition (EE)?

**Answer:**

This is mostly a historical interview question.

- **Docker CE** was the free community distribution used widely for development and general container workflows
- **Docker EE** was the enterprise offering focused on support, certification, security features, and enterprise management needs

Interview-safe summary:

- CE = community/free usage
- EE = enterprise support and enterprise-focused tooling

Today, teams more often talk about Docker Engine, Docker Desktop, Kubernetes platforms, or vendor-supported enterprise container stacks rather than the older CE vs EE split.

---

## 67) Can you use JSON instead of YAML for a Docker Compose file?

**Answer:**

In practice, Docker Compose files are written in YAML.

- The standard and common format is `compose.yaml`, `compose.yml`, or `docker-compose.yml`
- Official examples and normal team workflows use YAML
- JSON-shaped content may be parseable in some cases because YAML is a superset of JSON, but it is not the normal or recommended interview answer

Interview shortcut:
Compose files are expected in YAML.

---

## 68) What is the preferred way to remove a container: `docker stop` plus `docker rm`, or `docker rm` by itself?

**Answer:**

If the container is running, the preferred approach is:

```bash
docker stop my-container
docker rm my-container
```

Why:

- it gives the application a chance to shut down cleanly
- it avoids abrupt interruption of active processes
- it is safer for logs, connections, and in-flight work

Use `docker rm` by itself only when the container is already stopped. Use `docker rm -f` only when you really need to force removal.
