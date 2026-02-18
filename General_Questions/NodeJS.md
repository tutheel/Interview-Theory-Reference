# NodeJS Interview Questions

## Detailed Answers By Difficulty (With Code Examples)

### Beginner - Core Concepts

#### Q1. Explain Node.js architecture.

**Detailed Answer:** Node.js uses the V8 engine plus libuv, with a single event loop for JS execution and async I/O handled without blocking. Keep handler logic small and offload long CPU work so the event loop stays responsive.
**Code Example:**

```js
const http = require("node:http");
http
  .createServer(async (_req, res) => {
    await Promise.resolve();
    res.end("ok");
  })
  .listen(3000);
```

#### Q2. Describe the event loop phases.

**Detailed Answer:** Event loop phases are: timers, pending callbacks, idle/prepare, poll, check, and close callbacks. Execution order matters when debugging subtle timing races.
**Code Example:**

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);
setImmediate(() => console.log("immediate"));
```

#### Q3. What are microtasks?

**Detailed Answer:** Microtasks are high-priority callbacks (like Promise handlers and `queueMicrotask`) run after current stack completion. Execution order matters when debugging subtle timing races.
**Code Example:**

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);
setImmediate(() => console.log("immediate"));
```

#### Q4. What are macrotasks?

**Detailed Answer:** Macrotasks are scheduled callbacks such as timers, I/O callbacks, and `setImmediate`. Execution order matters when debugging subtle timing races.
**Code Example:**

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);
setImmediate(() => console.log("immediate"));
```

#### Q5. How does libuv work?

**Detailed Answer:** `libuv` provides the event loop, non-blocking abstractions, and a worker thread pool for operations like fs/crypto/dns. Keep handler logic small and offload long CPU work so the event loop stays responsive.
**Code Example:**

```js
const http = require("node:http");
http
  .createServer(async (_req, res) => {
    await Promise.resolve();
    res.end("ok");
  })
  .listen(3000);
```

#### Q6. How does Node handle I/O?

**Detailed Answer:** Node delegates I/O to OS async APIs or libuv thread pool, then resumes callbacks when work completes. Keep this section focused on event loop behavior and stream-safe implementations.
**Code Example:**

```js
process.nextTick(() => console.log("nextTick"));
setImmediate(() => console.log("immediate"));
await pipeline(fs.createReadStream("in.txt"), fs.createWriteStream("out.txt"));
```

#### Q7. What blocks the event loop?

**Detailed Answer:** CPU-heavy loops, synchronous I/O, and large blocking operations (e.g., huge JSON parse) block the event loop. Execution order matters when debugging subtle timing races.
**Code Example:**

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);
setImmediate(() => console.log("immediate"));
```

#### Q8. How to detect blocking code?

**Detailed Answer:** Track event-loop lag, use CPU profiles/flamegraphs, and inspect slow endpoints in APM/logs. Protect write paths with transactions and always release resources in shutdown hooks.
**Code Example:**

```js
process.on("SIGTERM", () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
```

#### Q9. What is process.nextTick?

**Detailed Answer:** `process.nextTick` queues a callback to run before the next event loop phase (higher priority than normal tasks). Execution order matters when debugging subtle timing races.
**Code Example:**

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);
setImmediate(() => console.log("immediate"));
```

#### Q10. What is setImmediate?

**Detailed Answer:** `setImmediate` schedules callbacks in the check phase, typically after I/O polling. Execution order matters when debugging subtle timing races.
**Code Example:**

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);
setImmediate(() => console.log("immediate"));
```

#### Q11. Difference between setTimeout and setImmediate?

**Detailed Answer:** `setTimeout` runs after minimum delay in timers phase; `setImmediate` runs in check phase, often after I/O. Execution order matters when debugging subtle timing races.
**Code Example:**

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);
setImmediate(() => console.log("immediate"));
```

#### Q12. What causes memory leaks?

**Detailed Answer:** Common leaks: retained references, global caches, unremoved listeners, long-lived closures, and timers. Monitor memory trends and compare snapshots to find retained object paths.
**Code Example:**

```js
setInterval(() => {
  const m = process.memoryUsage();
  console.log({ rss: m.rss, heapUsed: m.heapUsed });
}, 10000);
```

#### Q13. How to inspect heap memory?

**Detailed Answer:** Use heap snapshots via Chrome DevTools (`--inspect`), `heapdump`, or profiler tools to compare retained objects. Monitor memory trends and compare snapshots to find retained object paths.
**Code Example:**

```js
setInterval(() => {
  const m = process.memoryUsage();
  console.log({ rss: m.rss, heapUsed: m.heapUsed });
}, 10000);
```

#### Q14. What is cluster module?

**Detailed Answer:** `cluster` forks multiple Node processes to use multiple CPU cores and share server ports. Use worker threads for CPU-heavy work and process-level scaling for multi-core throughput.
**Code Example:**

```js
const { Worker } = require("node:worker_threads");
const w = new Worker("./worker.js", { workerData: { n: 42 } });
w.once("message", console.log);
```

#### Q15. When use worker_threads?

**Detailed Answer:** Use `worker_threads` for CPU-bound work needing true parallelism inside one process. Use worker threads for CPU-heavy work and process-level scaling for multi-core throughput.
**Code Example:**

```js
const { Worker } = require("node:worker_threads");
const w = new Worker("./worker.js", { workerData: { n: 42 } });
w.once("message", console.log);
```

#### Q16. Explain streams.

**Detailed Answer:** Streams process data incrementally in chunks, reducing memory usage and latency. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q17. Types of streams?

**Detailed Answer:** Stream types are Readable, Writable, Duplex, and Transform. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q18. How does backpressure work?

**Detailed Answer:** Backpressure slows producers when consumers are overloaded (e.g., writable returns `false` until `drain`). Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q19. What is piping in streams?

**Detailed Answer:** Piping connects streams and automatically coordinates flow and backpressure handling. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q20. How to implement custom stream?

**Detailed Answer:** Create custom streams by extending stream classes and implementing `_read`, `_write`, or `_transform`. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q21. What is middleware?

**Detailed Answer:** Middleware is a function in request/response pipeline that can modify flow and call `next()`. Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q22. How Express handles middleware?

**Detailed Answer:** Express executes middleware in registration order; each middleware passes control with `next()`. Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q23. How to implement global error handler?

**Detailed Answer:** Add a final 4-arg Express middleware (`err, req, res, next`) to return normalized error responses. Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q24. What is async_hooks?

**Detailed Answer:** `async_hooks` tracks lifecycle of async resources for context propagation and diagnostics. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q25. How to profile CPU usage?

**Detailed Answer:** Use Node inspector/DevTools, `--prof`, or tools like Clinic Flame for CPU profiling. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q26. What is REPL?

**Detailed Answer:** REPL is an interactive Read-Eval-Print Loop for executing Node code quickly. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q27. How to handle uncaughtException?

**Detailed Answer:** Log `uncaughtException`, trigger graceful shutdown, and exit; app state may be unsafe to continue. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q28. How to handle unhandledPromiseRejection?

**Detailed Answer:** Handle `unhandledRejection`, log context, and usually fail fast or convert to explicit error policy. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q29. What is event emitter?

**Detailed Answer:** EventEmitter enables pub/sub via `on`, `once`, `emit`, and listener-based event handling. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q30. How does require caching work?

**Detailed Answer:** `require` caches loaded modules in `require.cache`, so subsequent imports reuse the same instance. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q31. What is ESM vs CommonJS?

**Detailed Answer:** ESM uses `import/export` (standard, static analysis); CommonJS uses `require/module.exports` (runtime, dynamic). For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q32. How to structure scalable backend?

**Detailed Answer:** Use layered/modular architecture: routes -> services -> repositories, plus config, observability, and tests. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q33. How to implement rate limiting?

**Detailed Answer:** Implement rate limiting via fixed/sliding windows or token bucket, usually backed by Redis for scale. Define key strategy and TTL/invalidation up front for deterministic behavior.
**Code Example:**

```js
const key = `idem:${req.get("Idempotency-Key")}`;
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const result = await serviceCall();
await redis.set(key, JSON.stringify(result), { EX: 3600 });
```

#### Q34. How to implement request logging?

**Detailed Answer:** Add logging middleware that captures method/path/status/latency/requestId on response finish. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q35. How to secure environment variables?

**Detailed Answer:** Store secrets in a secret manager, not code; restrict access and avoid logging sensitive values. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q36. How to prevent callback hell?

**Detailed Answer:** Replace nested callbacks with promises/async-await and separate functions by responsibility. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q37. What are Promises internally?

**Detailed Answer:** Promises are state machines (`pending`, `fulfilled`, `rejected`) with queued continuation callbacks. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q38. How async/await works?

**Detailed Answer:** `async/await` is syntactic sugar over promises, making async flow look synchronous. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q39. What is promise chaining?

**Detailed Answer:** Promise chaining passes results/errors through `.then/.catch`, enabling sequential async composition. For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q40. How to implement retry logic?

**Detailed Answer:** Retry with max attempts, exponential backoff, jitter, and failure classification (retryable vs non-retryable). For this layer, keep middleware/async flow explicit and avoid hidden side effects.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q41. What is idempotent API?

**Detailed Answer:** Idempotent API means repeated identical requests produce the same final effect. Define key strategy and TTL/invalidation up front for deterministic behavior.
**Code Example:**

```js
const key = `idem:${req.get("Idempotency-Key")}`;
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const result = await serviceCall();
await redis.set(key, JSON.stringify(result), { EX: 3600 });
```

#### Q42. How to implement pagination?

**Detailed Answer:** Use offset/limit for simple cases; prefer cursor/keyset for large datasets and stable pagination. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q43. What is dependency injection?

**Detailed Answer:** Dependency injection supplies dependencies from outside to improve testability and decoupling. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q44. How to implement service layer?

**Detailed Answer:** Service layer holds business rules between transport/controller and data access. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q45. What is repository pattern?

**Detailed Answer:** Repository pattern abstracts persistence details behind data-access interfaces. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q46. How to validate input safely?

**Detailed Answer:** Validate input with schemas (Zod/Joi/AJV), strict typing, and allowlist fields. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q47. How to sanitize user input?

**Detailed Answer:** Sanitize/normalize untrusted input and use context-appropriate escaping and parameterized queries. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q48. How to implement RBAC?

**Detailed Answer:** Implement RBAC by checking authenticated user roles/permissions before protected actions. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q49. How to handle large payload?

**Detailed Answer:** Enforce body-size limits and stream/process large payloads instead of buffering all in memory. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q50. What is body-parser?

**Detailed Answer:** `body-parser` parses incoming bodies (JSON/urlencoded) and populates `req.body`. Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q51. How to implement CORS?

**Detailed Answer:** Enable CORS using `Access-Control-*` headers, usually via the `cors` middleware. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q52. How to handle file uploads?

**Detailed Answer:** Handle uploads with streaming parsers like `multer`/`busboy` and validate type/size. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q53. How to implement caching?

**Detailed Answer:** Add cache-aside/read-through caching with TTL, invalidation rules, and cache-key strategy. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q54. When use Redis?

**Detailed Answer:** Use Redis for low-latency cache, distributed sessions, rate-limits, locks, and queues. Define key strategy and TTL/invalidation up front for deterministic behavior.
**Code Example:**

```js
const key = `idem:${req.get("Idempotency-Key")}`;
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const result = await serviceCall();
await redis.set(key, JSON.stringify(result), { EX: 3600 });
```

#### Q55. How to implement circuit breaker?

**Detailed Answer:** Circuit breaker opens on repeated failures, blocks calls, then half-opens to probe recovery. Define key strategy and TTL/invalidation up front for deterministic behavior.
**Code Example:**

```js
const key = `idem:${req.get("Idempotency-Key")}`;
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const result = await serviceCall();
await redis.set(key, JSON.stringify(result), { EX: 3600 });
```

#### Q56. What is graceful shutdown?

**Detailed Answer:** Graceful shutdown stops new traffic, waits inflight completion, closes resources, then exits. Protect write paths with transactions and always release resources in shutdown hooks.
**Code Example:**

```js
process.on("SIGTERM", () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
```

#### Q57. How to close DB connections?

**Detailed Answer:** Close DB pools/connections on shutdown hooks (`SIGTERM`) via `pool.end()` or equivalent. Protect write paths with transactions and always release resources in shutdown hooks.
**Code Example:**

```js
process.on("SIGTERM", () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
```

#### Q58. How to scale Node horizontally?

**Detailed Answer:** Scale horizontally by running multiple stateless instances behind a load balancer. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q59. How to debug production?

**Detailed Answer:** Debug production using structured logs, metrics, traces, and targeted dumps/profiles. Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q60. How to log structured logs?

**Detailed Answer:** Use JSON logs with consistent fields (time, level, message, requestId, service, error). Emphasize API reliability patterns like retries, caching, and graceful shutdown.
**Code Example:**

```js
const key = `cache:${req.path}`;
const hit = await redis.get(key);
if (hit) return res.json(JSON.parse(hit));
const data = await service.fetch();
await redis.set(key, JSON.stringify(data), { EX: 60 });
```

#### Q61. What is Morgan?

**Detailed Answer:** Morgan is Express HTTP request logging middleware. Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q62. How to avoid tight coupling?

**Detailed Answer:** Reduce coupling with interfaces, DI, clear boundaries, and event-driven communication where appropriate. Keep authentication, authorization, and request integrity checks centralized.
**Code Example:**

```js
function auth(req, res, next) {
  const t = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(t, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
const requireRole = (roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ code: "FORBIDDEN" });
```

#### Q63. How to handle timeouts?

**Detailed Answer:** Set server/client timeouts and use `AbortController` to cancel slow upstream calls. Keep authentication, authorization, and request integrity checks centralized.
**Code Example:**

```js
function auth(req, res, next) {
  const t = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(t, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
const requireRole = (roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ code: "FORBIDDEN" });
```

#### Q64. What is connection pooling?

**Detailed Answer:** Connection pooling reuses DB connections to reduce setup overhead and improve throughput. Protect write paths with transactions and always release resources in shutdown hooks.
**Code Example:**

```js
process.on("SIGTERM", () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
```

#### Q65. How to handle concurrency?

**Detailed Answer:** Manage concurrency with queues, semaphores, transactions, and optimistic/pessimistic locking. Protect write paths with transactions and always release resources in shutdown hooks.
**Code Example:**

```js
process.on("SIGTERM", () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
```

#### Q66. What is event-driven design?

**Detailed Answer:** Event-driven design models actions as events consumed asynchronously by interested components. Treat service boundaries as contracts and add controlled rollout plus failover strategy.
**Code Example:**

```js
app.use("/api", gatewayAuth, gatewayRateLimit, gatewayRouter);
app.get("/health", (_req, res) => res.json({ ok: true }));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
```

#### Q67. How to implement webhooks?

**Detailed Answer:** Implement webhooks with signed payloads, retries, idempotency, and dead-letter handling. Define key strategy and TTL/invalidation up front for deterministic behavior.
**Code Example:**

```js
const key = `idem:${req.get("Idempotency-Key")}`;
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const result = await serviceCall();
await redis.set(key, JSON.stringify(result), { EX: 3600 });
```

#### Q68. How to secure cookies?

**Detailed Answer:** Secure cookies using `HttpOnly`, `Secure`, `SameSite`, and scoped domain/path settings. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q69. Difference between 401 and 403?

**Detailed Answer:** `401` means unauthenticated; `403` means authenticated but not authorized. Keep authentication, authorization, and request integrity checks centralized.
**Code Example:**

```js
function auth(req, res, next) {
  const t = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(t, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
const requireRole = (roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ code: "FORBIDDEN" });
```

#### Q70. How to implement OAuth?

**Detailed Answer:** OAuth delegates authorization via authorization server issuing access/refresh tokens. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

### Beginner - Coding Exercises

#### C1. Implement `debounce(fn, wait)` in JavaScript.

**Detailed Answer:** Debounce runs once after rapid calls stop.
**Code Example:**

```js
function debounce(fn, wait = 0) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
}
```

#### C2. Implement `throttle(fn, wait)` in JavaScript.

**Detailed Answer:** Throttle limits calls to fixed intervals.
**Code Example:**

```js
function throttle(fn, wait = 0) {
  let last = 0;
  return (...a) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...a);
    }
  };
}
```

#### C3. Write `deepClone(obj)` without using JSON stringify.

**Detailed Answer:** Deep clone handles nested references and cycles.
**Code Example:**

```js
function deepClone(v, seen = new WeakMap()) {
  if (v === null || typeof v !== "object") return v;
  if (seen.has(v)) return seen.get(v);
  const o = Array.isArray(v) ? [] : {};
  seen.set(v, o);
  for (const k of Reflect.ownKeys(v)) o[k] = deepClone(v[k], seen);
  return o;
}
```

#### C4. Write `deepEqual(a, b)` to compare nested objects/arrays.

**Detailed Answer:** Deep equal compares structure recursively.
**Code Example:**

```js
function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
  const ka = Object.keys(a),
    kb = Object.keys(b);
  return (
    ka.length === kb.length &&
    ka.every(
      (k) =>
        Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]),
    )
  );
}
```

#### C5. Implement `once(fn)` that allows a function to run only once.

**Detailed Answer:** Once executes function only once and reuses result.
**Code Example:**

```js
function once(fn) {
  let called = false,
    val;
  return (...a) => {
    if (!called) {
      called = true;
      val = fn(...a);
    }
    return val;
  };
}
```

#### C6. Implement `memoize(fn)` for pure functions.

**Detailed Answer:** Memoize caches pure function outputs by args key.
**Code Example:**

```js
function memoize(fn) {
  const c = new Map();
  return (...a) => {
    const k = JSON.stringify(a);
    if (c.has(k)) return c.get(k);
    const v = fn(...a);
    c.set(k, v);
    return v;
  };
}
```

#### C7. Implement `promiseAll(promises)` (polyfill for Promise.all).

**Detailed Answer:** All resolves ordered results or rejects on first failure.
**Code Example:**

```js
function promiseAll(arr) {
  return new Promise((res, rej) => {
    if (!arr.length) return res([]);
    const out = new Array(arr.length);
    let done = 0;
    arr.forEach((p, i) =>
      Promise.resolve(p).then((v) => {
        out[i] = v;
        if (++done === arr.length) res(out);
      }, rej),
    );
  });
}
```

#### C8. Implement `promiseAny(promises)` (resolve first success).

**Detailed Answer:** Any resolves first success or AggregateError if all fail.
**Code Example:**

```js
function promiseAny(arr) {
  return new Promise((res, rej) => {
    if (!arr.length) return rej(new AggregateError([]));
    const errs = [];
    let c = 0;
    arr.forEach((p, i) =>
      Promise.resolve(p).then(res, (e) => {
        errs[i] = e;
        if (++c === arr.length) rej(new AggregateError(errs));
      }),
    );
  });
}
```

#### C9. Implement `promiseRace(promises)` (polyfill for Promise.race).

**Detailed Answer:** Race settles on first settled promise.
**Code Example:**

```js
function promiseRace(arr) {
  return new Promise((res, rej) => {
    for (const p of arr) Promise.resolve(p).then(res, rej);
  });
}
```

#### C10. Implement `retry(fn, retries, backoffMs)` that retries on failure.

**Detailed Answer:** Retry with bounded attempts and backoff.
**Code Example:**

```js
async function retry(fn, retries = 3, backoffMs = 100) {
  let e;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn(i);
    } catch (err) {
      e = err;
      if (i === retries) break;
      await new Promise((r) => setTimeout(r, backoffMs * 2 ** i));
    }
  }
  throw e;
}
```

#### C11. Implement `timeout(promise, ms)` that rejects if promise takes too long.

**Detailed Answer:** Timeout wrapper prevents hung operations.
**Code Example:**

```js
function timeout(p, ms) {
  return Promise.race([
    Promise.resolve(p),
    new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
  ]);
}
```

#### C12. Flatten an array deeply: `flatten([1,[2,[3]]]) -> [1,2,3]`.

**Detailed Answer:** Flatten recursively traverses nested arrays.
**Code Example:**

```js
function flatten(a) {
  return a.reduce(
    (acc, x) => acc.concat(Array.isArray(x) ? flatten(x) : x),
    [],
  );
}
```

#### C13. Group array of objects by key: `groupBy(users, 'city')`.

**Detailed Answer:** Group objects into buckets by key.
**Code Example:**

```js
function groupBy(arr, key) {
  return arr.reduce((m, o) => ((m[o[key]] ??= []).push(o), m), {});
}
```

#### C14. Convert array to frequency map: `['a','b','a'] -> {a:2,b:1}`.

**Detailed Answer:** Frequency map counts occurrences in linear time.
**Code Example:**

```js
function frequencyMap(arr) {
  return arr.reduce((m, x) => ((m[x] = (m[x] || 0) + 1), m), {});
}
```

#### C15. Parse query string into object: `"a=1&b=2" -> {a:'1',b:'2'}`.

**Detailed Answer:** Parse query string with URLSearchParams.
**Code Example:**

```js
function parseQueryString(q) {
  return Object.fromEntries(new URLSearchParams(q));
}
```

#### C16. Build query string from object (handle arrays too).

**Detailed Answer:** Build query string from object including arrays.
**Code Example:**

```js
function buildQueryString(obj) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) v.forEach((x) => p.append(k, String(x)));
    else if (v != null) p.append(k, String(v));
  }
  return p.toString();
}
```

#### C17. Write a safe JSON parser `safeJsonParse(str)` returning `{ok, value, error}`.

**Detailed Answer:** Return structured parse result without throwing.
**Code Example:**

```js
function safeJsonParse(str) {
  try {
    return { ok: true, value: JSON.parse(str), error: null };
  } catch (error) {
    return { ok: false, value: null, error };
  }
}
```

#### C18. Validate an email/phone with regex (basic).

**Detailed Answer:** Use basic regex for initial format validation.
**Code Example:**

```js
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[1-9]\d{9,14}$/;
```

#### C19. Implement `LRUCache(capacity)` (Map-based).

**Detailed Answer:** Map-based LRU uses insertion order to evict oldest.
**Code Example:**

```js
class LRUCache {
  constructor(cap) {
    this.cap = cap;
    this.m = new Map();
  }
  get(k) {
    if (!this.m.has(k)) return;
    const v = this.m.get(k);
    this.m.delete(k);
    this.m.set(k, v);
    return v;
  }
  put(k, v) {
    if (this.m.has(k)) this.m.delete(k);
    this.m.set(k, v);
    if (this.m.size > this.cap) this.m.delete(this.m.keys().next().value);
  }
}
```

#### C20. Implement `EventEmitter` with `on`, `off`, `emit`, `once`.

**Detailed Answer:** EventEmitter supports on/off/emit listeners.
**Code Example:**

```js
class EventEmitter {
  constructor() {
    this.e = new Map();
  }
  on(n, f) {
    (this.e.get(n) || this.e.set(n, new Set()).get(n)).add(f);
  }
  off(n, f) {
    this.e.get(n)?.delete(f);
  }
  emit(n, ...a) {
    for (const f of this.e.get(n) || []) f(...a);
  }
}
```

#### C86. Find second largest element in an array (handle duplicates).

**Detailed Answer:** Track max and second max in one pass while skipping duplicates.
**Code Example:**

```js
function secondLargest(a) {
  let m = -Infinity,
    s = -Infinity;
  for (const x of a) {
    if (x > m) {
      s = m;
      m = x;
    } else if (x > s && x < m) {
      s = x;
    }
  }
  return Number.isFinite(s) ? s : null;
}
```

#### C87. Detect if string has balanced brackets using stack.

**Detailed Answer:** Use stack push/pop with bracket pairing map.
**Code Example:**

```js
function isBalanced(str) {
  const mp = { ")": "(", "]": "[", "}": "{" };
  const st = [];
  for (const ch of str) {
    if ("([{".includes(ch)) st.push(ch);
    else if (mp[ch] && st.pop() !== mp[ch]) return false;
  }
  return st.length === 0;
}
```

#### C88. Find first non-repeating character.

**Detailed Answer:** Count characters then scan original order for first count 1.
**Code Example:**

```js
function firstUnique(s) {
  const c = {};
  for (const ch of s) c[ch] = (c[ch] || 0) + 1;
  for (const ch of s) if (c[ch] === 1) return ch;
  return null;
}
```

#### C89. Merge two sorted arrays.

**Detailed Answer:** Two-pointer merge preserves sorted order in O(n+m).
**Code Example:**

```js
function merge(a, b) {
  let i = 0,
    j = 0,
    out = [];
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return out.concat(a.slice(i), b.slice(j));
}
```

#### C90. Two-sum with hashmap.

**Detailed Answer:** Hash map gives linear-time complement lookup.
**Code Example:**

```js
function twoSum(nums, t) {
  const m = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = t - nums[i];
    if (m.has(need)) return [m.get(need), i];
    m.set(nums[i], i);
  }
  return [];
}
```

#### C91. Validate palindrome ignoring punctuation.

**Detailed Answer:** Normalize string and compare with two pointers.
**Code Example:**

```js
function isPalindrome(s) {
  const t = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let l = 0,
    r = t.length - 1;
  while (l < r) {
    if (t[l++] !== t[r--]) return false;
  }
  return true;
}
```

#### C92. Find longest substring without repeating characters.

**Detailed Answer:** Sliding window + last seen index map runs in O(n).
**Code Example:**

```js
function longest(s) {
  let l = 0,
    b = 0;
  const m = new Map();
  for (let r = 0; r < s.length; r++) {
    if (m.has(s[r])) l = Math.max(l, m.get(s[r]) + 1);
    m.set(s[r], r);
    b = Math.max(b, r - l + 1);
  }
  return b;
}
```

#### C93. Sliding window max sum of size K.

**Detailed Answer:** Maintain rolling window sum of size k.
**Code Example:**

```js
function maxSumK(a, k) {
  if (a.length < k) return null;
  let sum = a.slice(0, k).reduce((x, y) => x + y, 0),
    best = sum;
  for (let i = k; i < a.length; i++) {
    sum += a[i] - a[i - k];
    best = Math.max(best, sum);
  }
  return best;
}
```

#### C94. Group anagrams.

**Detailed Answer:** Group by sorted-character key.
**Code Example:**

```js
function groupAnagrams(words) {
  const m = new Map();
  for (const w of words) {
    const k = [...w].sort().join("");
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(w);
  }
  return [...m.values()];
}
```

#### C95. Rotate array by K.

**Detailed Answer:** Use modulo shift and slice concat.
**Code Example:**

```js
function rotate(a, k) {
  if (!a.length) return a;
  k = ((k % a.length) + a.length) % a.length;
  return a.slice(-k).concat(a.slice(0, -k));
}
```

#### C96. Remove duplicates from sorted array in-place.

**Detailed Answer:** Two-pointer in-place dedupe keeps unique prefix.
**Code Example:**

```js
function removeDup(nums) {
  if (!nums.length) return 0;
  let w = 1;
  for (let r = 1; r < nums.length; r++)
    if (nums[r] !== nums[r - 1]) nums[w++] = nums[r];
  return w;
}
```

#### C97. Top K frequent elements.

**Detailed Answer:** Frequency map plus sort gives top-k elements.
**Code Example:**

```js
function topK(nums, k) {
  const c = new Map();
  nums.forEach((n) => c.set(n, (c.get(n) || 0) + 1));
  return [...c.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([n]) => n);
}
```

### Intermediate - Core Concepts

#### Q71. How to verify JWT?

**Detailed Answer:** Verify JWT signature and claims (`exp`, `nbf`, `iss`, `aud`) with strict algorithm rules. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q72. What is HMAC?

**Detailed Answer:** HMAC is a keyed hash used to verify integrity/authenticity of messages. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q73. How to implement file streaming?

**Detailed Answer:** Use `fs.createReadStream`/`pipeline` to stream files in chunks. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q74. How to detect memory leak?

**Detailed Answer:** Compare heap snapshots over time, inspect retained paths, and watch growth under load. Monitor memory trends and compare snapshots to find retained object paths.
**Code Example:**

```js
setInterval(() => {
  const m = process.memoryUsage();
  console.log({ rss: m.rss, heapUsed: m.heapUsed });
}, 10000);
```

#### Q75. How to reduce latency?

**Detailed Answer:** Reduce latency via caching, DB/query tuning, non-blocking code, and smaller payloads. Keep authentication, authorization, and request integrity checks centralized.
**Code Example:**

```js
function auth(req, res, next) {
  const t = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(t, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
const requireRole = (roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ code: "FORBIDDEN" });
```

#### Q76. How to handle slow client?

**Detailed Answer:** For slow clients, rely on stream backpressure, write timeouts, and connection limits. Keep authentication, authorization, and request integrity checks centralized.
**Code Example:**

```js
function auth(req, res, next) {
  const t = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(t, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
const requireRole = (roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ code: "FORBIDDEN" });
```

#### Q77. What is sticky session?

**Detailed Answer:** Sticky session routes the same client to the same server instance. Keep authentication, authorization, and request integrity checks centralized.
**Code Example:**

```js
function auth(req, res, next) {
  const t = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(t, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
const requireRole = (roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ code: "FORBIDDEN" });
```

#### Q78. How to handle session storage?

**Detailed Answer:** Store sessions in shared stores (Redis/DB) for multi-instance deployments. Keep authentication, authorization, and request integrity checks centralized.
**Code Example:**

```js
function auth(req, res, next) {
  const t = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(t, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
const requireRole = (roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ code: "FORBIDDEN" });
```

#### Q79. What is CSRF?

**Detailed Answer:** CSRF tricks a logged-in browser into sending unwanted authenticated requests. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q80. How to mitigate CSRF?

**Detailed Answer:** Mitigate CSRF with `SameSite` cookies, CSRF tokens, and Origin/Referer checks. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q81. What is Helmet?

**Detailed Answer:** Helmet sets common security headers for Express apps. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q82. How to secure headers?

**Detailed Answer:** Secure headers include CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q83. How to implement compression?

**Detailed Answer:** Use compression middleware (`gzip`/`br`) for compressible responses. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q84. What is HTTP keep-alive?

**Detailed Answer:** HTTP keep-alive reuses TCP connections for multiple requests, lowering latency and overhead. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q85. How to handle large traffic spikes?

**Detailed Answer:** Handle spikes with autoscaling, caching, queueing, load shedding, and rate limiting. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q86. How to mock Node APIs?

**Detailed Answer:** Mock Node APIs using Jest mocks/spies, `nock` for HTTP, and test doubles for modules. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q87. What is Jest?

**Detailed Answer:** Jest is a JS testing framework with runner, assertions, mocks, and coverage tooling. Make observability and testing first-class to reduce production debugging time.
**Code Example:**

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - start,
    }),
  );
  next();
});
```

#### Q88. How to unit test service?

**Detailed Answer:** Unit test services by mocking dependencies and asserting business behavior deterministically. Make observability and testing first-class to reduce production debugging time.
**Code Example:**

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - start,
    }),
  );
  next();
});
```

#### Q89. What is integration testing?

**Detailed Answer:** Integration tests validate interactions between components and external dependencies. Make observability and testing first-class to reduce production debugging time.
**Code Example:**

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - start,
    }),
  );
  next();
});
```

#### Q90. How to structure test folders?

**Detailed Answer:** Organize tests by module/domain and split unit/integration/e2e suites clearly. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q91. What is TDD?

**Detailed Answer:** TDD cycle: write failing test, implement minimum code, refactor safely. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q92. How to implement feature flags?

**Detailed Answer:** Feature flags gate behavior dynamically for rollout, experiments, and fast rollback. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q93. What is rate limiting algorithm?

**Detailed Answer:** Common algorithms: fixed window, sliding window/log, token bucket, and leaky bucket. Define key strategy and TTL/invalidation up front for deterministic behavior.
**Code Example:**

```js
const key = `idem:${req.get("Idempotency-Key")}`;
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const result = await serviceCall();
await redis.set(key, JSON.stringify(result), { EX: 3600 });
```

#### Q94. Token bucket vs leaky bucket?

**Detailed Answer:** Token bucket allows bursts with refill rate; leaky bucket enforces steadier outflow. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q95. How to implement metrics?

**Detailed Answer:** Expose metrics via counters/gauges/histograms and scrape with monitoring systems. Make observability and testing first-class to reduce production debugging time.
**Code Example:**

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - start,
    }),
  );
  next();
});
```

#### Q96. What is Prometheus?

**Detailed Answer:** Prometheus is a pull-based time-series monitoring system with PromQL querying. Make observability and testing first-class to reduce production debugging time.
**Code Example:**

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - start,
    }),
  );
  next();
});
```

#### Q97. What is OpenTelemetry?

**Detailed Answer:** OpenTelemetry standardizes traces, metrics, logs instrumentation and context propagation. Make observability and testing first-class to reduce production debugging time.
**Code Example:**

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - start,
    }),
  );
  next();
});
```

#### Q98. How to log request ID?

**Detailed Answer:** Generate/extract requestId at ingress and include it in logs/headers/context. Make observability and testing first-class to reduce production debugging time.
**Code Example:**

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - start,
    }),
  );
  next();
});
```

#### Q99. How to handle multi-tenant logic?

**Detailed Answer:** Multi-tenant systems isolate data and logic by tenant ID with strict auth scoping. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q100. What is DTO?

**Detailed Answer:** DTO (Data Transfer Object) defines external API contract separate from internal models. Couple testing and observability so failures are easy to detect and triage.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - st,
    }),
  );
  next();
});
test("service unit", () => {
  expect(1 + 1).toBe(2);
});
```

#### Q101. How to validate schemas?

**Detailed Answer:** Validate schemas at boundaries using AJV/Zod/Joi and reject invalid input early. Ensure correctness with schema validation, locking, and idempotent job processing.
**Code Example:**

```js
await db.query("BEGIN");
await db.query("SELECT * FROM accounts WHERE id=$1 FOR UPDATE", [id]);
await db.query("COMMIT");
```

#### Q102. How to implement health check?

**Detailed Answer:** Health checks expose dependency and process status (e.g., DB, cache, queue). Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q103. What is liveness probe?

**Detailed Answer:** Liveness probe answers: should this container be restarted? Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q104. What is readiness probe?

**Detailed Answer:** Readiness probe answers: can this instance receive traffic now? Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q105. How to implement API versioning?

**Detailed Answer:** Version APIs via URI/header/media type with compatibility and deprecation strategy. Ensure correctness with schema validation, locking, and idempotent job processing.
**Code Example:**

```js
await db.query("BEGIN");
await db.query("SELECT * FROM accounts WHERE id=$1 FOR UPDATE", [id]);
await db.query("COMMIT");
```

#### Q106. What is optimistic locking?

**Detailed Answer:** Optimistic locking checks version/updatedAt on update and fails on conflict. Protect write paths with transactions and always release resources in shutdown hooks.
**Code Example:**

```js
process.on("SIGTERM", () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
```

#### Q107. What is pessimistic locking?

**Detailed Answer:** Pessimistic locking acquires DB locks (e.g., `SELECT ... FOR UPDATE`) before mutation. Protect write paths with transactions and always release resources in shutdown hooks.
**Code Example:**

```js
process.on("SIGTERM", () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
```

#### Q108. How to prevent race condition?

**Detailed Answer:** Prevent races with atomic operations, transactions, locks, and idempotency keys. Protect write paths with transactions and always release resources in shutdown hooks.
**Code Example:**

```js
process.on("SIGTERM", () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
```

#### Q109. What is ETag?

**Detailed Answer:** ETag is a resource version hash used for cache validation and conditional requests. Define key strategy and TTL/invalidation up front for deterministic behavior.
**Code Example:**

```js
const key = `idem:${req.get("Idempotency-Key")}`;
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const result = await serviceCall();
await redis.set(key, JSON.stringify(result), { EX: 3600 });
```

#### Q110. How to implement idempotency key?

**Detailed Answer:** Store `Idempotency-Key` + response metadata to safely dedupe retries. Define key strategy and TTL/invalidation up front for deterministic behavior.
**Code Example:**

```js
const key = `idem:${req.get("Idempotency-Key")}`;
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const result = await serviceCall();
await redis.set(key, JSON.stringify(result), { EX: 3600 });
```

#### Q111. What is middleware chaining?

**Detailed Answer:** Middleware chaining is sequential execution where each middleware can continue or terminate. Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q112. How to handle binary data?

**Detailed Answer:** Handle binary data with `Buffer`, streams, correct encodings, and content headers. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q113. What is Buffer?

**Detailed Answer:** `Buffer` is Node's raw byte container for binary data manipulation. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q114. How to parse CSV file?

**Detailed Answer:** Parse CSV using streaming parsers (`csv-parser`, `fast-csv`) to avoid memory spikes. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q115. How to implement cron job?

**Detailed Answer:** Use scheduled jobs (cron syntax) for periodic tasks in-process or external schedulers. Ensure correctness with schema validation, locking, and idempotent job processing.
**Code Example:**

```js
await db.query("BEGIN");
await db.query("SELECT * FROM accounts WHERE id=$1 FOR UPDATE", [id]);
await db.query("COMMIT");
```

#### Q116. What is node-cron?

**Detailed Answer:** `node-cron` is a cron-like scheduler library for Node.js. Ensure correctness with schema validation, locking, and idempotent job processing.
**Code Example:**

```js
await db.query("BEGIN");
await db.query("SELECT * FROM accounts WHERE id=$1 FOR UPDATE", [id]);
await db.query("COMMIT");
```

#### Q117. How to manage background jobs?

**Detailed Answer:** Manage background jobs with queue systems, retries, visibility timeout, and DLQ. Ensure correctness with schema validation, locking, and idempotent job processing.
**Code Example:**

```js
await db.query("BEGIN");
await db.query("SELECT * FROM accounts WHERE id=$1 FOR UPDATE", [id]);
await db.query("COMMIT");
```

#### Q118. What is Bull queue?

**Detailed Answer:** Bull is a Redis-backed job queue for delayed/retried/repeatable jobs. Ensure correctness with schema validation, locking, and idempotent job processing.
**Code Example:**

```js
await db.query("BEGIN");
await db.query("SELECT * FROM accounts WHERE id=$1 FOR UPDATE", [id]);
await db.query("COMMIT");
```

#### Q119. How to implement SQS consumer?

**Detailed Answer:** SQS consumer polls messages, processes idempotently, and deletes only on success. Ensure correctness with schema validation, locking, and idempotent job processing.
**Code Example:**

```js
await db.query("BEGIN");
await db.query("SELECT * FROM accounts WHERE id=$1 FOR UPDATE", [id]);
await db.query("COMMIT");
```

#### Q120. How to retry failed jobs?

**Detailed Answer:** Retry failed jobs with capped attempts, backoff, and dead-letter queues. Ensure correctness with schema validation, locking, and idempotent job processing.
**Code Example:**

```js
await db.query("BEGIN");
await db.query("SELECT * FROM accounts WHERE id=$1 FOR UPDATE", [id]);
await db.query("COMMIT");
```

#### Q121. What is exponential backoff?

**Detailed Answer:** Exponential backoff increases wait time after failures to reduce retry storms. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q122. How to detect API abuse?

**Detailed Answer:** Detect abuse via anomaly metrics, IP/device heuristics, and behavioral thresholds. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q123. How to throttle endpoints?

**Detailed Answer:** Throttling limits request rate or concurrency per client/key/endpoint. Define key strategy and TTL/invalidation up front for deterministic behavior.
**Code Example:**

```js
const key = `idem:${req.get("Idempotency-Key")}`;
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const result = await serviceCall();
await redis.set(key, JSON.stringify(result), { EX: 3600 });
```

#### Q124. How to enforce code standards?

**Detailed Answer:** Enforce standards with ESLint/Prettier, lint-staged hooks, and CI gates. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q125. What is ESLint?

**Detailed Answer:** ESLint statically analyzes JS/TS for style and potential bug patterns. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q126. How to avoid circular dependency?

**Detailed Answer:** Avoid circular deps by layering modules and extracting shared contracts/utilities. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q127. What is module resolution?

**Detailed Answer:** Module resolution determines how imports map to files/packages (`node_modules`, exports, paths). Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q128. How to split large app?

**Detailed Answer:** Split large apps by bounded contexts/domains with explicit module ownership. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q129. What is monorepo?

**Detailed Answer:** Monorepo stores multiple related packages/services in one repository. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q130. What is yarn workspace?

**Detailed Answer:** Yarn workspaces manage monorepo dependencies and local package linking. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q131. How to deploy Node app?

**Detailed Answer:** Deploy with CI/CD, environment configs, health checks, and rollback-safe strategy. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q132. What is PM2?

**Detailed Answer:** PM2 is a Node process manager with clustering, restart policies, and monitoring. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q133. How to zero-downtime restart?

**Detailed Answer:** Zero-downtime restart uses rolling reload/graceful shutdown to avoid dropped requests. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q134. What is blue-green deployment?

**Detailed Answer:** Blue-green deployment switches traffic between two production-identical environments. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q135. What is canary release?

**Detailed Answer:** Canary release gradually exposes new version to small traffic percentages first. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q136. How to rollback deployment?

**Detailed Answer:** Rollback by reverting traffic/artifact quickly to last known stable release. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q137. What is load balancer?

**Detailed Answer:** Load balancer distributes traffic and can handle TLS termination and health checks. Treat service boundaries as contracts and add controlled rollout plus failover strategy.
**Code Example:**

```js
app.use("/api", gatewayAuth, gatewayRateLimit, gatewayRouter);
app.get("/health", (_req, res) => res.json({ ok: true }));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
```

#### Q138. How to handle 10k RPS?

**Detailed Answer:** For 10k RPS: optimize hot paths, cache aggressively, tune DB, and scale horizontally. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q139. How to optimize JSON parsing?

**Detailed Answer:** Optimize JSON parsing by reducing payload size, avoiding repeated parse/stringify, and streaming when possible. Treat deployment and runtime performance as measurable engineering concerns.
**Code Example:**

```js
process.on("SIGTERM", () => server.close(() => process.exit(0)));
const agent = new (require("node:http").Agent)({
  keepAlive: true,
  maxSockets: 200,
});
```

#### Q140. What is V8 engine?

**Detailed Answer:** V8 is Google's JS engine using JIT compilation and garbage collection. Keep handler logic small and offload long CPU work so the event loop stays responsive.
**Code Example:**

```js
const http = require("node:http");
http
  .createServer(async (_req, res) => {
    await Promise.resolve();
    res.end("ok");
  })
  .listen(3000);
```

#### Q141. How GC works?

**Detailed Answer:** V8 GC is generational; short-lived objects collected frequently, long-lived less often. Monitor memory trends and compare snapshots to find retained object paths.
**Code Example:**

```js
setInterval(() => {
  const m = process.memoryUsage();
  console.log({ rss: m.rss, heapUsed: m.heapUsed });
}, 10000);
```

#### Q142. How to reduce GC pauses?

**Detailed Answer:** Reduce GC pauses by lowering allocations, reusing objects, and tuning heap settings. Monitor memory trends and compare snapshots to find retained object paths.
**Code Example:**

```js
setInterval(() => {
  const m = process.memoryUsage();
  console.log({ rss: m.rss, heapUsed: m.heapUsed });
}, 10000);
```

#### Q143. What is async queue?

**Detailed Answer:** Async queue buffers tasks and processes them asynchronously with worker control. Keep internals modular and observable; avoid hidden coupling between modules.
**Code Example:**

```js
const pino = require("pino")();
pino.info({ msg: "startup", service: "node-api" });
```

#### Q144. How to limit concurrency?

**Detailed Answer:** Limit concurrency with primitives like semaphores or utilities like `p-limit`. Protect write paths with transactions and always release resources in shutdown hooks.
**Code Example:**

```js
process.on("SIGTERM", () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
```

#### Q145. What is semaphore?

**Detailed Answer:** Semaphore controls concurrent access via an acquire/release counter. Keep internals modular and observable; avoid hidden coupling between modules.
**Code Example:**

```js
const pino = require("pino")();
pino.info({ msg: "startup", service: "node-api" });
```

#### Q146. How to prevent memory bloat?

**Detailed Answer:** Prevent memory bloat with bounded caches, streaming, and cleanup of stale references. Monitor memory trends and compare snapshots to find retained object paths.
**Code Example:**

```js
setInterval(() => {
  const m = process.memoryUsage();
  console.log({ rss: m.rss, heapUsed: m.heapUsed });
}, 10000);
```

#### Q147. How to handle request validation errors?

**Detailed Answer:** Return structured 400/422 errors with field-level details for validation failures. Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q148. How to centralize config?

**Detailed Answer:** Centralize config in a typed config module loaded once from env/secrets. Keep internals modular and observable; avoid hidden coupling between modules.
**Code Example:**

```js
const pino = require("pino")();
pino.info({ msg: "startup", service: "node-api" });
```

#### Q149. What is dotenv?

**Detailed Answer:** `dotenv` loads variables from `.env` into `process.env` (usually for local dev). Keep internals modular and observable; avoid hidden coupling between modules.
**Code Example:**

```js
const pino = require("pino")();
pino.info({ msg: "startup", service: "node-api" });
```

#### Q150. How to structure microservice?

**Detailed Answer:** Microservice structure: independent deployable service with clear API/events and own data boundary. Treat service boundaries as contracts and add controlled rollout plus failover strategy.
**Code Example:**

```js
app.use("/api", gatewayAuth, gatewayRateLimit, gatewayRouter);
app.get("/health", (_req, res) => res.json({ ok: true }));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
```

### Intermediate - Coding Exercises

#### C21. Write an Express middleware that attaches a `requestId` to every request.

**Detailed Answer:** Attach requestId on every request so logs and traces can be correlated end-to-end.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
```

#### C22. Write a logging middleware that logs: method, path, status, latency ms, requestId.

**Detailed Answer:** Log request summary on response finish to capture final status and latency.
**Code Example:**

```js
app.use((req, res, next) => {
  const st = Date.now();
  res.on("finish", () =>
    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      ms: Date.now() - st,
      requestId: req.requestId,
    }),
  );
  next();
});
```

#### C23. Write a global error handler middleware that returns a standard error JSON format.

**Detailed Answer:** Return a normalized error shape from one global error middleware.
**Code Example:**

```js
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({
      code: err.code || "INTERNAL_ERROR",
      message: err.message,
      details: err.details || null,
      requestId: req.requestId,
    }),
);
```

#### C24. Write middleware to block requests if payload > N MB.

**Detailed Answer:** Reject oversized request bodies with explicit 413 response.
**Code Example:**

```js
app.use(express.json({ limit: "2mb" }));
app.use((err, _req, res, next) => {
  if (err.type === "entity.too.large")
    return res.status(413).json({ code: "PAYLOAD_TOO_LARGE" });
  next(err);
});
```

#### C25. Write middleware to validate `Content-Type: application/json` for POST/PUT/PATCH.

**Detailed Answer:** Validate JSON content type for write methods.
**Code Example:**

```js
function requireJson(req, res, next) {
  if (
    ["POST", "PUT", "PATCH"].includes(req.method) &&
    !req.is("application/json")
  )
    return res.status(415).json({ code: "UNSUPPORTED_MEDIA_TYPE" });
  next();
}
```

#### C26. Implement basic rate limiting middleware (in-memory) per IP.

**Detailed Answer:** In-memory fixed-window limiter per IP for single-node setup.
**Code Example:**

```js
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now(),
    key = req.ip,
    win = 60000,
    max = 60;
  const arr = (hits.get(key) || []).filter((t) => now - t < win);
  if (arr.length >= max) return res.status(429).json({ code: "RATE_LIMITED" });
  arr.push(now);
  hits.set(key, arr);
  next();
}
```

#### C27. Implement a simple API key auth middleware (header based).

**Detailed Answer:** Validate API key header against secret value and fail closed.
**Code Example:**

```js
function apiKeyAuth(req, res, next) {
  if (req.get("x-api-key") !== process.env.API_KEY)
    return res.status(401).json({ code: "UNAUTHORIZED" });
  next();
}
```

#### C28. Implement JWT auth middleware (verify token, attach user to req).

**Detailed Answer:** Verify JWT and attach decoded user claims to request context.
**Code Example:**

```js
function jwtAuth(req, res, next) {
  const t = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(t, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### C29. Implement RBAC middleware: `requireRole(['admin','ops'])`.

**Detailed Answer:** RBAC middleware checks whether user role is in allow-list.
**Code Example:**

```js
const requireRole = (roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ code: "FORBIDDEN" });
```

#### C30. Implement request schema validation (pseudo: Zod/AJV) and return 422 on failure.

**Detailed Answer:** Validate payload schema before handler and return 422 on violations.
**Code Example:**

```js
const validate = (schema) => (req, res, next) => {
  const r = schema.safeParse(req.body);
  if (!r.success)
    return res
      .status(422)
      .json({ code: "VALIDATION_ERROR", details: r.error.flatten() });
  req.body = r.data;
  next();
};
```

#### C31. Write an endpoint `GET /health` that checks DB connectivity (mocked).

**Detailed Answer:** Health endpoint should check dependencies and return 503 when degraded.
**Code Example:**

```js
app.get("/health", async (_req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ ok: true });
  } catch {
    res.status(503).json({ ok: false });
  }
});
```

#### C32. Write `GET /users` with pagination (`page`, `limit`) and proper bounds.

**Detailed Answer:** Bound page/limit and compute offset safely for consistent pagination.
**Code Example:**

```js
const page = Math.max(1, Number(req.query.page || 1));
const limit = Math.min(100, Math.max(1, Number(req.query.limit || 20)));
const offset = (page - 1) * limit;
const rows = await db.query(
  "SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2",
  [limit, offset],
);
```

#### C33. Write `GET /users` with cursor pagination using `createdAt` + `id`.

**Detailed Answer:** Use keyset cursor for stable pagination on evolving datasets.
**Code Example:**

```sql
SELECT * FROM users WHERE (created_at,id) < ($1,$2) ORDER BY created_at DESC,id DESC LIMIT 20;
```

#### C34. Implement `POST /items` that is idempotent using an `Idempotency-Key` header.

**Detailed Answer:** Implement with clear contracts and add edge-case tests.
**Code Example:**

```js
function solve(input) {
  return input;
}
```

#### C35. Implement ETag support for GET endpoint (If-None-Match -> 304).

**Detailed Answer:** ETag allows conditional GET and returns 304 for unchanged response.
**Code Example:**

```js
const body = JSON.stringify(payload);
const etag = crypto.createHash("sha1").update(body).digest("hex");
if (req.get("if-none-match") === etag) return res.status(304).end();
res.set("ETag", etag).send(body);
```

#### C36. Implement `POST /upload` that streams file to disk (no buffering whole file).

**Detailed Answer:** Pipe upload stream directly to storage without buffering entire file.
**Code Example:**

```js
app.post("/upload", (req, res, next) => {
  const out = fs.createWriteStream(`uploads/${Date.now()}.bin`);
  req
    .pipe(out)
    .on("finish", () => res.status(201).json({ ok: true }))
    .on("error", next);
});
```

#### C37. Implement `POST /webhook` that verifies HMAC signature header.

**Detailed Answer:** Validate webhook signature from raw body using timing-safe compare.
**Code Example:**

```js
const expected = crypto
  .createHmac("sha256", process.env.WEBHOOK_SECRET)
  .update(req.body)
  .digest("hex");
if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
  return res.status(401).end();
```

#### C38. Implement `POST /webhook` that dedupes repeated events (store eventId in memory/map).

**Detailed Answer:** Deduplicate webhook events by eventId with TTL to avoid duplicate side effects.
**Code Example:**

```js
const key = `webhook:${event.id}`;
const added = await redis.set(key, "1", { NX: true, EX: 600 });
if (added === null) return;
await processEvent(event);
```

#### C39. Implement an endpoint that returns SSE (Server-Sent Events) stream.

**Detailed Answer:** Set SSE headers and stream events over long-lived HTTP connection.
**Code Example:**

```js
res.set({
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
});
const t = setInterval(
  () => res.write(`data: ${JSON.stringify({ ts: Date.now() })}\n\n`),
  1000,
);
req.on("close", () => clearInterval(t));
```

#### C40. Implement WebSocket server that broadcasts messages (basic).

**Detailed Answer:** Broadcast incoming message to all connected WebSocket clients.
**Code Example:**

```js
const wss = new WebSocketServer({ server });
wss.on("connection", (ws) =>
  ws.on("message", (m) => {
    for (const c of wss.clients) if (c.readyState === 1) c.send(m.toString());
  }),
);
```

#### C49. Read a huge CSV file using streams and count rows (don't load into memory).

**Detailed Answer:** Use streaming APIs and pipeline to keep memory usage flat for large files.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(
  fs.createReadStream("in.txt"),
  transform,
  fs.createWriteStream("out.txt"),
);
```

#### C50. Stream JSON lines file and filter records by condition.

**Detailed Answer:** Use streaming APIs and pipeline to keep memory usage flat for large files.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(
  fs.createReadStream("in.txt"),
  transform,
  fs.createWriteStream("out.txt"),
);
```

#### C51. Implement transform stream that converts input text to uppercase.

**Detailed Answer:** Use streaming APIs and pipeline to keep memory usage flat for large files.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(
  fs.createReadStream("in.txt"),
  transform,
  fs.createWriteStream("out.txt"),
);
```

#### C52. Pipe a readable stream to writable and handle backpressure properly.

**Detailed Answer:** Use streaming APIs and pipeline to keep memory usage flat for large files.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(
  fs.createReadStream("in.txt"),
  transform,
  fs.createWriteStream("out.txt"),
);
```

#### C53. Implement API to download file with `res.write` streaming (set headers).

**Detailed Answer:** Use streaming APIs and pipeline to keep memory usage flat for large files.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(
  fs.createReadStream("in.txt"),
  transform,
  fs.createWriteStream("out.txt"),
);
```

#### C72. Given code with event loop blocking, refactor to non-blocking.

**Detailed Answer:** Debugging fixes should include a regression guard and explicit resource/error handling.
**Code Example:**

```js
const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

#### C73. Given memory leak code (global array), fix it and explain.

**Detailed Answer:** Debugging fixes should include a regression guard and explicit resource/error handling.
**Code Example:**

```js
const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

#### C74. Given Express route with missing `await`, fix race condition.

**Detailed Answer:** Debugging fixes should include a regression guard and explicit resource/error handling.
**Code Example:**

```js
const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

#### C75. Given wrong pagination, correct off-by-one + bounds.

**Detailed Answer:** Debugging fixes should include a regression guard and explicit resource/error handling.
**Code Example:**

```js
const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

#### C76. Given duplicate webhook processing, implement dedupe with TTL.

**Detailed Answer:** Prevent duplicate webhook handling with atomic key insert + TTL.
**Code Example:**

```js
const key = `webhook:${event.id}`;
const added = await redis.set(key, "1", { NX: true, EX: 600 });
if (added === null) return;
await processEvent(event);
```

#### C77. Given slow endpoint, add caching + proper invalidation approach.

**Detailed Answer:** Debugging fixes should include a regression guard and explicit resource/error handling.
**Code Example:**

```js
const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

#### C78. Given DB connection leak, refactor to use pool correctly.

**Detailed Answer:** Debugging fixes should include a regression guard and explicit resource/error handling.
**Code Example:**

```js
const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

#### C79. Given unhandled rejection, implement safe wrapper for async routes.

**Detailed Answer:** Debugging fixes should include a regression guard and explicit resource/error handling.
**Code Example:**

```js
const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

#### C80. Given inconsistent rounding, fix currency handling (use integer paise/cents).

**Detailed Answer:** Debugging fixes should include a regression guard and explicit resource/error handling.
**Code Example:**

```js
const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

#### C98. Validate parentheses with wildcard `*` (bonus).

**Detailed Answer:** Use greedy min/max open counter for `*` wildcard parentheses validation.
**Code Example:**

```js
function validWithStar(s) {
  let lo = 0,
    hi = 0;
  for (const ch of s) {
    if (ch === "(") {
      lo++;
      hi++;
    } else if (ch === ")") {
      lo = Math.max(0, lo - 1);
      hi--;
    } else {
      lo = Math.max(0, lo - 1);
      hi++;
    }
    if (hi < 0) return false;
  }
  return lo === 0;
}
```

#### C99. Implement BFS/DFS over adjacency list.

**Detailed Answer:** BFS over adjacency list uses queue and visited set to avoid revisits.
**Code Example:**

```js
function bfs(g, start) {
  const q = [start],
    seen = new Set([start]);
  while (q.length) {
    const n = q.shift();
    for (const x of g[n] || [])
      if (!seen.has(x)) {
        seen.add(x);
        q.push(x);
      }
  }
  return [...seen];
}
```

#### C100. Detect cycle in directed graph (bonus).

**Detailed Answer:** Detect cycle in directed graph via DFS recursion stack markers.
**Code Example:**

```js
function hasCycle(g) {
  const seen = new Set(),
    inStack = new Set();
  const dfs = (n) => {
    if (inStack.has(n)) return true;
    if (seen.has(n)) return false;
    seen.add(n);
    inStack.add(n);
    for (const x of g[n] || []) if (dfs(x)) return true;
    inStack.delete(n);
    return false;
  };
  return Object.keys(g).some(dfs);
}
```

### Advanced - Core Concepts

#### Q151. What is API gateway?

**Detailed Answer:** API gateway centralizes auth, routing, throttling, aggregation, and observability. Treat service boundaries as contracts and add controlled rollout plus failover strategy.
**Code Example:**

```js
app.use("/api", gatewayAuth, gatewayRateLimit, gatewayRouter);
app.get("/health", (_req, res) => res.json({ ok: true }));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
```

#### Q152. How to secure internal APIs?

**Detailed Answer:** Secure internal APIs with mTLS/service identity, network policies, and short-lived tokens. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q153. What is mTLS?

**Detailed Answer:** mTLS authenticates both client and server using certificates. Keep internals modular and observable; avoid hidden coupling between modules.
**Code Example:**

```js
const pino = require("pino")();
pino.info({ msg: "startup", service: "node-api" });
```

#### Q154. How to implement audit logging?

**Detailed Answer:** Audit logging records who did what, when, where, and outcome in immutable form. Keep internals modular and observable; avoid hidden coupling between modules.
**Code Example:**

```js
const pino = require("pino")();
pino.info({ msg: "startup", service: "node-api" });
```

#### Q155. What is tracing?

**Detailed Answer:** Tracing follows request flow across components using spans and parent-child relationships. Make observability and testing first-class to reduce production debugging time.
**Code Example:**

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - start,
    }),
  );
  next();
});
```

#### Q156. How to correlate logs?

**Detailed Answer:** Correlate logs by propagating traceId/requestId through all services. Keep internals modular and observable; avoid hidden coupling between modules.
**Code Example:**

```js
const pino = require("pino")();
pino.info({ msg: "startup", service: "node-api" });
```

#### Q157. What is structured logging?

**Detailed Answer:** Structured logging is machine-readable logs (usually JSON) with stable key fields. Make observability and testing first-class to reduce production debugging time.
**Code Example:**

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    logger.info({
      requestId: req.requestId,
      status: res.statusCode,
      ms: Date.now() - start,
    }),
  );
  next();
});
```

#### Q158. How to monitor memory usage?

**Detailed Answer:** Monitor memory via `process.memoryUsage()`, GC stats, and container/runtime metrics. Monitor memory trends and compare snapshots to find retained object paths.
**Code Example:**

```js
setInterval(() => {
  const m = process.memoryUsage();
  console.log({ rss: m.rss, heapUsed: m.heapUsed });
}, 10000);
```

#### Q159. How to optimize cold start?

**Detailed Answer:** Improve cold start by reducing dependencies, lazy initialization, and connection reuse. Reuse initialized clients and keep handlers idempotent with bounded runtime.
**Code Example:**

```js
const db = createDbClient();
exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify(await db.query("SELECT 1")),
});
```

#### Q160. What is dependency graph?

**Detailed Answer:** Dependency graph visualizes module/package relationships and coupling hotspots. Keep internals modular and observable; avoid hidden coupling between modules.
**Code Example:**

```js
const pino = require("pino")();
pino.info({ msg: "startup", service: "node-api" });
```

#### Q161. How to handle timezone?

**Detailed Answer:** Store timestamps in UTC and convert to user timezone only at presentation boundaries. Balance data correctness, precision, and transport concerns (HTTP/WebSocket/Lambda).
**Code Example:**

```js
const totalCents = 1099n + 250n;
wss.on("connection", (ws) => ws.send(JSON.stringify({ ok: true })));
```

#### Q162. What is moment deprecation?

**Detailed Answer:** Moment is in maintenance mode; prefer modern libs (Luxon, date-fns, Day.js, Temporal when available). Balance data correctness, precision, and transport concerns (HTTP/WebSocket/Lambda).
**Code Example:**

```js
const totalCents = 1099n + 250n;
wss.on("connection", (ws) => ws.send(JSON.stringify({ ok: true })));
```

#### Q163. How to handle date validation?

**Detailed Answer:** Validate dates with strict parsing, timezone awareness, and range/business-rule checks. Keep middleware order intentional and return consistent error payloads.
**Code Example:**

```js
app.use(express.json());
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.use((err, req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ code: "ERR", message: err.message, requestId: req.requestId }),
);
```

#### Q164. How to avoid floating precision errors?

**Detailed Answer:** Avoid float precision issues by storing money as integers or using decimal libraries. Balance data correctness, precision, and transport concerns (HTTP/WebSocket/Lambda).
**Code Example:**

```js
const totalCents = 1099n + 250n;
wss.on("connection", (ws) => ws.send(JSON.stringify({ ok: true })));
```

#### Q165. What is BigInt?

**Detailed Answer:** `BigInt` supports integers larger than `Number.MAX_SAFE_INTEGER` without precision loss. Balance data correctness, precision, and transport concerns (HTTP/WebSocket/Lambda).
**Code Example:**

```js
const totalCents = 1099n + 250n;
wss.on("connection", (ws) => ws.send(JSON.stringify({ ok: true })));
```

#### Q166. How to prevent SQL injection?

**Detailed Answer:** Prevent SQL injection with parameterized queries, ORM safeguards, and least DB privileges. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q167. How to sanitize file input?

**Detailed Answer:** Sanitize file input by validating MIME/extension/size/path and scanning untrusted files. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q168. How to implement streaming API?

**Detailed Answer:** Implement streaming APIs using Node streams/SSE/chunked responses with backpressure handling. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q169. What is HTTP2?

**Detailed Answer:** HTTP/2 adds multiplexing, header compression, and better connection utilization. Batch reads and shape responses to reduce fan-out load.
**Code Example:**

```js
const resolvers = {
  Query: { user: (_p, { id }, ctx) => ctx.loaders.userById.load(id) },
  User: { orders: (u, _a, ctx) => ctx.loaders.ordersByUserId.load(u.id) },
};
```

#### Q170. How to handle WebSocket?

**Detailed Answer:** Handle WebSocket with auth on upgrade, heartbeat/ping, reconnection, and backpressure controls. Batch reads and shape responses to reduce fan-out load.
**Code Example:**

```js
const resolvers = {
  Query: { user: (_p, { id }, ctx) => ctx.loaders.userById.load(id) },
  User: { orders: (u, _a, ctx) => ctx.loaders.ordersByUserId.load(u.id) },
};
```

#### Q171. What is socket.io?

**Detailed Answer:** Socket.IO is a realtime library over WebSocket with fallbacks, rooms, and event abstraction. Batch reads and shape responses to reduce fan-out load.
**Code Example:**

```js
const resolvers = {
  Query: { user: (_p, { id }, ctx) => ctx.loaders.userById.load(id) },
  User: { orders: (u, _a, ctx) => ctx.loaders.ordersByUserId.load(u.id) },
};
```

#### Q172. How to scale WebSocket?

**Detailed Answer:** Scale WebSocket using pub/sub adapters (e.g., Redis), sharding, and sticky sessions. Batch reads and shape responses to reduce fan-out load.
**Code Example:**

```js
const resolvers = {
  Query: { user: (_p, { id }, ctx) => ctx.loaders.userById.load(id) },
  User: { orders: (u, _a, ctx) => ctx.loaders.ordersByUserId.load(u.id) },
};
```

#### Q173. What is serverless?

**Detailed Answer:** Serverless runs functions on managed infra with event triggers and pay-per-use billing. Reuse initialized clients and keep handlers idempotent with bounded runtime.
**Code Example:**

```js
const db = createDbClient();
exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify(await db.query("SELECT 1")),
});
```

#### Q174. How to adapt Node for Lambda?

**Detailed Answer:** For Lambda, keep handlers stateless, initialize clients outside handler, and optimize bundle size. Reuse initialized clients and keep handlers idempotent with bounded runtime.
**Code Example:**

```js
const db = createDbClient();
exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify(await db.query("SELECT 1")),
});
```

#### Q175. How to log in Lambda?

**Detailed Answer:** In Lambda, emit structured logs with correlation IDs to CloudWatch/observability pipelines. Reuse initialized clients and keep handlers idempotent with bounded runtime.
**Code Example:**

```js
const db = createDbClient();
exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify(await db.query("SELECT 1")),
});
```

#### Q176. What is cold vs warm start?

**Detailed Answer:** Cold start is first/container-init latency; warm start reuses runtime and is faster. Reuse initialized clients and keep handlers idempotent with bounded runtime.
**Code Example:**

```js
const db = createDbClient();
exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify(await db.query("SELECT 1")),
});
```

#### Q177. How to structure Lambda handler?

**Detailed Answer:** Keep Lambda handler thin: parse event, call service logic, map response/errors. Reuse initialized clients and keep handlers idempotent with bounded runtime.
**Code Example:**

```js
const db = createDbClient();
exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify(await db.query("SELECT 1")),
});
```

#### Q178. How to handle Lambda timeout?

**Detailed Answer:** Handle Lambda timeout with internal deadlines, partial work checkpoints, and retry-safe idempotency. Reuse initialized clients and keep handlers idempotent with bounded runtime.
**Code Example:**

```js
const db = createDbClient();
exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify(await db.query("SELECT 1")),
});
```

#### Q179. How to implement batch processing?

**Detailed Answer:** Batch processing should chunk work, process with limits, and support retries and partial failures. Balance data correctness, precision, and transport concerns (HTTP/WebSocket/Lambda).
**Code Example:**

```js
const totalCents = 1099n + 250n;
wss.on("connection", (ws) => ws.send(JSON.stringify({ ok: true })));
```

#### Q180. What is event sourcing?

**Detailed Answer:** Event sourcing stores immutable domain events as source of truth, rebuilding state by replay. Balance data correctness, precision, and transport concerns (HTTP/WebSocket/Lambda).
**Code Example:**

```js
const totalCents = 1099n + 250n;
wss.on("connection", (ws) => ws.send(JSON.stringify({ ok: true })));
```

#### Q181. What is CQRS?

**Detailed Answer:** CQRS separates write model/commands from read model/queries for scalability and clarity. For advanced architecture topics, prioritize consistency models, contracts, and operational recovery paths.
**Code Example:**

```js
const settled = await Promise.allSettled([svcA(), svcB(), svcC()]);
const data = settled.map((r) =>
  r.status === "fulfilled" ? r.value : { error: String(r.reason) },
);
```

#### Q182. How to manage secrets?

**Detailed Answer:** Manage secrets with dedicated secret stores, rotation, access policies, and audit trails. For advanced architecture topics, prioritize consistency models, contracts, and operational recovery paths.
**Code Example:**

```js
const settled = await Promise.allSettled([svcA(), svcB(), svcC()]);
const data = settled.map((r) =>
  r.status === "fulfilled" ? r.value : { error: String(r.reason) },
);
```

#### Q183. What is Vault?

**Detailed Answer:** Vault (HashiCorp) is a platform for secrets management, encryption, and dynamic credentials. For advanced architecture topics, prioritize consistency models, contracts, and operational recovery paths.
**Code Example:**

```js
const settled = await Promise.allSettled([svcA(), svcB(), svcC()]);
const data = settled.map((r) =>
  r.status === "fulfilled" ? r.value : { error: String(r.reason) },
);
```

#### Q184. How to implement multi-region?

**Detailed Answer:** Multi-region design needs replication strategy, failover, consistency model, and global routing. Treat service boundaries as contracts and add controlled rollout plus failover strategy.
**Code Example:**

```js
app.use("/api", gatewayAuth, gatewayRateLimit, gatewayRouter);
app.get("/health", (_req, res) => res.json({ ok: true }));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
```

#### Q185. How to reduce API payload?

**Detailed Answer:** Reduce payload using selective fields, compression, pagination, and removing redundant data. For advanced architecture topics, prioritize consistency models, contracts, and operational recovery paths.
**Code Example:**

```js
const settled = await Promise.allSettled([svcA(), svcB(), svcC()]);
const data = settled.map((r) =>
  r.status === "fulfilled" ? r.value : { error: String(r.reason) },
);
```

#### Q186. What is streaming response?

**Detailed Answer:** Streaming response sends data progressively before full payload is ready. Stream data with pipeline to avoid loading large payloads into memory.
**Code Example:**

```js
const { pipeline } = require("node:stream/promises");
await pipeline(fs.createReadStream("in.csv"), fs.createWriteStream("out.csv"));
```

#### Q187. How to implement GraphQL?

**Detailed Answer:** Implement GraphQL with schema types, resolvers, validation, auth, and DataLoader batching. Batch reads and shape responses to reduce fan-out load.
**Code Example:**

```js
const resolvers = {
  Query: { user: (_p, { id }, ctx) => ctx.loaders.userById.load(id) },
  User: { orders: (u, _a, ctx) => ctx.loaders.ordersByUserId.load(u.id) },
};
```

#### Q188. What is resolver?

**Detailed Answer:** Resolver is a function that fetches/computes data for a GraphQL field. Batch reads and shape responses to reduce fan-out load.
**Code Example:**

```js
const resolvers = {
  Query: { user: (_p, { id }, ctx) => ctx.loaders.userById.load(id) },
  User: { orders: (u, _a, ctx) => ctx.loaders.ordersByUserId.load(u.id) },
};
```

#### Q189. REST vs GraphQL?

**Detailed Answer:** REST has fixed resource endpoints; GraphQL allows client-shaped queries on a typed schema. Batch reads and shape responses to reduce fan-out load.
**Code Example:**

```js
const resolvers = {
  Query: { user: (_p, { id }, ctx) => ctx.loaders.userById.load(id) },
  User: { orders: (u, _a, ctx) => ctx.loaders.ordersByUserId.load(u.id) },
};
```

#### Q190. How to avoid N+1 query?

**Detailed Answer:** Avoid N+1 by batching/priming related fetches and preloading associations. Batch reads and shape responses to reduce fan-out load.
**Code Example:**

```js
const resolvers = {
  Query: { user: (_p, { id }, ctx) => ctx.loaders.userById.load(id) },
  User: { orders: (u, _a, ctx) => ctx.loaders.ordersByUserId.load(u.id) },
};
```

#### Q191. What is DataLoader?

**Detailed Answer:** DataLoader batches and caches per-request key lookups to reduce duplicate queries. Batch reads and shape responses to reduce fan-out load.
**Code Example:**

```js
const resolvers = {
  Query: { user: (_p, { id }, ctx) => ctx.loaders.userById.load(id) },
  User: { orders: (u, _a, ctx) => ctx.loaders.ordersByUserId.load(u.id) },
};
```

#### Q192. How to handle rate spike?

**Detailed Answer:** For sudden rate spikes, apply throttling, autoscaling, queue buffering, and degradation policies. For advanced architecture topics, prioritize consistency models, contracts, and operational recovery paths.
**Code Example:**

```js
const settled = await Promise.allSettled([svcA(), svcB(), svcC()]);
const data = settled.map((r) =>
  r.status === "fulfilled" ? r.value : { error: String(r.reason) },
);
```

#### Q193. How to load test Node app?

**Detailed Answer:** Load test with tools like Artillery/k6/autocannon and monitor latency/error/resource saturation. For advanced architecture topics, prioritize consistency models, contracts, and operational recovery paths.
**Code Example:**

```js
const settled = await Promise.allSettled([svcA(), svcB(), svcC()]);
const data = settled.map((r) =>
  r.status === "fulfilled" ? r.value : { error: String(r.reason) },
);
```

#### Q194. What is Artillery?

**Detailed Answer:** Artillery is a load-testing tool for HTTP, WebSocket, and scenario-based traffic. For advanced architecture topics, prioritize consistency models, contracts, and operational recovery paths.
**Code Example:**

```js
const settled = await Promise.allSettled([svcA(), svcB(), svcC()]);
const data = settled.map((r) =>
  r.status === "fulfilled" ? r.value : { error: String(r.reason) },
);
```

#### Q195. How to secure production logs?

**Detailed Answer:** Secure prod logs by masking PII/secrets, encrypting storage, and enforcing strict access/retention. Enforce authentication/authorization centrally and treat all inputs as untrusted.
**Code Example:**

```js
function auth(req, res, next) {
  const token = req.get("authorization")?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
```

#### Q196. What is code smell?

**Detailed Answer:** Code smell is a maintainability warning pattern (duplication, long methods, high coupling). For advanced architecture topics, prioritize consistency models, contracts, and operational recovery paths.
**Code Example:**

```js
const settled = await Promise.allSettled([svcA(), svcB(), svcC()]);
const data = settled.map((r) =>
  r.status === "fulfilled" ? r.value : { error: String(r.reason) },
);
```

#### Q197. How to refactor legacy Node?

**Detailed Answer:** Refactor legacy Node incrementally with characterization tests and small safe steps. For advanced architecture topics, prioritize consistency models, contracts, and operational recovery paths.
**Code Example:**

```js
const settled = await Promise.allSettled([svcA(), svcB(), svcC()]);
const data = settled.map((r) =>
  r.status === "fulfilled" ? r.value : { error: String(r.reason) },
);
```

#### Q198. What is memory snapshot?

**Detailed Answer:** Memory snapshot is a heap state capture used to analyze object retention and leaks. Monitor memory trends and compare snapshots to find retained object paths.
**Code Example:**

```js
setInterval(() => {
  const m = process.memoryUsage();
  console.log({ rss: m.rss, heapUsed: m.heapUsed });
}, 10000);
```

#### Q199. How to tune threadpool?

**Detailed Answer:** Tune threadpool by increasing `UV_THREADPOOL_SIZE` for heavy fs/crypto/dns workloads after measurement. Use worker threads for CPU-heavy work and process-level scaling for multi-core throughput.
**Code Example:**

```js
const { Worker } = require("node:worker_threads");
const w = new Worker("./worker.js", { workerData: { n: 42 } });
w.once("message", console.log);
```

#### Q200. What is UV_THREADPOOL_SIZE?

**Detailed Answer:** `UV_THREADPOOL_SIZE` sets libuv worker thread count (default 4) via environment variable. Use worker threads for CPU-heavy work and process-level scaling for multi-core throughput.
**Code Example:**

```js
const { Worker } = require("node:worker_threads");
const w = new Worker("./worker.js", { workerData: { n: 42 } });
w.once("message", console.log);
```

### Advanced - Coding Exercises

#### C41. Implement `pLimit(concurrency)` to limit concurrent promises.

**Detailed Answer:** Concurrency exercises should bound parallel work and handle partial failures explicitly.
**Code Example:**

```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map((t) => run(() => t())));
const ok = settled.filter((x) => x.status === "fulfilled").map((x) => x.value);
```

#### C42. Implement `mapLimit(items, limit, asyncFn)`.

**Detailed Answer:** Concurrency exercises should bound parallel work and handle partial failures explicitly.
**Code Example:**

```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map((t) => run(() => t())));
const ok = settled.filter((x) => x.status === "fulfilled").map((x) => x.value);
```

#### C43. Implement a queue with `enqueue(task)` and worker processing with concurrency.

**Detailed Answer:** Concurrency exercises should bound parallel work and handle partial failures explicitly.
**Code Example:**

```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map((t) => run(() => t())));
const ok = settled.filter((x) => x.status === "fulfilled").map((x) => x.value);
```

#### C44. Implement exponential backoff retry with jitter.

**Detailed Answer:** Concurrency exercises should bound parallel work and handle partial failures explicitly.
**Code Example:**

```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map((t) => run(() => t())));
const ok = settled.filter((x) => x.status === "fulfilled").map((x) => x.value);
```

#### C45. Implement a circuit breaker (open/half-open/closed) for a failing async function.

**Detailed Answer:** Concurrency exercises should bound parallel work and handle partial failures explicitly.
**Code Example:**

```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map((t) => run(() => t())));
const ok = settled.filter((x) => x.status === "fulfilled").map((x) => x.value);
```

#### C46. Implement bulk API calling with concurrency limit + per-request timeout.

**Detailed Answer:** Concurrency exercises should bound parallel work and handle partial failures explicitly.
**Code Example:**

```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map((t) => run(() => t())));
const ok = settled.filter((x) => x.status === "fulfilled").map((x) => x.value);
```

#### C47. Implement "fan-out/fan-in": call N services and aggregate results with partial failures.

**Detailed Answer:** Concurrency exercises should bound parallel work and handle partial failures explicitly.
**Code Example:**

```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map((t) => run(() => t())));
const ok = settled.filter((x) => x.status === "fulfilled").map((x) => x.value);
```

#### C48. Implement "graceful shutdown": stop accepting new requests, finish inflight, close DB.

**Detailed Answer:** Concurrency exercises should bound parallel work and handle partial failures explicitly.
**Code Example:**

```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map((t) => run(() => t())));
const ok = settled.filter((x) => x.status === "fulfilled").map((x) => x.value);
```

#### C54. Write SQL to fetch last N transactions per user (window function).

**Detailed Answer:** Use window function `ROW_NUMBER()` partitioned by user to fetch last N records.
**Code Example:**

```sql
SELECT * FROM (
  SELECT t.*, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) rn
  FROM transactions t
) x WHERE rn <= $1;
```

#### C55. Write SQL to find duplicate records by `(userId, date)`.

**Detailed Answer:** Find duplicates by grouping on duplicate key fields and filtering count > 1.
**Code Example:**

```sql
SELECT user_id, tx_date, COUNT(*) dup_count
FROM transactions
GROUP BY user_id, tx_date
HAVING COUNT(*) > 1;
```

#### C56. Design tables for: users, accounts, transactions with constraints.

**Detailed Answer:** Define PK/FK constraints and store money in integer minor units.
**Code Example:**

```sql
CREATE TABLE users(id BIGSERIAL PRIMARY KEY,email TEXT UNIQUE NOT NULL);
CREATE TABLE accounts(id BIGSERIAL PRIMARY KEY,user_id BIGINT REFERENCES users(id),balance_cents BIGINT NOT NULL DEFAULT 0);
CREATE TABLE transactions(id BIGSERIAL PRIMARY KEY,account_id BIGINT REFERENCES accounts(id),amount_cents BIGINT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
```

#### C57. Write SQL to ensure idempotent insert (unique key + ON CONFLICT DO NOTHING).

**Detailed Answer:** Use unique key + `ON CONFLICT` for idempotent insert semantics.
**Code Example:**

```sql
INSERT INTO events(event_id,payload) VALUES($1,$2) ON CONFLICT(event_id) DO NOTHING;
```

#### C58. Write SQL to do atomic balance update (transaction + row lock).

**Detailed Answer:** Use row lock inside transaction to prevent concurrent lost updates.
**Code Example:**

```sql
BEGIN;
SELECT balance_cents FROM accounts WHERE id=$1 FOR UPDATE;
UPDATE accounts SET balance_cents=balance_cents+$2 WHERE id=$1;
COMMIT;
```

#### C59. Write SQL to paginate transactions efficiently (keyset pagination).

**Detailed Answer:** Keyset pagination avoids expensive offsets and remains stable under inserts.
**Code Example:**

```sql
SELECT * FROM transactions WHERE (created_at,id) < ($1,$2) ORDER BY created_at DESC,id DESC LIMIT $3;
```

#### C60. Write SQL to create index to speed up a query (explain reasoning).

**Detailed Answer:** Index should match your filter and sort columns in the hot path query.
**Code Example:**

```sql
CREATE INDEX idx_tx_user_created_at ON transactions(user_id, created_at DESC);
```

#### C61. Implement Node code to run transaction (BEGIN/COMMIT/ROLLBACK).

**Detailed Answer:** Use pooled client transaction handling and always release connection in finally.
**Code Example:**

```js
const c = await pool.connect();
try {
  await c.query("BEGIN");
  /* queries */ await c.query("COMMIT");
} catch (e) {
  await c.query("ROLLBACK");
  throw e;
} finally {
  c.release();
}
```

#### C62. Implement Node code with prepared statements (avoid SQL injection).

**Detailed Answer:** Use prepared/parameterized statements so user input is never string-concatenated into SQL.
**Code Example:**

```js
const result = await pool.query({
  text: "SELECT id, email FROM users WHERE email = $1",
  values: [email],
});
return result.rows;
```

#### C63. Implement batch insert with parameterized query (efficient).

**Detailed Answer:** Use pooled client transaction handling and always release connection in finally.
**Code Example:**

```js
const c = await pool.connect();
try {
  await c.query("BEGIN");
  /* queries */ await c.query("COMMIT");
} catch (e) {
  await c.query("ROLLBACK");
  throw e;
} finally {
  c.release();
}
```

#### C64. Implement outbox table write inside same DB transaction.

**Detailed Answer:** Use pooled client transaction handling and always release connection in finally.
**Code Example:**

```js
const c = await pool.connect();
try {
  await c.query("BEGIN");
  /* queries */ await c.query("COMMIT");
} catch (e) {
  await c.query("ROLLBACK");
  throw e;
} finally {
  c.release();
}
```

#### C65. Design and implement `POST /orders` with validation, idempotency, and audit logging.

**Detailed Answer:** For API design, define contract, auth rules, and error model before business logic.
**Code Example:**

```js
app.post("/v1/orders", validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C66. Implement `GET /orders/:id` with authorization and 404/403 logic.

**Detailed Answer:** For API design, define contract, auth rules, and error model before business logic.
**Code Example:**

```js
app.post("/v1/orders", validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C67. Implement `PATCH /orders/:id` with optimistic locking (version field).

**Detailed Answer:** For API design, define contract, auth rules, and error model before business logic.
**Code Example:**

```js
app.post("/v1/orders", validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C68. Implement `GET /orders` filters: status, date range, sort, pagination.

**Detailed Answer:** For API design, define contract, auth rules, and error model before business logic.
**Code Example:**

```js
app.post("/v1/orders", validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C69. Implement consistent error responses: `{code, message, details, requestId}`.

**Detailed Answer:** Attach requestId on every request so logs and traces can be correlated end-to-end.
**Code Example:**

```js
app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
```

#### C70. Implement API versioning: `/v1/...` and `/v2/...` (keep backward compatibility).

**Detailed Answer:** For API design, define contract, auth rules, and error model before business logic.
**Code Example:**

```js
app.post("/v1/orders", validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C71. Implement request/response DTO mapping (don't expose DB schema directly).

**Detailed Answer:** For API design, define contract, auth rules, and error model before business logic.
**Code Example:**

```js
app.post("/v1/orders", validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C81. Build a mini "URL shortener" API with Postgres + unique codes + rate limiting.

**Detailed Answer:** Generate unique short codes, persist with uniqueness constraint, and rate limit creation endpoint.
**Code Example:**

```js
app.post("/shorten", rateLimit, async (req, res) => {
  const code = nanoid(8);
  await db.query("INSERT INTO urls(code,long_url) VALUES($1,$2)", [
    code,
    req.body.url,
  ]);
  res.status(201).json({ shortUrl: `${BASE_URL}/${code}` });
});
```

#### C82. Build a "job queue worker" that processes tasks with retries + DLQ simulation.

**Detailed Answer:** Worker loop should retry transient failures and push exhausted jobs to DLQ.
**Code Example:**

```js
for await (const job of queue) {
  try {
    await processJob(job);
  } catch (e) {
    if (job.attempts < 5) await retry(job);
    else await dlq.push(job);
  }
}
```

#### C83. Build an "audit log middleware" that logs each mutation request to DB.

**Detailed Answer:** Log mutating requests with actor/action metadata for compliance and traceability.
**Code Example:**

```js
app.use(async (req, res, next) => {
  await next();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method))
    await db.query(
      "INSERT INTO audit_logs(method,path,user_id) VALUES($1,$2,$3)",
      [req.method, req.path, req.user?.id || null],
    );
});
```

#### C84. Build a "document ingestion API" with async processing simulation.

**Detailed Answer:** Return 202 quickly and process ingestion asynchronously via queue workers.
**Code Example:**

```js
app.post("/ingest", async (req, res) => {
  const id = crypto.randomUUID();
  await queue.add({ id, payload: req.body });
  res.status(202).json({ id, status: "QUEUED" });
});
```

#### C85. Build "RBAC protected CRUD" with clean folder structure + tests.

**Detailed Answer:** Apply role checks per CRUD operation to enforce least privilege.
**Code Example:**

```js
router.post("/docs", auth, requireRole(["admin", "editor"]), createDoc);
router.get(
  "/docs/:id",
  auth,
  requireRole(["admin", "editor", "viewer"]),
  getDoc,
);
router.delete("/docs/:id", auth, requireRole(["admin"]), deleteDoc);
```

## Coding Exercises (Node.js / JavaScript Backend) (100)

### A) JavaScript Fundamentals (warm-up, common in screens)

1. Implement `debounce(fn, wait)` in JavaScript.
   **Answer:**

```js
function debounce(fn, wait = 0) {
  let timer = null;

  return function debounced(...args) {
    const ctx = this;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(ctx, args), wait);
  };
}
```

2. Implement `throttle(fn, wait)` in JavaScript.
   **Answer:**

```js
function throttle(fn, wait = 0) {
  let lastCall = 0;
  let timer = null;

  return function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - lastCall);
    const ctx = this;

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastCall = now;
      fn.apply(ctx, args);
      return;
    }

    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        lastCall = Date.now();
        fn.apply(ctx, args);
      }, remaining);
    }
  };
}
```

3. Write `deepClone(obj)` without using JSON stringify.
   **Answer:**

```js
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);

  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);

  if (Array.isArray(value)) {
    const out = [];
    seen.set(value, out);
    for (const item of value) out.push(deepClone(item, seen));
    return out;
  }

  if (value instanceof Map) {
    const out = new Map();
    seen.set(value, out);
    for (const [k, v] of value) out.set(deepClone(k, seen), deepClone(v, seen));
    return out;
  }

  if (value instanceof Set) {
    const out = new Set();
    seen.set(value, out);
    for (const v of value) out.add(deepClone(v, seen));
    return out;
  }

  const out = Object.create(Object.getPrototypeOf(value));
  seen.set(value, out);
  for (const key of Reflect.ownKeys(value)) {
    out[key] = deepClone(value[key], seen);
  }
  return out;
}
```

4. Write `deepEqual(a, b)` to compare nested objects/arrays.
   **Answer:**

```js
function deepEqual(a, b) {
  if (Object.is(a, b)) return true;

  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}
```

5. Implement `once(fn)` that allows a function to run only once.
   **Answer:**

```js
function once(fn) {
  let called = false;
  let result;

  return function wrapped(...args) {
    if (called) return result;
    called = true;
    result = fn.apply(this, args);
    return result;
  };
}
```

6. Implement `memoize(fn)` for pure functions.
   **Answer:**

```js
function memoize(fn, resolver = (...args) => JSON.stringify(args)) {
  const cache = new Map();

  return function memoized(...args) {
    const key = resolver(...args);
    if (cache.has(key)) return cache.get(key);
    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  };
}
```

7. Implement `promiseAll(promises)` (polyfill for Promise.all).
   **Answer:**

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const items = Array.from(promises);
    if (items.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(items.length);
    let pending = items.length;

    items.forEach((p, i) => {
      Promise.resolve(p).then(
        (value) => {
          results[i] = value;
          pending -= 1;
          if (pending === 0) resolve(results);
        },
        (err) => reject(err),
      );
    });
  });
}
```

8. Implement `promiseAny(promises)` (resolve first success).
   **Answer:**

```js
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const items = Array.from(promises);
    if (items.length === 0) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }

    const errors = new Array(items.length);
    let rejectedCount = 0;

    items.forEach((p, i) => {
      Promise.resolve(p).then(
        (value) => resolve(value),
        (err) => {
          errors[i] = err;
          rejectedCount += 1;
          if (rejectedCount === items.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        },
      );
    });
  });
}
```

9. Implement `promiseRace(promises)` (polyfill for Promise.race).
   **Answer:**

```js
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject);
    }
  });
}
```

10. Implement `retry(fn, retries, backoffMs)` that retries on failure.
    **Answer:**

```js
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function retry(fn, retries = 3, backoffMs = 100) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fn(attempt);
    } catch (err) {
      lastError = err;
      if (attempt === retries) break;
      const delay = backoffMs * 2 ** attempt;
      await sleep(delay);
    }
  }

  throw lastError;
}
```

11. Implement `timeout(promise, ms)` that rejects if promise takes too long.
    **Answer:**

```js
function timeout(promise, ms, message = "Operation timed out") {
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
      },
    );
  });
}
```

12. Flatten an array deeply: `flatten([1,[2,[3]]]) -> [1,2,3]`.
    **Answer:**

```js
function flatten(arr) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) return acc.concat(flatten(item));
    acc.push(item);
    return acc;
  }, []);
}
```

13. Group array of objects by key: `groupBy(users, 'city')`.
    **Answer:**

```js
function groupBy(items, keyOrFn) {
  return items.reduce((acc, item) => {
    const key = typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
```

14. Convert array to frequency map: `['a','b','a'] -> {a:2,b:1}`.
    **Answer:**

```js
function frequencyMap(arr) {
  return arr.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}
```

15. Parse query string into object: `"a=1&b=2" -> {a:'1',b:'2'}`.
    **Answer:**

```js
function parseQueryString(query) {
  const q = query.startsWith("?") ? query.slice(1) : query;
  const params = new URLSearchParams(q);
  const out = {};

  for (const [key, value] of params) {
    if (Object.prototype.hasOwnProperty.call(out, key)) {
      out[key] = Array.isArray(out[key])
        ? [...out[key], value]
        : [out[key], value];
    } else {
      out[key] = value;
    }
  }

  return out;
}
```

16. Build query string from object (handle arrays too).
    **Answer:**

```js
function buildQueryString(obj) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, String(item));
      }
    } else {
      params.append(key, String(value));
    }
  }

  return params.toString();
}
```

17. Write a safe JSON parser `safeJsonParse(str)` returning `{ok, value, error}`.
    **Answer:**

```js
function safeJsonParse(str) {
  try {
    return { ok: true, value: JSON.parse(str), error: null };
  } catch (error) {
    return { ok: false, value: null, error };
  }
}
```

18. Validate an email/phone with regex (basic).
    **Answer:**

```js
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[1-9]\d{9,14}$/;

function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

function isValidPhone(phone) {
  return PHONE_REGEX.test(phone);
}
```

19. Implement `LRUCache(capacity)` (Map-based).
    **Answer:**

```js
class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("capacity must be a positive integer");
    }
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return undefined;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);

    if (this.map.size > this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}
```

20. Implement `EventEmitter` with `on`, `off`, `emit`, `once`.
    **Answer:**

```js
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event).add(listener);
    return this;
  }

  off(event, listener) {
    const listeners = this.events.get(event);
    if (!listeners) return this;

    for (const fn of listeners) {
      if (fn === listener || fn._original === listener) {
        listeners.delete(fn);
      }
    }

    if (listeners.size === 0) this.events.delete(event);
    return this;
  }

  emit(event, ...args) {
    const listeners = this.events.get(event);
    if (!listeners) return false;

    for (const fn of [...listeners]) {
      fn.apply(this, args);
    }
    return true;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener.apply(this, args);
    };
    wrapper._original = listener;
    return this.on(event, wrapper);
  }
}
```

### B) Node.js / Express Practical Coding (very likely)

21. Write an Express middleware that attaches a `requestId` to every request.
22. Write a logging middleware that logs: method, path, status, latency ms, requestId.
23. Write a global error handler middleware that returns a standard error JSON format.
24. Write middleware to block requests if payload > N MB.
25. Write middleware to validate `Content-Type: application/json` for POST/PUT/PATCH.
26. Implement basic rate limiting middleware (in-memory) per IP.
27. Implement a simple API key auth middleware (header based).
28. Implement JWT auth middleware (verify token, attach user to req).
29. Implement RBAC middleware: `requireRole(['admin','ops'])`.
30. Implement request schema validation (pseudo: Zod/AJV) and return 422 on failure.
31. Write an endpoint `GET /health` that checks DB connectivity (mocked).
32. Write `GET /users` with pagination (`page`, `limit`) and proper bounds.
33. Write `GET /users` with cursor pagination using `createdAt` + `id`.
34. Implement `POST /items` that is idempotent using an `Idempotency-Key` header.
35. Implement ETag support for GET endpoint (If-None-Match -> 304).
36. Implement `POST /upload` that streams file to disk (no buffering whole file).
37. Implement `POST /webhook` that verifies HMAC signature header.
38. Implement `POST /webhook` that dedupes repeated events (store eventId in memory/map).
39. Implement an endpoint that returns SSE (Server-Sent Events) stream.
40. Implement WebSocket server that broadcasts messages (basic).

### C) Concurrency / Async Control (shows seniority)

41. Implement `pLimit(concurrency)` to limit concurrent promises.
42. Implement `mapLimit(items, limit, asyncFn)`.
43. Implement a queue with `enqueue(task)` and worker processing with concurrency.
44. Implement exponential backoff retry with jitter.
45. Implement a circuit breaker (open/half-open/closed) for a failing async function.
46. Implement bulk API calling with concurrency limit + per-request timeout.
47. Implement "fan-out/fan-in": call N services and aggregate results with partial failures.
48. Implement "graceful shutdown": stop accepting new requests, finish inflight, close DB.

### D) Streams & File Handling (common for backend)

49. Read a huge CSV file using streams and count rows (don't load into memory).
50. Stream JSON lines file and filter records by condition.
51. Implement transform stream that converts input text to uppercase.
52. Pipe a readable stream to writable and handle backpressure properly.
53. Implement API to download file with `res.write` streaming (set headers).

### E) PostgreSQL + Node (what they love in BFSI)

54. Write SQL to fetch last N transactions per user (window function).
55. Write SQL to find duplicate records by `(userId, date)`.
56. Design tables for: users, accounts, transactions with constraints.
57. Write SQL to ensure idempotent insert (unique key + ON CONFLICT DO NOTHING).
58. Write SQL to do atomic balance update (transaction + row lock).
59. Write SQL to paginate transactions efficiently (keyset pagination).
60. Write SQL to create index to speed up a query (explain reasoning).
61. Implement Node code to run transaction (BEGIN/COMMIT/ROLLBACK).
62. Implement Node code with prepared statements (avoid SQL injection).
63. Implement batch insert with parameterized query (efficient).
64. Implement outbox table write inside same DB transaction.

### F) API Design Exercises (real interview tasks)

65. Design and implement `POST /orders` with validation, idempotency, and audit logging.
66. Implement `GET /orders/:id` with authorization and 404/403 logic.
67. Implement `PATCH /orders/:id` with optimistic locking (version field).
68. Implement `GET /orders` filters: status, date range, sort, pagination.
69. Implement consistent error responses: `{code, message, details, requestId}`.
70. Implement API versioning: `/v1/...` and `/v2/...` (keep backward compatibility).
71. Implement request/response DTO mapping (don't expose DB schema directly).

### G) Debugging-Style Coding (interview favorite)

72. Given code with event loop blocking, refactor to non-blocking.
73. Given memory leak code (global array), fix it and explain.
74. Given Express route with missing `await`, fix race condition.
75. Given wrong pagination, correct off-by-one + bounds.
76. Given duplicate webhook processing, implement dedupe with TTL.
77. Given slow endpoint, add caching + proper invalidation approach.
78. Given DB connection leak, refactor to use pool correctly.
79. Given unhandled rejection, implement safe wrapper for async routes.
80. Given inconsistent rounding, fix currency handling (use integer paise/cents).

### H) Mini System Tasks (1-2 hour take-home style)

81. Build a mini "URL shortener" API with Postgres + unique codes + rate limiting.
82. Build a "job queue worker" that processes tasks with retries + DLQ simulation.
83. Build an "audit log middleware" that logs each mutation request to DB.
84. Build a "document ingestion API" with async processing simulation.
85. Build "RBAC protected CRUD" with clean folder structure + tests.

### I) Small DSA but backend-flavored (likely in early rounds)

86. Find second largest element in an array (handle duplicates).
87. Detect if string has balanced brackets using stack.
88. Find first non-repeating character.
89. Merge two sorted arrays.
90. Two-sum with hashmap.
91. Validate palindrome ignoring punctuation.
92. Find longest substring without repeating characters.
93. Sliding window max sum of size K.
94. Group anagrams.
95. Rotate array by K.
96. Remove duplicates from sorted array in-place.
97. Top K frequent elements.
98. Validate parentheses with wildcard `*` (bonus).
99. Implement BFS/DFS over adjacency list.
100.  Detect cycle in directed graph (bonus).
