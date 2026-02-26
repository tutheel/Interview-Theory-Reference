# Node.js Interview Q&A (Node.js + Express + REST API + Jest) - 150 Questions

## 1. Node.js Core (Event Loop, Async, Streams, Modules) - 1 to 45

### 1) Explain the Node.js event loop in your own words (phases + what runs where).

**Answer:**

- Node runs JavaScript on a single main thread and offloads I/O to the OS/libuv.
- Event loop phases are: `timers`, `pending callbacks`, `idle/prepare`, `poll`, `check`, `close callbacks`.
- Each phase executes queued callbacks, then Node drains microtasks before moving on.

---

### 2) What's the difference between microtasks and macrotasks in Node?

**Answer:**

- Microtasks: `process.nextTick()` queue and Promise jobs (`then/catch/finally`, `queueMicrotask`).
- Macrotasks: timers (`setTimeout/setInterval`), I/O callbacks, `setImmediate`, close handlers.
- Microtasks run sooner (after current stack, before the next event loop phase callback batch).

---

### 3) Order of execution: setTimeout(0), setImmediate(), Promise.then(), process.nextTick() - who runs first and why?

**Answer:**

- Typical order after sync code: `process.nextTick()` -> `Promise.then()` -> timer/immediate (depends on context).
- From top-level, `setTimeout(0)` often runs before `setImmediate()`.
- Inside an I/O callback, `setImmediate()` typically runs before `setTimeout(0)`.

---

### 4) What problem does process.nextTick() solve, and when is it dangerous?

**Answer:**

- It lets you defer a callback until after current function execution, while still running before I/O.
- Useful for API consistency (always async callback behavior).
- Dangerous if recursively scheduled: it can starve the event loop and block I/O progress.

---

### 5) What's the difference between concurrency and parallelism in Node?

**Answer:**

- Concurrency: overlapping progress on multiple tasks (event loop + async I/O).
- Parallelism: tasks literally running at the same time on different CPU cores.
- Node gets parallelism via worker threads/processes, not by default in main JS thread.

---

### 6) When would you use Worker Threads vs child_process?

**Answer:**

- Use Worker Threads for CPU-heavy JS work with shared memory options (`SharedArrayBuffer`).
- Use `child_process` for process isolation, running shell commands, or different runtimes.
- Workers are lighter for compute; child processes are better for strict isolation/fault boundaries.

---

### 7) How does Node handle I/O without blocking the main thread?

**Answer:**

- Node registers async I/O operations with OS/libuv.
- Completion events are queued back to the event loop.
- JS callback executes only when event loop picks that completed operation.

---

### 8) What is libuv, and why should backend devs care?

**Answer:**

- `libuv` is the C library behind Node's event loop and async I/O abstraction.
- It provides thread pool, timers, filesystem/network async plumbing.
- Understanding libuv helps diagnose performance, blocking issues, and thread pool bottlenecks.

---

### 9) Explain backpressure in streams with a real example.

**Answer:**

- Backpressure means producer is faster than consumer.
- Example: reading a large file faster than database writes can process.
- Streams solve this with `write()` return value + `drain` event or `pipeline()` flow control.

---

### 10) Difference between readable, writable, duplex, and transform streams.

**Answer:**

- `Readable`: data source (`fs.createReadStream`).
- `Writable`: data sink (`fs.createWriteStream`).
- `Duplex`: both read and write independently (TCP socket).
- `Transform`: duplex where output is transformed input (gzip, parser).

---

### 11) How do you properly handle errors in streams (pipeline, finished)?

**Answer:**

- Prefer `stream.pipeline()` because it forwards errors and closes streams safely.
- Use `stream.finished()` to know when a stream completed or failed.
- Always attach/handle errors to avoid crashes and leaked file descriptors.

---

### 12) What's a Buffer and when do you need it?

**Answer:**

- `Buffer` is Node's raw binary byte container.
- Use it for files, sockets, encryption, compression, and protocol parsing.
- It avoids encoding loss that can happen with plain strings.

---

### 13) Explain the difference between Buffer and String for binary data.

**Answer:**

- `Buffer` stores exact bytes.
- `String` stores text (Unicode) and requires encoding/decoding.
- Binary payloads (images, encrypted data) should stay as `Buffer` to avoid corruption.

---

### 14) What are unhandledRejection and uncaughtException? What should production apps do with them?

**Answer:**

- `unhandledRejection`: rejected promise without handler.
- `uncaughtException`: sync error that bubbles to process level.
- In production: log with context, trigger graceful shutdown, let process restart (do not keep unknown corrupted state alive).

---

### 15) How do you implement graceful shutdown in Node (SIGTERM/SIGINT)?

**Answer:**

- Stop accepting new requests.
- Finish in-flight work with timeout.
- Close DB/message broker connections, then exit.

```js
const server = app.listen(3000);

function shutdown(signal) {
  console.log(`Received ${signal}`);
  server.close(async () => {
    await db.close();
    process.exit(0);
  });

  setTimeout(() => process.exit(1), 10000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
```

---

### 16) What's the difference between process.env.NODE_ENV patterns in local vs prod?

**Answer:**

- Local often uses `development` defaults (verbose logs, relaxed caching).
- Production uses `production` (optimized settings, strict security/log levels).
- Treat `NODE_ENV` as a switch for behavior only; keep actual config in explicit env vars.

---

### 17) CommonJS vs ESM: require vs import - key differences and pitfalls.

**Answer:**

- CommonJS: `require/module.exports`, mostly synchronous loading style.
- ESM: `import/export`, static analysis, top-level `await`, modern ecosystem direction.
- Pitfalls: mixed module interop, file extension requirements, default export interop confusion.

---

### 18) How does Node's module cache work? When can it cause bugs?

**Answer:**

- First `require/import` loads and caches module instance.
- Subsequent imports return same cached instance (singleton behavior).
- Bugs happen when mutable module state is shared unexpectedly across requests/tests.

---

### 19) What is package.json `"type": "module"` and how does it affect imports?

**Answer:**

- It tells Node to treat `.js` files as ESM by default.
- Without it, `.js` defaults to CommonJS (unless `.mjs` is used).
- It changes syntax expectations and module resolution behavior.

---

### 20) What are `exports` and `imports` fields in package.json used for?

**Answer:**

- `exports` controls public entry points for consumers (and can map CJS/ESM conditions).
- `imports` defines internal path aliases (usually `#alias`) for your package only.
- Both tighten module boundaries and prevent deep import breakage.

---

### 21) What is semantic versioning (SemVer) and how can it break builds?

**Answer:**

- Format: `MAJOR.MINOR.PATCH`.
- MAJOR may break API, MINOR adds backward-compatible features, PATCH fixes bugs.
- Ranges like `^` can pull new versions that introduce regressions; lockfiles reduce surprise.

---

### 22) How do you debug memory issues using --inspect / heap snapshots (high level)?

**Answer:**

- Start with `node --inspect` and connect DevTools.
- Capture heap snapshots over time and compare retained objects.
- Look for growing object graphs, listeners, caches, or closures that never release.

---

### 23) What is a memory leak pattern you've seen in Node apps?

**Answer:**

- Unbounded in-memory cache keyed by user/request IDs.
- Event listeners added repeatedly and never removed.
- Timers or intervals left running after request/job completion.

---
### 24) What is the difference between setInterval and recursive setTimeout (practical reliability)?

**Answer:**

- `setInterval` schedules next run regardless of prior run duration (can overlap).
- Recursive `setTimeout` schedules next run only after current work ends.
- Recursive timeout is safer for polling tasks with variable processing time.

---

### 25) Why is CPU-heavy work bad in Node, and how do you fix it?

**Answer:**

- CPU-heavy JS blocks the event loop and increases latency for all requests.
- Move compute to Worker Threads, separate services, or native addons.
- For unavoidable loops, chunk work and yield back to event loop.

---

### 26) What is the cluster module and when would you use it today?

**Answer:**

- `cluster` runs multiple Node worker processes sharing the same server port.
- It can use multiple CPU cores for HTTP workloads.
- Today many teams prefer process managers/containers (PM2, Kubernetes) over app-level cluster logic.

---

### 27) What's the difference between forking and spawning a process?

**Answer:**

- `spawn()` starts any command, streams stdio, no implicit IPC channel.
- `fork()` is a special case for new Node process and adds built-in IPC messaging.
- Use `fork` for Node worker-like child tasks; `spawn` for generic external binaries.

---

### 28) When would you use AsyncLocalStorage? Give a use case (e.g., correlation IDs).

**Answer:**

- Use it for request-scoped context across async boundaries.
- Common use: request ID, user ID, tenant ID, trace IDs in logs.
- It avoids manually passing context through every function call.

---

### 29) How would you implement a correlationId/requestId end-to-end in Node?

**Answer:**

- Read incoming `x-request-id` or generate one.
- Store in `AsyncLocalStorage`, include in all logs and downstream calls.
- Return same ID in response header for client-side troubleshooting.

---

### 30) What's the difference between operational errors and programmer errors?

**Answer:**

- Operational: expected runtime failures (network timeout, DB unavailable, invalid input).
- Programmer: bugs (undefined access, logic errors, invariant violations).
- Handle operational errors gracefully; crash/restart on serious programmer errors.

---

### 31) How do you design a retry strategy for flaky dependencies (backoff, jitter)?

**Answer:**

- Retry only transient errors (timeouts, 429, 503), not validation/business failures.
- Use exponential backoff + jitter to avoid retry storms.
- Cap retries, enforce overall timeout, and use idempotent operations.

---

### 32) [Coding] Write a sleep(ms) helper and show correct usage with async/await.

**Answer:**

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log("start");
  await sleep(500);
  console.log("done after 500ms");
}
```

---

### 33) [Coding] Implement retry(fn, retries, delay) with exponential backoff.

**Answer:**

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(fn, retries = 3, delay = 100, factor = 2) {
  let attempt = 0;
  let wait = delay;
  let lastError;

  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === retries) break;

      const jitter = Math.floor(Math.random() * 50);
      await sleep(wait + jitter);
      wait *= factor;
      attempt++;
    }
  }

  throw lastError;
}
```

---

### 34) [Coding] Implement a concurrency limiter (like p-limit) for async functions.

**Answer:**

```js
function createLimiter(maxConcurrent) {
  let activeCount = 0;
  const queue = [];

  const next = () => {
    if (activeCount >= maxConcurrent || queue.length === 0) return;

    const { fn, resolve, reject } = queue.shift();
    activeCount++;

    Promise.resolve()
      .then(fn)
      .then(resolve, reject)
      .finally(() => {
        activeCount--;
        next();
      });
  };

  return function limit(fn) {
    return new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      next();
    });
  };
}
```

---

### 35) [Coding] Implement a timeout wrapper for a Promise (reject after N ms).

**Answer:**

```js
function withTimeout(promise, ms, message = "Timed out") {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);

    Promise.resolve(promise).then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}
```

---

### 36) [Coding] Parse a large JSON file safely - how would you avoid loading it fully in memory?

**Answer:**

- If file is JSON lines (NDJSON), stream line-by-line and parse each line.
- If file is one huge JSON array/object, use a streaming parser (`stream-json`, `JSONStream`).
- Process in chunks and write results incrementally.

```js
const fs = require("fs");
const readline = require("readline");

async function processNdjson(path, onItem) {
  const rl = readline.createInterface({
    input: fs.createReadStream(path, { encoding: "utf8" }),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (!line.trim()) continue;
    await onItem(JSON.parse(line));
  }
}
```

---

### 37) What are environment variables best practices in Node apps?

**Answer:**

- Validate required env vars at startup and fail fast if missing.
- Never commit secrets; use secret manager or runtime injection.
- Keep defaults minimal, documented, and explicit per environment.

---

### 38) What is process.cwd() vs __dirname? Why does it matter?

**Answer:**

- `process.cwd()`: directory where process was started.
- `__dirname`: directory of current file (CommonJS).
- Mixing them incorrectly causes broken file path resolution across environments.

---

### 39) What are common reasons "it works locally but not in production" in Node?

**Answer:**

- Environment differences (Node version, env vars, credentials).
- Case-sensitive filesystem differences.
- Different network limits/timeouts/proxies and missing production-like tests.

---

### 40) How do you structure a Node backend codebase (layers/modules) for maintainability?

**Answer:**

- Split by domain and layer: `routes -> controllers -> services -> repositories`.
- Keep business logic in services, transport concerns in controllers.
- Centralize shared concerns: config, logger, validation, error handling.

---

### 41) Explain how logging differs from monitoring (in Node apps).

**Answer:**

- Logging: detailed event records for debugging and audits.
- Monitoring: metrics/alerts/traces for system health and SLOs.
- You need both: logs explain incidents, monitoring detects them early.

---

### 42) What is the risk of using console.log heavily in production?

**Answer:**

- High volume synchronous-ish output can hurt latency and throughput.
- Hard to parse, no structure, inconsistent context.
- Prefer structured logger (JSON, levels, redaction, async transport).

---

### 43) How do you handle configuration across environments (dev/stage/prod)?

**Answer:**

- Use one config schema with env-specific values.
- Validate config at boot (type/required checks).
- Keep immutable deploy artifacts; inject config via environment at runtime.

---

### 44) What's the purpose of npm ci vs npm install?

**Answer:**

- `npm ci` installs exactly from `package-lock.json` and fails on mismatch.
- `npm install` can update lockfile and resolve versions.
- Use `npm ci` in CI/CD for reproducible builds.

---

### 45) What's your approach to handling secrets (not committing, rotation, access)?

**Answer:**

- Store secrets in secret manager (Vault, AWS Secrets Manager, etc.).
- Inject at runtime with least-privileged access.
- Rotate regularly, audit access, and redact from logs/errors.

---

## 2. Express.js (Middleware, Routing, Errors, Security) - 46 to 85
### 46) What is middleware in Express, and what is the execution order?

**Answer:**

- Middleware is a function that can read/modify `req`, `res`, or pass control with `next()`.
- Order is registration order.
- Route-level middleware runs before the route handler for matching routes.

---

### 47) Difference between app.use() and app.METHOD() routes.

**Answer:**

- `app.use()` mounts middleware for all methods (optionally under a path prefix).
- `app.METHOD()` (`get`, `post`, etc.) matches a specific HTTP method + path.
- Use `app.use` for cross-cutting behavior; `app.METHOD` for endpoint handlers.

---

### 48) How do you implement a global error handler correctly in Express?

**Answer:**

- Register it after all routes/middleware.
- Use 4-argument signature and avoid leaking internal details.

```js
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: status === 500 ? "Internal server error" : err.message
    }
  });
});
```

---

### 49) Why do Express error handlers require (err, req, res, next) signature?

**Answer:**

- Express identifies error middleware by arity (4 params).
- Without `err` parameter, Express treats it as normal middleware.
- This is how error flow is routed through the stack.

---

### 50) Handling async route errors: why try/catch sometimes isn't enough, and common patterns to fix it.

**Answer:**

- Unhandled promise rejections in route handlers may bypass standard flow in some setups.
- Use async wrapper (`fn => (req,res,next) => fn(req,res,next).catch(next)`), or Express 5 native promise handling.
- Centralize error formatting in one error middleware.

---

### 51) What is an Express Router, and when do you split routes?

**Answer:**

- `express.Router()` creates modular route groups.
- Split when routes share path prefix/middleware/domain ownership.
- It improves maintainability, testability, and team ownership boundaries.

---

### 52) How do you implement route-level middleware vs app-level middleware?

**Answer:**

- App-level: `app.use(auth)` affects many routes.
- Route-level: `router.get("/admin", auth, handler)` affects one route.
- Use route-level for least privilege and clear intent.

---

### 53) Explain req.params vs req.query vs req.body with examples.

**Answer:**

- `req.params`: path variables, e.g. `/users/:id` -> `req.params.id`.
- `req.query`: URL query string, e.g. `/users?page=2` -> `req.query.page`.
- `req.body`: request payload (JSON/form), e.g. POST data.

---

### 54) How do you validate incoming requests in Express? Where should validation live?

**Answer:**

- Validate at API boundary (middleware) before controller logic.
- Use schema validators (`zod`, `joi`, `yup`, `express-validator`).
- Keep rules close to route contracts and return consistent validation errors.

---

### 55) How do you standardize API error responses (consistent shape)?

**Answer:**

- Define one envelope: `code`, `message`, optional `details`, `requestId`.
- Map internal errors to stable external error codes.
- Enforce through centralized error middleware.

---

### 56) What's the difference between res.send(), res.json(), and res.end()?

**Answer:**

- `res.send()`: sends various body types and auto-sets content-type.
- `res.json()`: sends JSON with correct JSON headers.
- `res.end()`: ends response without automatic body handling.

---

### 57) How do you set proper status codes and return payloads in Express?

**Answer:**

- Use `res.status(code).json(payload)` explicitly.
- Match code semantics (201 create, 204 no body, 422 validation, etc.).
- Keep response schema consistent across success and error paths.

---

### 58) How do you implement health check endpoints (liveness vs readiness)?

**Answer:**

- Liveness: process is up (`/health/live`).
- Readiness: dependencies are usable (`/health/ready` checks DB/cache/broker).
- Keep checks fast and deterministic to avoid false alarms.

---

### 59) How do you implement request logging safely (don't log secrets)?

**Answer:**

- Use structured logger middleware (pino/winston/morgan + serializer).
- Redact sensitive headers/body fields (`authorization`, `password`, tokens).
- Log request ID, route, status, latency, error code.

---

### 60) How do you add a requestId header and return it in responses?

**Answer:**

- Read incoming `x-request-id` or generate UUID.
- Save on `req` (or AsyncLocalStorage), then set in response header.
- Include same ID in logs/errors.

---

### 61) Explain CORS in Express: what it is, and common misconfigurations.

**Answer:**

- CORS controls which browser origins can call your API.
- Common mistakes: wildcard + credentials, allowing all methods/headers blindly.
- Configure explicit origins and allowed headers/methods per environment.

---

### 62) How would you configure CORS for: (a) same domain, (b) multiple allowed origins, (c) credentials?

**Answer:**

- Same domain: usually disable CORS middleware (not needed).
- Multiple origins: allow-list and validate `Origin`.
- Credentials: set `credentials: true`, and return exact origin (not `*`).

---

### 63) What is helmet and what risks does it reduce?

**Answer:**

- `helmet` sets common security HTTP headers.
- Helps reduce risks like clickjacking, MIME sniffing, insecure framing.
- It is not a complete security solution, but a strong baseline.

---

### 64) What is CSRF and when is it relevant for REST APIs?

**Answer:**

- CSRF is unauthorized state change triggered from victim's browser context.
- Relevant mainly when auth uses cookies automatically sent by browser.
- Token-in-header APIs (bearer token in JS memory) are less CSRF-prone but still need XSS defenses.

---

### 65) How do you implement rate limiting in Express (high level)?

**Answer:**

- Apply per-IP/user/API-key limits with sliding window/token bucket.
- Store counters in Redis for distributed systems.
- Return `429` with retry hints and monitor abuse patterns.

---
### 66) How do you prevent brute force on login endpoints?

**Answer:**

- Per-IP and per-account throttling with progressive delays.
- Temporary account/IP lockouts after repeated failures.
- Add MFA and suspicious activity alerts.

---

### 67) How do you implement authentication middleware (JWT verification pattern)?

**Answer:**

- Extract bearer token from `Authorization` header.
- Verify signature, expiration, issuer/audience.
- Attach trusted claims to `req.user`; reject with `401` on failure.

---

### 68) How do you implement authorization (roles/permissions) cleanly?

**Answer:**

- Keep authN and authZ separate.
- Use policy checks (`can(user, action, resource)`) in middleware/service layer.
- Prefer fine-grained permissions over role-only checks for complex systems.

---

### 69) What are Express best practices for handling file uploads?

**Answer:**

- Stream uploads, avoid buffering large files in memory.
- Enforce max size/type limits and virus scanning where needed.
- Store outside app container (object storage) and sanitize file metadata.

---

### 70) When serving a file, how do you stream it instead of loading into memory?

**Answer:**

- Use `fs.createReadStream()` and pipe to `res`.
- Set proper content headers.
- Handle stream errors and client aborts.

---

### 71) Explain why you should avoid blocking operations inside Express handlers.

**Answer:**

- Blocking work stalls event loop, delaying every request.
- It causes p95/p99 latency spikes and timeout cascades.
- Move blocking tasks to async I/O, workers, or background jobs.

---

### 72) How would you design an Express app to be "12-factor" friendly?

**Answer:**

- Config via env vars, stateless app processes, logs to stdout.
- Strict dependency declaration and one codebase per deploy pipeline.
- Backing services treated as attached resources.

---

### 73) How do you handle request timeouts in Express?

**Answer:**

- Set server/request timeouts and abort downstream calls with `AbortController`.
- Return clear timeout status (`504` for upstream timeout patterns).
- Ensure timed-out work is canceled, not left running silently.

---

### 74) How do you implement graceful shutdown for an Express server?

**Answer:**

- Catch `SIGTERM/SIGINT`, call `server.close()` to stop new connections.
- Track/close keep-alive connections and finish in-flight requests.
- Close dependencies, then exit with timeout fallback.

---

### 75) How do you structure Express apps: controllers/services/repositories? Why?

**Answer:**

- Controllers: HTTP parsing/response shaping.
- Services: business logic and orchestration.
- Repositories: DB access abstraction; this separation improves testability and change isolation.

---

### 76) What is idempotency and how would you enforce it at middleware level?

**Answer:**

- Idempotency means repeated same request has same final effect.
- For unsafe operations, require `Idempotency-Key`.
- Middleware stores response/outcome by key and replays on duplicate retries.

---

### 77) How do you implement pagination middleware (validate page/limit)?

**Answer:**

- Parse `page`/`limit` as ints with defaults.
- Clamp to safe bounds (`limit <= maxLimit`).
- Put normalized pagination object on `req.pagination`.

---

### 78) Explain how to handle 404 properly in Express for unknown routes.

**Answer:**

- Add catch-all route after all known routes.
- Return structured `404` JSON, not HTML stack traces.
- Keep it before global error handler if using explicit not-found error flow.

---

### 79) How do you prevent sending stack traces to clients in production?

**Answer:**

- In error middleware, branch by environment.
- Return generic message for `500` in production.
- Log full stack internally with request ID.

---

### 80) What is the impact of middleware order for body-parser/JSON parsing?

**Answer:**

- Parsers must run before handlers that read `req.body`.
- Auth/webhook signature verification may require raw body before JSON parser.
- Wrong order can break signatures, validation, or route behavior.

---

### 81) How do you handle large JSON payloads safely (limit, 413 responses)?

**Answer:**

- Configure parser size limit (`express.json({ limit: "1mb" })`).
- Reject oversized payloads with `413 Payload Too Large`.
- Prefer streaming/batch upload for very large bodies.

---

### 82) How do you implement API versioning in Express (/v1, headers, etc.)?

**Answer:**

- Path versioning (`/v1`) is simplest and explicit.
- Header/media-type versioning can reduce URL churn but is harder operationally.
- Keep deprecation policy and migration timeline documented.

---

### 83) What's the difference between PUT and PATCH in Express routing usage?

**Answer:**

- `PUT`: replace full resource representation (usually idempotent).
- `PATCH`: partial update of specific fields.
- Validate accordingly; reject unknown/mutable-restricted fields.

---

### 84) How do you implement centralized request validation + error formatting?

**Answer:**

- Use schema middleware per route to validate params/query/body.
- Throw validation errors in one known format.
- Global error handler maps them to consistent `422` response envelope.

---

### 85) [Coding] Write an Express middleware that measures request duration and adds X-Response-Time.

**Answer:**

```js
function responseTime(req, res, next) {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const ms = Number(end - start) / 1e6;
    res.setHeader("X-Response-Time", `${ms.toFixed(2)}ms`);
  });

  next();
}

// app.use(responseTime);
```

---

## 3. REST API Design & Backend Scenarios - 86 to 125
### 86) Define REST: what makes an API "RESTful" in practice?

**Answer:**

- Resource-oriented URLs, standard HTTP methods/status codes, stateless requests.
- Clear representations and cache semantics.
- Consistent contracts and predictable behavior matter more than strict purity debates.

---

### 87) How do you choose resource names and endpoint structure?

**Answer:**

- Use plural nouns for collections (`/users`, `/orders`).
- Keep nesting shallow and meaningful (`/users/:id/orders` only when needed).
- Put actions in state transitions, not verb-heavy URL names where possible.

---

### 88) What status code would you return for validation errors and why (400 vs 422)?

**Answer:**

- `400` for malformed request syntax/parsing issues.
- `422` for semantically invalid but well-formed payload.
- Pick one policy and apply consistently across API.

---

### 89) When do you use 201 vs 200 vs 204?

**Answer:**

- `201 Created`: new resource created (usually include `Location`).
- `200 OK`: successful response with body.
- `204 No Content`: success with no response body.

---

### 90) What's the difference between 401 and 403? Give real examples.

**Answer:**

- `401 Unauthorized`: not authenticated or invalid credentials/token.
- `403 Forbidden`: authenticated but not allowed to perform action.
- Example: missing token -> `401`; user token lacks admin role -> `403`.

---

### 91) When would you return 409 Conflict?

**Answer:**

- When request conflicts with current resource state.
- Examples: duplicate unique email, stale version in optimistic locking.
- Useful for safe retry or client conflict resolution flow.

---

### 92) Design an error response format you'd use across the API (fields, examples).

**Answer:**

- Keep one stable envelope:
  - `code` (machine readable)
  - `message` (human readable)
  - `details` (field-level validation issues)
  - `requestId` (traceability)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request payload",
    "details": [{ "field": "email", "message": "Invalid email format" }],
    "requestId": "req_123"
  }
}
```

---

### 93) Explain idempotency for POST/PUT/PATCH/DELETE with examples.

**Answer:**

- `GET`, `PUT`, `DELETE` are usually idempotent by semantics.
- `POST` is generally non-idempotent unless key-based dedupe is implemented.
- `PATCH` can be idempotent if operation sets fixed values (not increments).

---

### 94) How would you implement Idempotency-Key for POST /payments?

**Answer:**

- Require `Idempotency-Key` header.
- Hash key + endpoint + normalized body; store status/result atomically.
- On duplicate key, return stored response, not reprocess payment.

---

### 95) How would you prevent duplicate processing when clients retry requests?

**Answer:**

- Use idempotency keys with TTL and uniqueness constraints.
- Make handlers side-effect-safe and transactionally consistent.
- Use outbox/inbox dedupe patterns for async event processing.

---

### 96) Pagination: offset vs cursor - when to pick which?

**Answer:**

- Offset: easy, works for small datasets/random access pages.
- Cursor: better for large/high-write datasets and stable scrolling.
- Prefer cursor for feeds/timelines where consistency under inserts matters.

---

### 97) Design GET /users with filter + sort + pagination (what query params?)

**Answer:**

- Example params:
  - `status`, `role`, `q` (filters)
  - `sortBy`, `order`
  - `limit`, `cursor` (or `page`, `limit`)
- Return `{ data, meta }` with paging info and next cursor.

---

### 98) How do you validate and limit sortBy/orderBy to prevent abuse?

**Answer:**

- Allow-list sortable fields only.
- Restrict `order` to `asc|desc`.
- Enforce max limit and safe indexes to avoid expensive scans.

---

### 99) What is an API versioning strategy you prefer and why?

**Answer:**

- Path-based major versions (`/v1`) for operational simplicity.
- Keep backward-compatible changes in same major.
- Deprecate with clear timeline and migration guide.

---

### 100) What is content negotiation (Accept, Content-Type) and why it matters?

**Answer:**

- `Content-Type`: format of request body sent by client.
- `Accept`: response formats client can consume.
- Proper negotiation prevents parsing issues and enables multi-format APIs.

---

### 101) Explain caching headers: Cache-Control, ETag, If-None-Match.

**Answer:**

- `Cache-Control` defines caching policy (`max-age`, `no-store`, etc.).
- `ETag` is resource version fingerprint.
- Client sends `If-None-Match`; server can return `304 Not Modified`.

---

### 102) How do conditional GETs reduce load in real systems?

**Answer:**

- Avoid full payload transfer when resource unchanged.
- Reduce DB/render/network costs with `304`.
- Especially useful for hot read endpoints and CDN/browser caching.

---

### 103) How do you design a "search" endpoint without making it messy?

**Answer:**

- Keep a small, documented query schema.
- Support key filters + pagination + deterministic sort.
- Avoid arbitrary query language in first version; evolve with clear contract.

---

### 104) What is HATEOAS, and do you use it in modern APIs?

**Answer:**

- HATEOAS includes links/actions in responses to drive client navigation.
- Useful in hypermedia-driven systems, less common in typical JSON APIs.
- Many modern teams selectively include links without full HATEOAS rigor.

---

### 105) How do you design bulk operations endpoints safely (e.g., POST /items/bulk)?

**Answer:**

- Limit batch size and validate each item independently.
- Return per-item results (`success`/`error`) instead of all-or-nothing by default.
- Make operation idempotent where possible and track job IDs for large batches.

---
### 106) What is a webhook? How do you ensure webhook delivery is reliable?

**Answer:**

- Webhook is server-to-server callback on events.
- Use retries with backoff, dead-letter handling, and delivery logs.
- Include event IDs for receiver-side deduplication.

---

### 107) How do you secure webhooks (signatures, replay protection)?

**Answer:**

- Sign payload with shared secret (HMAC) and send signature header.
- Include timestamp/nonce and reject stale or reused signatures.
- Use HTTPS and rotate webhook secrets.

---

### 108) How would you design polling vs webhook vs SSE for async job results?

**Answer:**

- Polling: easiest, higher overhead/latency.
- Webhook: efficient server callback, requires public receiver reliability/security.
- SSE: good for browser real-time one-way updates over HTTP.

---

### 109) How do you handle long-running tasks in a REST system (job pattern)?

**Answer:**

- Accept request, create job record, return `202 Accepted` + job ID.
- Process asynchronously via worker queue.
- Expose status/result endpoints and cancellation when supported.

---

### 110) Design an endpoint set for async jobs: submit, status, result, cancel.

**Answer:**

- `POST /jobs` -> creates job (`202`, returns `jobId`).
- `GET /jobs/:id` -> status (`queued|running|succeeded|failed|canceled`).
- `GET /jobs/:id/result` -> result payload or redirect to artifact.
- `DELETE /jobs/:id` -> cancel if cancelable.

---

### 111) What is an API contract and how do you keep FE/BE aligned (OpenAPI)?

**Answer:**

- Contract defines endpoints, schemas, auth, and error shapes.
- Keep it in OpenAPI and generate docs/types/SDKs.
- Add contract tests in CI to detect breaking changes.

---

### 112) How would you handle partial failures in a batch request?

**Answer:**

- Return per-item status and error details.
- Support idempotent retries for failed items only.
- Consider async bulk job for very large payloads.

---

### 113) What is rate limiting vs throttling? Where do you enforce it?

**Answer:**

- Rate limiting: cap total requests per window.
- Throttling: slow down/shape request rate over time.
- Enforce at API gateway/edge first, then service-level for critical endpoints.

---

### 114) How do you implement request validation to prevent injection attacks?

**Answer:**

- Strict schema validation + type coercion rules.
- Reject unknown fields where appropriate.
- Use parameterized queries/ORM safe APIs and never concatenate user input into queries.

---

### 115) Explain SQL injection vs NoSQL injection risks in a REST API context.

**Answer:**

- SQL injection: malicious input alters SQL query text.
- NoSQL injection: unsafe query object/operator injection (`$ne`, `$where`, etc.).
- Defense is similar: validate input and use safe query construction APIs.

---

### 116) How do you avoid leaking sensitive data in error messages?

**Answer:**

- Return generic external messages; keep internals in logs only.
- Redact secrets/PII from logs and traces.
- Use stable error codes and request IDs for support/debugging.

---

### 117) What logs/metrics would you want for an API in production?

**Answer:**

- Logs: request ID, route, status, latency, error code, principal ID (if safe).
- Metrics: RPS, p50/p95/p99 latency, error rate, saturation (CPU/memory/DB pool).
- Tracing: cross-service spans for slow/error paths.

---

### 118) How do you design correlation IDs across distributed systems?

**Answer:**

- Generate/accept request ID at ingress.
- Propagate via headers to all downstream calls/events.
- Include in logs, metrics labels (carefully), and traces.

---

### 119) How do you handle "exactly once" processing vs "at least once" in APIs?

**Answer:**

- Exactly-once is usually achieved as effectively-once via idempotency + dedupe.
- At-least-once delivery requires consumers to be idempotent.
- Store processed message/request IDs and enforce uniqueness.

---

### 120) Explain optimistic locking/versioning for concurrent updates (ETag/version field).

**Answer:**

- Client reads version/ETag, then updates with `If-Match` or version field.
- Server rejects stale updates with `409` or `412`.
- Prevents lost updates without heavy locking.

---

### 121) How do you design a safe PATCH endpoint (validation + allowed fields)?

**Answer:**

- Allow-list patchable fields only.
- Validate patch body strictly and reject unknown/protected fields.
- Apply atomically with optimistic locking to avoid overwrite races.

---

### 122) How do you handle file uploads in REST: multipart vs signed URLs (conceptually)?

**Answer:**

- `multipart/form-data`: app server receives file directly (simple, heavier server load).
- Signed URL: client uploads directly to object store (scalable, cheaper server path).
- Prefer signed URLs for large/high-volume uploads.

---

### 123) How do you return consistent responses for list endpoints (data + meta)?

**Answer:**

- Use shape like:
  - `data`: list of items
  - `meta`: pagination/sort/filter summary
  - optional `links` for next/prev
- Keep this schema consistent across all list APIs.

---

### 124) What's your approach to backward compatibility when changing APIs?

**Answer:**

- Prefer additive changes first (new fields/endpoints).
- Do not remove/rename fields in-place without version bump/deprecation window.
- Communicate changes early and validate with contract tests.

---

### 125) [Coding] Design GET /orders with cursor pagination-what does the cursor look like?

**Answer:**

- Sort by stable key pair, e.g. `createdAt DESC, id DESC`.
- Cursor encodes last seen pair (base64 JSON): `{"createdAt":"...","id":"..."}`.
- Query next page with `?limit=20&cursor=<token>`.

```js
function encodeCursor(row) {
  return Buffer.from(
    JSON.stringify({ createdAt: row.createdAt, id: row.id })
  ).toString("base64url");
}

function decodeCursor(cursor) {
  return JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
}

// Response shape
// {
//   data: [...],
//   meta: { limit: 20, hasNext: true, nextCursor: "eyJjcmVhdGVkQXQiOi..." }
// }
```

---

## 4. Jest + Testing Express APIs - 126 to 150
### 126) What's the difference between unit, integration, and e2e tests in Node?

**Answer:**

- Unit: tests one function/class in isolation.
- Integration: tests components working together (API + DB layer, etc.).
- E2E: tests full system flows through real boundaries.

---

### 127) How do you test Express routes using supertest?

**Answer:**

- Export `app` without listening in test process.
- Use `request(app).get("/route")...`.
- Assert status, headers, and response body.

---

### 128) How do you mock external services (HTTP calls) in Jest?

**Answer:**

- Mock HTTP client modules (`axios`, fetch wrapper) with `jest.mock`.
- Or intercept network with tools like `nock`/MSW in integration-style tests.
- Keep one small set of real contract tests for third-party integrations.

---

### 129) Explain jest.mock() vs jest.spyOn() - when to use which?

**Answer:**

- `jest.mock()`: replace whole module or exports.
- `jest.spyOn()`: observe/override specific method on real object/module.
- Use `spyOn` when you want partial mocking and original behavior optionally preserved.

---

### 130) How do you test async functions that throw errors?

**Answer:**

- Use `await expect(fn()).rejects.toThrow(...)`.
- Always return/await the expectation so Jest waits correctly.

---

### 131) How do you test Express error middleware behavior?

**Answer:**

- Trigger a route that throws/rejects.
- Assert mapped status code and error shape.
- In production-mode test, verify stack is hidden.

---

### 132) How do you structure test folders for controllers/services/repositories?

**Answer:**

- Mirror source layout: `tests/controllers`, `tests/services`, `tests/repositories`.
- Keep shared factories/fixtures in `tests/helpers`.
- Separate unit vs integration folders for clarity and speed.

---

### 133) What are beforeAll, beforeEach, afterEach, afterAll used for?

**Answer:**

- `beforeAll/afterAll`: one-time setup/teardown for suite.
- `beforeEach/afterEach`: reset state per test.
- Use them to avoid shared mutable state between tests.

---

### 134) How do you ensure tests are isolated (no shared state)?

**Answer:**

- Create fresh data per test and clean DB/mocks between tests.
- Avoid global mutable singletons or reset them explicitly.
- Use deterministic random seeds and fixed test clocks when needed.

---

### 135) What does --runInBand do and when do you use it?

**Answer:**

- Runs tests serially in one process.
- Useful for debugging race conditions or tests using non-parallel-safe shared resources.
- Slower, so usually only in specific CI jobs or debugging.

---

### 136) How do you test time-based logic using jest.useFakeTimers()?

**Answer:**

- Enable fake timers, schedule code with timeout/interval, advance virtual time.
- Use `jest.advanceTimersByTime(ms)` and assert outcomes.
- Restore real timers after test to avoid side effects.

---

### 137) How do you mock Date.now() / system time in Jest?

**Answer:**

- Use `jest.spyOn(Date, "now").mockReturnValue(fixedTs)` for quick override.
- Or `jest.useFakeTimers().setSystemTime(new Date("..."))`.
- Reset mocks/timers after each test.

---

### 138) How do you test that a function was called with specific args and call count?

**Answer:**

- `expect(mockFn).toHaveBeenCalledTimes(n)`.
- `expect(mockFn).toHaveBeenCalledWith(...)`.
- For order-specific checks: `toHaveBeenNthCalledWith`.

---

### 139) What is snapshot testing, and where is it a bad idea for APIs?

**Answer:**

- Snapshot stores full output and compares future runs.
- Useful for stable render-like outputs.
- Bad for APIs with dynamic fields/timestamps/order variance; prefer explicit field assertions.

---

### 140) How do you test validation errors for bad payloads (status + body)?

**Answer:**

- Send invalid request via supertest.
- Assert `422`/`400` and exact error envelope fields.
- Check per-field messages/codes for contract stability.

---
### 141) How do you test authentication middleware (valid/invalid token paths)?

**Answer:**

- Test no token -> `401`.
- Test malformed/expired token -> `401`.
- Test valid token -> request passes and `req.user`-dependent behavior works.

---

### 142) How do you test authorization (role-based access) in routes?

**Answer:**

- Use different token fixtures/claims (user/admin/etc.).
- Assert forbidden role returns `403`.
- Assert authorized role succeeds and side effects occur as expected.

---

### 143) How do you test streaming responses (file download) in Node tests?

**Answer:**

- Assert headers (`content-type`, `content-disposition`).
- Collect response stream and validate checksum/size/content.
- Include abort/error path tests for robustness.

---

### 144) How do you handle DB in tests: real DB container vs in-memory vs mocks?

**Answer:**

- Real container: best fidelity, slower.
- In-memory DB: faster but may differ from production behavior.
- Mocks: fastest for unit tests but weakest integration confidence.

---

### 145) How do you reset modules between tests (jest.resetModules) and why?

**Answer:**

- `jest.resetModules()` clears require cache in test runtime.
- Useful when module state/env vars are read at import time.
- Prevents cross-test contamination from singleton module state.

---

### 146) How do you set and reset environment variables safely in Jest tests?

**Answer:**

- Save original `process.env` snapshot before test/suite.
- Override only needed keys and restore afterward.
- Re-import modules after env change if module reads env at load time.

---

### 147) What are common causes of flaky tests in Node/Jest and how do you fix them?

**Answer:**

- Race conditions, time-dependent assertions, shared state, leaked timers/sockets.
- Fix with deterministic setup, fake timers, strict cleanup, and isolated data.
- Remove real network dependency or stabilize via mocks/contracts.

---

### 148) How do you measure coverage and enforce thresholds in Jest?

**Answer:**

- Run with `--coverage` and configure `collectCoverageFrom`.
- Set thresholds in Jest config (`global` and per-path).
- Use thresholds as guardrails, not as substitute for meaningful assertions.

---

### 149) [Coding] Write Jest tests for an Express GET /health endpoint.

**Answer:**

```js
// health.test.js
const request = require("supertest");
const express = require("express");

function createApp() {
  const app = express();
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });
  return app;
}

describe("GET /health", () => {
  test("returns 200 and status ok", async () => {
    const app = createApp();
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
```

---

### 150) [Coding] Write a test suite for POST /todos (201 on success, 422 on validation error).

**Answer:**

```js
// todos.test.js
const request = require("supertest");
const express = require("express");

function createApp() {
  const app = express();
  app.use(express.json());

  app.post("/todos", (req, res) => {
    const { title } = req.body || {};
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(422).json({
        error: { code: "VALIDATION_ERROR", message: "title is required" }
      });
    }

    return res.status(201).json({
      id: "todo_1",
      title: title.trim(),
      completed: false
    });
  });

  return app;
}

describe("POST /todos", () => {
  test("201 on valid payload", async () => {
    const app = createApp();
    const res = await request(app).post("/todos").send({ title: "Buy milk" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      title: "Buy milk",
      completed: false
    });
  });

  test("422 on validation error", async () => {
    const app = createApp();
    const res = await request(app).post("/todos").send({ title: "" });

    expect(res.status).toBe(422);
    expect(res.body).toEqual({
      error: { code: "VALIDATION_ERROR", message: "title is required" }
    });
  });
});
```
