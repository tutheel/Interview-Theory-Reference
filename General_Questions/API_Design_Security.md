# API Design & Security Interview Questions

1. What defines RESTful architecture?
   **Answer:** REST is an API style based on resources, standard HTTP methods, and stateless client-server interactions through a uniform interface.
2. What are REST constraints?
   **Answer:** Client-server, statelessness, cacheability, uniform interface, layered system, and optional code-on-demand.
3. What is statelessness?
   **Answer:** Each request carries all required context, so the server does not store client session state between requests.
4. What is resource-based URL design?
   **Answer:** URLs represent nouns (resources), use clear hierarchies, and avoid verb-heavy endpoint naming.
5. What is HATEOAS?
   **Answer:** Hypermedia links in responses guide clients on valid next actions dynamically.
6. What is idempotency in APIs?
   **Answer:** Repeating the same request produces the same server-side effect as sending it once.
7. Why is GET idempotent?
   **Answer:** GET should only read data, so repeated calls do not change resource state.
8. Why is POST not idempotent?
   **Answer:** POST often creates new resources or triggers actions, so repeats can cause additional effects.
9. How to make POST idempotent?
   **Answer:** Use an idempotency key and store the first result so duplicates return the same response.
10. What is API versioning strategy?
   **Answer:** A plan to introduce changes safely using explicit versions, compatibility rules, and deprecation timelines.
11. URL vs header versioning?
   **Answer:** URL versioning is explicit and cache-friendly; header versioning keeps URLs clean but is less visible.
12. What is backward compatibility?
   **Answer:** New API changes do not break existing clients built against older behavior.
13. What is forward compatibility?
   **Answer:** Older clients keep working when newer API responses add non-breaking fields.
14. What is pagination strategy?
   **Answer:** Return large collections in pages using limits and continuation tokens with metadata.
15. Offset vs cursor pagination?
   **Answer:** Offset is simple but can drift and slow on big data; cursor is stable and faster at scale.
16. What is filtering strategy?
   **Answer:** Use validated query parameters to restrict result sets by allowed fields/operators.
17. What is sorting strategy?
   **Answer:** Support controlled sort fields and direction, with sensible defaults and indexed columns.
18. What is API rate limiting?
   **Answer:** Restrict request volume per key/user/IP over time windows to protect capacity.
19. Token bucket algorithm?
   **Answer:** Tokens refill at a fixed rate, and each request spends a token until the bucket is empty.
20. Sliding window rate limit?
   **Answer:** Counts requests in a rolling time window for smoother limit enforcement than fixed windows.
21. What is API throttling?
   **Answer:** Deliberately slowing or rejecting requests when traffic exceeds configured thresholds.
22. What is JWT?
   **Answer:** A compact, signed token carrying claims for identity and authorization.
23. JWT structure?
   **Answer:** Three Base64URL parts: header, payload, and signature.
24. What is JWT signature?
   **Answer:** A cryptographic digest that proves token integrity and issuer authenticity.
25. What is JWT expiration?
   **Answer:** The `exp` claim defines when a token is no longer valid.
26. How to rotate JWT secret?
   **Answer:** Use key IDs, support overlap for old/new keys, then retire old keys after migration.
27. What is refresh token?
   **Answer:** A longer-lived credential used to obtain new short-lived access tokens.
28. What is OAuth2?
   **Answer:** A delegation framework that lets apps access resources on a user's behalf.
29. OAuth2 flows?
   **Answer:** Common flows are authorization code with PKCE, client credentials, device code, and refresh token.
30. What is client credentials flow?
   **Answer:** Machine-to-machine OAuth flow where an app uses its own credentials for access.
31. What is authorization code flow?
   **Answer:** User authenticates and consents, then client exchanges code for tokens securely.
32. What is PKCE?
   **Answer:** Proof Key for Code Exchange protects authorization code flow for public clients.
33. What is RBAC?
   **Answer:** Role-Based Access Control grants permissions through assigned roles.
34. What is ABAC?
   **Answer:** Attribute-Based Access Control uses attributes and policies for fine-grained decisions.
35. What is scope?
   **Answer:** A token permission string limiting what actions and resources are allowed.
36. What is API key?
   **Answer:** A static credential identifying and authenticating an application or client.
37. API key vs OAuth?
   **Answer:** API keys are simpler app credentials; OAuth supports delegated user auth and scoped access.
38. What is CORS?
   **Answer:** Browser security mechanism controlling which origins can access cross-origin resources.
39. Preflight request?
   **Answer:** An OPTIONS request browsers send to verify cross-origin method/header permissions.
40. What is CSRF?
   **Answer:** An attack that tricks an authenticated browser into sending unintended state-changing requests.
41. How to prevent CSRF?
   **Answer:** Use CSRF tokens, SameSite cookies, and Origin/Referer validation.
42. What is XSS?
   **Answer:** Injection of malicious scripts into trusted web pages viewed by users.
43. How to prevent XSS?
   **Answer:** Context-aware output encoding, input sanitization, and Content Security Policy.
44. What is SQL injection?
   **Answer:** Injecting malicious SQL through input to alter or access unauthorized data.
45. How to prevent SQL injection?
   **Answer:** Use parameterized queries, avoid string-concatenated SQL, and enforce validation.
46. What is input validation?
   **Answer:** Ensuring incoming data matches expected format, type, range, and business rules.
47. What is schema validation?
   **Answer:** Programmatically validating payloads against a defined schema contract.
48. What is output encoding?
   **Answer:** Escaping output by rendering context to prevent script or markup injection.
49. What is content-type validation?
   **Answer:** Accept only expected media types and reject mismatched or ambiguous content types.
50. What is HMAC validation?
   **Answer:** Verifying message integrity/authenticity by recomputing and comparing an HMAC signature.
51. What is webhook signature verification?
   **Answer:** Validate provider-signed raw payload with shared secret and constant-time signature comparison.
52. What is HTTPS?
   **Answer:** HTTP over TLS providing encrypted, authenticated, tamper-resistant communication.
53. What is TLS handshake?
   **Answer:** Negotiation phase where peers authenticate and establish session encryption keys.
54. What is certificate chain?
   **Answer:** Trust path from server certificate through intermediates to a trusted root CA.
55. What is mTLS?
   **Answer:** Mutual TLS where both server and client present certificates for authentication.
56. What is API gateway?
   **Answer:** A front-door service handling routing, auth, limits, transformations, and observability.
57. What is API documentation?
   **Answer:** Clear reference describing endpoints, schemas, auth, examples, and error behavior.
58. What is OpenAPI spec?
   **Answer:** A standard machine-readable format describing REST API contracts.
59. What is Swagger?
   **Answer:** Tooling ecosystem for OpenAPI, including UI docs and code generation.
60. What is contract-first API?
   **Answer:** Define API schema first, then implement and test against that contract.
61. What is consumer-driven contract?
   **Answer:** Consumers define expected interactions, and providers verify compatibility continuously.
62. What is API mocking?
   **Answer:** Simulating API behavior for development/testing before real backend readiness.
63. What is health endpoint?
   **Answer:** Endpoint indicating basic service status (for example, process is running).
64. What is readiness endpoint?
   **Answer:** Endpoint indicating the app can handle live traffic and dependencies are ready.
65. What is liveness endpoint?
   **Answer:** Endpoint indicating the process is alive; failure usually triggers restart.
66. What is caching header?
   **Answer:** HTTP header controlling client/proxy cache behavior and freshness.
67. What is ETag?
   **Answer:** Opaque resource version identifier used for cache validation and concurrency control.
68. What is If-None-Match?
   **Answer:** Conditional header that returns `304 Not Modified` when ETag matches.
69. What is cache-control?
   **Answer:** Header directives like `max-age`, `no-cache`, and `no-store` controlling caching policy.
70. What is CDN caching?
   **Answer:** Storing responses at edge locations to reduce latency and origin load.
71. What is compression?
   **Answer:** Reducing payload size to improve transfer speed and bandwidth usage.
72. What is gzip?
   **Answer:** Widely supported lossless compression algorithm for HTTP payloads.
73. What is brotli?
   **Answer:** Modern compression with better ratios than gzip in many web scenarios.
74. What is request tracing?
   **Answer:** Tracking a request across services using shared trace context.
75. What is correlation ID?
   **Answer:** A unique request identifier propagated through logs and services.
76. What is structured error response?
   **Answer:** Consistent JSON error object with fields like code, message, and details.
77. What is consistent error format?
   **Answer:** Standardized error schema across endpoints for predictable client handling.
78. What is 400 vs 422?
   **Answer:** `400` is malformed request syntax; `422` is valid syntax with semantic validation errors.
79. What is 401 vs 403?
   **Answer:** `401` means authentication missing/invalid; `403` means authenticated but not authorized.
80. What is 429 status?
   **Answer:** `429 Too Many Requests` signals rate limit exceeded.
81. What is 503 retry-after?
   **Answer:** Temporary unavailability response where `Retry-After` indicates when to retry.
82. What is circuit breaker?
   **Answer:** Pattern that opens after failures to prevent repeated calls to unhealthy dependencies.
83. What is bulkhead pattern?
   **Answer:** Resource isolation pattern preventing one failing component from exhausting shared capacity.
84. What is API timeout?
   **Answer:** Maximum time allowed for an API call before aborting.
85. What is exponential backoff?
   **Answer:** Retry strategy increasing delay exponentially between attempts.
86. What is retry idempotency?
   **Answer:** Safe retries require idempotent operations or idempotency keys to avoid duplicate effects.
87. What is optimistic concurrency control?
   **Answer:** Update only if current version matches expected version to prevent lost updates.
88. What is If-Match header?
   **Answer:** Conditional header requiring matching ETag before update/delete is applied.
89. What is multi-tenant API?
   **Answer:** A shared API serving multiple customers (tenants) with tenant-aware access.
90. What is tenant isolation?
   **Answer:** Controls ensuring tenants cannot access each other’s data or resources.
91. What is rate limiting per user?
   **Answer:** Applying quotas keyed to authenticated user identity.
92. What is rate limiting per IP?
   **Answer:** Applying quotas keyed to source IP address.
93. What is API abuse detection?
   **Answer:** Identifying malicious/anomalous behavior and triggering blocks, challenges, or throttling.
94. What is audit logging?
   **Answer:** Tamper-resistant records of who did what, when, and from where.
95. What is PII handling?
   **Answer:** Classify, minimize, protect, and govern personal data across its lifecycle.
96. What is data masking?
   **Answer:** Hiding sensitive data partially or fully in logs, UIs, and non-prod environments.
97. What is encryption at rest?
   **Answer:** Encrypting stored data in databases, disks, or backups.
98. What is encryption in transit?
   **Answer:** Encrypting data while moving between clients, services, and databases.
99. What is secret rotation?
   **Answer:** Periodically replacing credentials/keys to reduce exposure risk.
100. What is API schema evolution?
   **Answer:** Introducing contract changes gradually using additive updates and compatibility controls.
101. What is API deprecation policy?
   **Answer:** Formal process to announce, sunset, and remove old API behavior safely.
102. What is semantic versioning?
   **Answer:** Versioning as `MAJOR.MINOR.PATCH` for breaking, feature, and fix changes.
103. What is API gateway throttling?
   **Answer:** Gateway-enforced rate/concurrency limits before requests hit backend services.
104. What is load balancing?
   **Answer:** Distributing traffic across instances to improve availability and throughput.
105. What is failover strategy?
   **Answer:** Automatic traffic switch to healthy backups after primary failure.
106. What is API SLA?
   **Answer:** External service-level commitment for availability, performance, and support.
107. What is SLA monitoring?
   **Answer:** Measuring service metrics continuously against SLA commitments.
108. What is API SLO?
   **Answer:** Internal reliability target (for example p99 latency or uptime objective).
109. What is SLA breach handling?
   **Answer:** Detect breach, communicate impact, mitigate quickly, and apply agreed remedies.
110. What is client-side validation?
   **Answer:** Early input checks in UI for better user experience.
111. What is server-side validation?
   **Answer:** Authoritative validation on backend regardless of client behavior.
112. What is API observability?
   **Answer:** Ability to understand system state through metrics, logs, traces, and events.
113. What is distributed tracing?
   **Answer:** Following request spans across microservices to find bottlenecks/failures.
114. What is logging best practice?
   **Answer:** Use structured logs with context, redact secrets, and retain searchable events.
115. What is API security testing?
   **Answer:** Testing APIs for auth flaws, injections, misconfigurations, and logic vulnerabilities.
116. What is penetration testing?
   **Answer:** Authorized real-world attack simulation to uncover exploitable weaknesses.
117. What is threat modeling?
   **Answer:** Systematic identification of threats, attack paths, and mitigations in design.
118. What is OWASP Top 10?
   **Answer:** A prioritized list of common and critical web application security risks.
119. What is SSRF?
   **Answer:** Server-Side Request Forgery where attacker controls server outbound requests.
120. What is file upload validation?
   **Answer:** Validate file type/size/content, scan malware, and store uploads safely.
121. What is size limit enforcement?
   **Answer:** Reject requests/files exceeding defined size limits to protect resources.
122. What is pagination performance?
   **Answer:** Performance impact of paging approach; optimized with indexes, cursors, and bounded page sizes.
123. What is GraphQL vs REST?
   **Answer:** GraphQL uses a flexible query schema endpoint; REST uses multiple resource endpoints and HTTP semantics.
124. What is GraphQL security risk?
   **Answer:** Risks include deep/expensive queries, broken auth, introspection abuse, and data overexposure.
125. What is depth limiting?
   **Answer:** Restricting maximum GraphQL query nesting to prevent expensive operations.
126. What is batching requests?
   **Answer:** Combining multiple operations in one network call to reduce round trips.
127. What is API monitoring?
   **Answer:** Continuous tracking of uptime, latency, errors, and dependency health.
128. What is response time metric?
   **Answer:** Latency measure, usually reported as percentiles like p50, p95, and p99.
129. What is SLA alerting?
   **Answer:** Alerts triggered when service indicators approach or violate SLA thresholds.
130. What is API sandbox?
   **Answer:** Isolated environment where developers test integrations safely.
131. What is staging environment?
   **Answer:** Pre-production environment mirroring production for final validation.
132. What is API integration testing?
   **Answer:** Testing interactions between real components, services, and data flows.
133. What is mocking third-party API?
   **Answer:** Replacing external API calls with deterministic mocks for reliable tests.
134. What is contract testing?
   **Answer:** Verifying producer and consumer honor the same interface contract.
135. What is version negotiation?
   **Answer:** Mechanism for client/server to agree on supported API version/capabilities.
136. What is API governance?
   **Answer:** Organization-wide standards, reviews, and policies for API quality/security.
137. What is API gateway authentication?
   **Answer:** Performing token/key/certificate validation at the gateway before routing.
138. What is WAF?
   **Answer:** Web Application Firewall filtering malicious HTTP patterns and attacks.
139. What is API token revocation?
   **Answer:** Invalidating active tokens before expiry via denylist/version checks/introspection.
140. What is API replay attack?
   **Answer:** Reusing a captured valid request/signature/token to repeat an action.
141. What is nonce?
   **Answer:** Single-use random value preventing replay of signed requests.
142. What is rate limiting burst control?
   **Answer:** Allow short traffic spikes while enforcing long-term average request rate.
143. What is service mesh?
   **Answer:** Infrastructure layer managing service-to-service traffic, security, and observability.
144. What is API observability stack?
   **Answer:** Combined tooling for metrics, logs, traces, dashboards, and alerting.
145. What is secure coding practice?
   **Answer:** Development habits and controls that prevent known vulnerability classes.
146. What is dependency vulnerability scan?
   **Answer:** Automated checking of dependencies against known CVEs and advisories.
147. What is API input sanitization?
   **Answer:** Cleaning/normalizing untrusted input to remove unsafe characters or content.
148. What is deserialization attack?
   **Answer:** Exploiting unsafe deserialization to trigger unintended behavior or code execution.
149. What is header validation?
   **Answer:** Enforcing required headers, allowed values, and strict parsing rules.
150. What is idempotency key storage?
   **Answer:** Persisting idempotency keys with request hash/result to deduplicate retries safely.
