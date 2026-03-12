# AWS Interview Questions Bank (Serverless + Core Services) - Answered

## 1) AWS Lambda (1-15)

Simple view: Lambda means AWS runs your code on demand without you managing servers. The main interview themes are cold starts, scaling, timeouts, retries, packaging, and monitoring.

### 1) Explain Lambda's execution model (init phase vs invocation phase).
**Answer:**
- Think of Lambda as having a setup step and a run step.
- `Init` happens once for a new execution environment. In this phase, AWS starts the runtime, loads your code, runs imports/global code, and creates reusable things like SDK or database clients.
- `Invoke` happens for each request. This is when your handler uses the event and context to do the real work. If the environment stays warm, later requests reuse it and skip most of the setup, so latency is lower.

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
- A cold start happens when Lambda must create a brand-new execution environment before your function can run.
- Common reasons are low or uneven traffic, sudden bursts, large deployment packages or layers, slower runtime startup, and extra VPC networking work such as attaching an Elastic Network Interface (ENI).
- You reduce cold starts by keeping the bundle small, lazy-loading heavy modules, choosing lighter runtimes when possible, avoiding unnecessary VPC use, and using provisioned concurrency or SnapStart where supported.

---

### 3) Reserved concurrency vs provisioned concurrency vs account concurrency - differences and use cases.
**Answer:**
- `Account concurrency` is the total concurrent Lambda capacity available for your AWS account in a Region.
- `Reserved concurrency` carves out a fixed slice for one function. This protects critical functions with guaranteed capacity and also puts a hard cap on noisy functions.
- `Provisioned concurrency` keeps execution environments already warm for a specific version or alias, which is useful when you need predictable low startup latency.

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
- With API Gateway, each incoming request can trigger Lambda immediately, so concurrency mainly follows request rate and how long each invocation takes.
- With SQS, Lambda reads messages through an event source mapping, so concurrency is influenced by queue depth, batch size, visibility timeout, scaling rules, and any concurrency limits you set.
- In simple terms, API Gateway passes bursts more directly, while SQS acts as a buffer and smooths traffic spikes.

---

### 5) What happens when a Lambda times out? What should your code do to avoid partial work?
**Answer:**
- When a Lambda reaches its timeout, AWS stops the runtime immediately, so any in-flight work may be left incomplete.
- For synchronous calls, the caller usually sees a timeout or error. For asynchronous sources such as queues or async invokes, the event may be retried depending on the source behavior.
- To avoid partial work, keep operations idempotent, split large jobs into smaller safe units, save checkpoints when needed, and use `context.getRemainingTimeInMillis()` to stop cleanly before the hard timeout.

---

### 6) Explain retries for async invocations (and how to control/stop them).
**Answer:**
- For asynchronous Lambda invocations, AWS retries failed events automatically with backoff by default.
- You can control that behavior with async invocation settings such as `MaximumRetryAttempts` and `MaximumEventAgeInSeconds`.
- If you want controlled failure handling instead of silent repeated retries, send failed events to a dead-letter queue (DLQ) or a Lambda Destination.

---

### 7) What are Lambda Destinations, and when would you use them?
**Answer:**
- Lambda Destinations send the result of an asynchronous invocation to another service after the function finishes.
- You can route either `success` or `failure` outcomes to SNS, SQS, EventBridge, or another Lambda function.
- Use Destinations when logs alone are not enough and you want an automatic next step, such as audit tracking, alerting, post-processing, or a failure workflow.

---

### 8) How do you do idempotency in Lambda (common patterns)?
**Answer:**
- Idempotency means the same request can be retried without causing duplicate side effects.
- A common pattern is to take a client-provided idempotency key, such as an order ID or request ID, and store it in DynamoDB with a conditional write like `attribute_not_exists` before doing the real work.
- Save the processing status or final result with that key, so if the same request comes again you can return the same answer or safely no-op.

```text
Client -> Lambda -> DynamoDB (Put if key not exists)
                    |- success -> do side effect -> mark done
                    |- exists  -> return stored result / no-op
```

---

### 9) Lambda in a VPC: why it can be slower, and what setup is required for internet access.
**Answer:**
- Lambda in a VPC can be slower on cold starts because AWS has extra networking work to attach the function to your VPC.
- If the function runs in private subnets and still needs outbound internet access, it usually needs a NAT Gateway, or VPC endpoints if it only needs private access to AWS services.
- Use VPC networking only when you actually need private resources such as RDS, internal services, or private APIs.

---

### 10) Environment variables in Lambda: what to store there vs not store there?
**Answer:**
- Environment variables are best for simple runtime configuration that changes by environment.
- Store non-secret values such as feature flags, table names, service URLs, and stage names there, but avoid putting raw secrets directly into env vars unless there is a very specific reason.
- For secrets, use Secrets Manager or Parameter Store with KMS, and keep environment config versioned by stage or alias so deployments stay consistent.

---

### 11) How would you handle large dependencies and reduce package size?
**Answer:**
- Large dependencies increase deployment size and can slow down cold starts.
- Reduce package size by bundling properly, tree-shaking unused code, minifying where it makes sense, and excluding tests or dev-only files from the deployed artifact.
- Use Lambda layers only for libraries that are truly shared, and move very heavy binaries to container images only when there is a real need. Lazy-load optional modules whenever possible.

---

### 12) How do you monitor Lambda errors, throttles, and duration effectively?
**Answer:**
- Start with core CloudWatch metrics such as `Errors`, `Throttles`, `Duration`, and `ConcurrentExecutions`. For queue or stream sources, also watch lag signals such as `IteratorAge`.
- Metrics tell you that something is wrong, but logs tell you why, so use structured logs, correlation IDs, and CloudWatch alarms with thresholds that map to real action.
- Do not look only at averages. Track p95 or p99 latency too, because user pain usually shows up in the slow tail.

---

### 13) What is Lambda ephemeral storage, and when do you need more of it?
**Answer:**
- Lambda gives each execution environment temporary disk space at `/tmp`, called ephemeral storage.
- You need more of it when the function works with temporary large files, such as ZIPs, PDFs, images, machine learning models, or multi-step data transformations.
- Treat it as scratch space only: clean up when possible and monitor both storage usage and execution time so you do not run into disk or timeout issues.

---

### 14) How do you handle streaming/large payloads in Lambda safely?
**Answer:**
- The safest pattern is to pass a reference, such as an S3 bucket and key, instead of sending the full payload through Lambda.
- If you must process large data inside the function, stream it in chunks so you do not load the whole file or response into memory at once.
- Validate file size and content type early, and enforce limits at the edge with API Gateway, S3 policies, or application-level checks.

---

### 15) Scenario: You see throttles + increased latency. What metrics/logs do you check first and what fixes do you try?
**Answer:**
- First find out whether the issue is too many concurrent requests, slow code, or a slow dependency.
- The fastest signals to check are `Throttles`, `ConcurrentExecutions`, p95 or p99 `Duration`, upstream 429/5xx responses, and for queues the `ApproximateAgeOfOldestMessage`.
- Once you know the bottleneck, fix that specific problem: raise concurrency limits if needed, optimize runtime and memory, tune batching and parallelism, or protect downstream systems with backpressure and DLQs.

```text
Client -> API GW -> Lambda -> Downstream DB
             |         |
          429/5xx   Throttles, Duration spikes
```

---

## 2) API Gateway (16-30)

Simple view: API Gateway is the front door for your API. Most interview questions here are about routing, authentication, throttling, CORS, logging, and how to debug backend failures.

### 16) REST API vs HTTP API - key differences and when you choose which.
**Answer:**
- HTTP API is the simpler, cheaper, and usually faster choice, so it is a good default for most modern APIs.
- REST API supports more advanced features, such as usage plans, API keys, richer request/response mapping, validation, caching, and canary releases at the stage level.
- A strong interview answer is: choose HTTP API by default, and choose REST API only when you clearly need those extra features.

---

### 17) What are the available integration types (Lambda proxy, HTTP proxy, mock, etc.)?
**Answer:**
- API Gateway can connect to different backend types depending on how much control and transformation you need.
- `Lambda proxy` passes most of the request through to Lambda, so your function handles the logic and payload shape. `HTTP proxy` forwards to an HTTP backend. `Mock` returns a fixed response without a real backend.
- There are also AWS service integrations, which let API Gateway call AWS services directly and remove unnecessary Lambda glue code.

---

### 18) Explain request/response mapping and when you need it.
**Answer:**
- Request and response mapping is how API Gateway changes one payload shape into another.
- You use it when the client contract and backend contract do not match, when you want to hide backend details, or when you need to add metadata or normalize legacy payloads.
- If the backend already produces the exact contract your clients need, proxy mode is usually better because it is simpler and easier to maintain.

---

### 19) How do you implement authentication with API Gateway (JWT authorizer vs Lambda authorizer)?
**Answer:**
- API Gateway supports built-in JWT authorizers and custom Lambda authorizers.
- A JWT authorizer is usually the simpler and faster option because API Gateway can validate tokens from Cognito or another OpenID Connect (OIDC) issuer without extra code.
- A Lambda authorizer is the better choice when authorization rules are highly custom, dynamic, or require extra lookups before allowing the request.

---

### 20) What is a usage plan and API key, and when is it appropriate?
**Answer:**
- A usage plan controls how much an API consumer can use your API, and the API key identifies which consumer is making the call.
- This is useful for partner or external APIs where you want quotas, throttling, metering, and basic abuse control per client.
- API keys are not real user authentication, so if you need identity or secure access you still combine them with proper auth such as JWT, IAM, or another auth layer.

---

### 21) Throttling: difference between account-level, stage-level, and usage plan throttling.
**Answer:**
- Account-level throttling is the broad AWS service limit for your account in that Region.
- Stage or method throttling lets you control traffic for a specific API or endpoint in a specific environment such as `dev` or `prod`.
- Usage plan throttling applies per API key or client, so in practice the real throughput is limited by whichever control in the request path is the most restrictive.

---

### 22) How do you implement rate limiting + burst control for an endpoint?
**Answer:**
- Rate limiting and burst control usually start with API Gateway throttling settings.
- Set a steady request rate and a burst limit at the stage or method level, and use usage plans when different clients need different limits.
- If abuse or sudden spikes are a concern, add AWS WAF rate-based rules so bad traffic is blocked before it burns Lambda concurrency or backend capacity.

---

### 23) Explain CORS in API Gateway and common mistakes that break it.
**Answer:**
- CORS is a browser security rule, so the API must return the headers the browser expects for cross-origin requests.
- A browser may first send an `OPTIONS` preflight request, and your API must reply with the allowed origin, methods, and headers. The real response also needs the correct CORS headers.
- Common problems are missing the `OPTIONS` route, forgetting CORS headers on the actual response, using `*` together with credentials, or not allowing a required custom header.

---

### 24) How do you do caching in API Gateway and what are the risks?
**Answer:**
- API Gateway caching stores responses so repeated read requests can be served faster and more cheaply.
- It works best for stable, read-heavy endpoints where the same inputs should return the same output for many callers.
- The main risks are stale data, serving the wrong user-specific response if auth context is missing from the cache key, and extra cost if you enable caching where it is not useful.

---

### 25) How do you enable and analyze access logs and execution logs?
**Answer:**
- Access logs give you a summary of each request, including status code, latency, source IP, and request ID.
- Execution logs go deeper into backend integration behavior, which helps when you are debugging mapping problems, timeouts, or backend errors.
- Use structured JSON logs and CloudWatch Logs Insights so you can search by `requestId`, filter by status code, and analyze latency percentiles quickly.

---

### 26) What is WAF and how can it protect API Gateway?
**Answer:**
- AWS WAF sits in front of API Gateway and filters malicious or abusive requests before they reach your backend.
- You can use managed rules for common attacks like SQL injection or cross-site scripting, plus your own allow, deny, or rate-based rules.
- This lowers your attack surface and also reduces cost because fewer bad requests reach Lambda or downstream services.

---

### 27) What is a stage, deployment, and stage variables (use cases)?
**Answer:**
- A deployment is a snapshot of the API configuration at a point in time.
- A stage is a named environment such as `dev`, `qa`, or `prod` that points to a deployment and carries settings like logging, throttling, and stage-specific behavior.
- Stage variables let you inject environment-specific values, but they are an older pattern. In modern setups, explicit configuration through infrastructure as code (IaC) is usually clearer and safer.

---

### 28) How do you do canary releases / gradual rollout with API Gateway?
**Answer:**
- A canary release means sending only a small percentage of traffic to the new version first.
- In REST API, you can configure this at the stage level and then watch 4xx, 5xx, and latency before increasing the percentage.
- For safer rollouts, combine API Gateway canaries with Lambda aliases or weighted routing so you can quickly shift traffic back if the new version misbehaves.

---

### 29) How do you handle binary media types / file uploads through API Gateway?
**Answer:**
- Binary payloads require the API and backend to agree on how the data is encoded, often with base64 handling.
- For small files this is fine, but for large uploads it is usually better to let clients upload directly to S3 with a presigned URL instead of sending the full file through API Gateway and Lambda.
- Always validate content type and size, and add an asynchronous scan step if uploaded files could be unsafe.

---

### 30) Scenario: Clients report random 502/504 from API Gateway. What do you investigate first?
**Answer:**
- Start by deciding whether the failure is happening inside API Gateway or in the backend behind it.
- A `502` often means API Gateway received an invalid or malformed response from the integration, while a `504` usually means the backend took too long to respond.
- Check access logs, execution logs, and integration latency first, then validate Lambda timeout settings, VPC or NAT connectivity, and the health of downstream dependencies.

```text
Client
  -> API Gateway (access log: status, integrationLatency)
     -> Lambda/backend (execution log: error/timeout)
```

---

## 3) Step Functions (31-42)

Simple view: Step Functions is AWS workflow orchestration. The important topics are state flow, retries, data passing, fan-out control, idempotency, and when to use direct service integrations instead of Lambda.

### 31) Standard vs Express workflows - differences (cost, duration, throughput).
**Answer:**
- Standard and Express workflows solve similar orchestration problems, but they are optimized for different traffic patterns.
- Standard workflows are durable, keep detailed execution history, and are better for long-running or business-critical processes where correctness matters most.
- Express workflows are cheaper for very high-volume, short-lived executions, but they use at-least-once behavior, so they fit event-heavy pipelines more than critical long-running flows.

---

### 32) Explain states: Task, Choice, Wait, Parallel, Map, Succeed, Fail.
**Answer:**
- Each Step Functions state has a simple job inside the workflow.
- `Task` does work, `Choice` branches based on conditions, `Wait` pauses, `Parallel` runs branches at the same time, and `Map` repeats work across a list of items.
- `Succeed` and `Fail` are terminal states that clearly mark whether the workflow ended successfully or stopped with an error.

---

### 33) How do retries and backoff work in Step Functions (Retry + Catch)?
**Answer:**
- `Retry` tells Step Functions which errors should be retried, how long to wait before retrying, how many times to try, and how fast the delay should grow.
- `Catch` is the fallback path that runs when retries are exhausted or when you want to handle an error in a different way.
- Good practice is to retry only the errors that are likely to be temporary. If you retry everything, you can create noisy retry storms.

---

### 34) What is a dead-letter style pattern in Step Functions (how do you isolate failures)?
**Answer:**
- Step Functions does not have a built-in dead-letter queue state, but you can build the same idea yourself.
- In a `Catch` block, send the failed input plus error details to SQS, SNS, or EventBridge so the bad item is isolated from the normal processing path.
- This keeps the main workflow clean and makes replay or investigation much easier because the failure context is preserved.

---

### 35) How do you pass data between states (InputPath, ResultPath, OutputPath)?
**Answer:**
- Step Functions passes JSON from one state to the next, and these path settings control exactly what moves forward.
- `InputPath` selects what a state receives, `ResultPath` decides where the state's output is merged back into the JSON, and `OutputPath` filters what the next state sees.
- Use them to keep the payload small and relevant, because large messy state data becomes harder to debug and can hit size limits.

---

### 36) What is the maximum state input/output size, and how do you handle larger payloads?
**Answer:**
- Step Functions state data has a payload size limit, commonly 256 KB per state transition.
- If the real data is larger, store it in S3 and pass only a pointer such as the bucket name, object key, or version through the workflow.
- Also prune or compress state data where possible so the workflow stays within limits and is easier to reason about.

---

### 37) How do you do parallel processing safely (Map + concurrency control)?
**Answer:**
- Parallel processing is useful, but you must control how much fan-out happens at once.
- Use `Map` with `MaxConcurrency` so you do not overwhelm downstream systems or create too many tasks in parallel.
- Make each item idempotent and safe to retry, and plan for partial failure so one bad item does not force you to rerun everything blindly.

---

### 38) Callback patterns: what is a task token and when would you use it?
**Answer:**
- A task token lets Step Functions pause and wait for an external system to answer later.
- This is useful for human approvals, third-party asynchronous jobs, or batch systems that cannot finish inside one normal request.
- The outside system keeps the token and later calls `SendTaskSuccess` or `SendTaskFailure` to resume the workflow, so the token must be handled securely and with a timeout plan.

```text
Step Functions -> Task (waitForTaskToken) -> External Worker
External Worker -> SendTaskSuccess(token, result) -> Step Functions resumes
```

---

### 39) Service integrations (Lambda, SQS, SNS, DynamoDB, etc.) - benefits vs calling via Lambda.
**Answer:**
- Direct service integrations let Step Functions call AWS services without inserting Lambda in the middle.
- This usually reduces code, latency, and cost because you remove an extra moving part and keep the workflow simpler.
- Use Lambda only when you truly need custom transformation or business logic that the built-in service integration cannot handle cleanly.

---

### 40) How do you implement idempotency and dedup in a workflow?
**Answer:**
- Workflow idempotency means the same business request should not create duplicate work if the workflow is started twice.
- A common approach is to create a stable idempotency key at the start and record step completion in DynamoDB using conditional writes.
- Then each task can safely detect retries or re-entry and skip, return the saved result, or continue without duplicating side effects.

---

### 41) How do you monitor Step Functions executions (metrics, logs, tracing)?
**Answer:**
- Monitor Step Functions at three levels: metrics, logs, and trace correlation.
- CloudWatch metrics such as `ExecutionsStarted`, `Succeeded`, `Failed`, `TimedOut`, and `Throttled` tell you the health of the workflow at a high level.
- Execution logs and trace correlation with request IDs help you see which state failed, what input caused it, and how the workflow connects to the original event.

---

### 42) Scenario: A workflow sometimes runs twice due to upstream retries. How do you design for this?
**Answer:**
- Assume the same upstream event may try to start the workflow more than once.
- Use a deterministic execution name or separate idempotency key so duplicates can be detected immediately and ignored if already running or completed.
- Then make downstream writes conditional and keep side effects deduplicated so a second start becomes a safe no-op instead of a data bug.

```text
Upstream Event (id=abc123)
    -> StartExecution(name=abc123)
    -> Duplicate event -> same id -> ignore/no-op
```

---
## 4) SNS (43-52)

Simple view: SNS is the service you use when one producer needs to notify many consumers quickly. Focus on fanout, retries, filtering, encryption, and when SNS is a better fit than EventBridge.

### 43) What is SNS used for in real architectures?
**Answer:**
- SNS is AWS's publish-subscribe service for fanout, which means one producer can notify many consumers at the same time.
- It decouples the producer from its consumers because the producer publishes once and does not need to know whether the subscribers are SQS queues, Lambda functions, HTTP endpoints, email, or SMS.
- In real systems, teams use SNS for domain events, alerts, and asynchronous triggers that need to reach multiple downstream systems quickly.

---

### 44) Fanout pattern: SNS -> SQS -> Lambda - why it is common.
**Answer:**
- This pattern is common because SNS sends one published message to many SQS queues, and each queue gets its own durable copy.
- Each consumer can then process messages at its own speed, scale independently, and retry failures without affecting the other consumers.
- SQS also absorbs bursts and isolates failures, so one slow or broken subscriber does not block the rest of the system.

```text
Producer -> SNS Topic
            |- SQS A -> Lambda A
            |- SQS B -> Lambda B
            |- SQS C -> Lambda C
```

---

### 45) Standard vs FIFO SNS topics - differences and constraints.
**Answer:**
- Standard SNS topics are built for very high throughput and use at-least-once delivery with best-effort ordering.
- FIFO SNS topics add ordering by message group and deduplication support, but they come with lower throughput limits and stricter usage rules.
- Use FIFO only when the full workflow truly needs strict ordering and deduplication from end to end. Otherwise, standard topics are simpler and more scalable.

---

### 46) Message filtering: how does filter policy work and why it is useful?
**Answer:**
- SNS filter policies let each subscriber say which messages it wants to receive.
- SNS compares message attributes or body fields against that policy and delivers only the matching events to that subscription.
- This reduces noise, lowers downstream cost, and avoids putting custom routing logic inside every consumer.

---

### 47) Delivery retries: what happens if an endpoint/subscriber fails?
**Answer:**
- If an SNS delivery fails, SNS retries based on the protocol-specific retry policy for that subscription type.
- For SQS or Lambda subscriptions, once SNS hands the message off successfully, the target service takes over and applies its own retry behavior.
- In practice, you should also configure redrive paths and monitoring so failed deliveries do not disappear silently.

---

### 48) How do you do DLQ for SNS subscriptions (and why)?
**Answer:**
- For SNS subscriptions, you can configure a redrive policy so undeliverable messages are sent to an SQS dead-letter queue (DLQ).
- This keeps failed notifications available for replay and investigation instead of losing them.
- It is especially useful when an endpoint is down, misconfigured, or temporarily unable to accept messages.

---

### 49) SNS encryption at rest and in transit - what options exist?
**Answer:**
- SNS protects data in transit with TLS when publishers and subscribers call the service over HTTPS.
- For encryption at rest, you can enable server-side encryption using either an AWS-managed key or a customer-managed AWS KMS key.
- If you use KMS, make sure the key policy and IAM permissions allow only the intended publishers and subscribers to use the encrypted topic.

---

### 50) How do you send structured messages (JSON) and route them to different subscribers?
**Answer:**
- A good pattern is to publish a JSON message body and add message attributes such as `eventType`, `tenant`, or `priority`.
- Each subscriber can then attach a filter policy so it receives only the events it cares about.
- Keep the event schema and version explicit in the message body so consumers can evolve safely over time.

---

### 51) SNS vs EventBridge - when would you prefer each?
**Answer:**
- Choose SNS when you need simple, fast fanout with high throughput and straightforward publish-subscribe behavior.
- Choose EventBridge when you need richer routing rules, event buses, schema support, archive and replay, or SaaS event integrations.
- A simple interview rule is: SNS for simple broadcast, EventBridge for more advanced event routing and governance.

---

### 52) Scenario: You need to notify 5 systems and ensure none miss events. What design do you pick?
**Answer:**
- Use one SNS topic with one dedicated SQS queue per consumer system, and give each queue its own DLQ.
- That way every system gets its own durable copy, can process at its own pace, and can replay from the queue or DLQ if something goes wrong.
- Because delivery is still at-least-once, each consumer should also be idempotent so retries do not create duplicate side effects.

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

Simple view: SQS is a durable queue that helps you absorb traffic spikes and process work safely in the background. The big ideas are visibility timeout, retries, DLQ, ordering, and duplicate-safe consumers.

### 53) Standard vs FIFO queues - ordering, throughput, delivery semantics.
**Answer:**
- Standard queues are built for very high throughput and use at-least-once delivery with best-effort ordering.
- FIFO queues are designed for ordered processing and deduplication, usually through message groups and a deduplication window.
- Use FIFO only when the business flow truly needs strict ordering or duplicate suppression. Otherwise, standard queues are simpler and scale more easily.

---

### 54) Explain visibility timeout and how it prevents duplicate processing.
**Answer:**
- When a consumer receives a message from SQS, that message becomes temporarily invisible to other consumers.
- If the consumer finishes successfully, it deletes the message and processing is complete.
- If the consumer crashes or does not delete the message before the visibility timeout ends, the message becomes visible again so another worker can retry it.

---

### 55) What happens if visibility timeout is too low or too high?
**Answer:**
- If the visibility timeout is too low, the message can reappear while the worker is still processing it, which increases duplicate processing.
- If it is too high, failed messages take longer to come back for retry, so backlogs recover more slowly after crashes.
- A practical rule is to set it slightly above your p99 processing time and extend it dynamically when a job sometimes runs longer than normal.

---

### 56) Long polling vs short polling - impact on cost and latency.
**Answer:**
- Short polling checks the queue quickly and can return many empty responses when no messages are ready.
- Long polling waits for a configured period before returning, which reduces empty receives and lowers API cost.
- In most systems, long polling is the better default because it is more efficient and often gives similar or even better real-world latency.

---

### 57) DLQ: how do you configure maxReceiveCount and redrive policies?
**Answer:**
- `maxReceiveCount` defines how many times SQS should let a message be received and retried before moving it to the dead-letter queue.
- The redrive policy is what connects the main queue to the DLQ.
- Choose the retry count based on whether failures are usually temporary or permanent, and always alert when the DLQ starts growing.

---

### 58) What is the "at least once" delivery problem and how do you handle duplicates?
**Answer:**
- At-least-once delivery means the same message may be delivered more than one time.
- Because of that, consumers must be idempotent, often by using a deduplication key stored in DynamoDB or another durable store.
- Also design side effects to be replay-safe, for example by doing upserts or conditional writes instead of blind inserts.

---

### 59) How does SQS scale with Lambda event source mapping (batch size, concurrency)?
**Answer:**
- Lambda polls SQS for you and invokes the function with batches of messages, so more backlog usually leads to more polling and more concurrency.
- Actual throughput depends on several things together: batch size, batching window, function duration, queue type, and any concurrency limits on the function.
- Use partial batch response support when possible so one failed message in a batch does not cause already successful messages to be retried again.

---

### 60) How do you handle poison messages safely?
**Answer:**
- A poison message is a message that keeps failing and will probably never succeed without intervention.
- Handle it by keeping retries bounded with visibility timeout and `maxReceiveCount`, then sending it to a DLQ for quarantine.
- Also validate schema and basic rules early so obviously bad messages fail fast before they trigger expensive downstream work.

---

### 61) What is message retention and when would you change it?
**Answer:**
- Message retention is how long SQS keeps a message before it expires automatically.
- Increase retention when consumers may be down for longer periods or when you want more recovery and replay time.
- Reduce it only when you have a clear requirement for faster expiration or stricter data minimization.

---

### 62) Batching: pros/cons for SendMessageBatch/ReceiveMessage.
**Answer:**
- Batching improves efficiency because you make fewer API calls and can get better throughput at lower cost.
- The tradeoff is that failures become more complex, because one bad item can affect the whole batch if your code or retry logic is not careful.
- Tune batch size based on the workload, timeout limits, and how much retry complexity your system can handle cleanly.

---

### 63) FIFO deduplication: content-based dedup vs explicit dedup IDs.
**Answer:**
- With content-based deduplication, SQS hashes the message body and uses that to detect duplicates automatically.
- Explicit deduplication IDs give you more control when two messages are logically the same even if the body is not identical.
- The deduplication window is limited, so you should still make consumers idempotent instead of trusting deduplication alone.

---

### 64) Scenario: Processing spikes cause backlog growth. How do you increase throughput safely?
**Answer:**
- Start by increasing consumer throughput, usually by raising Lambda concurrency and tuning batch size carefully.
- At the same time, reduce per-message work so each invocation finishes faster and creates more throughput from the same compute.
- Do not forget downstream protection: scale databases or APIs if needed, add rate limiting or backoff, and watch `ApproximateAgeOfOldestMessage` as your main backlog health signal.

```text
Spike -> Queue depth up -> AgeOfOldest up
Fix path:
  1) Raise consumer concurrency
  2) Tune batch/window
  3) Protect downstream with rate limits/backoff
```

---

## 6) S3 (65-76)

Simple view: S3 is object storage, so most interview questions are really about durability, access control, encryption, lifecycle management, and safe file-upload patterns.

### 65) Explain S3 consistency model (reads-after-writes, overwrites, deletes) in modern S3.
**Answer:**
- Modern S3 gives strong consistency for object writes, deletes, and list operations.
- In simple terms, once S3 confirms a write or delete, a later read or list should show the latest result instead of stale data.
- You still use versioning and application-level safeguards when multiple writers may update the same object, because consistency does not remove overwrite risk.

---

### 66) Bucket policies vs IAM policies - how are they different?
**Answer:**
- An IAM policy is attached to an identity such as a user, role, or group and says what that identity can do.
- A bucket policy is attached directly to the S3 bucket and says who can access that bucket, including principals from other AWS accounts.
- Actual access is decided by combining the relevant allows and denies, with any explicit deny always winning.

---

### 67) What is the difference between SSE-S3, SSE-KMS, and SSE-C (when to use what)?
**Answer:**
- `SSE-S3` is the simplest option because S3 encrypts the object with AWS-managed keys for you.
- `SSE-KMS` uses AWS KMS keys, which gives you better auditability, tighter access control, and is usually the preferred option for regulated or security-sensitive workloads.
- `SSE-C` means the customer provides the encryption key with each request, which is powerful but operationally harder, so it is used only in niche cases.

---

### 68) Versioning: what problems does it solve and what costs does it add?
**Answer:**
- Versioning protects you from accidental overwrites and deletes because older object versions are kept instead of being lost immediately.
- It also helps with recovery, rollback, replication, and basic audit needs because you can see or restore earlier versions.
- The tradeoff is higher storage cost, since old versions and delete markers continue to exist until you clean them up.

---

### 69) Lifecycle rules: common patterns (transition to IA/Glacier, expire objects).
**Answer:**
- Lifecycle rules automate storage management based on age or other conditions.
- Common patterns are moving old objects to cheaper storage classes like Infrequent Access or Glacier, and expiring temporary files or logs after a retention period.
- If versioning is enabled, also add rules to clean up old noncurrent versions so storage cost does not grow forever.

---

### 70) Presigned URLs: how do they work and what are the security considerations?
**Answer:**
- A presigned URL gives temporary permission for one specific S3 action, such as uploading or downloading a particular object.
- It works by embedding a signature and expiration time into the URL, so the caller can use that temporary permission without having your AWS credentials.
- Keep the expiry short, scope it to the exact key and action, require HTTPS, and still validate upload limits like file size and type.

---

### 71) How do you secure public access (Block Public Access + policies)?
**Answer:**
- The safest baseline is to enable Block Public Access at both the account and bucket level.
- Then use bucket policies only for the specific access you really intend, with clear principals, resources, and conditions.
- Add AWS Config or Security Hub checks so accidental public exposure is detected quickly instead of being discovered late.

---

### 72) S3 event notifications: what can trigger them and where can they deliver (SNS/SQS/Lambda)?
**Answer:**
- S3 can emit events for actions such as object creation and removal, and you can filter them by prefix or suffix.
- Those events can be delivered to SQS, SNS, Lambda, or routed through EventBridge patterns depending on the design.
- Always assume at-least-once and unordered delivery, so downstream consumers should be idempotent.

---

### 73) Multipart upload: when do you need it and what failures can occur?
**Answer:**
- Multipart upload is the preferred approach for large files because it is more reliable and allows uploads to happen in parts, often in parallel.
- If something fails, you may end up with incomplete uploads, retried parts, or orphaned parts that still cost money.
- Use lifecycle rules to abort incomplete multipart uploads automatically so failed upload attempts do not leak storage cost.

---

### 74) What is CRR (cross-region replication) and when is it required?
**Answer:**
- Cross-Region Replication (CRR) copies S3 objects asynchronously into another AWS Region.
- Teams use it for disaster recovery, compliance, lower-latency local access, or data sovereignty requirements.
- It requires versioning and the right IAM and KMS permissions, especially when encrypted objects are involved.

---

### 75) S3 CORS: common config mistakes and how to debug.
**Answer:**
- The most common S3 CORS problems are allowing the wrong origin, forgetting a needed method or header, missing exposed headers, or using a wildcard with credentials.
- The fastest way to debug is to inspect the browser's preflight request and the actual response headers in developer tools.
- Keep CORS rules as small and environment-specific as possible so they are easier to reason about and less likely to overexpose access.

---

### 76) Scenario: You store user uploads. How do you prevent malware uploads and enforce file size/type?
**Answer:**
- A common safe pattern is to use a presigned POST or presigned URL with policy constraints such as allowed file size and content type.
- After upload, trigger an asynchronous scan pipeline, for example `S3 -> SQS -> malware scanner`, so the file is checked before normal use.
- Keep unsafe files in quarantine, mark clean files clearly, and serve only from a trusted clean location or prefix.

```text
Client -> Presigned Upload -> S3 (incoming/)
S3 Event -> SQS -> Scanner
  |- clean  -> move to S3 (clean/)
  |- infected -> quarantine/alert
```

---
## 7) Secrets Manager (77-86)

Simple view: Secrets Manager is for storing and rotating sensitive values like database passwords and API tokens. Focus on access control, rotation, caching, and avoiding secret leakage in logs.

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

Simple view: CloudWatch is AWS's main observability layer. Think in terms of metrics, logs, alarms, dashboards, and how to turn noisy signals into useful operational alerts.

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

Simple view: Cognito is about user sign-in, token issuance, and identity federation. The common interview themes are user pools, identity pools, JWT tokens, hosted UI, and securing downstream APIs.

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

Simple view: IAM answers become easier if you explain them in one order: who is calling, what policy applies, what resource is being accessed, and whether there is any explicit deny.

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

Simple view: DynamoDB interview questions are mostly data-modeling questions. Start from access patterns, then explain keys, indexes, capacity, hot partitions, and idempotent write patterns.

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

Simple view: RDS is the managed relational database option in AWS. The main topics are availability, backups, scaling, connection handling, performance tuning, and when SQL is a better fit than NoSQL.

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

Simple view: These scenario questions test how well you connect multiple AWS services together. Good answers usually explain request flow, failure handling, idempotency, security, and observability.

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



## 13) ECS (173-182)

Simple view: ECS is AWS container orchestration without managing Kubernetes. Keep the discussion around launch type choice, task definitions, deployments, autoscaling, networking, and debugging failed tasks.

### 173) ECS on Fargate vs EC2 - tradeoffs (cost, control, scaling, networking)?
**Answer:**
- Fargate removes node management and gives fast onboarding, but usually costs more at steady high utilization.
- EC2 gives more control (instance types, daemons, host tuning) and can be cheaper with reserved/spot capacity.
- Choose Fargate for low-ops isolation; choose EC2 when you need deep control, special hardware, or tighter unit economics.

---

### 174) Explain ECS task definition: container defs, env vars, secrets, CPU/memory, logging.
**Answer:**
- Task definitions declare image, command, ports, health check, and resource limits at task/container level.
- Put non-secret config in env vars; inject secrets from Secrets Manager/SSM via task definition references.
- Configure logging driver (`awslogs`/FireLens), task role, and execution role explicitly.

---

### 175) How do ECS services maintain desired count and replace unhealthy tasks?
**Answer:**
- ECS scheduler continuously reconciles running tasks to the service `desiredCount`.
- Unhealthy tasks are detected from container checks, ELB target health, or task stop events and then replaced.
- Placement strategies, deployment config, and AZ spread determine where replacements launch.

---

### 176) How do you set up autoscaling in ECS (target tracking on CPU/memory/ALB requests)?
**Answer:**
- Use Application Auto Scaling with target tracking policies on ECS service metrics (CPU, memory, ALB requests/target).
- Define min/max desired tasks and cooldowns to avoid oscillation.
- Ensure compute capacity can grow too (capacity providers or cluster autoscaling), or scale-out will stall.

---

### 177) How do you do rolling deployments in ECS and avoid downtime?
**Answer:**
- Tune `minimumHealthyPercent` and `maximumPercent` so old and new tasks overlap during rollout.
- Use readiness/health checks plus graceful shutdown so connections drain before stop.
- For higher safety, use CodeDeploy blue/green with alarm-based automatic rollback.

---

### 178) How do you wire ALB -> ECS and configure health checks properly?
**Answer:**
- Attach service to an ALB target group (IP targets for `awsvpc`) and route listener rules to that group.
- Expose a fast, dependency-light health endpoint and tune interval/timeout/thresholds for your startup profile.
- Restrict task security group ingress to ALB security group only.

---

### 179) Explain ECS networking modes and security groups with awsvpc.
**Answer:**
- `awsvpc` assigns each task its own ENI/IP/security groups (required for Fargate).
- `bridge` and `host` are EC2-focused modes with different port-mapping and isolation tradeoffs.
- With `awsvpc`, design SG rules per service and watch subnet IP/ENI limits under scale.

---

### 180) How do you run background jobs/cron on ECS (scheduled tasks)?
**Answer:**
- Use EventBridge Scheduler/Rules to trigger `RunTask` on cron or rate expressions.
- Keep scheduled jobs idempotent, because retries and duplicate triggers can happen.
- For continuous background processing, run worker services consuming SQS.

---

### 181) How do you store container logs (CloudWatch Logs, FireLens) and debug production incidents?
**Answer:**
- Send logs to CloudWatch Logs for baseline observability; use structured JSON for fast querying.
- Use FireLens when you need multi-destination routing or advanced log enrichment.
- During incidents, correlate task/service events, container exit codes, deployment IDs, and app traces.

---

### 182) Common ECS failures (image pull, IAM, networking, task exits) - how do you identify root cause?
**Answer:**
- Check ECS service events first for pull auth failures, missing image tags, or placement/capacity errors.
- Validate execution role permissions (ECR/logs) and task role permissions (app AWS calls).
- Inspect stopped task reason, container logs, and VPC path (SG/NACL/DNS/NAT/endpoints) for network-driven failures.

---

## 14) EKS (183-192)

Simple view: EKS means AWS manages the Kubernetes control plane, but you still own most workload operations such as nodes, networking, security, scaling, and application rollout.

### 183) EKS architecture: control plane vs worker nodes - what does AWS manage?
**Answer:**
- AWS manages control plane components (API server/etcd availability, patching, control plane scaling).
- You manage worker compute (managed nodes, self-managed nodes, or Fargate profiles), add-ons, and workloads.
- Security, RBAC, network policy, and observability are still customer responsibilities.

---

### 184) Managed node groups vs self-managed nodes vs Fargate on EKS - when to use what?
**Answer:**
- Managed node groups are default for most teams: easier lifecycle, patching, and rolling upgrades.
- Self-managed nodes are for advanced customization (custom AMIs/bootstrap flags/special hardware needs).
- EKS on Fargate fits pod-level isolation and no-node-ops use cases, with feature/cost constraints to validate.

---

### 185) How does Kubernetes scheduling work (requests/limits, taints/tolerations, affinity)?
**Answer:**
- Scheduler places pods based on requested CPU/memory and node availability.
- Limits cap runtime usage; bad request sizing causes either waste or unschedulable pods.
- Taints/tolerations, affinity/anti-affinity, and topology rules shape placement for isolation and resilience.

---

### 186) How do you expose services: ClusterIP vs NodePort vs LoadBalancer vs Ingress?
**Answer:**
- `ClusterIP`: internal-only service access inside cluster.
- `NodePort`/`LoadBalancer`: external exposure at L4; `LoadBalancer` auto-provisions cloud LB.
- `Ingress`: L7 routing (host/path/TLS) via ingress controller, typically for multiple HTTP services.

---

### 187) What is the AWS Load Balancer Controller and why do teams use it?
**Answer:**
- It watches Kubernetes resources and provisions ALB/NLB resources automatically via AWS APIs.
- Enables managed ingress with host/path routing, TLS via ACM, and WAF integration.
- Reduces manual LB drift and keeps infra changes declarative in Kubernetes manifests.

---

### 188) How do you handle secrets in EKS (KMS, Sealed Secrets, external secrets)?
**Answer:**
- Source secrets from Secrets Manager/SSM encrypted with KMS, then project into pods via operators/CSI drivers.
- Avoid plaintext secrets in Git; for GitOps, use encrypted manifests (for example Sealed Secrets/SOPS patterns).
- Lock down access using namespace scoping, RBAC, and least-privilege IAM roles.

---

### 189) Explain IAM Roles for Service Accounts (IRSA) and why it matters.
**Answer:**
- IRSA maps a Kubernetes service account to a dedicated IAM role through OIDC federation.
- It removes dependency on broad node IAM roles and avoids static credentials in pods.
- This enables per-workload least privilege and clearer CloudTrail attribution.

---

### 190) How do you implement autoscaling in EKS (HPA, Cluster Autoscaler/Karpenter)?
**Answer:**
- HPA scales pod replicas using resource/custom metrics.
- Cluster Autoscaler or Karpenter scales node capacity when pods are pending.
- Right-size requests/limits first; otherwise autoscaling decisions will be inaccurate.

---

### 191) How do you do zero-downtime deployments in Kubernetes (readiness/liveness, rolling updates)?
**Answer:**
- Use correct readiness probes so traffic only reaches pods that are truly ready.
- Configure rolling updates (`maxUnavailable`, `maxSurge`) to maintain serving capacity during rollout.
- Add graceful termination (`preStop`, termination grace period) and PodDisruptionBudgets.

---

### 192) Typical EKS issues (DNS, CNI, pod networking, image pulls) - debugging approach?
**Answer:**
- Start with `kubectl describe` events and pod/node status to isolate scheduling vs runtime failures.
- Check CoreDNS and VPC CNI health for DNS/IP exhaustion/network attachment issues.
- For image pulls, verify ECR auth/permissions, registry reachability, and node-level network egress.

---

## 15) AWS Glue (193-198)

Simple view: Glue is managed data pipeline tooling. The easy way to answer is: catalog schema, transform data, optimize cost and performance, and secure access to the data paths.

### 193) What problems does AWS Glue solve in data engineering?
**Answer:**
- Glue provides managed ETL/ELT execution for batch and streaming pipelines.
- It centralizes metadata with Data Catalog for shared schema discovery/governance.
- It reduces operational overhead compared with self-managed Spark clusters for common data workloads.

---

### 194) Glue Crawler vs Glue Job - when to use which?
**Answer:**
- Crawlers detect schema/partitions and update Data Catalog tables.
- Jobs execute transformation logic and write curated outputs.
- Typical flow: crawl raw zone, run jobs for cleansing/enrichment, publish curated datasets.

---

### 195) Glue DynamicFrames vs Spark DataFrames - differences and tradeoffs.
**Answer:**
- DynamicFrames are schema-flexible and handle semi-structured inconsistencies better.
- DataFrames are usually faster and have richer Spark SQL/function support.
- Common pattern: ingest with DynamicFrame, convert to DataFrame for heavy transforms.

---

### 196) How do you handle schema evolution with Glue + Data Catalog?
**Answer:**
- Use partition-aware crawls and controlled table updates for additive schema changes.
- For breaking changes, version tables/contracts instead of silently mutating shared schemas.
- Add validation checks in jobs to fail fast when producer schema drifts unexpectedly.

---

### 197) How do you optimize Glue jobs (DPUs, partitioning, pushdown predicates)?
**Answer:**
- Reduce data scanned using partition pruning and pushdown predicates.
- Right-size workers/DPUs and use job bookmarks for incremental processing.
- Store outputs in columnar formats (Parquet/ORC) with reasonable file sizes.

---

### 198) How do you secure Glue (IAM, KMS, VPC endpoints, data access controls)?
**Answer:**
- Apply least-privilege IAM for crawlers/jobs and scoped data-path permissions.
- Encrypt source/target/temp data and catalog artifacts with KMS.
- Run jobs in VPC with private connectivity/endpoints when accessing private data stores.

---

## 16) Redshift (199-203)

Simple view: Redshift is for analytics, not transactions. Focus on columnar storage, bulk loading, distribution and sort keys, query tuning, and security.

### 199) Redshift vs RDS/Aurora - when is Redshift the right choice?
**Answer:**
- Redshift is a columnar MPP warehouse optimized for analytics over large datasets.
- RDS/Aurora are OLTP relational databases optimized for transactional workloads.
- Choose Redshift for BI/reporting workloads with heavy scans, aggregations, and concurrency at scale.

---

### 200) What are distribution styles/keys and sort keys - why do they matter?
**Answer:**
- Distribution determines how rows are spread across nodes, affecting join/shuffle cost.
- Sort keys determine on-disk ordering and improve range filtering and compression.
- Correct dist/sort design is one of the highest-leverage factors for query performance.

---

### 201) How do you load data efficiently into Redshift (COPY, S3, compression)?
**Answer:**
- Stage data in S3 and use `COPY` with compressed, well-sized files.
- Avoid many tiny files; parallelism is best with multiple moderately large objects.
- Use proper IAM role access and run post-load statistics updates.

---

### 202) How do you optimize query performance (VACUUM/ANALYZE, WLM, concurrency scaling)?
**Answer:**
- Keep table stats fresh with `ANALYZE`; use `VACUUM` strategy as needed for table maintenance.
- Tune WLM/query priorities to isolate heavy queries from latency-sensitive workloads.
- Use concurrency scaling and monitor skew/spill in execution plans for targeted fixes.

---

### 203) How do you secure Redshift (networking, IAM auth, encryption)?
**Answer:**
- Place clusters in private subnets and restrict access via tight security group rules.
- Prefer IAM-based temporary credentials/federation over long-lived passwords where possible.
- Enable encryption at rest (KMS) and enforce TLS in transit.

---

## 17) EMR (204-208)

Simple view: EMR is managed big-data compute when you need more Spark or Hadoop control than Glue gives you. Common topics are cluster type, cost control, scaling, and job debugging.

### 204) What is EMR and when would you choose it over Glue?
**Answer:**
- EMR is managed big-data compute for frameworks like Spark, Hive, and Hadoop.
- Choose EMR when you need deep cluster/framework tuning or long-running custom workloads.
- Choose Glue when serverless managed ETL is enough and minimal ops is a priority.

---

### 205) EMR cluster types: transient vs long-running - use cases.
**Answer:**
- Transient clusters run a pipeline then terminate, good for scheduled batch cost control.
- Long-running clusters fit interactive analytics, notebooks, and frequent ad-hoc jobs.
- Pick based on workload frequency, startup tolerance, and operational model.

---

### 206) How do you manage scaling and cost on EMR (Spot, autoscaling, instance fleets)?
**Answer:**
- Use instance fleets with a mix of On-Demand and Spot for better price/performance.
- Enable managed scaling/autoscaling based on YARN and workload metrics.
- Add checkpointing and interruption-aware design so Spot reclaim events do not lose progress.

---

### 207) How do you troubleshoot Spark jobs on EMR (logs, YARN UI, executor memory)?
**Answer:**
- Review Spark History Server and YARN UI to locate stage failures, skew, spills, and retries.
- Check driver/executor logs for OOM, GC pressure, and serialization issues.
- Tune executor memory/cores/partitions and retest on representative data.

---

### 208) How do you integrate EMR with S3, Glue Data Catalog, and IAM securely?
**Answer:**
- Use EMRFS with least-privilege IAM roles and controlled S3 path permissions.
- Configure Glue Data Catalog as metastore for consistent schema sharing.
- Protect data paths with KMS encryption and private network connectivity where required.

---

## 18) AWS KMS (209-222)

Simple view: KMS is the key-management layer behind encryption across AWS. The main ideas are key policy vs IAM, envelope encryption, grants, cross-account use, and avoiding throttling.

### 209) What is AWS KMS and what problems does it solve in cloud security?
**Answer:**
- KMS is a managed key management service used by applications and AWS services.
- It centralizes key lifecycle controls, access policy, audit trails, and cryptographic operations.
- It simplifies secure encryption patterns without teams running their own HSM infrastructure.

---

### 210) What's the difference between AWS-managed keys and customer-managed keys (CMK)?
**Answer:**
- AWS-managed keys are created/managed by AWS services with limited policy control.
- Customer-managed keys give you full control over policy, rotation, grants, disable/delete, and sharing.
- Use customer-managed keys when compliance, tenancy boundaries, or cross-account control matters.

---

### 211) What's the difference between KMS key policy and IAM policy for KMS access? Which one is required?
**Answer:**
- Key policy is mandatory and is the primary authorization layer on the key resource.
- IAM policy can allow use only when key policy also permits IAM principals.
- In practice, both are often used together for least-privilege and operational flexibility.

---

### 212) Explain envelope encryption. Where does KMS fit in this flow?
**Answer:**
- KMS generates/protects data keys, while data is encrypted/decrypted by your app or service locally.
- `GenerateDataKey` returns plaintext key (for immediate use) plus encrypted key blob (for storage).
- Later, `Decrypt` unwraps the encrypted data key so data can be read.

---

### 213) What is the difference between Encrypt/Decrypt vs GenerateDataKey APIs?
**Answer:**
- `Encrypt/Decrypt` is for small payloads directly through KMS crypto operations.
- `GenerateDataKey` is for high-volume envelope encryption where data is encrypted outside KMS.
- Data key workflows usually scale better and reduce KMS API overhead for large data.

---

### 214) What is a KMS alias, and why do teams prefer alias-based references in code/IaC?
**Answer:**
- An alias is a stable friendly name that points to a KMS key.
- Code/IaC can reference alias names instead of hardcoded key IDs.
- This allows key replacement/rotation workflows with less application change.

---

### 215) What is key rotation in KMS (automatic vs manual), and what changes for apps?
**Answer:**
- Automatic rotation rotates key material for supported symmetric keys on a schedule.
- Manual rotation typically means creating a new key and migrating encryption over time.
- Most apps continue working without decrypt breakage, but governance and migration processes must be planned.

---

### 216) How do you use KMS with S3 SSE-KMS and what permissions are needed for read/write?
**Answer:**
- Writes need S3 object permissions plus KMS permissions like `kms:Encrypt`/`kms:GenerateDataKey`.
- Reads need S3 read permissions plus `kms:Decrypt` on the same key.
- Align bucket policy, IAM policy, and key policy to the same principals and conditions.

---

### 217) Common causes of AccessDeniedException for KMS in Lambda/ECS/EKS - how do you debug?
**Answer:**
- Confirm the runtime principal (assumed role/service account role) and requested key ARN/region.
- Validate key policy, IAM policy, permissions boundaries, and SCPs for explicit denies.
- Check encryption context/service conditions and CloudTrail events to find the failed decision point.

---

### 218) What are KMS grants, and when would you use grants instead of key policy changes?
**Answer:**
- Grants are scoped permissions on a key, often short-lived and service-driven.
- They are useful for high-churn delegation without repeatedly editing key policies.
- Use them when temporary/runtime access delegation is needed with clear revocation control.

---

### 219) What is cross-account KMS access? How do you design it safely?
**Answer:**
- Cross-account use requires key policy in owner account and IAM allow in caller account.
- Grant only required actions (`Encrypt`, `Decrypt`, `GenerateDataKey`) and specific principals.
- Add conditions and monitoring to prevent broad, persistent cross-account blast radius.

---

### 220) How do you handle KMS in multi-region scenarios (multi-region keys, replication, DR planning)?
**Answer:**
- Multi-region keys provide related key material in multiple regions for lower-latency decrypt and DR.
- Pair key strategy with data replication design (S3, DynamoDB global tables, database replicas).
- Test failover paths end-to-end so decrypt/reencrypt behavior is verified before incidents.

---

### 221) What's the difference between KMS and CloudHSM (when would EY expect CloudHSM)?
**Answer:**
- KMS is fully managed and integrated broadly with AWS services.
- CloudHSM provides dedicated HSM control and custom crypto capabilities with more operational overhead.
- Choose CloudHSM for strict regulatory/key-custody requirements or custom cryptographic needs.

---

### 222) What are KMS quotas/limits (API rate limits, request patterns) and how can apps avoid throttling?
**Answer:**
- KMS enforces per-region request quotas and can throttle bursty usage patterns.
- Reduce call volume with envelope encryption, data key reuse/caching, and batching patterns.
- Implement retries with exponential backoff + jitter and monitor throttling signals proactively.

---
