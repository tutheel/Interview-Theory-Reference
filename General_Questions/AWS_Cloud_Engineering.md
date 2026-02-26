# AWS Interview Questions Bank (Serverless + Core Services) - Answered

## 1) AWS Lambda (1-15)

### 1) Explain Lambda's execution model (init phase vs invocation phase).
**Answer:**
- `Init` runs once per execution environment: runtime bootstrap, code load, global scope, SDK client creation.
- `Invoke` runs per request: handler executes with event/context.
- Warm invocations skip most init, which lowers latency.

```text
Request -> [New Environment]
            -> Init (runtime + imports + globals)
            -> Invoke #1
            -> Invoke #2 (warm)
            -> Invoke #3 (warm)
```

---

### 2) What causes cold starts, and how do you reduce them (practical steps)?
**Answer:**
- Causes: new environment creation, large package/layers, VPC ENI attach, runtime startup, low traffic bursts.
- Reduce with: smaller bundle, lazy imports, lighter runtime, provisioned concurrency, keep memory high enough, avoid unnecessary VPC.
- For Java/.NET, use SnapStart (where supported) to reduce startup latency.

---

### 3) Reserved concurrency vs provisioned concurrency vs account concurrency - differences and use cases.
**Answer:**
- `Account concurrency`: regional pool shared by all functions.
- `Reserved concurrency`: hard min/max slice for one function; protects critical functions and caps noisy ones.
- `Provisioned concurrency`: pre-initialized environments for low-latency startup.

```text
Regional Pool (e.g., 1000)
|- Function A: Reserved 300 (guaranteed + capped)
|- Function B: Reserved 100
|- Unreserved pool: 600 (shared)
Provisioned concurrency is configured per alias/version for pre-warm capacity.
```

---

### 4) How does Lambda scale with SQS vs API Gateway triggers (what controls concurrency)?
**Answer:**
- API Gateway invokes per request; concurrency tracks incoming request rate and function duration.
- SQS uses event source mappings; concurrency depends on queue depth, batch size, visibility timeout, scaling rules, and concurrency limits.
- SQS can smooth bursts; API Gateway passes bursts directly unless throttled upstream.

---

### 5) What happens when a Lambda times out? What should your code do to avoid partial work?
**Answer:**
- Runtime terminates execution; in-flight work may be incomplete.
- For sync calls, caller gets timeout error. For async/event sources, retry behavior depends on source.
- Use idempotency keys, checkpoints, smaller atomic units, and `context.getRemainingTimeInMillis()` to stop safely before timeout.

---

### 6) Explain retries for async invocations (and how to control/stop them).
**Answer:**
- Asynchronous Lambda invocation retries on failure by default (with backoff).
- Control via async invoke config: `MaximumRetryAttempts`, `MaximumEventAgeInSeconds`.
- Route failures to DLQ or Lambda Destination for controlled handling.

---

### 7) What are Lambda Destinations, and when would you use them?
**Answer:**
- Destinations send async invocation results (`success` or `failure`) to SNS, SQS, EventBridge, or Lambda.
- Use for audit trails, post-processing, and centralized failure workflows.
- Prefer Destinations over only logs when you need machine-actionable outcomes.

---

### 8) How do you do idempotency in Lambda (common patterns)?
**Answer:**
- Use client-provided idempotency key (header/requestId/orderId).
- Write key to DynamoDB with conditional put (`attribute_not_exists`) before side effects.
- Store processing status/result to return consistent response on retries.

```text
Client -> Lambda -> DynamoDB (Put if key not exists)
                    |- success -> do side effect -> mark done
                    |- exists  -> return stored result / no-op
```

---

### 9) Lambda in a VPC: why it can be slower, and what setup is required for internet access.
**Answer:**
- VPC adds ENI networking overhead; cold starts can increase.
- Private subnets need NAT Gateway for outbound internet (or VPC endpoints for AWS services).
- Use VPC only when accessing private resources (RDS, internal services, private APIs).

---

### 10) Environment variables in Lambda: what to store there vs not store there?
**Answer:**
- Store non-secret config: feature flags, table names, URLs, stage names.
- Do not store raw secrets; use Secrets Manager/Parameter Store and KMS.
- Keep env vars stable and versioned by alias/stage to avoid drift.

---

### 11) How would you handle large dependencies and reduce package size?
**Answer:**
- Bundle with tree-shaking/minification; exclude test/dev files.
- Use Lambda layers for shared libs carefully (still impacts cold start if oversized).
- Move heavy binaries to container image only when needed; lazy load optional modules.

---

### 12) How do you monitor Lambda errors, throttles, and duration effectively?
**Answer:**
- Metrics: `Errors`, `Throttles`, `Duration`, `ConcurrentExecutions`, `IteratorAge` (for stream/queue sources).
- Use structured logs + correlation IDs + CloudWatch alarms with actionable thresholds.
- Track percentiles (p95/p99), not only averages.

---

### 13) What is Lambda ephemeral storage, and when do you need more of it?
**Answer:**
- `/tmp` storage per execution environment (configurable up to GBs).
- Needed for temporary files: large zip/PDF/image processing, ML models, intermediate transforms.
- Clean up temp files and monitor size/time to avoid disk and timeout issues.

---

### 14) How do you handle streaming/large payloads in Lambda safely?
**Answer:**
- Prefer passing object references (S3 key) instead of large payload bodies.
- Stream data in chunks; avoid loading full file in memory.
- Validate size/type early and enforce limits at API Gateway and S3 policy level.

---

### 15) Scenario: You see throttles + increased latency. What metrics/logs do you check first and what fixes do you try?
**Answer:**
- Check: `Throttles`, `ConcurrentExecutions`, `Duration p95/p99`, upstream 429/5xx, queue `ApproximateAgeOfOldestMessage`.
- Confirm whether issue is concurrency exhaustion, long runtimes, or downstream slowness.
- Fixes: raise reserved/account limits, optimize code/memory, increase batch/parallelism, add DLQ/backpressure.

```text
Client -> API GW -> Lambda -> Downstream DB
             |         |
          429/5xx   Throttles, Duration spikes
```

---

## 2) API Gateway (16-30)

### 16) REST API vs HTTP API - key differences and when you choose which.
**Answer:**
- HTTP API: lower cost, lower latency, simpler feature set, great for most modern JWT-backed APIs.
- REST API: richer features (API keys/usage plans, advanced mapping, request validation, cache controls, canary at stage, broader enterprise controls).
- Choose HTTP API by default, REST API when you need specific advanced features.

---

### 17) What are the available integration types (Lambda proxy, HTTP proxy, mock, etc.)?
**Answer:**
- Lambda proxy integration: request passed mostly as-is; backend handles mapping.
- HTTP proxy/integration: forward to HTTP backends/private integrations.
- Mock integration: return static responses for testing or contract stubs.
- AWS service integrations (service-specific in REST/HTTP depending on feature set) reduce custom Lambda glue.

---

### 18) Explain request/response mapping and when you need it.
**Answer:**
- Mapping templates transform incoming requests/outgoing responses between client and backend contracts.
- Needed when you must hide backend shape, normalize legacy payloads, or inject context.
- If backend already matches API contract, prefer proxy mode for simplicity.

---

### 19) How do you implement authentication with API Gateway (JWT authorizer vs Lambda authorizer)?
**Answer:**
- JWT authorizer validates tokens from issuer (Cognito/OIDC) with low latency and no custom code.
- Lambda authorizer supports custom auth logic, policy decisions, external checks.
- Prefer JWT authorizer when possible; use Lambda authorizer for complex, dynamic authorization.

---

### 20) What is a usage plan and API key, and when is it appropriate?
**Answer:**
- Usage plan defines client quota and throttle limits; API key identifies consumer app.
- Good for partner/public APIs for metering and abuse control.
- API keys are not authentication for user identity; combine with proper auth if needed.

---

### 21) Throttling: difference between account-level, stage-level, and usage plan throttling.
**Answer:**
- Account-level: global regional service limits.
- Stage/method-level: per API deployment environment controls.
- Usage plan: per API key/client controls.
- Effective throughput is constrained by the strictest limit in the path.

---

### 22) How do you implement rate limiting + burst control for an endpoint?
**Answer:**
- Set API Gateway throttling (rate + burst) at stage/method.
- For client-specific control, use usage plan quotas.
- Add WAF rate-based rules for abusive IP patterns and protect Lambda concurrency.

---

### 23) Explain CORS in API Gateway and common mistakes that break it.
**Answer:**
- Browser sends preflight `OPTIONS`; server must return allowed origin/method/headers.
- Main response also needs `Access-Control-Allow-Origin` (and credentials settings if needed).
- Common failures: missing OPTIONS route, wildcard with credentials, missing custom header in allow list.

---

### 24) How do you do caching in API Gateway and what are the risks?
**Answer:**
- Enable stage cache (REST API) and define cache keys (path/query/header).
- Good for read-heavy endpoints with stable responses.
- Risks: stale/incorrect data leakage if auth context is not in cache key; extra cost.

---

### 25) How do you enable and analyze access logs and execution logs?
**Answer:**
- Access logs: structured request summary (latency, status, requestId, source IP).
- Execution logs: integration details/errors for debugging.
- Use JSON logs and CloudWatch Logs Insights queries by `requestId`, status, latency percentiles.

---

### 26) What is WAF and how can it protect API Gateway?
**Answer:**
- AWS WAF filters malicious requests before API backend processing.
- Use managed rules (SQLi/XSS), custom allow/deny rules, and rate-based blocking.
- Reduces attack surface and lowers backend cost from bad traffic.

---

### 27) What is a stage, deployment, and stage variables (use cases)?
**Answer:**
- Deployment: immutable snapshot of API config.
- Stage: named pointer to a deployment (`dev`, `qa`, `prod`) with settings/logging/throttling.
- Stage variables: environment-specific values (legacy/use carefully); prefer explicit config and IaC parameters.

---

### 28) How do you do canary releases / gradual rollout with API Gateway?
**Answer:**
- In REST API, use canary deployment percent at stage to route small traffic slice to new deployment.
- Monitor 4xx/5xx/latency before increasing traffic.
- Combine with Lambda aliases and weighted routing for safer progressive rollout.

---

### 29) How do you handle binary media types / file uploads through API Gateway?
**Answer:**
- Configure binary media types and base64 handling correctly.
- For large uploads, prefer direct S3 presigned URL upload instead of proxying full file through Lambda.
- Validate content-type/size and scan asynchronously after upload.

---

### 30) Scenario: Clients report random 502/504 from API Gateway. What do you investigate first?
**Answer:**
- Check API Gateway access/execution logs and integration latency.
- 502 often indicates malformed backend response or integration failure; 504 usually timeout.
- Validate Lambda timeout < API Gateway timeout constraints, VPC/NAT issues, and downstream availability.

```text
Client
  -> API Gateway (access log: status, integrationLatency)
     -> Lambda/backend (execution log: error/timeout)
```

---

## 3) Step Functions (31-42)

### 31) Standard vs Express workflows - differences (cost, duration, throughput).
**Answer:**
- Standard: long-running, durable, exactly-once state transitions (higher per-transition cost, execution history).
- Express: high-throughput, short-lived, lower cost for high volume, at-least-once behavior.
- Choose Standard for critical business workflows; Express for event-heavy pipelines.

---

### 32) Explain states: Task, Choice, Wait, Parallel, Map, Succeed, Fail.
**Answer:**
- `Task`: perform work (Lambda/service integration).
- `Choice`: branch logic by conditions.
- `Wait`: delay/schedule.
- `Parallel`: concurrent branches.
- `Map`: iterate array items (with optional concurrency).
- `Succeed`/`Fail`: terminal states for outcome signaling.

---

### 33) How do retries and backoff work in Step Functions (Retry + Catch)?
**Answer:**
- `Retry` block defines errors, interval, max attempts, and backoff rate.
- `Catch` handles terminal failures and routes to fallback/compensation.
- Scope retries narrowly by error type to avoid retry storms.

---

### 34) What is a dead-letter style pattern in Step Functions (how do you isolate failures)?
**Answer:**
- Route failed execution context to SQS/SNS/EventBridge in `Catch`.
- Persist failure payload + metadata for triage/replay.
- Keep primary path clean while isolating poison inputs.

---

### 35) How do you pass data between states (InputPath, ResultPath, OutputPath)?
**Answer:**
- `InputPath`: selects input subset for a state.
- `ResultPath`: merges state result back into JSON context.
- `OutputPath`: filters what next state receives.
- Use these to keep payload minimal and avoid state-size limits.

---

### 36) What is the maximum state input/output size, and how do you handle larger payloads?
**Answer:**
- Step Functions payload is limited (commonly 256 KB per state data exchange).
- Store large payloads in S3 and pass pointers (`bucket`, `key`, `version`) in state.
- Compress or prune data between states to stay within limits.

---

### 37) How do you do parallel processing safely (Map + concurrency control)?
**Answer:**
- Use `Map` with `MaxConcurrency` to cap fan-out.
- Make each item handler idempotent and retry-safe.
- Use partial failure strategy: per-item error capture and aggregate report.

---

### 38) Callback patterns: what is a task token and when would you use it?
**Answer:**
- Task token lets external systems call back to resume workflow (`SendTaskSuccess/Failure`).
- Use for human approval, third-party async jobs, batch systems.
- Include token securely and with timeout handling.

```text
Step Functions -> Task (waitForTaskToken) -> External Worker
External Worker -> SendTaskSuccess(token, result) -> Step Functions resumes
```

---

### 39) Service integrations (Lambda, SQS, SNS, DynamoDB, etc.) - benefits vs calling via Lambda.
**Answer:**
- Direct integrations reduce code, latency, and cost (fewer Lambda hops).
- Better reliability and simpler IAM boundaries for straightforward operations.
- Use Lambda when transformation/custom logic is truly needed.

---

### 40) How do you implement idempotency and dedup in a workflow?
**Answer:**
- Define business idempotency key at workflow start.
- Store step completion markers (DynamoDB conditional writes).
- Design each task to be safe on retries and re-entrancy.

---

### 41) How do you monitor Step Functions executions (metrics, logs, tracing)?
**Answer:**
- CloudWatch metrics: `ExecutionsStarted`, `Succeeded`, `Failed`, `TimedOut`, `Throttled`.
- Enable execution logs with input/output redaction policy.
- Use X-Ray/tracing correlation with upstream request IDs.

---

### 42) Scenario: A workflow sometimes runs twice due to upstream retries. How do you design for this?
**Answer:**
- Use deterministic execution name/idempotency key from upstream event.
- Reject duplicate start if key already processed or running.
- Make downstream writes conditional and side effects deduplicated.

```text
Upstream Event (id=abc123)
    -> StartExecution(name=abc123)
    -> Duplicate event -> same id -> ignore/no-op
```

---
## 4) SNS (43-52)

### 43) What is SNS used for in real architectures?
**Answer:**
- SNS is a pub/sub notification service for event fanout.
- It decouples producers from multiple consumers (queues, Lambda, HTTP endpoints, email/SMS).
- Common use: domain events, alerts, async orchestration triggers.

---

### 44) Fanout pattern: SNS -> SQS -> Lambda - why it is common.
**Answer:**
- SNS broadcasts once; each SQS queue gets its own durable copy.
- Each consumer scales independently and can retry without affecting others.
- Queues absorb bursts and isolate subscriber failures.

```text
Producer -> SNS Topic
            |- SQS A -> Lambda A
            |- SQS B -> Lambda B
            |- SQS C -> Lambda C
```

---

### 45) Standard vs FIFO SNS topics - differences and constraints.
**Answer:**
- Standard: best-effort ordering, at-least-once, highest throughput.
- FIFO: ordered by message group, dedup support, lower throughput constraints.
- Use FIFO only when strict ordering/dedup is mandatory end-to-end.

---

### 46) Message filtering: how does filter policy work and why it is useful?
**Answer:**
- Subscribers attach filter policy on message attributes/body.
- SNS delivers only matching messages to each subscription.
- Reduces downstream noise, cost, and custom routing logic.

---

### 47) Delivery retries: what happens if an endpoint/subscriber fails?
**Answer:**
- SNS retries delivery using protocol-specific retry policy.
- For SQS/Lambda subscriptions, target service handles its own retry semantics after accepted delivery.
- Configure redrive and monitoring to avoid silent drops.

---

### 48) How do you do DLQ for SNS subscriptions (and why)?
**Answer:**
- Configure subscription redrive policy to send undeliverable messages to SQS DLQ.
- Keeps failed notifications for replay and investigation.
- Prevents data loss when endpoints are misconfigured or unavailable.

---

### 49) SNS encryption at rest and in transit - what options exist?
**Answer:**
- In transit: TLS for publish/subscribe APIs.
- At rest: SSE with AWS-managed key or customer-managed KMS key.
- Use KMS key policies to tightly control who can publish/consume encrypted topics.

---

### 50) How do you send structured messages (JSON) and route them to different subscribers?
**Answer:**
- Publish JSON payload plus message attributes (eventType, tenant, priority).
- Attach per-subscriber filter policy on attributes.
- Keep an explicit event schema/version in message body.

---

### 51) SNS vs EventBridge - when would you prefer each?
**Answer:**
- SNS: simple low-latency fanout, high throughput, straightforward pub/sub.
- EventBridge: richer routing rules, event buses, schema registry, SaaS integrations, replay on archives.
- Choose SNS for simple broadcast; EventBridge for complex event routing/governance.

---

### 52) Scenario: You need to notify 5 systems and ensure none miss events. What design do you pick?
**Answer:**
- Use SNS topic with one SQS queue per consumer, each with DLQ.
- Consumers process from their queue at their own pace; replay from queue/DLQ when needed.
- Add idempotency in consumers because delivery is at-least-once.

```text
Producer -> SNS
  |- Queue A -> Worker A
  |- Queue B -> Worker B
  |- Queue C -> Worker C
  |- Queue D -> Worker D
  |- Queue E -> Worker E
Each Queue -> its own DLQ
```

---

## 5) SQS (53-64)

### 53) Standard vs FIFO queues - ordering, throughput, delivery semantics.
**Answer:**
- Standard: at-least-once, best-effort ordering, very high throughput.
- FIFO: exactly-once processing intent with dedup window + ordered by message group.
- Use FIFO for strict order/business sequence requirements.

---

### 54) Explain visibility timeout and how it prevents duplicate processing.
**Answer:**
- After receive, message becomes temporarily invisible to other consumers.
- If consumer deletes before timeout, processing is complete.
- If not deleted, message reappears for retry, enabling fault tolerance.

---

### 55) What happens if visibility timeout is too low or too high?
**Answer:**
- Too low: duplicate processing because message reappears before worker finishes.
- Too high: slow retries/backlog if worker crashes.
- Set timeout slightly above p99 processing time and extend dynamically when needed.

---

### 56) Long polling vs short polling - impact on cost and latency.
**Answer:**
- Short polling can return empty responses frequently, increasing API cost.
- Long polling waits up to configured duration, reducing empty receives and cost.
- Long polling usually improves efficiency with similar or better latency.

---

### 57) DLQ: how do you configure maxReceiveCount and redrive policies?
**Answer:**
- `maxReceiveCount` defines retry attempts before moving message to DLQ.
- Redrive policy links source queue to DLQ.
- Set count based on transient vs permanent failure profile; alert on DLQ growth.

---

### 58) What is the "at least once" delivery problem and how do you handle duplicates?
**Answer:**
- Same message can be delivered more than once.
- Use idempotent handlers with dedup key store (DynamoDB conditional writes).
- Make side effects safe on replay (upsert instead of blind insert).

---

### 59) How does SQS scale with Lambda event source mapping (batch size, concurrency)?
**Answer:**
- Lambda polls SQS and invokes with batches; more backlog increases poller concurrency.
- Throughput depends on batch size/window, function duration, reserved concurrency, and queue type.
- Use partial batch response to avoid retrying successful items in mixed-failure batches.

---

### 60) How do you handle poison messages safely?
**Answer:**
- Keep bounded retries using visibility timeout + maxReceiveCount.
- Send to DLQ and quarantine for analysis/replay.
- Add schema validation early to fail fast before expensive downstream calls.

---

### 61) What is message retention and when would you change it?
**Answer:**
- Retention is how long messages stay in queue before expiry.
- Increase retention for recovery/replay windows and infrequent consumers.
- Decrease only when strict data minimization or quick expiry is required.

---

### 62) Batching: pros/cons for SendMessageBatch/ReceiveMessage.
**Answer:**
- Pros: fewer API calls, lower cost, higher throughput.
- Cons: larger failure surface per batch and more complex partial retry handling.
- Tune batch size for workload and timeout constraints.

---

### 63) FIFO deduplication: content-based dedup vs explicit dedup IDs.
**Answer:**
- Content-based dedup hashes body; convenient when body uniquely identifies message.
- Explicit dedup ID gives precise control for semantically identical payload variants.
- Dedup window is limited; still design idempotent consumers.

---

### 64) Scenario: Processing spikes cause backlog growth. How do you increase throughput safely?
**Answer:**
- Increase Lambda concurrency and batch size while watching downstream limits.
- Optimize handler duration and reduce per-message overhead.
- Scale downstream capacity and monitor `ApproximateAgeOfOldestMessage` as primary backlog KPI.

```text
Spike -> Queue depth up -> AgeOfOldest up
Fix path:
  1) Raise consumer concurrency
  2) Tune batch/window
  3) Protect downstream with rate limits/backoff
```

---

## 6) S3 (65-76)

### 65) Explain S3 consistency model (reads-after-writes, overwrites, deletes) in modern S3.
**Answer:**
- Modern S3 provides strong read-after-write consistency for PUT/DELETE/LIST operations.
- After successful write/delete, subsequent reads/list reflect latest state.
- You still need versioning and app-level safeguards for concurrent writers.

---

### 66) Bucket policies vs IAM policies - how are they different?
**Answer:**
- IAM policy is identity-based (attached to user/role/group).
- Bucket policy is resource-based (attached to bucket, can allow cross-account principals).
- Effective access is union of allows minus any explicit deny.

---

### 67) What is the difference between SSE-S3, SSE-KMS, and SSE-C (when to use what)?
**Answer:**
- SSE-S3: AWS-managed keys, simplest default encryption.
- SSE-KMS: KMS keys with audit and fine-grained access control; preferred for regulated workloads.
- SSE-C: customer-provided keys per request; niche due to operational complexity.

---

### 68) Versioning: what problems does it solve and what costs does it add?
**Answer:**
- Protects against accidental overwrite/delete and supports recovery/rollback.
- Enables safer replication and audit trails.
- Adds storage cost for multiple object versions and delete markers.

---

### 69) Lifecycle rules: common patterns (transition to IA/Glacier, expire objects).
**Answer:**
- Transition infrequently accessed objects to IA/Glacier tiers by age.
- Expire temporary files/logs after retention window.
- Add noncurrent version cleanup when versioning is enabled.

---

### 70) Presigned URLs: how do they work and what are the security considerations?
**Answer:**
- URL contains temporary signed permissions for specific object operation.
- Keep expiry short, scope to exact key/action, and require HTTPS.
- Validate upload constraints (size/type) and never expose broad bucket credentials.

---

### 71) How do you secure public access (Block Public Access + policies)?
**Answer:**
- Enable account and bucket-level Block Public Access by default.
- Use bucket policies with explicit principal/resource conditions.
- Add AWS Config/Security Hub checks to detect public drift quickly.

---

### 72) S3 event notifications: what can trigger them and where can they deliver (SNS/SQS/Lambda)?
**Answer:**
- Triggers include object create/remove events (plus prefixes/suffix filters).
- Destinations: SQS, SNS, Lambda (and EventBridge integration patterns).
- Design for at-least-once and unordered delivery.

---

### 73) Multipart upload: when do you need it and what failures can occur?
**Answer:**
- Use for large files to improve reliability and parallel throughput.
- Failures: incomplete multipart uploads, partial retries, orphaned parts (cost leakage).
- Use lifecycle rule to abort incomplete multipart uploads automatically.

---

### 74) What is CRR (cross-region replication) and when is it required?
**Answer:**
- CRR asynchronously replicates objects to another region.
- Used for disaster recovery, compliance, latency locality, and data sovereignty.
- Requires versioning and proper IAM/KMS replication permissions.

---

### 75) S3 CORS: common config mistakes and how to debug.
**Answer:**
- Mistakes: missing method/header in CORS rule, wrong origin, missing exposed headers, wildcard with credentials.
- Debug with browser dev tools preflight request/response and actual response headers.
- Keep rules minimal and environment-specific.

---

### 76) Scenario: You store user uploads. How do you prevent malware uploads and enforce file size/type?
**Answer:**
- Use presigned POST with policy constraints (`content-length-range`, allowed MIME/extensions).
- Trigger scan pipeline via S3 event -> queue -> malware scanner Lambda/container.
- Quarantine unsafe files, tag clean files, and serve only from clean prefix.

```text
Client -> Presigned Upload -> S3 (incoming/)
S3 Event -> SQS -> Scanner
  |- clean  -> move to S3 (clean/)
  |- infected -> quarantine/alert
```

---
## 7) Secrets Manager (77-86)

### 77) Secrets Manager vs SSM Parameter Store - differences and when to choose each.
**Answer:**
- Secrets Manager: built for secrets lifecycle, rotation workflows, version stages, higher cost.
- Parameter Store: config + simple secure strings, cheaper, less built-in rotation workflow.
- Use Secrets Manager for DB/API credentials that need rotation and audit depth.

---

### 78) How does secret rotation work (automatic rotation with Lambda)?
**Answer:**
- Rotation Lambda performs staged steps (`create`, `set`, `test`, `finish`).
- Secrets Manager manages versions/stages (`AWSPENDING`, `AWSCURRENT`, `AWSPREVIOUS`).
- Application should read by stage (`AWSCURRENT`) to switch safely after validation.

---

### 79) What are the best practices to read secrets in Lambda without causing latency spikes?
**Answer:**
- Cache secrets in-memory per execution environment with TTL.
- Use Secrets Manager caching library or lightweight local cache.
- Avoid fetching on every invocation; refresh only on expiration/error.

---

### 80) How do you control access to secrets (IAM + resource policies)?
**Answer:**
- Grant least-privilege IAM permissions (`GetSecretValue` on exact ARN).
- Use resource policies for cross-account access with explicit principals/conditions.
- Restrict KMS key usage to approved roles only.

---

### 81) How does KMS relate to secrets encryption?
**Answer:**
- Secrets are encrypted at rest with a KMS key.
- Access requires both Secrets Manager permission and KMS decrypt permission.
- Key policy + IAM policy together control decryption path.

---

### 82) How do you prevent secrets from leaking in logs/metrics?
**Answer:**
- Never log secret values; redact sensitive fields in structured logging.
- Avoid embedding secrets in exception messages, traces, and env dumps.
- Use static analysis and runtime log scrubbing rules.

---

### 83) What is secret version staging (AWSCURRENT, AWSPREVIOUS) used for?
**Answer:**
- `AWSCURRENT`: active production secret version.
- `AWSPREVIOUS`: last good version for rollback.
- Enables safe cutover and rapid rollback during failed rotation.

---

### 84) How do you handle multi-environment secrets (dev/stage/prod) safely?
**Answer:**
- Separate secret names/paths per environment and account where possible.
- Use separate IAM roles and KMS keys per environment boundary.
- Enforce naming conventions and IaC to prevent cross-env accidental reads.

---

### 85) How do you audit secret access?
**Answer:**
- CloudTrail logs secret read/update/rotation API calls.
- Create alerts for unusual read patterns, new principals, or region anomalies.
- Periodically review IAM principals with secret access.

---

### 86) Scenario: A rotated DB password caused downtime. What could have gone wrong and how do you fix the rotation design?
**Answer:**
- Likely causes: app cached stale password too long, rotation Lambda skipped test step, DB user mismatch, pool not refreshed.
- Fix by enforcing staged rotation with validation, short-lived credential cache, and dual-user or alternating-user rotation strategy.
- Add rollback path to `AWSPREVIOUS` and automated health checks before final cutover.

```text
Secrets Manager Rotation
  1) Create pending credential
  2) Set in DB
  3) Test connection
  4) Promote to AWSCURRENT
If test fails -> keep current, alert, rollback
```

---

## 8) CloudWatch (87-98)

### 87) CloudWatch metrics vs logs vs traces - differences and when you use each.
**Answer:**
- Metrics: numeric time series for alerting and dashboards.
- Logs: detailed event records for debugging and forensics.
- Traces: request path and latency breakdown across services.
- Use all three together for complete observability.

---

### 88) What are CloudWatch Alarms, and how do you reduce false positives?
**Answer:**
- Alarms evaluate metric conditions and trigger actions (SNS, Auto Scaling, Ops tools).
- Reduce noise with proper periods, datapoints-to-alarm, and composite alarms.
- Alert on symptom + impact (e.g., error rate with request volume guard).

---

### 89) Key Lambda metrics you monitor (Errors, Throttles, Duration, IteratorAge, etc.).
**Answer:**
- Core: `Invocations`, `Errors`, `Throttles`, `Duration p95/p99`, `ConcurrentExecutions`.
- Event source: `IteratorAge`/backlog age, batch failure counts.
- Add custom business metrics (orders processed, success ratio).

---

### 90) Log retention policies: why they matter and typical settings.
**Answer:**
- Controls storage cost, compliance, and forensic window.
- Set explicit retention per log group by data classification.
- Typical pattern: dev short retention, prod longer with archive/export for compliance.

---

### 91) CloudWatch Logs Insights: what problems does it solve and example queries you would run.
**Answer:**
- Fast ad hoc query over logs for incidents and trend analysis.
- Typical queries: top error messages, p95 latency by endpoint, requestId trace chain.
- Useful for debugging without exporting logs to external systems.

---

### 92) How do you create dashboards for API health (latency, 4xx, 5xx, throttles)?
**Answer:**
- Dashboard widgets by API stage/route: request count, latency p50/p95/p99, 4xx/5xx, throttle count.
- Include backend Lambda duration/errors and queue depth where relevant.
- Add annotation lines for deployments/incidents.

---

### 93) What is a log subscription filter and how do you stream logs elsewhere?
**Answer:**
- Subscription filter forwards matching log events to Lambda, Kinesis, or Firehose.
- Use for SIEM ingestion, centralized analytics, or real-time alert enrichment.
- Filter aggressively to control downstream volume/cost.

---

### 94) How do you correlate logs across services (requestId/correlationId)?
**Answer:**
- Generate or propagate a correlation ID at edge (API Gateway header).
- Include it in every log line and downstream message payload.
- Standardize field names (`correlationId`, `requestId`) across services.

---

### 95) What is embedded metrics format (EMF) and why it is useful?
**Answer:**
- EMF logs structured metrics JSON that CloudWatch auto-extracts as custom metrics.
- Reduces separate metric API calls and keeps logs + metrics linked.
- Good for high-dimensional app metrics with controlled cardinality.

---

### 96) CloudWatch Synthetics: what it tests and when to use it.
**Answer:**
- Synthetic canaries run scripted checks for API/UI endpoints from scheduled locations.
- Detects user-visible outages before customer tickets.
- Useful for SLA/SLO validation and regression detection after deploys.

---

### 97) How do you handle high-cardinality metrics safely?
**Answer:**
- Avoid unbounded labels (userId, requestId) in metric dimensions.
- Aggregate by stable dimensions (service, endpoint, region, tenant tier).
- Put high-cardinality detail in logs/traces instead of metric dimensions.

---

### 98) Scenario: API latency increases but errors do not. What do you check in CloudWatch first?
**Answer:**
- Compare API integration latency vs backend Lambda duration to isolate layer.
- Check throttles, concurrency saturation, cold start rate, and downstream DB/queue metrics.
- Drill into p95/p99 and route-specific outliers, then correlate with deploy/change timeline.

```text
Latency up, errors flat:
API Gateway Latency
  |- IntegrationLatency up? -> backend issue
  |- IntegrationLatency flat? -> API layer/network/client side
```

---

## 9) Cognito (99-110)

### 99) User Pools vs Identity Pools - what is the difference?
**Answer:**
- User Pool: authentication and user directory (signup/signin, tokens).
- Identity Pool: exchanges identities/tokens for temporary AWS credentials (STS).
- Use User Pool for auth, Identity Pool when client needs scoped AWS resource access.

---

### 100) Explain JWT tokens in Cognito (ID token vs access token vs refresh token).
**Answer:**
- ID token: user identity claims for client app.
- Access token: authorization to protected APIs/scopes.
- Refresh token: obtain new ID/access tokens without full re-login.

---

### 101) How do you integrate Cognito with API Gateway authorization?
**Answer:**
- Configure API Gateway JWT/Cognito authorizer with User Pool issuer and audience.
- Client sends bearer token in `Authorization` header.
- Gateway validates signature/claims before invoking backend.

---

### 102) Hosted UI vs custom UI - tradeoffs.
**Answer:**
- Hosted UI: faster rollout, built-in security flows, less frontend auth complexity.
- Custom UI: full UX control, but more implementation and security responsibility.
- Start Hosted UI unless product requirements demand custom experience.

---

### 103) How do you implement social login (Google/GitHub) with Cognito (high level)?
**Answer:**
- Configure external IdP in Cognito User Pool and map claims.
- Use OAuth/OIDC auth code flow through Cognito domain/Hosted UI.
- Exchange callback code for Cognito tokens; apply app RBAC on mapped claims/groups.

---

### 104) Cognito user groups: how do you use them for RBAC?
**Answer:**
- Assign users to groups (`admin`, `editor`, `viewer`).
- Group membership appears in token claims.
- API/backend enforces role permissions from claims.

---

### 105) What are Cognito triggers (pre-signup, post-confirmation, pre-token-gen) and use cases?
**Answer:**
- Lambda triggers customize auth lifecycle events.
- Examples: pre-signup validation, post-confirmation profile bootstrap, pre-token-gen custom claims.
- Keep trigger logic minimal and resilient to avoid login latency spikes.

---

### 106) How do token expiry and refresh work (best practices)?
**Answer:**
- Access/ID tokens are short-lived; refresh token is longer-lived.
- Use secure refresh flow and rotate/limit refresh token lifetime based on risk.
- Handle token expiry gracefully with silent refresh and clear logout on failure.

---

### 107) How do you handle user account lockout and brute-force protection?
**Answer:**
- Enable adaptive auth/MFA and account recovery controls.
- Rate-limit login endpoints with WAF and monitor suspicious attempts.
- Alert on repeated failed logins and high-risk sign-in events.

---

### 108) What is SRP (Secure Remote Password) and when does it matter?
**Answer:**
- SRP is a password-auth protocol that avoids sending plain password over the wire.
- Cognito supports SRP-based flows in certain SDK auth modes.
- Matters when implementing secure custom auth clients and minimizing credential exposure.

---

### 109) How do you securely store and validate tokens on frontend/backend?
**Answer:**
- Frontend: prefer secure HTTP-only cookies for web apps when possible; avoid unsafe local storage patterns for sensitive apps.
- Backend: validate JWT signature, issuer, audience, expiry, and optionally token use.
- Enforce least privilege with scopes/claims and short token lifetime.

---

### 110) Scenario: Users randomly get "Not authorized" after login. What could cause this?
**Answer:**
- Common causes: expired token, clock skew, wrong audience/client ID, stale JWKS cache, missing group/claim mapping.
- Check token claims and authorizer logs first.
- Fix with proper refresh flow, synchronized time (NTP), and consistent environment config.

```text
User Login -> Cognito tokens -> API Gateway authorizer
   if token invalid/expired/wrong aud -> 401 Not authorized
```

---
## 10) IAM (111-128)

### 111) IAM users vs groups vs roles - what is the difference?
**Answer:**
- User: long-term identity (usually for humans only when federated SSO is not used).
- Group: permission collection for users.
- Role: assumable identity with temporary credentials for services/humans/cross-account access.
- Modern best practice: prefer roles + federation over long-lived IAM users.

---

### 112) Identity-based vs resource-based policies - compare with examples.
**Answer:**
- Identity policy attaches to principal (user/role) and says what it can do.
- Resource policy attaches to resource (S3 bucket, SNS topic, Lambda) and says who can access it.
- Cross-account patterns often require both sides aligned.

---

### 113) Explain least privilege: how do you apply it in a real project?
**Answer:**
- Start with minimum actions/resources, then add only required permissions.
- Scope by ARN, condition keys, and environment tags.
- Continuously refine with CloudTrail evidence and Access Analyzer findings.

---

### 114) What is the policy evaluation order (explicit deny vs allow)?
**Answer:**
- Default is implicit deny.
- Explicit deny always wins.
- Allow applies only if no explicit deny in SCP, permission boundary, session policy, identity policy, or resource policy chain.

---

### 115) Trust policy vs permission policy - what does each do?
**Answer:**
- Trust policy defines who can assume the role (`sts:AssumeRole`).
- Permission policy defines what the role can do after assumption.
- Both are required for effective role-based access.

---

### 116) STS AssumeRole: why and how it is used.
**Answer:**
- Provides temporary credentials with scoped permissions.
- Used for cross-account access, CI/CD deploy roles, and short-lived privileged operations.
- Reduces risk compared to static access keys.

---

### 117) How do you allow a Lambda to access DynamoDB + S3 securely?
**Answer:**
- Attach minimal execution role policy with exact table/bucket ARNs and actions.
- Use KMS permissions only if encrypted resources require decrypt.
- Add IAM conditions (prefix, VPC endpoint, source account) where possible.

```text
Lambda Execution Role
  |- dynamodb:GetItem/PutItem on arn:...:table/Orders
  |- s3:GetObject on arn:...:bucket/app-data/private/*
```

---

### 118) IAM conditions: common keys (aws:SourceIp, aws:PrincipalArn, aws:RequestedRegion).
**Answer:**
- Conditions narrow access beyond action/resource.
- `aws:SourceIp`: restrict by network origin.
- `aws:PrincipalArn`: pin allowed caller identities.
- `aws:RequestedRegion`: restrict permitted regions.

---

### 119) Permission boundaries: what problem do they solve?
**Answer:**
- They cap the maximum permissions a principal can receive.
- Useful in delegated admin models to prevent privilege escalation.
- Not a grant by itself; effective access still needs allow policies.

---

### 120) SCP (Service Control Policies): when do orgs use them?
**Answer:**
- SCPs set account-level guardrails in AWS Organizations.
- Used for preventive governance (deny risky services/actions/regions).
- They limit maximum permission even for admin roles in member accounts.

---

### 121) IAM role chaining: risks and pitfalls.
**Answer:**
- Multiple sequential role assumptions reduce session duration and add complexity.
- Harder to debug authorization paths and trace principal identity.
- Prefer direct trust paths where possible.

---

### 122) How do you rotate access keys safely (if you must use them)?
**Answer:**
- Create second key, update applications/secrets, verify usage, then disable old key.
- Monitor CloudTrail/access logs during transition.
- Automate rotation and move to roles/STS whenever possible.

---

### 123) How do you audit IAM activity (CloudTrail + Access Analyzer)?
**Answer:**
- CloudTrail captures who did what, when, from where.
- Access Analyzer identifies unintended external access and broad policies.
- Use periodic reviews plus real-time alerts for high-risk events.

---

### 124) What is IAM Access Analyzer and what findings are important?
**Answer:**
- It analyzes policies to detect public/cross-account resource exposure.
- High-priority findings: public S3, cross-account KMS grants, wildcard principals on sensitive resources.
- Treat new unexpected external access findings as incident-level until verified.

---

### 125) How do you secure cross-account access to an S3 bucket?
**Answer:**
- Bucket policy allows specific external role ARN only.
- External role identity policy allows required S3 actions on target bucket.
- Add condition keys (source VPC endpoint, aws:PrincipalArn, encryption requirement).

---

### 126) Why is "*" dangerous, and when is it acceptable (rare cases)?
**Answer:**
- Wildcards expand blast radius and enable accidental privilege escalation.
- Acceptable only when resource-level restriction does not exist and conditions strongly constrain context.
- Always document and review wildcard exceptions.

---

### 127) Scenario: A service suddenly gets AccessDenied. How do you debug it quickly?
**Answer:**
- Capture exact denied action/resource from error and CloudTrail event.
- Use IAM Policy Simulator and evaluate SCP, permission boundary, session policy, resource policy, KMS policy.
- Check recent deploy/policy changes first.

```text
AccessDenied triage:
1) Who (principal ARN)
2) What action/resource
3) Which policy layer denied
4) What changed recently
```

---

### 128) Scenario: You must grant temporary access to a contractor. What is the safest approach?
**Answer:**
- Use federated identity + short-lived assumable role with least privilege.
- Add time-bound access, MFA, IP restrictions, and mandatory session tagging.
- Auto-expire assignment and log all activity.

---

## 11) DynamoDB (129-146)

### 129) Partition key vs sort key - how they affect data modeling and queries.
**Answer:**
- Partition key determines item distribution and query partition target.
- Sort key enables ordered/range queries within the same partition.
- Model access patterns first, then design key schema to avoid scans.

---

### 130) What is a hot partition and how do you avoid it?
**Answer:**
- Hot partition is disproportionate traffic on one partition key.
- Avoid with high-cardinality keys, write sharding, and time-bucket strategies.
- Use adaptive capacity but do not rely on it as sole fix.

---

### 131) On-demand vs provisioned capacity - when to choose which.
**Answer:**
- On-demand: variable/unpredictable traffic, no capacity planning.
- Provisioned: predictable workloads, lower cost at steady high utilization.
- Auto scaling provisioned is common for known baseline + burst.

---

### 132) What is adaptive capacity and how does it help?
**Answer:**
- DynamoDB reallocates throughput to hotter partitions automatically within limits.
- Helps with uneven but not pathological key distribution.
- Good modeling is still required to prevent sustained hotspots.

---

### 133) Read/write capacity units: how they relate to item size.
**Answer:**
- WCUs are based on write size chunks; RCUs on read size and consistency level.
- Larger items consume more capacity.
- Keep items lean and project only needed attributes.

---

### 134) Strongly consistent vs eventually consistent reads - tradeoffs.
**Answer:**
- Strong reads return latest committed value, higher read cost and region-limited.
- Eventual reads are cheaper and usually sufficient for many user flows.
- Choose per endpoint by correctness requirement.

---

### 135) GSI vs LSI - differences, limits, and when to use each.
**Answer:**
- GSI: different partition/sort keys, separate throughput, eventual consistency.
- LSI: same partition key as base table, alternate sort key, created at table creation, size constraints per partition.
- Prefer GSI for most secondary access patterns.

---

### 136) How do you design a "search" feature in DynamoDB (without scanning)?
**Answer:**
- Encode searchable patterns into keys/indexes (`PK`, `SK`, prefixes, inverted indexes).
- Precompute queryable tokens and write to GSIs.
- For full-text/fuzzy search, offload to OpenSearch and keep DynamoDB as source of truth.

---

### 137) What is DynamoDB Streams and common use cases?
**Answer:**
- Streams emit item change records in near real-time.
- Use for CDC, audit trails, materialized views, async event propagation.
- Consumers must be idempotent due to retry/replay behavior.

---

### 138) What is TTL and what problems does it solve?
**Answer:**
- TTL auto-expires items based on timestamp attribute.
- Useful for sessions, caches, temporary locks, and data retention policies.
- Deletion is asynchronous, so do not rely on exact second-level expiration.

---

### 139) Conditional writes: how they help implement idempotency and locking.
**Answer:**
- `ConditionExpression` allows write only if predicate holds.
- Idempotency: `attribute_not_exists(idempotencyKey)`.
- Optimistic locking: version check before update.

---

### 140) Transactions: when to use them and what costs/limits exist.
**Answer:**
- Use `TransactWriteItems/TransactGetItems` for all-or-nothing multi-item operations.
- Higher latency/cost vs single-item writes.
- Keep transaction size and contention low for reliability.

---

### 141) BatchWrite and BatchGet: pros/cons and failure handling.
**Answer:**
- Pros: fewer round trips and better throughput for bulk operations.
- Cons: no atomicity across items; partial failures return unprocessed keys.
- Always retry `UnprocessedItems` with exponential backoff.

---

### 142) Pagination: how LastEvaluatedKey works and common mistakes.
**Answer:**
- Query/scan returns page plus `LastEvaluatedKey` cursor.
- Pass cursor as `ExclusiveStartKey` for next page.
- Mistakes: assuming full dataset in first page, using offset-style pagination.

---

### 143) What is DAX and when would you use it?
**Answer:**
- DAX is in-memory cache for DynamoDB API-compatible reads/writes (read acceleration).
- Useful for read-heavy microsecond-latency workloads.
- Adds operational complexity; use only when native DynamoDB latency is insufficient.

---

### 144) How do you handle JSON-like nested attributes and partial updates?
**Answer:**
- Store nested maps/lists for flexible schema where needed.
- Use `UpdateExpression` to set/remove specific nested paths.
- Avoid oversized deeply nested blobs that increase RCU/WCU and complicate indexing.

---

### 145) Scenario: You get "ProvisionedThroughputExceededException". What do you change first?
**Answer:**
- Identify whether table or specific GSI is throttling.
- Increase capacity or switch to on-demand as immediate mitigation.
- Then fix hot keys, optimize item size/access pattern, and add backoff/jitter in clients.

---

### 146) Scenario: You need "unique email" constraint. How do you enforce uniqueness in DynamoDB?
**Answer:**
- Create uniqueness item keyed by normalized email in same table or dedicated table.
- Use transaction/conditional write to reserve email and create user atomically.
- Handle retries so duplicate attempts return existing user gracefully.

```text
TransactWrite:
  1) Put EmailLock(pk="EMAIL#alice@example.com") if not exists
  2) Put User(pk="USER#123")
If step 1 fails -> email already taken
```

---

## 12) RDS (147-161)

### 147) RDS vs DynamoDB - when is RDS the better choice?
**Answer:**
- Choose RDS for relational data, joins, complex queries, ACID transactions, and mature SQL tooling.
- DynamoDB is better for key-value/known access patterns at massive scale.
- Pick based on query model and consistency/transaction needs.

---

### 148) Multi-AZ vs Read Replicas - what do they solve (availability vs scaling)?
**Answer:**
- Multi-AZ: synchronous standby for high availability/failover.
- Read Replica: asynchronous replicas for read scaling and analytics offload.
- They solve different problems and are often used together.

---

### 149) How does automated backup + point-in-time recovery work?
**Answer:**
- Automated backups + transaction logs enable restore to specific point in retention window.
- PITR creates a new DB instance/cluster from backup timeline.
- Define retention based on RPO requirements.

---

### 150) What is a parameter group and why does it matter?
**Answer:**
- Parameter group controls engine runtime settings.
- Some changes are dynamic; others require reboot.
- Treat as versioned IaC to avoid configuration drift.

---

### 151) Connection pooling in serverless: why is it a problem and how do you fix it (RDS Proxy)?
**Answer:**
- Lambda burst concurrency can open too many DB connections and exhaust DB resources.
- RDS Proxy pools/reuses connections and smooths spikes.
- Also improves failover behavior by managing backend connections.

```text
Lambda (many short-lived invocations)
   -> RDS Proxy (pool)
      -> RDS (bounded connections)
```

---

### 152) RDS encryption: at rest and in transit - what settings are needed?
**Answer:**
- At rest: enable storage encryption with KMS key.
- In transit: enforce TLS from app to DB endpoint.
- Rotate credentials, restrict network access, and protect snapshots/backups.

---

### 153) How do you do DB migrations safely in production?
**Answer:**
- Use versioned migration tooling and backward-compatible expand/contract changes.
- Run prechecks, canary deploy app changes, and keep rollback scripts.
- Avoid long blocking DDL during peak traffic.

---

### 154) How do you monitor RDS performance (CPU, connections, IOPS, slow queries)?
**Answer:**
- Track CloudWatch DB metrics: CPU, memory pressure indicators, connections, read/write IOPS, latency.
- Enable Performance Insights and slow query logs.
- Correlate app latency with DB wait events and lock contention.

---

### 155) What is failover and how long can it take (what affects it)?
**Answer:**
- Failover promotes standby/new writer after fault.
- Duration depends on engine, workload, transaction replay, DNS/client reconnect behavior.
- Typical objective is short minutes, not instant.

---

### 156) How do you implement least privilege DB users and credential rotation?
**Answer:**
- Separate DB roles by service and privilege scope (read/write/admin).
- Store credentials in Secrets Manager with automated rotation.
- Remove shared superuser credentials from application code paths.

---

### 157) IAM authentication for RDS: what it is and when it is useful.
**Answer:**
- Uses temporary IAM-generated auth tokens instead of static DB passwords.
- Useful for short-lived access and centralized AWS IAM control.
- Common in admin tooling and some service-to-DB access patterns.

---

### 158) What is read-after-write consistency in RDS read replicas (and how do you deal with lag)?
**Answer:**
- Replicas are async; recent writes may not appear immediately.
- Send read-after-write critical requests to primary.
- Use lag-aware routing and tolerate eventual consistency where acceptable.

---

### 159) How do you scale RDS vertically and what downtime risks exist?
**Answer:**
- Vertical scaling changes instance class/storage performance.
- Usually involves restart/failover events; risk depends on engine/deployment model.
- Plan maintenance window, test failover, and use Multi-AZ to reduce impact.

---

### 160) Scenario: Sudden spike in connections causes app outage. What is your triage and fix plan?
**Answer:**
- Immediate: enable/verify RDS Proxy or connection pool limits, shed load, scale app/DB carefully.
- Diagnose: check connection storm source, idle connection leaks, retry storms.
- Permanent fix: pool tuning, backpressure, circuit breakers, and max-connection safeguards.

---

### 161) Scenario: A query becomes slow after data growth. What steps do you take to optimize?
**Answer:**
- Capture execution plan and identify scan/lock/sort bottleneck.
- Add/adjust indexes, rewrite query, reduce selected columns, archive old data/partition.
- Validate improvement with load test and monitor regressions.

---

## Bonus: Multi-service System Design Scenarios (162-172)

### 162) Design a serverless REST API for "document upload + async processing" using API Gateway, Lambda, S3, SQS, DynamoDB, and Step Functions.
**Answer:**
- API creates upload job + presigned URL; metadata stored in DynamoDB.
- S3 upload event pushes to SQS; Step Functions orchestrates processing steps.
- Final status/result stored in DynamoDB; client polls status endpoint.

```text
Client -> API GW -> Lambda -> DynamoDB (job=CREATED)
                  -> S3 presigned URL
Client -> S3 upload
S3 Event -> SQS -> Step Functions -> Lambda processors -> DynamoDB (job=COMPLETED)
```

---

### 163) You need guaranteed processing with retries and DLQ - which services and settings do you use?
**Answer:**
- Use SQS as durable buffer with Lambda consumers.
- Configure visibility timeout > processing p99, retry backoff, maxReceiveCount, DLQ redrive.
- Add idempotency keys to handle at-least-once delivery.

---

### 164) How do you implement end-to-end idempotency across API Gateway -> Lambda -> DynamoDB?
**Answer:**
- Client sends `Idempotency-Key` header.
- Lambda conditionally writes request record in DynamoDB before side effects.
- Subsequent same key returns stored outcome.

```text
Request (Idempotency-Key=K)
 -> Lambda
 -> DynamoDB Put if not exists (K)
    |- success -> process -> store response
    |- exists  -> return stored response
```

---

### 165) Design a webhook receiver that must be secure and idempotent (API Gateway + Lambda + DynamoDB).
**Answer:**
- Verify webhook signature and timestamp in Lambda.
- Use event ID as idempotency key in DynamoDB conditional write.
- Quickly ACK accepted events, then process asynchronously via queue.

```text
Provider -> API GW -> Lambda verify signature
                     -> DynamoDB dedup(eventId)
                     -> SQS async worker
```

---

### 166) You need fanout to multiple consumers and replay ability - SNS vs EventBridge vs SQS (design choice).
**Answer:**
- SNS + SQS per consumer: low-latency fanout with durable queues and replay via queue retention/DLQ.
- EventBridge: richer routing/filtering and archive/replay features.
- SQS alone: single-consumer queue semantics, not native multi-fanout.

---

### 167) How do you implement auditing and traceability for every request (CloudWatch + correlation IDs)?
**Answer:**
- Generate correlation ID at API edge and propagate through headers/messages.
- Structured logs in every service include correlation ID and principal info.
- Central dashboard/query links API logs, Lambda logs, and workflow execution IDs.

---

### 168) How do you secure secrets end-to-end (Secrets Manager + IAM + KMS) without leaking in logs?
**Answer:**
- Store secrets only in Secrets Manager encrypted by KMS CMK.
- Grant least-privilege read to runtime roles; cache in memory, not logs.
- Redact sensitive fields in logging middleware and error handlers.

---

### 169) Design for zero downtime deployments in serverless (versions/aliases, canary, rollbacks).
**Answer:**
- Publish immutable Lambda versions and route via aliases.
- Shift traffic gradually (e.g., 5% -> 25% -> 100%) with alarms gating promotion.
- Auto rollback alias on error/latency regression.

```text
Alias prod
  -> v42 (95%)
  -> v43 (5%)
If alarms fire -> rollback prod -> v42
```

---

### 170) How do you handle partial failures in a workflow (compensation/saga) using Step Functions?
**Answer:**
- Model each forward action with corresponding compensating action.
- Use `Catch` on failing branch and execute compensation chain.
- Record saga state for observability and manual replay.

```text
Reserve Inventory -> Charge Payment -> Create Shipment
         if Shipment fails:
           -> Refund Payment -> Release Inventory -> Mark Failed
```

---

### 171) How do you set alerts that indicate real user impact (SLO-style alarms)?
**Answer:**
- Define SLIs: availability, latency, correctness.
- Alert on error-budget burn rate (fast + slow windows), not raw noisy metrics alone.
- Combine symptom alarms with traffic thresholds to avoid false positives during low volume.

---

### 172) Cost optimization: where do serverless systems usually waste money and how do you fix it?
**Answer:**
- Common waste: over-provisioned concurrency, noisy logs, excessive retries, oversized Lambda memory/runtime, NAT data processing costs.
- Fix with right-sizing, log retention/filtering, idempotent retry policies, VPC endpoints, and architecture simplification.
- Track cost per request/workflow as a first-class KPI.

```text
Cost review loop:
Measure cost/unit -> find top 3 drivers -> optimize -> re-measure
```

---
