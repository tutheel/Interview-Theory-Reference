# NodeJS Interview Questions

## Difficulty Segregation

### Beginner - Core Concepts
1. [Q1] Explain Node.js architecture.
2. [Q2] Describe the event loop phases.
3. [Q3] What are microtasks?
4. [Q4] What are macrotasks?
5. [Q5] How does libuv work?
6. [Q6] How does Node handle I/O?
7. [Q7] What blocks the event loop?
8. [Q8] How to detect blocking code?
9. [Q9] What is process.nextTick?
10. [Q10] What is setImmediate?
11. [Q11] Difference between setTimeout and setImmediate?
12. [Q12] What causes memory leaks?
13. [Q13] How to inspect heap memory?
14. [Q14] What is cluster module?
15. [Q15] When use worker_threads?
16. [Q16] Explain streams.
17. [Q17] Types of streams?
18. [Q18] How does backpressure work?
19. [Q19] What is piping in streams?
20. [Q20] How to implement custom stream?
21. [Q21] What is middleware?
22. [Q22] How Express handles middleware?
23. [Q23] How to implement global error handler?
24. [Q24] What is async_hooks?
25. [Q25] How to profile CPU usage?
26. [Q26] What is REPL?
27. [Q27] How to handle uncaughtException?
28. [Q28] How to handle unhandledPromiseRejection?
29. [Q29] What is event emitter?
30. [Q30] How does require caching work?
31. [Q31] What is ESM vs CommonJS?
32. [Q32] How to structure scalable backend?
33. [Q33] How to implement rate limiting?
34. [Q34] How to implement request logging?
35. [Q35] How to secure environment variables?
36. [Q36] How to prevent callback hell?
37. [Q37] What are Promises internally?
38. [Q38] How async/await works?
39. [Q39] What is promise chaining?
40. [Q40] How to implement retry logic?
41. [Q41] What is idempotent API?
42. [Q42] How to implement pagination?
43. [Q43] What is dependency injection?
44. [Q44] How to implement service layer?
45. [Q45] What is repository pattern?
46. [Q46] How to validate input safely?
47. [Q47] How to sanitize user input?
48. [Q48] How to implement RBAC?
49. [Q49] How to handle large payload?
50. [Q50] What is body-parser?
51. [Q51] How to implement CORS?
52. [Q52] How to handle file uploads?
53. [Q53] How to implement caching?
54. [Q54] When use Redis?
55. [Q55] How to implement circuit breaker?
56. [Q56] What is graceful shutdown?
57. [Q57] How to close DB connections?
58. [Q58] How to scale Node horizontally?
59. [Q59] How to debug production?
60. [Q60] How to log structured logs?
61. [Q61] What is Morgan?
62. [Q62] How to avoid tight coupling?
63. [Q63] How to handle timeouts?
64. [Q64] What is connection pooling?
65. [Q65] How to handle concurrency?
66. [Q66] What is event-driven design?
67. [Q67] How to implement webhooks?
68. [Q68] How to secure cookies?
69. [Q69] Difference between 401 and 403?
70. [Q70] How to implement OAuth?

### Beginner - Coding Exercises
1. [C1] Implement `debounce(fn, wait)` in JavaScript.
2. [C2] Implement `throttle(fn, wait)` in JavaScript.
3. [C3] Write `deepClone(obj)` without using JSON stringify.
4. [C4] Write `deepEqual(a, b)` to compare nested objects/arrays.
5. [C5] Implement `once(fn)` that allows a function to run only once.
6. [C6] Implement `memoize(fn)` for pure functions.
7. [C7] Implement `promiseAll(promises)` (polyfill for Promise.all).
8. [C8] Implement `promiseAny(promises)` (resolve first success).
9. [C9] Implement `promiseRace(promises)` (polyfill for Promise.race).
10. [C10] Implement `retry(fn, retries, backoffMs)` that retries on failure.
11. [C11] Implement `timeout(promise, ms)` that rejects if promise takes too long.
12. [C12] Flatten an array deeply: `flatten([1,[2,[3]]]) -> [1,2,3]`.
13. [C13] Group array of objects by key: `groupBy(users, 'city')`.
14. [C14] Convert array to frequency map: `['a','b','a'] -> {a:2,b:1}`.
15. [C15] Parse query string into object: `"a=1&b=2" -> {a:'1',b:'2'}`.
16. [C16] Build query string from object (handle arrays too).
17. [C17] Write a safe JSON parser `safeJsonParse(str)` returning `{ok, value, error}`.
18. [C18] Validate an email/phone with regex (basic).
19. [C19] Implement `LRUCache(capacity)` (Map-based).
20. [C20] Implement `EventEmitter` with `on`, `off`, `emit`, `once`.
21. [C86] Find second largest element in an array (handle duplicates).
22. [C87] Detect if string has balanced brackets using stack.
23. [C88] Find first non-repeating character.
24. [C89] Merge two sorted arrays.
25. [C90] Two-sum with hashmap.
26. [C91] Validate palindrome ignoring punctuation.
27. [C92] Find longest substring without repeating characters.
28. [C93] Sliding window max sum of size K.
29. [C94] Group anagrams.
30. [C95] Rotate array by K.
31. [C96] Remove duplicates from sorted array in-place.
32. [C97] Top K frequent elements.

### Intermediate - Core Concepts
1. [Q71] How to verify JWT?
2. [Q72] What is HMAC?
3. [Q73] How to implement file streaming?
4. [Q74] How to detect memory leak?
5. [Q75] How to reduce latency?
6. [Q76] How to handle slow client?
7. [Q77] What is sticky session?
8. [Q78] How to handle session storage?
9. [Q79] What is CSRF?
10. [Q80] How to mitigate CSRF?
11. [Q81] What is Helmet?
12. [Q82] How to secure headers?
13. [Q83] How to implement compression?
14. [Q84] What is HTTP keep-alive?
15. [Q85] How to handle large traffic spikes?
16. [Q86] How to mock Node APIs?
17. [Q87] What is Jest?
18. [Q88] How to unit test service?
19. [Q89] What is integration testing?
20. [Q90] How to structure test folders?
21. [Q91] What is TDD?
22. [Q92] How to implement feature flags?
23. [Q93] What is rate limiting algorithm?
24. [Q94] Token bucket vs leaky bucket?
25. [Q95] How to implement metrics?
26. [Q96] What is Prometheus?
27. [Q97] What is OpenTelemetry?
28. [Q98] How to log request ID?
29. [Q99] How to handle multi-tenant logic?
30. [Q100] What is DTO?
31. [Q101] How to validate schemas?
32. [Q102] How to implement health check?
33. [Q103] What is liveness probe?
34. [Q104] What is readiness probe?
35. [Q105] How to implement API versioning?
36. [Q106] What is optimistic locking?
37. [Q107] What is pessimistic locking?
38. [Q108] How to prevent race condition?
39. [Q109] What is ETag?
40. [Q110] How to implement idempotency key?
41. [Q111] What is middleware chaining?
42. [Q112] How to handle binary data?
43. [Q113] What is Buffer?
44. [Q114] How to parse CSV file?
45. [Q115] How to implement cron job?
46. [Q116] What is node-cron?
47. [Q117] How to manage background jobs?
48. [Q118] What is Bull queue?
49. [Q119] How to implement SQS consumer?
50. [Q120] How to retry failed jobs?
51. [Q121] What is exponential backoff?
52. [Q122] How to detect API abuse?
53. [Q123] How to throttle endpoints?
54. [Q124] How to enforce code standards?
55. [Q125] What is ESLint?
56. [Q126] How to avoid circular dependency?
57. [Q127] What is module resolution?
58. [Q128] How to split large app?
59. [Q129] What is monorepo?
60. [Q130] What is yarn workspace?
61. [Q131] How to deploy Node app?
62. [Q132] What is PM2?
63. [Q133] How to zero-downtime restart?
64. [Q134] What is blue-green deployment?
65. [Q135] What is canary release?
66. [Q136] How to rollback deployment?
67. [Q137] What is load balancer?
68. [Q138] How to handle 10k RPS?
69. [Q139] How to optimize JSON parsing?
70. [Q140] What is V8 engine?
71. [Q141] How GC works?
72. [Q142] How to reduce GC pauses?
73. [Q143] What is async queue?
74. [Q144] How to limit concurrency?
75. [Q145] What is semaphore?
76. [Q146] How to prevent memory bloat?
77. [Q147] How to handle request validation errors?
78. [Q148] How to centralize config?
79. [Q149] What is dotenv?
80. [Q150] How to structure microservice?

### Intermediate - Coding Exercises
1. [C21] Write an Express middleware that attaches a `requestId` to every request.
2. [C22] Write a logging middleware that logs: method, path, status, latency ms, requestId.
3. [C23] Write a global error handler middleware that returns a standard error JSON format.
4. [C24] Write middleware to block requests if payload > N MB.
5. [C25] Write middleware to validate `Content-Type: application/json` for POST/PUT/PATCH.
6. [C26] Implement basic rate limiting middleware (in-memory) per IP.
7. [C27] Implement a simple API key auth middleware (header based).
8. [C28] Implement JWT auth middleware (verify token, attach user to req).
9. [C29] Implement RBAC middleware: `requireRole(['admin','ops'])`.
10. [C30] Implement request schema validation (pseudo: Zod/AJV) and return 422 on failure.
11. [C31] Write an endpoint `GET /health` that checks DB connectivity (mocked).
12. [C32] Write `GET /users` with pagination (`page`, `limit`) and proper bounds.
13. [C33] Write `GET /users` with cursor pagination using `createdAt` + `id`.
14. [C34] Implement `POST /items` that is idempotent using an `Idempotency-Key` header.
15. [C35] Implement ETag support for GET endpoint (If-None-Match -> 304).
16. [C36] Implement `POST /upload` that streams file to disk (no buffering whole file).
17. [C37] Implement `POST /webhook` that verifies HMAC signature header.
18. [C38] Implement `POST /webhook` that dedupes repeated events (store eventId in memory/map).
19. [C39] Implement an endpoint that returns SSE (Server-Sent Events) stream.
20. [C40] Implement WebSocket server that broadcasts messages (basic).
21. [C49] Read a huge CSV file using streams and count rows (don't load into memory).
22. [C50] Stream JSON lines file and filter records by condition.
23. [C51] Implement transform stream that converts input text to uppercase.
24. [C52] Pipe a readable stream to writable and handle backpressure properly.
25. [C53] Implement API to download file with `res.write` streaming (set headers).
26. [C72] Given code with event loop blocking, refactor to non-blocking.
27. [C73] Given memory leak code (global array), fix it and explain.
28. [C74] Given Express route with missing `await`, fix race condition.
29. [C75] Given wrong pagination, correct off-by-one + bounds.
30. [C76] Given duplicate webhook processing, implement dedupe with TTL.
31. [C77] Given slow endpoint, add caching + proper invalidation approach.
32. [C78] Given DB connection leak, refactor to use pool correctly.
33. [C79] Given unhandled rejection, implement safe wrapper for async routes.
34. [C80] Given inconsistent rounding, fix currency handling (use integer paise/cents).
35. [C98] Validate parentheses with wildcard `*` (bonus).
36. [C99] Implement BFS/DFS over adjacency list.
37. [C100] Detect cycle in directed graph (bonus).

### Advanced - Core Concepts
1. [Q151] What is API gateway?
2. [Q152] How to secure internal APIs?
3. [Q153] What is mTLS?
4. [Q154] How to implement audit logging?
5. [Q155] What is tracing?
6. [Q156] How to correlate logs?
7. [Q157] What is structured logging?
8. [Q158] How to monitor memory usage?
9. [Q159] How to optimize cold start?
10. [Q160] What is dependency graph?
11. [Q161] How to handle timezone?
12. [Q162] What is moment deprecation?
13. [Q163] How to handle date validation?
14. [Q164] How to avoid floating precision errors?
15. [Q165] What is BigInt?
16. [Q166] How to prevent SQL injection?
17. [Q167] How to sanitize file input?
18. [Q168] How to implement streaming API?
19. [Q169] What is HTTP2?
20. [Q170] How to handle WebSocket?
21. [Q171] What is socket.io?
22. [Q172] How to scale WebSocket?
23. [Q173] What is serverless?
24. [Q174] How to adapt Node for Lambda?
25. [Q175] How to log in Lambda?
26. [Q176] What is cold vs warm start?
27. [Q177] How to structure Lambda handler?
28. [Q178] How to handle Lambda timeout?
29. [Q179] How to implement batch processing?
30. [Q180] What is event sourcing?
31. [Q181] What is CQRS?
32. [Q182] How to manage secrets?
33. [Q183] What is Vault?
34. [Q184] How to implement multi-region?
35. [Q185] How to reduce API payload?
36. [Q186] What is streaming response?
37. [Q187] How to implement GraphQL?
38. [Q188] What is resolver?
39. [Q189] REST vs GraphQL?
40. [Q190] How to avoid N+1 query?
41. [Q191] What is DataLoader?
42. [Q192] How to handle rate spike?
43. [Q193] How to load test Node app?
44. [Q194] What is Artillery?
45. [Q195] How to secure production logs?
46. [Q196] What is code smell?
47. [Q197] How to refactor legacy Node?
48. [Q198] What is memory snapshot?
49. [Q199] How to tune threadpool?
50. [Q200] What is UV_THREADPOOL_SIZE?

### Advanced - Coding Exercises
1. [C41] Implement `pLimit(concurrency)` to limit concurrent promises.
2. [C42] Implement `mapLimit(items, limit, asyncFn)`.
3. [C43] Implement a queue with `enqueue(task)` and worker processing with concurrency.
4. [C44] Implement exponential backoff retry with jitter.
5. [C45] Implement a circuit breaker (open/half-open/closed) for a failing async function.
6. [C46] Implement bulk API calling with concurrency limit + per-request timeout.
7. [C47] Implement "fan-out/fan-in": call N services and aggregate results with partial failures.
8. [C48] Implement "graceful shutdown": stop accepting new requests, finish inflight, close DB.
9. [C54] Write SQL to fetch last N transactions per user (window function).
10. [C55] Write SQL to find duplicate records by `(userId, date)`.
11. [C56] Design tables for: users, accounts, transactions with constraints.
12. [C57] Write SQL to ensure idempotent insert (unique key + ON CONFLICT DO NOTHING).
13. [C58] Write SQL to do atomic balance update (transaction + row lock).
14. [C59] Write SQL to paginate transactions efficiently (keyset pagination).
15. [C60] Write SQL to create index to speed up a query (explain reasoning).
16. [C61] Implement Node code to run transaction (BEGIN/COMMIT/ROLLBACK).
17. [C62] Implement Node code with prepared statements (avoid SQL injection).
18. [C63] Implement batch insert with parameterized query (efficient).
19. [C64] Implement outbox table write inside same DB transaction.
20. [C65] Design and implement `POST /orders` with validation, idempotency, and audit logging.
21. [C66] Implement `GET /orders/:id` with authorization and 404/403 logic.
22. [C67] Implement `PATCH /orders/:id` with optimistic locking (version field).
23. [C68] Implement `GET /orders` filters: status, date range, sort, pagination.
24. [C69] Implement consistent error responses: `{code, message, details, requestId}`.
25. [C70] Implement API versioning: `/v1/...` and `/v2/...` (keep backward compatibility).
26. [C71] Implement request/response DTO mapping (don't expose DB schema directly).
27. [C81] Build a mini "URL shortener" API with Postgres + unique codes + rate limiting.
28. [C82] Build a "job queue worker" that processes tasks with retries + DLQ simulation.
29. [C83] Build an "audit log middleware" that logs each mutation request to DB.
30. [C84] Build a "document ingestion API" with async processing simulation.
31. [C85] Build "RBAC protected CRUD" with clean folder structure + tests.

---

## Core Concepts (200) - Question and Answer

### Question 1
**Question:** Explain Node.js architecture.
**Answer:** Node.js uses the V8 engine plus libuv, with a single event loop for JS execution and async I/O handled without blocking.

### Question 2
**Question:** Describe the event loop phases.
**Answer:** Event loop phases are: timers, pending callbacks, idle/prepare, poll, check, and close callbacks.

### Question 3
**Question:** What are microtasks?
**Answer:** Microtasks are high-priority callbacks (like Promise handlers and `queueMicrotask`) run after current stack completion.

### Question 4
**Question:** What are macrotasks?
**Answer:** Macrotasks are scheduled callbacks such as timers, I/O callbacks, and `setImmediate`.

### Question 5
**Question:** How does libuv work?
**Answer:** `libuv` provides the event loop, non-blocking abstractions, and a worker thread pool for operations like fs/crypto/dns.

### Question 6
**Question:** How does Node handle I/O?
**Answer:** Node delegates I/O to OS async APIs or libuv thread pool, then resumes callbacks when work completes.

### Question 7
**Question:** What blocks the event loop?
**Answer:** CPU-heavy loops, synchronous I/O, and large blocking operations (e.g., huge JSON parse) block the event loop.

### Question 8
**Question:** How to detect blocking code?
**Answer:** Track event-loop lag, use CPU profiles/flamegraphs, and inspect slow endpoints in APM/logs.

### Question 9
**Question:** What is process.nextTick?
**Answer:** `process.nextTick` queues a callback to run before the next event loop phase (higher priority than normal tasks).

### Question 10
**Question:** What is setImmediate?
**Answer:** `setImmediate` schedules callbacks in the check phase, typically after I/O polling.

### Question 11
**Question:** Difference between setTimeout and setImmediate?
**Answer:** `setTimeout` runs after minimum delay in timers phase; `setImmediate` runs in check phase, often after I/O.

### Question 12
**Question:** What causes memory leaks?
**Answer:** Common leaks: retained references, global caches, unremoved listeners, long-lived closures, and timers.

### Question 13
**Question:** How to inspect heap memory?
**Answer:** Use heap snapshots via Chrome DevTools (`--inspect`), `heapdump`, or profiler tools to compare retained objects.

### Question 14
**Question:** What is cluster module?
**Answer:** `cluster` forks multiple Node processes to use multiple CPU cores and share server ports.

### Question 15
**Question:** When use worker_threads?
**Answer:** Use `worker_threads` for CPU-bound work needing true parallelism inside one process.

### Question 16
**Question:** Explain streams.
**Answer:** Streams process data incrementally in chunks, reducing memory usage and latency.

### Question 17
**Question:** Types of streams?
**Answer:** Stream types are Readable, Writable, Duplex, and Transform.

### Question 18
**Question:** How does backpressure work?
**Answer:** Backpressure slows producers when consumers are overloaded (e.g., writable returns `false` until `drain`).

### Question 19
**Question:** What is piping in streams?
**Answer:** Piping connects streams and automatically coordinates flow and backpressure handling.

### Question 20
**Question:** How to implement custom stream?
**Answer:** Create custom streams by extending stream classes and implementing `_read`, `_write`, or `_transform`.

### Question 21
**Question:** What is middleware?
**Answer:** Middleware is a function in request/response pipeline that can modify flow and call `next()`.

### Question 22
**Question:** How Express handles middleware?
**Answer:** Express executes middleware in registration order; each middleware passes control with `next()`.

### Question 23
**Question:** How to implement global error handler?
**Answer:** Add a final 4-arg Express middleware (`err, req, res, next`) to return normalized error responses.

### Question 24
**Question:** What is async_hooks?
**Answer:** `async_hooks` tracks lifecycle of async resources for context propagation and diagnostics.

### Question 25
**Question:** How to profile CPU usage?
**Answer:** Use Node inspector/DevTools, `--prof`, or tools like Clinic Flame for CPU profiling.

### Question 26
**Question:** What is REPL?
**Answer:** REPL is an interactive Read-Eval-Print Loop for executing Node code quickly.

### Question 27
**Question:** How to handle uncaughtException?
**Answer:** Log `uncaughtException`, trigger graceful shutdown, and exit; app state may be unsafe to continue.

### Question 28
**Question:** How to handle unhandledPromiseRejection?
**Answer:** Handle `unhandledRejection`, log context, and usually fail fast or convert to explicit error policy.

### Question 29
**Question:** What is event emitter?
**Answer:** EventEmitter enables pub/sub via `on`, `once`, `emit`, and listener-based event handling.

### Question 30
**Question:** How does require caching work?
**Answer:** `require` caches loaded modules in `require.cache`, so subsequent imports reuse the same instance.

### Question 31
**Question:** What is ESM vs CommonJS?
**Answer:** ESM uses `import/export` (standard, static analysis); CommonJS uses `require/module.exports` (runtime, dynamic).

### Question 32
**Question:** How to structure scalable backend?
**Answer:** Use layered/modular architecture: routes -> services -> repositories, plus config, observability, and tests.

### Question 33
**Question:** How to implement rate limiting?
**Answer:** Implement rate limiting via fixed/sliding windows or token bucket, usually backed by Redis for scale.

### Question 34
**Question:** How to implement request logging?
**Answer:** Add logging middleware that captures method/path/status/latency/requestId on response finish.

### Question 35
**Question:** How to secure environment variables?
**Answer:** Store secrets in a secret manager, not code; restrict access and avoid logging sensitive values.

### Question 36
**Question:** How to prevent callback hell?
**Answer:** Replace nested callbacks with promises/async-await and separate functions by responsibility.

### Question 37
**Question:** What are Promises internally?
**Answer:** Promises are state machines (`pending`, `fulfilled`, `rejected`) with queued continuation callbacks.

### Question 38
**Question:** How async/await works?
**Answer:** `async/await` is syntactic sugar over promises, making async flow look synchronous.

### Question 39
**Question:** What is promise chaining?
**Answer:** Promise chaining passes results/errors through `.then/.catch`, enabling sequential async composition.

### Question 40
**Question:** How to implement retry logic?
**Answer:** Retry with max attempts, exponential backoff, jitter, and failure classification (retryable vs non-retryable).

### Question 41
**Question:** What is idempotent API?
**Answer:** Idempotent API means repeated identical requests produce the same final effect.

### Question 42
**Question:** How to implement pagination?
**Answer:** Use offset/limit for simple cases; prefer cursor/keyset for large datasets and stable pagination.

### Question 43
**Question:** What is dependency injection?
**Answer:** Dependency injection supplies dependencies from outside to improve testability and decoupling.

### Question 44
**Question:** How to implement service layer?
**Answer:** Service layer holds business rules between transport/controller and data access.

### Question 45
**Question:** What is repository pattern?
**Answer:** Repository pattern abstracts persistence details behind data-access interfaces.

### Question 46
**Question:** How to validate input safely?
**Answer:** Validate input with schemas (Zod/Joi/AJV), strict typing, and allowlist fields.

### Question 47
**Question:** How to sanitize user input?
**Answer:** Sanitize/normalize untrusted input and use context-appropriate escaping and parameterized queries.

### Question 48
**Question:** How to implement RBAC?
**Answer:** Implement RBAC by checking authenticated user roles/permissions before protected actions.

### Question 49
**Question:** How to handle large payload?
**Answer:** Enforce body-size limits and stream/process large payloads instead of buffering all in memory.

### Question 50
**Question:** What is body-parser?
**Answer:** `body-parser` parses incoming bodies (JSON/urlencoded) and populates `req.body`.

### Question 51
**Question:** How to implement CORS?
**Answer:** Enable CORS using `Access-Control-*` headers, usually via the `cors` middleware.

### Question 52
**Question:** How to handle file uploads?
**Answer:** Handle uploads with streaming parsers like `multer`/`busboy` and validate type/size.

### Question 53
**Question:** How to implement caching?
**Answer:** Add cache-aside/read-through caching with TTL, invalidation rules, and cache-key strategy.

### Question 54
**Question:** When use Redis?
**Answer:** Use Redis for low-latency cache, distributed sessions, rate-limits, locks, and queues.

### Question 55
**Question:** How to implement circuit breaker?
**Answer:** Circuit breaker opens on repeated failures, blocks calls, then half-opens to probe recovery.

### Question 56
**Question:** What is graceful shutdown?
**Answer:** Graceful shutdown stops new traffic, waits inflight completion, closes resources, then exits.

### Question 57
**Question:** How to close DB connections?
**Answer:** Close DB pools/connections on shutdown hooks (`SIGTERM`) via `pool.end()` or equivalent.

### Question 58
**Question:** How to scale Node horizontally?
**Answer:** Scale horizontally by running multiple stateless instances behind a load balancer.

### Question 59
**Question:** How to debug production?
**Answer:** Debug production using structured logs, metrics, traces, and targeted dumps/profiles.

### Question 60
**Question:** How to log structured logs?
**Answer:** Use JSON logs with consistent fields (time, level, message, requestId, service, error).

### Question 61
**Question:** What is Morgan?
**Answer:** Morgan is Express HTTP request logging middleware.

### Question 62
**Question:** How to avoid tight coupling?
**Answer:** Reduce coupling with interfaces, DI, clear boundaries, and event-driven communication where appropriate.

### Question 63
**Question:** How to handle timeouts?
**Answer:** Set server/client timeouts and use `AbortController` to cancel slow upstream calls.

### Question 64
**Question:** What is connection pooling?
**Answer:** Connection pooling reuses DB connections to reduce setup overhead and improve throughput.

### Question 65
**Question:** How to handle concurrency?
**Answer:** Manage concurrency with queues, semaphores, transactions, and optimistic/pessimistic locking.

### Question 66
**Question:** What is event-driven design?
**Answer:** Event-driven design models actions as events consumed asynchronously by interested components.

### Question 67
**Question:** How to implement webhooks?
**Answer:** Implement webhooks with signed payloads, retries, idempotency, and dead-letter handling.

### Question 68
**Question:** How to secure cookies?
**Answer:** Secure cookies using `HttpOnly`, `Secure`, `SameSite`, and scoped domain/path settings.

### Question 69
**Question:** Difference between 401 and 403?
**Answer:** `401` means unauthenticated; `403` means authenticated but not authorized.

### Question 70
**Question:** How to implement OAuth?
**Answer:** OAuth delegates authorization via authorization server issuing access/refresh tokens.

### Question 71
**Question:** How to verify JWT?
**Answer:** Verify JWT signature and claims (`exp`, `nbf`, `iss`, `aud`) with strict algorithm rules.

### Question 72
**Question:** What is HMAC?
**Answer:** HMAC is a keyed hash used to verify integrity/authenticity of messages.

### Question 73
**Question:** How to implement file streaming?
**Answer:** Use `fs.createReadStream`/`pipeline` to stream files in chunks.

### Question 74
**Question:** How to detect memory leak?
**Answer:** Compare heap snapshots over time, inspect retained paths, and watch growth under load.

### Question 75
**Question:** How to reduce latency?
**Answer:** Reduce latency via caching, DB/query tuning, non-blocking code, and smaller payloads.

### Question 76
**Question:** How to handle slow client?
**Answer:** For slow clients, rely on stream backpressure, write timeouts, and connection limits.

### Question 77
**Question:** What is sticky session?
**Answer:** Sticky session routes the same client to the same server instance.

### Question 78
**Question:** How to handle session storage?
**Answer:** Store sessions in shared stores (Redis/DB) for multi-instance deployments.

### Question 79
**Question:** What is CSRF?
**Answer:** CSRF tricks a logged-in browser into sending unwanted authenticated requests.

### Question 80
**Question:** How to mitigate CSRF?
**Answer:** Mitigate CSRF with `SameSite` cookies, CSRF tokens, and Origin/Referer checks.

### Question 81
**Question:** What is Helmet?
**Answer:** Helmet sets common security headers for Express apps.

### Question 82
**Question:** How to secure headers?
**Answer:** Secure headers include CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.

### Question 83
**Question:** How to implement compression?
**Answer:** Use compression middleware (`gzip`/`br`) for compressible responses.

### Question 84
**Question:** What is HTTP keep-alive?
**Answer:** HTTP keep-alive reuses TCP connections for multiple requests, lowering latency and overhead.

### Question 85
**Question:** How to handle large traffic spikes?
**Answer:** Handle spikes with autoscaling, caching, queueing, load shedding, and rate limiting.

### Question 86
**Question:** How to mock Node APIs?
**Answer:** Mock Node APIs using Jest mocks/spies, `nock` for HTTP, and test doubles for modules.

### Question 87
**Question:** What is Jest?
**Answer:** Jest is a JS testing framework with runner, assertions, mocks, and coverage tooling.

### Question 88
**Question:** How to unit test service?
**Answer:** Unit test services by mocking dependencies and asserting business behavior deterministically.

### Question 89
**Question:** What is integration testing?
**Answer:** Integration tests validate interactions between components and external dependencies.

### Question 90
**Question:** How to structure test folders?
**Answer:** Organize tests by module/domain and split unit/integration/e2e suites clearly.

### Question 91
**Question:** What is TDD?
**Answer:** TDD cycle: write failing test, implement minimum code, refactor safely.

### Question 92
**Question:** How to implement feature flags?
**Answer:** Feature flags gate behavior dynamically for rollout, experiments, and fast rollback.

### Question 93
**Question:** What is rate limiting algorithm?
**Answer:** Common algorithms: fixed window, sliding window/log, token bucket, and leaky bucket.

### Question 94
**Question:** Token bucket vs leaky bucket?
**Answer:** Token bucket allows bursts with refill rate; leaky bucket enforces steadier outflow.

### Question 95
**Question:** How to implement metrics?
**Answer:** Expose metrics via counters/gauges/histograms and scrape with monitoring systems.

### Question 96
**Question:** What is Prometheus?
**Answer:** Prometheus is a pull-based time-series monitoring system with PromQL querying.

### Question 97
**Question:** What is OpenTelemetry?
**Answer:** OpenTelemetry standardizes traces, metrics, logs instrumentation and context propagation.

### Question 98
**Question:** How to log request ID?
**Answer:** Generate/extract requestId at ingress and include it in logs/headers/context.

### Question 99
**Question:** How to handle multi-tenant logic?
**Answer:** Multi-tenant systems isolate data and logic by tenant ID with strict auth scoping.

### Question 100
**Question:** What is DTO?
**Answer:** DTO (Data Transfer Object) defines external API contract separate from internal models.

### Question 101
**Question:** How to validate schemas?
**Answer:** Validate schemas at boundaries using AJV/Zod/Joi and reject invalid input early.

### Question 102
**Question:** How to implement health check?
**Answer:** Health checks expose dependency and process status (e.g., DB, cache, queue).

### Question 103
**Question:** What is liveness probe?
**Answer:** Liveness probe answers: should this container be restarted?

### Question 104
**Question:** What is readiness probe?
**Answer:** Readiness probe answers: can this instance receive traffic now?

### Question 105
**Question:** How to implement API versioning?
**Answer:** Version APIs via URI/header/media type with compatibility and deprecation strategy.

### Question 106
**Question:** What is optimistic locking?
**Answer:** Optimistic locking checks version/updatedAt on update and fails on conflict.

### Question 107
**Question:** What is pessimistic locking?
**Answer:** Pessimistic locking acquires DB locks (e.g., `SELECT ... FOR UPDATE`) before mutation.

### Question 108
**Question:** How to prevent race condition?
**Answer:** Prevent races with atomic operations, transactions, locks, and idempotency keys.

### Question 109
**Question:** What is ETag?
**Answer:** ETag is a resource version hash used for cache validation and conditional requests.

### Question 110
**Question:** How to implement idempotency key?
**Answer:** Store `Idempotency-Key` + response metadata to safely dedupe retries.

### Question 111
**Question:** What is middleware chaining?
**Answer:** Middleware chaining is sequential execution where each middleware can continue or terminate.

### Question 112
**Question:** How to handle binary data?
**Answer:** Handle binary data with `Buffer`, streams, correct encodings, and content headers.

### Question 113
**Question:** What is Buffer?
**Answer:** `Buffer` is Node's raw byte container for binary data manipulation.

### Question 114
**Question:** How to parse CSV file?
**Answer:** Parse CSV using streaming parsers (`csv-parser`, `fast-csv`) to avoid memory spikes.

### Question 115
**Question:** How to implement cron job?
**Answer:** Use scheduled jobs (cron syntax) for periodic tasks in-process or external schedulers.

### Question 116
**Question:** What is node-cron?
**Answer:** `node-cron` is a cron-like scheduler library for Node.js.

### Question 117
**Question:** How to manage background jobs?
**Answer:** Manage background jobs with queue systems, retries, visibility timeout, and DLQ.

### Question 118
**Question:** What is Bull queue?
**Answer:** Bull is a Redis-backed job queue for delayed/retried/repeatable jobs.

### Question 119
**Question:** How to implement SQS consumer?
**Answer:** SQS consumer polls messages, processes idempotently, and deletes only on success.

### Question 120
**Question:** How to retry failed jobs?
**Answer:** Retry failed jobs with capped attempts, backoff, and dead-letter queues.

### Question 121
**Question:** What is exponential backoff?
**Answer:** Exponential backoff increases wait time after failures to reduce retry storms.

### Question 122
**Question:** How to detect API abuse?
**Answer:** Detect abuse via anomaly metrics, IP/device heuristics, and behavioral thresholds.

### Question 123
**Question:** How to throttle endpoints?
**Answer:** Throttling limits request rate or concurrency per client/key/endpoint.

### Question 124
**Question:** How to enforce code standards?
**Answer:** Enforce standards with ESLint/Prettier, lint-staged hooks, and CI gates.

### Question 125
**Question:** What is ESLint?
**Answer:** ESLint statically analyzes JS/TS for style and potential bug patterns.

### Question 126
**Question:** How to avoid circular dependency?
**Answer:** Avoid circular deps by layering modules and extracting shared contracts/utilities.

### Question 127
**Question:** What is module resolution?
**Answer:** Module resolution determines how imports map to files/packages (`node_modules`, exports, paths).

### Question 128
**Question:** How to split large app?
**Answer:** Split large apps by bounded contexts/domains with explicit module ownership.

### Question 129
**Question:** What is monorepo?
**Answer:** Monorepo stores multiple related packages/services in one repository.

### Question 130
**Question:** What is yarn workspace?
**Answer:** Yarn workspaces manage monorepo dependencies and local package linking.

### Question 131
**Question:** How to deploy Node app?
**Answer:** Deploy with CI/CD, environment configs, health checks, and rollback-safe strategy.

### Question 132
**Question:** What is PM2?
**Answer:** PM2 is a Node process manager with clustering, restart policies, and monitoring.

### Question 133
**Question:** How to zero-downtime restart?
**Answer:** Zero-downtime restart uses rolling reload/graceful shutdown to avoid dropped requests.

### Question 134
**Question:** What is blue-green deployment?
**Answer:** Blue-green deployment switches traffic between two production-identical environments.

### Question 135
**Question:** What is canary release?
**Answer:** Canary release gradually exposes new version to small traffic percentages first.

### Question 136
**Question:** How to rollback deployment?
**Answer:** Rollback by reverting traffic/artifact quickly to last known stable release.

### Question 137
**Question:** What is load balancer?
**Answer:** Load balancer distributes traffic and can handle TLS termination and health checks.

### Question 138
**Question:** How to handle 10k RPS?
**Answer:** For 10k RPS: optimize hot paths, cache aggressively, tune DB, and scale horizontally.

### Question 139
**Question:** How to optimize JSON parsing?
**Answer:** Optimize JSON parsing by reducing payload size, avoiding repeated parse/stringify, and streaming when possible.

### Question 140
**Question:** What is V8 engine?
**Answer:** V8 is Google's JS engine using JIT compilation and garbage collection.

### Question 141
**Question:** How GC works?
**Answer:** V8 GC is generational; short-lived objects collected frequently, long-lived less often.

### Question 142
**Question:** How to reduce GC pauses?
**Answer:** Reduce GC pauses by lowering allocations, reusing objects, and tuning heap settings.

### Question 143
**Question:** What is async queue?
**Answer:** Async queue buffers tasks and processes them asynchronously with worker control.

### Question 144
**Question:** How to limit concurrency?
**Answer:** Limit concurrency with primitives like semaphores or utilities like `p-limit`.

### Question 145
**Question:** What is semaphore?
**Answer:** Semaphore controls concurrent access via an acquire/release counter.

### Question 146
**Question:** How to prevent memory bloat?
**Answer:** Prevent memory bloat with bounded caches, streaming, and cleanup of stale references.

### Question 147
**Question:** How to handle request validation errors?
**Answer:** Return structured 400/422 errors with field-level details for validation failures.

### Question 148
**Question:** How to centralize config?
**Answer:** Centralize config in a typed config module loaded once from env/secrets.

### Question 149
**Question:** What is dotenv?
**Answer:** `dotenv` loads variables from `.env` into `process.env` (usually for local dev).

### Question 150
**Question:** How to structure microservice?
**Answer:** Microservice structure: independent deployable service with clear API/events and own data boundary.

### Question 151
**Question:** What is API gateway?
**Answer:** API gateway centralizes auth, routing, throttling, aggregation, and observability.

### Question 152
**Question:** How to secure internal APIs?
**Answer:** Secure internal APIs with mTLS/service identity, network policies, and short-lived tokens.

### Question 153
**Question:** What is mTLS?
**Answer:** mTLS authenticates both client and server using certificates.

### Question 154
**Question:** How to implement audit logging?
**Answer:** Audit logging records who did what, when, where, and outcome in immutable form.

### Question 155
**Question:** What is tracing?
**Answer:** Tracing follows request flow across components using spans and parent-child relationships.

### Question 156
**Question:** How to correlate logs?
**Answer:** Correlate logs by propagating traceId/requestId through all services.

### Question 157
**Question:** What is structured logging?
**Answer:** Structured logging is machine-readable logs (usually JSON) with stable key fields.

### Question 158
**Question:** How to monitor memory usage?
**Answer:** Monitor memory via `process.memoryUsage()`, GC stats, and container/runtime metrics.

### Question 159
**Question:** How to optimize cold start?
**Answer:** Improve cold start by reducing dependencies, lazy initialization, and connection reuse.

### Question 160
**Question:** What is dependency graph?
**Answer:** Dependency graph visualizes module/package relationships and coupling hotspots.

### Question 161
**Question:** How to handle timezone?
**Answer:** Store timestamps in UTC and convert to user timezone only at presentation boundaries.

### Question 162
**Question:** What is moment deprecation?
**Answer:** Moment is in maintenance mode; prefer modern libs (Luxon, date-fns, Day.js, Temporal when available).

### Question 163
**Question:** How to handle date validation?
**Answer:** Validate dates with strict parsing, timezone awareness, and range/business-rule checks.

### Question 164
**Question:** How to avoid floating precision errors?
**Answer:** Avoid float precision issues by storing money as integers or using decimal libraries.

### Question 165
**Question:** What is BigInt?
**Answer:** `BigInt` supports integers larger than `Number.MAX_SAFE_INTEGER` without precision loss.

### Question 166
**Question:** How to prevent SQL injection?
**Answer:** Prevent SQL injection with parameterized queries, ORM safeguards, and least DB privileges.

### Question 167
**Question:** How to sanitize file input?
**Answer:** Sanitize file input by validating MIME/extension/size/path and scanning untrusted files.

### Question 168
**Question:** How to implement streaming API?
**Answer:** Implement streaming APIs using Node streams/SSE/chunked responses with backpressure handling.

### Question 169
**Question:** What is HTTP2?
**Answer:** HTTP/2 adds multiplexing, header compression, and better connection utilization.

### Question 170
**Question:** How to handle WebSocket?
**Answer:** Handle WebSocket with auth on upgrade, heartbeat/ping, reconnection, and backpressure controls.

### Question 171
**Question:** What is socket.io?
**Answer:** Socket.IO is a realtime library over WebSocket with fallbacks, rooms, and event abstraction.

### Question 172
**Question:** How to scale WebSocket?
**Answer:** Scale WebSocket using pub/sub adapters (e.g., Redis), sharding, and sticky sessions.

### Question 173
**Question:** What is serverless?
**Answer:** Serverless runs functions on managed infra with event triggers and pay-per-use billing.

### Question 174
**Question:** How to adapt Node for Lambda?
**Answer:** For Lambda, keep handlers stateless, initialize clients outside handler, and optimize bundle size.

### Question 175
**Question:** How to log in Lambda?
**Answer:** In Lambda, emit structured logs with correlation IDs to CloudWatch/observability pipelines.

### Question 176
**Question:** What is cold vs warm start?
**Answer:** Cold start is first/container-init latency; warm start reuses runtime and is faster.

### Question 177
**Question:** How to structure Lambda handler?
**Answer:** Keep Lambda handler thin: parse event, call service logic, map response/errors.

### Question 178
**Question:** How to handle Lambda timeout?
**Answer:** Handle Lambda timeout with internal deadlines, partial work checkpoints, and retry-safe idempotency.

### Question 179
**Question:** How to implement batch processing?
**Answer:** Batch processing should chunk work, process with limits, and support retries and partial failures.

### Question 180
**Question:** What is event sourcing?
**Answer:** Event sourcing stores immutable domain events as source of truth, rebuilding state by replay.

### Question 181
**Question:** What is CQRS?
**Answer:** CQRS separates write model/commands from read model/queries for scalability and clarity.

### Question 182
**Question:** How to manage secrets?
**Answer:** Manage secrets with dedicated secret stores, rotation, access policies, and audit trails.

### Question 183
**Question:** What is Vault?
**Answer:** Vault (HashiCorp) is a platform for secrets management, encryption, and dynamic credentials.

### Question 184
**Question:** How to implement multi-region?
**Answer:** Multi-region design needs replication strategy, failover, consistency model, and global routing.

### Question 185
**Question:** How to reduce API payload?
**Answer:** Reduce payload using selective fields, compression, pagination, and removing redundant data.

### Question 186
**Question:** What is streaming response?
**Answer:** Streaming response sends data progressively before full payload is ready.

### Question 187
**Question:** How to implement GraphQL?
**Answer:** Implement GraphQL with schema types, resolvers, validation, auth, and DataLoader batching.

### Question 188
**Question:** What is resolver?
**Answer:** Resolver is a function that fetches/computes data for a GraphQL field.

### Question 189
**Question:** REST vs GraphQL?
**Answer:** REST has fixed resource endpoints; GraphQL allows client-shaped queries on a typed schema.

### Question 190
**Question:** How to avoid N+1 query?
**Answer:** Avoid N+1 by batching/priming related fetches and preloading associations.

### Question 191
**Question:** What is DataLoader?
**Answer:** DataLoader batches and caches per-request key lookups to reduce duplicate queries.

### Question 192
**Question:** How to handle rate spike?
**Answer:** For sudden rate spikes, apply throttling, autoscaling, queue buffering, and degradation policies.

### Question 193
**Question:** How to load test Node app?
**Answer:** Load test with tools like Artillery/k6/autocannon and monitor latency/error/resource saturation.

### Question 194
**Question:** What is Artillery?
**Answer:** Artillery is a load-testing tool for HTTP, WebSocket, and scenario-based traffic.

### Question 195
**Question:** How to secure production logs?
**Answer:** Secure prod logs by masking PII/secrets, encrypting storage, and enforcing strict access/retention.

### Question 196
**Question:** What is code smell?
**Answer:** Code smell is a maintainability warning pattern (duplication, long methods, high coupling).

### Question 197
**Question:** How to refactor legacy Node?
**Answer:** Refactor legacy Node incrementally with characterization tests and small safe steps.

### Question 198
**Question:** What is memory snapshot?
**Answer:** Memory snapshot is a heap state capture used to analyze object retention and leaks.

### Question 199
**Question:** How to tune threadpool?
**Answer:** Tune threadpool by increasing `UV_THREADPOOL_SIZE` for heavy fs/crypto/dns workloads after measurement.

### Question 200
**Question:** What is UV_THREADPOOL_SIZE?
**Answer:** `UV_THREADPOOL_SIZE` sets libuv worker thread count (default 4) via environment variable.

---

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
        (err) => reject(err)
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
        }
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
      }
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
    const key =
      typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];
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
      out[key] = Array.isArray(out[key]) ? [...out[key], value] : [out[key], value];
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
100. Detect cycle in directed graph (bonus).

## Detailed Answers By Difficulty (With Code Examples)

Detailed answers for the current difficulty mapping, with code examples for every question ID.

### Beginner - Core Concepts

#### Q1. Explain Node.js architecture.
**Detailed Answer:** Node.js uses the V8 engine plus libuv, with a single event loop for JS execution and async I/O handled without blocking. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q2. Describe the event loop phases.
**Detailed Answer:** Event loop phases are: timers, pending callbacks, idle/prepare, poll, check, and close callbacks. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q3. What are microtasks?
**Detailed Answer:** Microtasks are high-priority callbacks (like Promise handlers and `queueMicrotask`) run after current stack completion. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q4. What are macrotasks?
**Detailed Answer:** Macrotasks are scheduled callbacks such as timers, I/O callbacks, and `setImmediate`. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q5. How does libuv work?
**Detailed Answer:** `libuv` provides the event loop, non-blocking abstractions, and a worker thread pool for operations like fs/crypto/dns. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q6. How does Node handle I/O?
**Detailed Answer:** Node delegates I/O to OS async APIs or libuv thread pool, then resumes callbacks when work completes. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q7. What blocks the event loop?
**Detailed Answer:** CPU-heavy loops, synchronous I/O, and large blocking operations (e.g., huge JSON parse) block the event loop. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q8. How to detect blocking code?
**Detailed Answer:** Track event-loop lag, use CPU profiles/flamegraphs, and inspect slow endpoints in APM/logs. Preserve correctness first using transactions, parameterized queries, and clear consistency assumptions.
**Code Example:**
```js
const c = await pool.connect();
try { await c.query('BEGIN'); /* queries */ await c.query('COMMIT'); }
catch (e) { await c.query('ROLLBACK'); throw e; }
finally { c.release(); }
```

#### Q9. What is process.nextTick?
**Detailed Answer:** `process.nextTick` queues a callback to run before the next event loop phase (higher priority than normal tasks). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q10. What is setImmediate?
**Detailed Answer:** `setImmediate` schedules callbacks in the check phase, typically after I/O polling. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q11. Difference between setTimeout and setImmediate?
**Detailed Answer:** `setTimeout` runs after minimum delay in timers phase; `setImmediate` runs in check phase, often after I/O. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q12. What causes memory leaks?
**Detailed Answer:** Common leaks: retained references, global caches, unremoved listeners, long-lived closures, and timers. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q13. How to inspect heap memory?
**Detailed Answer:** Use heap snapshots via Chrome DevTools (`--inspect`), `heapdump`, or profiler tools to compare retained objects. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q14. What is cluster module?
**Detailed Answer:** `cluster` forks multiple Node processes to use multiple CPU cores and share server ports. Keep processes stateless, support graceful shutdown, and rollout gradually with a fast rollback path.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q15. When use worker_threads?
**Detailed Answer:** Use `worker_threads` for CPU-bound work needing true parallelism inside one process. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q16. Explain streams.
**Detailed Answer:** Streams process data incrementally in chunks, reducing memory usage and latency. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q17. Types of streams?
**Detailed Answer:** Stream types are Readable, Writable, Duplex, and Transform. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q18. How does backpressure work?
**Detailed Answer:** Backpressure slows producers when consumers are overloaded (e.g., writable returns `false` until `drain`). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q19. What is piping in streams?
**Detailed Answer:** Piping connects streams and automatically coordinates flow and backpressure handling. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q20. How to implement custom stream?
**Detailed Answer:** Create custom streams by extending stream classes and implementing `_read`, `_write`, or `_transform`. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q21. What is middleware?
**Detailed Answer:** Middleware is a function in request/response pipeline that can modify flow and call `next()`. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
app.use(express.json());
app.use((req, _res, next) => { req.requestId = crypto.randomUUID(); next(); });
app.use((err, req, res, _next) => res.status(err.status || 500).json({ code: 'ERR', message: err.message, requestId: req.requestId }));
```

#### Q22. How Express handles middleware?
**Detailed Answer:** Express executes middleware in registration order; each middleware passes control with `next()`. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
app.use(express.json());
app.use((req, _res, next) => { req.requestId = crypto.randomUUID(); next(); });
app.use((err, req, res, _next) => res.status(err.status || 500).json({ code: 'ERR', message: err.message, requestId: req.requestId }));
```

#### Q23. How to implement global error handler?
**Detailed Answer:** Add a final 4-arg Express middleware (`err, req, res, next`) to return normalized error responses. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
app.use(express.json());
app.use((req, _res, next) => { req.requestId = crypto.randomUUID(); next(); });
app.use((err, req, res, _next) => res.status(err.status || 500).json({ code: 'ERR', message: err.message, requestId: req.requestId }));
```

#### Q24. What is async_hooks?
**Detailed Answer:** `async_hooks` tracks lifecycle of async resources for context propagation and diagnostics. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q25. How to profile CPU usage?
**Detailed Answer:** Use Node inspector/DevTools, `--prof`, or tools like Clinic Flame for CPU profiling. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q26. What is REPL?
**Detailed Answer:** REPL is an interactive Read-Eval-Print Loop for executing Node code quickly. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q27. How to handle uncaughtException?
**Detailed Answer:** Log `uncaughtException`, trigger graceful shutdown, and exit; app state may be unsafe to continue. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q28. How to handle unhandledPromiseRejection?
**Detailed Answer:** Handle `unhandledRejection`, log context, and usually fail fast or convert to explicit error policy. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q29. What is event emitter?
**Detailed Answer:** EventEmitter enables pub/sub via `on`, `once`, `emit`, and listener-based event handling. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q30. How does require caching work?
**Detailed Answer:** `require` caches loaded modules in `require.cache`, so subsequent imports reuse the same instance. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q31. What is ESM vs CommonJS?
**Detailed Answer:** ESM uses `import/export` (standard, static analysis); CommonJS uses `require/module.exports` (runtime, dynamic). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q32. How to structure scalable backend?
**Detailed Answer:** Use layered/modular architecture: routes -> services -> repositories, plus config, observability, and tests. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q33. How to implement rate limiting?
**Detailed Answer:** Implement rate limiting via fixed/sliding windows or token bucket, usually backed by Redis for scale. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q34. How to implement request logging?
**Detailed Answer:** Add logging middleware that captures method/path/status/latency/requestId on response finish. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q35. How to secure environment variables?
**Detailed Answer:** Store secrets in a secret manager, not code; restrict access and avoid logging sensitive values. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q36. How to prevent callback hell?
**Detailed Answer:** Replace nested callbacks with promises/async-await and separate functions by responsibility. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q37. What are Promises internally?
**Detailed Answer:** Promises are state machines (`pending`, `fulfilled`, `rejected`) with queued continuation callbacks. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q38. How async/await works?
**Detailed Answer:** `async/await` is syntactic sugar over promises, making async flow look synchronous. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q39. What is promise chaining?
**Detailed Answer:** Promise chaining passes results/errors through `.then/.catch`, enabling sequential async composition. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q40. How to implement retry logic?
**Detailed Answer:** Retry with max attempts, exponential backoff, jitter, and failure classification (retryable vs non-retryable). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q41. What is idempotent API?
**Detailed Answer:** Idempotent API means repeated identical requests produce the same final effect. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q42. How to implement pagination?
**Detailed Answer:** Use offset/limit for simple cases; prefer cursor/keyset for large datasets and stable pagination. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q43. What is dependency injection?
**Detailed Answer:** Dependency injection supplies dependencies from outside to improve testability and decoupling. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q44. How to implement service layer?
**Detailed Answer:** Service layer holds business rules between transport/controller and data access. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q45. What is repository pattern?
**Detailed Answer:** Repository pattern abstracts persistence details behind data-access interfaces. Preserve correctness first using transactions, parameterized queries, and clear consistency assumptions.
**Code Example:**
```js
const c = await pool.connect();
try { await c.query('BEGIN'); /* queries */ await c.query('COMMIT'); }
catch (e) { await c.query('ROLLBACK'); throw e; }
finally { c.release(); }
```

#### Q46. How to validate input safely?
**Detailed Answer:** Validate input with schemas (Zod/Joi/AJV), strict typing, and allowlist fields. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q47. How to sanitize user input?
**Detailed Answer:** Sanitize/normalize untrusted input and use context-appropriate escaping and parameterized queries. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q48. How to implement RBAC?
**Detailed Answer:** Implement RBAC by checking authenticated user roles/permissions before protected actions. Enforce least privilege, strict validation, and secret/key rotation. Treat all external input as untrusted.
**Code Example:**
```js
function auth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY); next(); }
  catch { res.status(401).json({ code: 'UNAUTHORIZED' }); }
}
```

#### Q49. How to handle large payload?
**Detailed Answer:** Enforce body-size limits and stream/process large payloads instead of buffering all in memory. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q50. What is body-parser?
**Detailed Answer:** `body-parser` parses incoming bodies (JSON/urlencoded) and populates `req.body`. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q51. How to implement CORS?
**Detailed Answer:** Enable CORS using `Access-Control-*` headers, usually via the `cors` middleware. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
app.use(express.json());
app.use((req, _res, next) => { req.requestId = crypto.randomUUID(); next(); });
app.use((err, req, res, _next) => res.status(err.status || 500).json({ code: 'ERR', message: err.message, requestId: req.requestId }));
```

#### Q52. How to handle file uploads?
**Detailed Answer:** Handle uploads with streaming parsers like `multer`/`busboy` and validate type/size. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q53. How to implement caching?
**Detailed Answer:** Add cache-aside/read-through caching with TTL, invalidation rules, and cache-key strategy. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q54. When use Redis?
**Detailed Answer:** Use Redis for low-latency cache, distributed sessions, rate-limits, locks, and queues. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q55. How to implement circuit breaker?
**Detailed Answer:** Circuit breaker opens on repeated failures, blocks calls, then half-opens to probe recovery. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q56. What is graceful shutdown?
**Detailed Answer:** Graceful shutdown stops new traffic, waits inflight completion, closes resources, then exits. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q57. How to close DB connections?
**Detailed Answer:** Close DB pools/connections on shutdown hooks (`SIGTERM`) via `pool.end()` or equivalent. Preserve correctness first using transactions, parameterized queries, and clear consistency assumptions.
**Code Example:**
```js
const c = await pool.connect();
try { await c.query('BEGIN'); /* queries */ await c.query('COMMIT'); }
catch (e) { await c.query('ROLLBACK'); throw e; }
finally { c.release(); }
```

#### Q58. How to scale Node horizontally?
**Detailed Answer:** Scale horizontally by running multiple stateless instances behind a load balancer. Keep processes stateless, support graceful shutdown, and rollout gradually with a fast rollback path.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q59. How to debug production?
**Detailed Answer:** Debug production using structured logs, metrics, traces, and targeted dumps/profiles. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q60. How to log structured logs?
**Detailed Answer:** Use JSON logs with consistent fields (time, level, message, requestId, service, error). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q61. What is Morgan?
**Detailed Answer:** Morgan is Express HTTP request logging middleware. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q62. How to avoid tight coupling?
**Detailed Answer:** Reduce coupling with interfaces, DI, clear boundaries, and event-driven communication where appropriate. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q63. How to handle timeouts?
**Detailed Answer:** Set server/client timeouts and use `AbortController` to cancel slow upstream calls. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q64. What is connection pooling?
**Detailed Answer:** Connection pooling reuses DB connections to reduce setup overhead and improve throughput. Preserve correctness first using transactions, parameterized queries, and clear consistency assumptions.
**Code Example:**
```js
const c = await pool.connect();
try { await c.query('BEGIN'); /* queries */ await c.query('COMMIT'); }
catch (e) { await c.query('ROLLBACK'); throw e; }
finally { c.release(); }
```

#### Q65. How to handle concurrency?
**Detailed Answer:** Manage concurrency with queues, semaphores, transactions, and optimistic/pessimistic locking. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q66. What is event-driven design?
**Detailed Answer:** Event-driven design models actions as events consumed asynchronously by interested components. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q67. How to implement webhooks?
**Detailed Answer:** Implement webhooks with signed payloads, retries, idempotency, and dead-letter handling. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q68. How to secure cookies?
**Detailed Answer:** Secure cookies using `HttpOnly`, `Secure`, `SameSite`, and scoped domain/path settings. Enforce least privilege, strict validation, and secret/key rotation. Treat all external input as untrusted.
**Code Example:**
```js
function auth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY); next(); }
  catch { res.status(401).json({ code: 'UNAUTHORIZED' }); }
}
```

#### Q69. Difference between 401 and 403?
**Detailed Answer:** `401` means unauthenticated; `403` means authenticated but not authorized. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q70. How to implement OAuth?
**Detailed Answer:** OAuth delegates authorization via authorization server issuing access/refresh tokens. Enforce least privilege, strict validation, and secret/key rotation. Treat all external input as untrusted.
**Code Example:**
```js
function auth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY); next(); }
  catch { res.status(401).json({ code: 'UNAUTHORIZED' }); }
}
```

### Beginner - Coding Exercises

#### C1. Implement `debounce(fn, wait)` in JavaScript.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C2. Implement `throttle(fn, wait)` in JavaScript.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C3. Write `deepClone(obj)` without using JSON stringify.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C4. Write `deepEqual(a, b)` to compare nested objects/arrays.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C5. Implement `once(fn)` that allows a function to run only once.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C6. Implement `memoize(fn)` for pure functions.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C7. Implement `promiseAll(promises)` (polyfill for Promise.all).
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C8. Implement `promiseAny(promises)` (resolve first success).
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C9. Implement `promiseRace(promises)` (polyfill for Promise.race).
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C10. Implement `retry(fn, retries, backoffMs)` that retries on failure.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C11. Implement `timeout(promise, ms)` that rejects if promise takes too long.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C12. Flatten an array deeply: `flatten([1,[2,[3]]]) -> [1,2,3]`.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C13. Group array of objects by key: `groupBy(users, 'city')`.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C14. Convert array to frequency map: `['a','b','a'] -> {a:2,b:1}`.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C15. Parse query string into object: `"a=1&b=2" -> {a:'1',b:'2'}`.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C16. Build query string from object (handle arrays too).
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C17. Write a safe JSON parser `safeJsonParse(str)` returning `{ok, value, error}`.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C18. Validate an email/phone with regex (basic).
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C19. Implement `LRUCache(capacity)` (Map-based).
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C20. Implement `EventEmitter` with `on`, `off`, `emit`, `once`.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function solve(input) {
  // implement utility/algorithm here
  return input;
}
```

#### C86. Find second largest element in an array (handle duplicates).
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C87. Detect if string has balanced brackets using stack.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C88. Find first non-repeating character.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C89. Merge two sorted arrays.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C90. Two-sum with hashmap.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C91. Validate palindrome ignoring punctuation.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C92. Find longest substring without repeating characters.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C93. Sliding window max sum of size K.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C94. Group anagrams.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C95. Rotate array by K.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C96. Remove duplicates from sorted array in-place.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C97. Top K frequent elements.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

### Intermediate - Core Concepts

#### Q71. How to verify JWT?
**Detailed Answer:** Verify JWT signature and claims (`exp`, `nbf`, `iss`, `aud`) with strict algorithm rules. Enforce least privilege, strict validation, and secret/key rotation. Treat all external input as untrusted.
**Code Example:**
```js
function auth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY); next(); }
  catch { res.status(401).json({ code: 'UNAUTHORIZED' }); }
}
```

#### Q72. What is HMAC?
**Detailed Answer:** HMAC is a keyed hash used to verify integrity/authenticity of messages. Enforce least privilege, strict validation, and secret/key rotation. Treat all external input as untrusted.
**Code Example:**
```js
function auth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY); next(); }
  catch { res.status(401).json({ code: 'UNAUTHORIZED' }); }
}
```

#### Q73. How to implement file streaming?
**Detailed Answer:** Use `fs.createReadStream`/`pipeline` to stream files in chunks. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q74. How to detect memory leak?
**Detailed Answer:** Compare heap snapshots over time, inspect retained paths, and watch growth under load. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q75. How to reduce latency?
**Detailed Answer:** Reduce latency via caching, DB/query tuning, non-blocking code, and smaller payloads. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q76. How to handle slow client?
**Detailed Answer:** For slow clients, rely on stream backpressure, write timeouts, and connection limits. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q77. What is sticky session?
**Detailed Answer:** Sticky session routes the same client to the same server instance. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q78. How to handle session storage?
**Detailed Answer:** Store sessions in shared stores (Redis/DB) for multi-instance deployments. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q79. What is CSRF?
**Detailed Answer:** CSRF tricks a logged-in browser into sending unwanted authenticated requests. Enforce least privilege, strict validation, and secret/key rotation. Treat all external input as untrusted.
**Code Example:**
```js
function auth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY); next(); }
  catch { res.status(401).json({ code: 'UNAUTHORIZED' }); }
}
```

#### Q80. How to mitigate CSRF?
**Detailed Answer:** Mitigate CSRF with `SameSite` cookies, CSRF tokens, and Origin/Referer checks. Enforce least privilege, strict validation, and secret/key rotation. Treat all external input as untrusted.
**Code Example:**
```js
function auth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY); next(); }
  catch { res.status(401).json({ code: 'UNAUTHORIZED' }); }
}
```

#### Q81. What is Helmet?
**Detailed Answer:** Helmet sets common security headers for Express apps. Enforce least privilege, strict validation, and secret/key rotation. Treat all external input as untrusted.
**Code Example:**
```js
function auth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY); next(); }
  catch { res.status(401).json({ code: 'UNAUTHORIZED' }); }
}
```

#### Q82. How to secure headers?
**Detailed Answer:** Secure headers include CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q83. How to implement compression?
**Detailed Answer:** Use compression middleware (`gzip`/`br`) for compressible responses. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q84. What is HTTP keep-alive?
**Detailed Answer:** HTTP keep-alive reuses TCP connections for multiple requests, lowering latency and overhead. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q85. How to handle large traffic spikes?
**Detailed Answer:** Handle spikes with autoscaling, caching, queueing, load shedding, and rate limiting. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q86. How to mock Node APIs?
**Detailed Answer:** Mock Node APIs using Jest mocks/spies, `nock` for HTTP, and test doubles for modules. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q87. What is Jest?
**Detailed Answer:** Jest is a JS testing framework with runner, assertions, mocks, and coverage tooling. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q88. How to unit test service?
**Detailed Answer:** Unit test services by mocking dependencies and asserting business behavior deterministically. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q89. What is integration testing?
**Detailed Answer:** Integration tests validate interactions between components and external dependencies. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q90. How to structure test folders?
**Detailed Answer:** Organize tests by module/domain and split unit/integration/e2e suites clearly. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q91. What is TDD?
**Detailed Answer:** TDD cycle: write failing test, implement minimum code, refactor safely. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q92. How to implement feature flags?
**Detailed Answer:** Feature flags gate behavior dynamically for rollout, experiments, and fast rollback. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q93. What is rate limiting algorithm?
**Detailed Answer:** Common algorithms: fixed window, sliding window/log, token bucket, and leaky bucket. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q94. Token bucket vs leaky bucket?
**Detailed Answer:** Token bucket allows bursts with refill rate; leaky bucket enforces steadier outflow. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q95. How to implement metrics?
**Detailed Answer:** Expose metrics via counters/gauges/histograms and scrape with monitoring systems. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q96. What is Prometheus?
**Detailed Answer:** Prometheus is a pull-based time-series monitoring system with PromQL querying. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q97. What is OpenTelemetry?
**Detailed Answer:** OpenTelemetry standardizes traces, metrics, logs instrumentation and context propagation. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q98. How to log request ID?
**Detailed Answer:** Generate/extract requestId at ingress and include it in logs/headers/context. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q99. How to handle multi-tenant logic?
**Detailed Answer:** Multi-tenant systems isolate data and logic by tenant ID with strict auth scoping. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q100. What is DTO?
**Detailed Answer:** DTO (Data Transfer Object) defines external API contract separate from internal models. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q101. How to validate schemas?
**Detailed Answer:** Validate schemas at boundaries using AJV/Zod/Joi and reject invalid input early. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q102. How to implement health check?
**Detailed Answer:** Health checks expose dependency and process status (e.g., DB, cache, queue). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
app.use(express.json());
app.use((req, _res, next) => { req.requestId = crypto.randomUUID(); next(); });
app.use((err, req, res, _next) => res.status(err.status || 500).json({ code: 'ERR', message: err.message, requestId: req.requestId }));
```

#### Q103. What is liveness probe?
**Detailed Answer:** Liveness probe answers: should this container be restarted? Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q104. What is readiness probe?
**Detailed Answer:** Readiness probe answers: can this instance receive traffic now? Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q105. How to implement API versioning?
**Detailed Answer:** Version APIs via URI/header/media type with compatibility and deprecation strategy. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q106. What is optimistic locking?
**Detailed Answer:** Optimistic locking checks version/updatedAt on update and fails on conflict. Preserve correctness first using transactions, parameterized queries, and clear consistency assumptions.
**Code Example:**
```js
const c = await pool.connect();
try { await c.query('BEGIN'); /* queries */ await c.query('COMMIT'); }
catch (e) { await c.query('ROLLBACK'); throw e; }
finally { c.release(); }
```

#### Q107. What is pessimistic locking?
**Detailed Answer:** Pessimistic locking acquires DB locks (e.g., `SELECT ... FOR UPDATE`) before mutation. Preserve correctness first using transactions, parameterized queries, and clear consistency assumptions.
**Code Example:**
```js
const c = await pool.connect();
try { await c.query('BEGIN'); /* queries */ await c.query('COMMIT'); }
catch (e) { await c.query('ROLLBACK'); throw e; }
finally { c.release(); }
```

#### Q108. How to prevent race condition?
**Detailed Answer:** Prevent races with atomic operations, transactions, locks, and idempotency keys. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q109. What is ETag?
**Detailed Answer:** ETag is a resource version hash used for cache validation and conditional requests. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q110. How to implement idempotency key?
**Detailed Answer:** Store `Idempotency-Key` + response metadata to safely dedupe retries. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q111. What is middleware chaining?
**Detailed Answer:** Middleware chaining is sequential execution where each middleware can continue or terminate. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
app.use(express.json());
app.use((req, _res, next) => { req.requestId = crypto.randomUUID(); next(); });
app.use((err, req, res, _next) => res.status(err.status || 500).json({ code: 'ERR', message: err.message, requestId: req.requestId }));
```

#### Q112. How to handle binary data?
**Detailed Answer:** Handle binary data with `Buffer`, streams, correct encodings, and content headers. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q113. What is Buffer?
**Detailed Answer:** `Buffer` is Node's raw byte container for binary data manipulation. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q114. How to parse CSV file?
**Detailed Answer:** Parse CSV using streaming parsers (`csv-parser`, `fast-csv`) to avoid memory spikes. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q115. How to implement cron job?
**Detailed Answer:** Use scheduled jobs (cron syntax) for periodic tasks in-process or external schedulers. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q116. What is node-cron?
**Detailed Answer:** `node-cron` is a cron-like scheduler library for Node.js. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q117. How to manage background jobs?
**Detailed Answer:** Manage background jobs with queue systems, retries, visibility timeout, and DLQ. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q118. What is Bull queue?
**Detailed Answer:** Bull is a Redis-backed job queue for delayed/retried/repeatable jobs. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q119. How to implement SQS consumer?
**Detailed Answer:** SQS consumer polls messages, processes idempotently, and deletes only on success. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q120. How to retry failed jobs?
**Detailed Answer:** Retry failed jobs with capped attempts, backoff, and dead-letter queues. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q121. What is exponential backoff?
**Detailed Answer:** Exponential backoff increases wait time after failures to reduce retry storms. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q122. How to detect API abuse?
**Detailed Answer:** Detect abuse via anomaly metrics, IP/device heuristics, and behavioral thresholds. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q123. How to throttle endpoints?
**Detailed Answer:** Throttling limits request rate or concurrency per client/key/endpoint. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q124. How to enforce code standards?
**Detailed Answer:** Enforce standards with ESLint/Prettier, lint-staged hooks, and CI gates. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q125. What is ESLint?
**Detailed Answer:** ESLint statically analyzes JS/TS for style and potential bug patterns. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q126. How to avoid circular dependency?
**Detailed Answer:** Avoid circular deps by layering modules and extracting shared contracts/utilities. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q127. What is module resolution?
**Detailed Answer:** Module resolution determines how imports map to files/packages (`node_modules`, exports, paths). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q128. How to split large app?
**Detailed Answer:** Split large apps by bounded contexts/domains with explicit module ownership. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q129. What is monorepo?
**Detailed Answer:** Monorepo stores multiple related packages/services in one repository. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q130. What is yarn workspace?
**Detailed Answer:** Yarn workspaces manage monorepo dependencies and local package linking. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q131. How to deploy Node app?
**Detailed Answer:** Deploy with CI/CD, environment configs, health checks, and rollback-safe strategy. Keep processes stateless, support graceful shutdown, and rollout gradually with a fast rollback path.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q132. What is PM2?
**Detailed Answer:** PM2 is a Node process manager with clustering, restart policies, and monitoring. Keep processes stateless, support graceful shutdown, and rollout gradually with a fast rollback path.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q133. How to zero-downtime restart?
**Detailed Answer:** Zero-downtime restart uses rolling reload/graceful shutdown to avoid dropped requests. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q134. What is blue-green deployment?
**Detailed Answer:** Blue-green deployment switches traffic between two production-identical environments. Keep processes stateless, support graceful shutdown, and rollout gradually with a fast rollback path.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q135. What is canary release?
**Detailed Answer:** Canary release gradually exposes new version to small traffic percentages first. Keep processes stateless, support graceful shutdown, and rollout gradually with a fast rollback path.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q136. How to rollback deployment?
**Detailed Answer:** Rollback by reverting traffic/artifact quickly to last known stable release. Keep processes stateless, support graceful shutdown, and rollout gradually with a fast rollback path.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q137. What is load balancer?
**Detailed Answer:** Load balancer distributes traffic and can handle TLS termination and health checks. Keep processes stateless, support graceful shutdown, and rollout gradually with a fast rollback path.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q138. How to handle 10k RPS?
**Detailed Answer:** For 10k RPS: optimize hot paths, cache aggressively, tune DB, and scale horizontally. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q139. How to optimize JSON parsing?
**Detailed Answer:** Optimize JSON parsing by reducing payload size, avoiding repeated parse/stringify, and streaming when possible. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q140. What is V8 engine?
**Detailed Answer:** V8 is Google's JS engine using JIT compilation and garbage collection. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q141. How GC works?
**Detailed Answer:** V8 GC is generational; short-lived objects collected frequently, long-lived less often. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q142. How to reduce GC pauses?
**Detailed Answer:** Reduce GC pauses by lowering allocations, reusing objects, and tuning heap settings. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q143. What is async queue?
**Detailed Answer:** Async queue buffers tasks and processes them asynchronously with worker control. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q144. How to limit concurrency?
**Detailed Answer:** Limit concurrency with primitives like semaphores or utilities like `p-limit`. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q145. What is semaphore?
**Detailed Answer:** Semaphore controls concurrent access via an acquire/release counter. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q146. How to prevent memory bloat?
**Detailed Answer:** Prevent memory bloat with bounded caches, streaming, and cleanup of stale references. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q147. How to handle request validation errors?
**Detailed Answer:** Return structured 400/422 errors with field-level details for validation failures. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
app.use(express.json());
app.use((req, _res, next) => { req.requestId = crypto.randomUUID(); next(); });
app.use((err, req, res, _next) => res.status(err.status || 500).json({ code: 'ERR', message: err.message, requestId: req.requestId }));
```

#### Q148. How to centralize config?
**Detailed Answer:** Centralize config in a typed config module loaded once from env/secrets. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q149. What is dotenv?
**Detailed Answer:** `dotenv` loads variables from `.env` into `process.env` (usually for local dev). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q150. How to structure microservice?
**Detailed Answer:** Microservice structure: independent deployable service with clear API/events and own data boundary. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

### Intermediate - Coding Exercises

#### C21. Write an Express middleware that attaches a `requestId` to every request.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C22. Write a logging middleware that logs: method, path, status, latency ms, requestId.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C23. Write a global error handler middleware that returns a standard error JSON format.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C24. Write middleware to block requests if payload > N MB.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C25. Write middleware to validate `Content-Type: application/json` for POST/PUT/PATCH.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C26. Implement basic rate limiting middleware (in-memory) per IP.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C27. Implement a simple API key auth middleware (header based).
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C28. Implement JWT auth middleware (verify token, attach user to req).
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C29. Implement RBAC middleware: `requireRole(['admin','ops'])`.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C30. Implement request schema validation (pseudo: Zod/AJV) and return 422 on failure.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C31. Write an endpoint `GET /health` that checks DB connectivity (mocked).
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C32. Write `GET /users` with pagination (`page`, `limit`) and proper bounds.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C33. Write `GET /users` with cursor pagination using `createdAt` + `id`.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C34. Implement `POST /items` that is idempotent using an `Idempotency-Key` header.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C35. Implement ETag support for GET endpoint (If-None-Match -> 304).
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C36. Implement `POST /upload` that streams file to disk (no buffering whole file).
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C37. Implement `POST /webhook` that verifies HMAC signature header.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C38. Implement `POST /webhook` that dedupes repeated events (store eventId in memory/map).
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C39. Implement an endpoint that returns SSE (Server-Sent Events) stream.
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C40. Implement WebSocket server that broadcasts messages (basic).
**Detailed Answer:** Treat this as production API code: validate early, return consistent status/error shapes, and log with request IDs.
**Code Example:**
```js
app.use((req, res, next) => {
  // validate/auth/log here
  next();
});
app.get('/health', (_req, res) => res.json({ ok: true }));
```

#### C49. Read a huge CSV file using streams and count rows (don't load into memory).
**Detailed Answer:** Use stream-based processing with pipeline/backpressure and avoid buffering entire files in memory.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('in.csv'), transformStream, fs.createWriteStream('out.csv'));
```

#### C50. Stream JSON lines file and filter records by condition.
**Detailed Answer:** Use stream-based processing with pipeline/backpressure and avoid buffering entire files in memory.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('in.csv'), transformStream, fs.createWriteStream('out.csv'));
```

#### C51. Implement transform stream that converts input text to uppercase.
**Detailed Answer:** Use stream-based processing with pipeline/backpressure and avoid buffering entire files in memory.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('in.csv'), transformStream, fs.createWriteStream('out.csv'));
```

#### C52. Pipe a readable stream to writable and handle backpressure properly.
**Detailed Answer:** Use stream-based processing with pipeline/backpressure and avoid buffering entire files in memory.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('in.csv'), transformStream, fs.createWriteStream('out.csv'));
```

#### C53. Implement API to download file with `res.write` streaming (set headers).
**Detailed Answer:** Use stream-based processing with pipeline/backpressure and avoid buffering entire files in memory.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('in.csv'), transformStream, fs.createWriteStream('out.csv'));
```

#### C72. Given code with event loop blocking, refactor to non-blocking.
**Detailed Answer:** Reproduce and isolate the bug first, then implement a minimal safe fix with regression tests and monitoring.
**Code Example:**
```js
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/endpoint', asyncWrap(async (_req, res) => {
  res.json(await serviceCall());
}));
```

#### C73. Given memory leak code (global array), fix it and explain.
**Detailed Answer:** Reproduce and isolate the bug first, then implement a minimal safe fix with regression tests and monitoring.
**Code Example:**
```js
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/endpoint', asyncWrap(async (_req, res) => {
  res.json(await serviceCall());
}));
```

#### C74. Given Express route with missing `await`, fix race condition.
**Detailed Answer:** Reproduce and isolate the bug first, then implement a minimal safe fix with regression tests and monitoring.
**Code Example:**
```js
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/endpoint', asyncWrap(async (_req, res) => {
  res.json(await serviceCall());
}));
```

#### C75. Given wrong pagination, correct off-by-one + bounds.
**Detailed Answer:** Reproduce and isolate the bug first, then implement a minimal safe fix with regression tests and monitoring.
**Code Example:**
```js
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/endpoint', asyncWrap(async (_req, res) => {
  res.json(await serviceCall());
}));
```

#### C76. Given duplicate webhook processing, implement dedupe with TTL.
**Detailed Answer:** Reproduce and isolate the bug first, then implement a minimal safe fix with regression tests and monitoring.
**Code Example:**
```js
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/endpoint', asyncWrap(async (_req, res) => {
  res.json(await serviceCall());
}));
```

#### C77. Given slow endpoint, add caching + proper invalidation approach.
**Detailed Answer:** Reproduce and isolate the bug first, then implement a minimal safe fix with regression tests and monitoring.
**Code Example:**
```js
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/endpoint', asyncWrap(async (_req, res) => {
  res.json(await serviceCall());
}));
```

#### C78. Given DB connection leak, refactor to use pool correctly.
**Detailed Answer:** Reproduce and isolate the bug first, then implement a minimal safe fix with regression tests and monitoring.
**Code Example:**
```js
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/endpoint', asyncWrap(async (_req, res) => {
  res.json(await serviceCall());
}));
```

#### C79. Given unhandled rejection, implement safe wrapper for async routes.
**Detailed Answer:** Reproduce and isolate the bug first, then implement a minimal safe fix with regression tests and monitoring.
**Code Example:**
```js
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/endpoint', asyncWrap(async (_req, res) => {
  res.json(await serviceCall());
}));
```

#### C80. Given inconsistent rounding, fix currency handling (use integer paise/cents).
**Detailed Answer:** Reproduce and isolate the bug first, then implement a minimal safe fix with regression tests and monitoring.
**Code Example:**
```js
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/endpoint', asyncWrap(async (_req, res) => {
  res.json(await serviceCall());
}));
```

#### C98. Validate parentheses with wildcard `*` (bonus).
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C99. Implement BFS/DFS over adjacency list.
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

#### C100. Detect cycle in directed graph (bonus).
**Detailed Answer:** Build a deterministic function, handle edge cases explicitly, and mention time/space complexity tradeoffs.
**Code Example:**
```js
function algorithm(input) {
  // choose correct DS/algorithm; handle boundaries
  return output;
}
```

### Advanced - Core Concepts

#### Q151. What is API gateway?
**Detailed Answer:** API gateway centralizes auth, routing, throttling, aggregation, and observability. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q152. How to secure internal APIs?
**Detailed Answer:** Secure internal APIs with mTLS/service identity, network policies, and short-lived tokens. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q153. What is mTLS?
**Detailed Answer:** mTLS authenticates both client and server using certificates. Enforce least privilege, strict validation, and secret/key rotation. Treat all external input as untrusted.
**Code Example:**
```js
function auth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY); next(); }
  catch { res.status(401).json({ code: 'UNAUTHORIZED' }); }
}
```

#### Q154. How to implement audit logging?
**Detailed Answer:** Audit logging records who did what, when, where, and outcome in immutable form. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q155. What is tracing?
**Detailed Answer:** Tracing follows request flow across components using spans and parent-child relationships. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q156. How to correlate logs?
**Detailed Answer:** Correlate logs by propagating traceId/requestId through all services. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q157. What is structured logging?
**Detailed Answer:** Structured logging is machine-readable logs (usually JSON) with stable key fields. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q158. How to monitor memory usage?
**Detailed Answer:** Monitor memory via `process.memoryUsage()`, GC stats, and container/runtime metrics. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q159. How to optimize cold start?
**Detailed Answer:** Improve cold start by reducing dependencies, lazy initialization, and connection reuse. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q160. What is dependency graph?
**Detailed Answer:** Dependency graph visualizes module/package relationships and coupling hotspots. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q161. How to handle timezone?
**Detailed Answer:** Store timestamps in UTC and convert to user timezone only at presentation boundaries. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q162. What is moment deprecation?
**Detailed Answer:** Moment is in maintenance mode; prefer modern libs (Luxon, date-fns, Day.js, Temporal when available). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q163. How to handle date validation?
**Detailed Answer:** Validate dates with strict parsing, timezone awareness, and range/business-rule checks. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
app.use(express.json());
app.use((req, _res, next) => { req.requestId = crypto.randomUUID(); next(); });
app.use((err, req, res, _next) => res.status(err.status || 500).json({ code: 'ERR', message: err.message, requestId: req.requestId }));
```

#### Q164. How to avoid floating precision errors?
**Detailed Answer:** Avoid float precision issues by storing money as integers or using decimal libraries. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
app.use(express.json());
app.use((req, _res, next) => { req.requestId = crypto.randomUUID(); next(); });
app.use((err, req, res, _next) => res.status(err.status || 500).json({ code: 'ERR', message: err.message, requestId: req.requestId }));
```

#### Q165. What is BigInt?
**Detailed Answer:** `BigInt` supports integers larger than `Number.MAX_SAFE_INTEGER` without precision loss. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q166. How to prevent SQL injection?
**Detailed Answer:** Prevent SQL injection with parameterized queries, ORM safeguards, and least DB privileges. Preserve correctness first using transactions, parameterized queries, and clear consistency assumptions.
**Code Example:**
```js
const c = await pool.connect();
try { await c.query('BEGIN'); /* queries */ await c.query('COMMIT'); }
catch (e) { await c.query('ROLLBACK'); throw e; }
finally { c.release(); }
```

#### Q167. How to sanitize file input?
**Detailed Answer:** Sanitize file input by validating MIME/extension/size/path and scanning untrusted files. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q168. How to implement streaming API?
**Detailed Answer:** Implement streaming APIs using Node streams/SSE/chunked responses with backpressure handling. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q169. What is HTTP2?
**Detailed Answer:** HTTP/2 adds multiplexing, header compression, and better connection utilization. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q170. How to handle WebSocket?
**Detailed Answer:** Handle WebSocket with auth on upgrade, heartbeat/ping, reconnection, and backpressure controls. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q171. What is socket.io?
**Detailed Answer:** Socket.IO is a realtime library over WebSocket with fallbacks, rooms, and event abstraction. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q172. How to scale WebSocket?
**Detailed Answer:** Scale WebSocket using pub/sub adapters (e.g., Redis), sharding, and sticky sessions. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q173. What is serverless?
**Detailed Answer:** Serverless runs functions on managed infra with event triggers and pay-per-use billing. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q174. How to adapt Node for Lambda?
**Detailed Answer:** For Lambda, keep handlers stateless, initialize clients outside handler, and optimize bundle size. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q175. How to log in Lambda?
**Detailed Answer:** In Lambda, emit structured logs with correlation IDs to CloudWatch/observability pipelines. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q176. What is cold vs warm start?
**Detailed Answer:** Cold start is first/container-init latency; warm start reuses runtime and is faster. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q177. How to structure Lambda handler?
**Detailed Answer:** Keep Lambda handler thin: parse event, call service logic, map response/errors. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q178. How to handle Lambda timeout?
**Detailed Answer:** Handle Lambda timeout with internal deadlines, partial work checkpoints, and retry-safe idempotency. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q179. How to implement batch processing?
**Detailed Answer:** Batch processing should chunk work, process with limits, and support retries and partial failures. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q180. What is event sourcing?
**Detailed Answer:** Event sourcing stores immutable domain events as source of truth, rebuilding state by replay. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q181. What is CQRS?
**Detailed Answer:** CQRS separates write model/commands from read model/queries for scalability and clarity. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q182. How to manage secrets?
**Detailed Answer:** Manage secrets with dedicated secret stores, rotation, access policies, and audit trails. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q183. What is Vault?
**Detailed Answer:** Vault (HashiCorp) is a platform for secrets management, encryption, and dynamic credentials. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q184. How to implement multi-region?
**Detailed Answer:** Multi-region design needs replication strategy, failover, consistency model, and global routing. Keep processes stateless, support graceful shutdown, and rollout gradually with a fast rollback path.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q185. How to reduce API payload?
**Detailed Answer:** Reduce payload using selective fields, compression, pagination, and removing redundant data. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q186. What is streaming response?
**Detailed Answer:** Streaming response sends data progressively before full payload is ready. Prefer streaming over buffering for large payloads and always handle backpressure to protect memory and latency.
**Code Example:**
```js
const { pipeline } = require('node:stream/promises');
await pipeline(fs.createReadStream('input.txt'), fs.createWriteStream('output.txt'));
```

#### Q187. How to implement GraphQL?
**Detailed Answer:** Implement GraphQL with schema types, resolvers, validation, auth, and DataLoader batching. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q188. What is resolver?
**Detailed Answer:** Resolver is a function that fetches/computes data for a GraphQL field. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q189. REST vs GraphQL?
**Detailed Answer:** REST has fixed resource endpoints; GraphQL allows client-shaped queries on a typed schema. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q190. How to avoid N+1 query?
**Detailed Answer:** Avoid N+1 by batching/priming related fetches and preloading associations. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q191. What is DataLoader?
**Detailed Answer:** DataLoader batches and caches per-request key lookups to reduce duplicate queries. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q192. How to handle rate spike?
**Detailed Answer:** For sudden rate spikes, apply throttling, autoscaling, queue buffering, and degradation policies. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q193. How to load test Node app?
**Detailed Answer:** Load test with tools like Artillery/k6/autocannon and monitor latency/error/resource saturation. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q194. What is Artillery?
**Detailed Answer:** Artillery is a load-testing tool for HTTP, WebSocket, and scenario-based traffic. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q195. How to secure production logs?
**Detailed Answer:** Secure prod logs by masking PII/secrets, encrypting storage, and enforcing strict access/retention. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q196. What is code smell?
**Detailed Answer:** Code smell is a maintainability warning pattern (duplication, long methods, high coupling). Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q197. How to refactor legacy Node?
**Detailed Answer:** Refactor legacy Node incrementally with characterization tests and small safe steps. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q198. What is memory snapshot?
**Detailed Answer:** Memory snapshot is a heap state capture used to analyze object retention and leaks. Use this with logs/metrics and explicit failure behavior (timeouts, retries, and fallbacks) so runtime behavior stays predictable.
**Code Example:**
```js
const start = Date.now();
logger.info({ requestId: req.requestId, msg: 'operation_started' });
logger.info({ durationMs: Date.now() - start, msg: 'operation_done' });
```

#### Q199. How to tune threadpool?
**Detailed Answer:** Tune threadpool by increasing `UV_THREADPOOL_SIZE` for heavy fs/crypto/dns workloads after measurement. Preserve correctness first using transactions, parameterized queries, and clear consistency assumptions.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

#### Q200. What is UV_THREADPOOL_SIZE?
**Detailed Answer:** `UV_THREADPOOL_SIZE` sets libuv worker thread count (default 4) via environment variable. Preserve correctness first using transactions, parameterized queries, and clear consistency assumptions.
**Code Example:**
```js
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('check phase'));
setTimeout(() => console.log('timer'), 0);
```

### Advanced - Coding Exercises

#### C41. Implement `pLimit(concurrency)` to limit concurrent promises.
**Detailed Answer:** Control concurrency explicitly, add timeouts/retries where safe, and make partial-failure behavior visible to callers.
**Code Example:**
```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map(t => run(() => timeout(t(), 2000))));
const ok = settled.filter(r => r.status === 'fulfilled').map(r => r.value);
```

#### C42. Implement `mapLimit(items, limit, asyncFn)`.
**Detailed Answer:** Control concurrency explicitly, add timeouts/retries where safe, and make partial-failure behavior visible to callers.
**Code Example:**
```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map(t => run(() => timeout(t(), 2000))));
const ok = settled.filter(r => r.status === 'fulfilled').map(r => r.value);
```

#### C43. Implement a queue with `enqueue(task)` and worker processing with concurrency.
**Detailed Answer:** Control concurrency explicitly, add timeouts/retries where safe, and make partial-failure behavior visible to callers.
**Code Example:**
```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map(t => run(() => timeout(t(), 2000))));
const ok = settled.filter(r => r.status === 'fulfilled').map(r => r.value);
```

#### C44. Implement exponential backoff retry with jitter.
**Detailed Answer:** Control concurrency explicitly, add timeouts/retries where safe, and make partial-failure behavior visible to callers.
**Code Example:**
```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map(t => run(() => timeout(t(), 2000))));
const ok = settled.filter(r => r.status === 'fulfilled').map(r => r.value);
```

#### C45. Implement a circuit breaker (open/half-open/closed) for a failing async function.
**Detailed Answer:** Control concurrency explicitly, add timeouts/retries where safe, and make partial-failure behavior visible to callers.
**Code Example:**
```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map(t => run(() => timeout(t(), 2000))));
const ok = settled.filter(r => r.status === 'fulfilled').map(r => r.value);
```

#### C46. Implement bulk API calling with concurrency limit + per-request timeout.
**Detailed Answer:** Control concurrency explicitly, add timeouts/retries where safe, and make partial-failure behavior visible to callers.
**Code Example:**
```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map(t => run(() => timeout(t(), 2000))));
const ok = settled.filter(r => r.status === 'fulfilled').map(r => r.value);
```

#### C47. Implement "fan-out/fan-in": call N services and aggregate results with partial failures.
**Detailed Answer:** Control concurrency explicitly, add timeouts/retries where safe, and make partial-failure behavior visible to callers.
**Code Example:**
```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map(t => run(() => timeout(t(), 2000))));
const ok = settled.filter(r => r.status === 'fulfilled').map(r => r.value);
```

#### C48. Implement "graceful shutdown": stop accepting new requests, finish inflight, close DB.
**Detailed Answer:** Control concurrency explicitly, add timeouts/retries where safe, and make partial-failure behavior visible to callers.
**Code Example:**
```js
const run = pLimit(5);
const settled = await Promise.allSettled(tasks.map(t => run(() => timeout(t(), 2000))));
const ok = settled.filter(r => r.status === 'fulfilled').map(r => r.value);
```

#### C54. Write SQL to fetch last N transactions per user (window function).
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```sql
BEGIN;
-- SQL statement(s) with indexes / keyset / locking as required
COMMIT;
```

#### C55. Write SQL to find duplicate records by `(userId, date)`.
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```sql
BEGIN;
-- SQL statement(s) with indexes / keyset / locking as required
COMMIT;
```

#### C56. Design tables for: users, accounts, transactions with constraints.
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```sql
BEGIN;
-- SQL statement(s) with indexes / keyset / locking as required
COMMIT;
```

#### C57. Write SQL to ensure idempotent insert (unique key + ON CONFLICT DO NOTHING).
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```sql
BEGIN;
-- SQL statement(s) with indexes / keyset / locking as required
COMMIT;
```

#### C58. Write SQL to do atomic balance update (transaction + row lock).
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```sql
BEGIN;
-- SQL statement(s) with indexes / keyset / locking as required
COMMIT;
```

#### C59. Write SQL to paginate transactions efficiently (keyset pagination).
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```sql
BEGIN;
-- SQL statement(s) with indexes / keyset / locking as required
COMMIT;
```

#### C60. Write SQL to create index to speed up a query (explain reasoning).
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```sql
BEGIN;
-- SQL statement(s) with indexes / keyset / locking as required
COMMIT;
```

#### C61. Implement Node code to run transaction (BEGIN/COMMIT/ROLLBACK).
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C62. Implement Node code with prepared statements (avoid SQL injection).
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C63. Implement batch insert with parameterized query (efficient).
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C64. Implement outbox table write inside same DB transaction.
**Detailed Answer:** Use parameterized SQL, proper indexes, and transactions/locking where needed to preserve correctness under concurrency.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C65. Design and implement `POST /orders` with validation, idempotency, and audit logging.
**Detailed Answer:** Define DTOs, error contracts, and authorization checks first; keep API behavior stable.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C66. Implement `GET /orders/:id` with authorization and 404/403 logic.
**Detailed Answer:** Define DTOs, error contracts, and authorization checks first; keep API behavior stable.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C67. Implement `PATCH /orders/:id` with optimistic locking (version field).
**Detailed Answer:** Define DTOs, error contracts, and authorization checks first; keep API behavior stable.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C68. Implement `GET /orders` filters: status, date range, sort, pagination.
**Detailed Answer:** Define DTOs, error contracts, and authorization checks first; keep API behavior stable.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C69. Implement consistent error responses: `{code, message, details, requestId}`.
**Detailed Answer:** Define DTOs, error contracts, and authorization checks first; keep API behavior stable.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C70. Implement API versioning: `/v1/...` and `/v2/...` (keep backward compatibility).
**Detailed Answer:** Define DTOs, error contracts, and authorization checks first; keep API behavior stable.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C71. Implement request/response DTO mapping (don't expose DB schema directly).
**Detailed Answer:** Define DTOs, error contracts, and authorization checks first; keep API behavior stable.
**Code Example:**
```js
app.post('/resource', validate(schema), async (req, res) => {
  const row = await service.create(req.body, req.user);
  res.status(201).json(mapToDto(row));
});
```

#### C81. Build a mini "URL shortener" API with Postgres + unique codes + rate limiting.
**Detailed Answer:** Split into API/service/repository layers, keep writes idempotent, and validate retry + DLQ behavior.
**Code Example:**
```js
class Worker {
  async process(job) { /* retries + DLQ + audit */ }
}
module.exports = { Worker };
```

#### C82. Build a "job queue worker" that processes tasks with retries + DLQ simulation.
**Detailed Answer:** Split into API/service/repository layers, keep writes idempotent, and validate retry + DLQ behavior.
**Code Example:**
```js
class Worker {
  async process(job) { /* retries + DLQ + audit */ }
}
module.exports = { Worker };
```

#### C83. Build an "audit log middleware" that logs each mutation request to DB.
**Detailed Answer:** Split into API/service/repository layers, keep writes idempotent, and validate retry + DLQ behavior.
**Code Example:**
```js
class Worker {
  async process(job) { /* retries + DLQ + audit */ }
}
module.exports = { Worker };
```

#### C84. Build a "document ingestion API" with async processing simulation.
**Detailed Answer:** Split into API/service/repository layers, keep writes idempotent, and validate retry + DLQ behavior.
**Code Example:**
```js
class Worker {
  async process(job) { /* retries + DLQ + audit */ }
}
module.exports = { Worker };
```

#### C85. Build "RBAC protected CRUD" with clean folder structure + tests.
**Detailed Answer:** Split into API/service/repository layers, keep writes idempotent, and validate retry + DLQ behavior.
**Code Example:**
```js
class Worker {
  async process(job) { /* retries + DLQ + audit */ }
}
module.exports = { Worker };
```

