**1. How do you mentor juniors?**

Answer: Set clear goals, pair on real tasks, review code with “why + examples,” and increase ownership gradually. Do regular 1:1s with specific feedback and next steps.

**2. How do you review PR?**

Answer: First verify intent + scope, then correctness, edge cases, tests, security/perf risks, and readability. Keep feedback specific and kind; block only on real risk.

**3. How to enforce coding standards?**

Answer: Automate with formatter + lint + typecheck + tests in CI, plus pre-commit hooks. Back it with a short style guide and PR checklist.

**4. How to handle disagreement?**

Answer: Align on goals/constraints, compare options with evidence, and time-box discussion. If still stuck, run a small experiment or escalate to a clear owner.

**5. How to estimate sprint tasks?**

Answer: Break work into small deliverables, include testing/review/release steps, and estimate with unknowns + dependencies. Calibrate using past velocity and add buffer for risk.

**6. How to reduce technical debt?**

Answer: Track debt openly, prioritize by risk and friction, and pay it down continuously (small refactors). Prevent new debt via gates, reviews, and “fix it when you touch it.”

**7. How to conduct architecture review?**

Answer: Validate requirements + non-functionals, review boundaries/data flow/failure modes/security, and end with decisions, risks, and action items.

**8. How to decide refactor vs rebuild?**

Answer: Refactor when the domain is correct but structure is messy; rebuild when fundamentals are wrong and refactor cost is higher. Prefer phased migration (strangler) over big-bang rewrites.

**9. How to improve team velocity?**

Answer: Reduce friction: smaller PRs, faster CI, clearer requirements, fewer handoffs, less context switching. Invest in reusable components and stable priorities.

**10. How to handle missed deadline?**

Answer: Communicate early, reset scope to MVP, publish a revised plan with milestones, and learn via a short retro to fix the real causes.

**11. How to onboard new engineer?**

Answer: Provide a ramp plan, buddy support, one-command setup, and “first good issues.” Make them ship something meaningful in week 1–2.

**12. How to enforce documentation?**

Answer: Make docs part of “Definition of Done” and PR templates. Keep docs lightweight, close to code, and reviewed like code.

**13. How to manage code ownership?**

Answer: Use CODEOWNERS + clear module boundaries, but avoid bottlenecks with shared ownership and rotations. Ensure at least two people can maintain each area.

**14. How to implement CI/CD?**

Answer: Build pipelines: lint/typecheck → tests → security scans → build artifact → deploy with promotions. Use safe rollouts (canary/blue-green) and fast rollback.

**15. How to handle code smell?**

Answer: Add/secure tests first, then refactor in small steps (reduce duplication/complexity). Prevent recurrence with lint rules and review checklist.

**16. How to encourage clean code?**

Answer: Lead by example, favor readability, keep functions small, name things well, and comment “why.” Keep PRs small and standards consistent.

**17. How to conduct design review?**

Answer: Start from requirements + edge cases, review APIs/data model, then failure scenarios, observability, rollout/rollback, and testing plan.

**18. How to evaluate tradeoffs?**

Answer: Compare options on impact, risk, time, cost, complexity, and long-term maintenance. Make assumptions explicit and pick the simplest viable option.

**19. How to manage stakeholder?**

Answer: Translate tech into outcomes (risk, timeline, user impact), share frequent short updates, and surface decisions early with clear options.

**20. How to communicate risk?**

Answer: Be concrete: what can happen, likelihood, impact, and mitigation. Track it, update regularly, and offer scope/time tradeoffs.

**21. How to handle production incident?**

Answer: Stabilize first (mitigate), then diagnose and fix. Communicate status, capture timeline, and follow with RCA + prevention actions.

**22. How to write RCA?**

Answer: Document impact, timeline, root cause, contributing factors, and prevention actions with owners/dates. Keep it blameless and evidence-based.

**23. How to lead incident call?**

Answer: Assign roles (IC/scribe/comms), set the goal (mitigate), time-box updates, and keep a live timeline of actions and outcomes.

**24. How to measure code quality?**

Answer: Use a mix: test health, defect rate, review findings, change failure rate, maintainability signals, and build/CI stability—metrics as signals, not weapons.

**25. How to handle performance regression?**

Answer: Reproduce with benchmarks, profile to find bottlenecks, compare before/after metrics, and add perf tests/alerts. Roll back fast if user impact is high.

**26. How to implement testing strategy?**

Answer: Use the pyramid: many unit tests, some integration tests, and a few E2E critical flows. Gate merges on tests and keep tests fast.

**27. How to improve coverage?**

Answer: Target high-risk modules and incident areas, add tests with every bug fix, and focus on meaningful assertions over vanity percentage.

**28. How to manage roadmap?**

Answer: Align to outcomes, sequence by ROI + dependencies, reserve capacity for reliability/tech health, and revisit priorities regularly.

**29. How to break monolith?**

Answer: Identify boundaries and data ownership, then extract vertical slices gradually (strangler pattern). Keep contracts stable and invest in observability early.

**30. How to introduce microservices?**

Answer: Do it only when it solves real pain (team scaling/deploy independence). Define boundaries, owned data, contracts, and operational readiness (tracing/SLOs).

**31. How to handle scalability planning?**

Answer: Use metrics + load tests to find bottlenecks, then scale the right layer (cache/DB/async). Design for graceful degradation and capacity headroom.

**32. How to plan migration?**

Answer: Phase it: dual-run where needed, backfill + validate, shadow traffic, controlled cutover, and explicit rollback plan.

**33. How to enforce security practice?**

Answer: Shift-left with threat modeling, scans in CI, least privilege, secure defaults, and regular access reviews. Treat security bugs as high priority.

**34. How to manage secrets?**

Answer: Store secrets in a secrets manager/vault, inject at runtime, rotate regularly, and restrict access by least privilege with audits.

**35. How to reduce outages?**

Answer: Fix top incident causes, improve alerting, add timeouts/retries/circuit breakers, and use safe deployments (canary). Run drills and validate runbooks.

**36. How to improve observability?**

Answer: Standardize structured logs + metrics + traces with correlation IDs, define SLOs, build dashboards, and alert on user-impact signals.

**37. How to build resilient team?**

Answer: Reduce single points of failure with pairing/rotation/docs, keep workload sustainable, and create a culture of learning from incidents.

**38. How to delegate effectively?**

Answer: Delegate outcomes with context, constraints, and definition of done. Set checkpoints, unblock quickly, and let ownership be real.

**39. How to manage conflict?**

Answer: Address early, keep it factual, focus on impact and shared goals, and agree on a path forward. Escalate only if it blocks delivery.

**40. How to ensure code consistency?**

Answer: Use shared tooling (formatter/linter), common patterns, templates, and CI enforcement. Maintain reference implementations for teams to follow.

**41. How to improve deployment pipeline?**

Answer: Make it fast and safe: parallelize tests, cache builds, add smoke checks, canary/blue-green, and one-click rollback.

**42. How to reduce review time?**

Answer: Encourage small PRs with good descriptions, automate checks, and set team expectations for review SLAs and ownership.

**43. How to prioritize bugs?**

Answer: Prioritize by impact + severity + frequency + risk (security/data loss first). Use a triage rubric and revisit with stakeholders.

**44. How to enforce SLA?**

Answer: Define SLIs/SLOs, alert on error-budget burn, and keep clear escalation paths and runbooks. Review reliability trends regularly.

**45. How to manage on-call?**

Answer: Keep rotations fair, reduce alert noise, ensure runbooks exist, and track toil. Invest in automation to reduce on-call load.

**46. How to handle burnout?**

Answer: Watch signals early, rebalance workload, reduce toil, protect focus time, and encourage recovery. Fix root causes, not just symptoms.

**47. How to conduct performance review?**

Answer: Use evidence: impact delivered, quality/reliability, collaboration, growth behaviors. Set clear goals and a support plan.

**48. How to mentor future lead?**

Answer: Give them ownership of a project slice, let them run planning/reviews, and coach decision-making + communication with stakeholders.

**49. How to measure productivity?**

Answer: Measure outcomes and flow: lead time, predictability, reliability, and customer impact. Avoid vanity metrics like LOC.

**50. How to introduce new tech?**

Answer: Run a small pilot with success criteria, evaluate tradeoffs (cost, skills, maintenance), document standards, then roll out gradually.

**51. How to justify architectural change?**

Answer: Tie it to measurable pain (incidents, cost, slow delivery), show options with tradeoffs, and propose a phased plan with ROI.

**52. How to reduce cognitive load?**

Answer: Create paved paths, consistent patterns, and fewer choices; improve naming/docs; keep modules small; remove dead code and noisy complexity.

**53. How to document architecture?**

Answer: Maintain diagrams + ADRs (decisions + rationale), keep docs versioned with code, and update them in the same PR as changes.

**54. How to align backend & frontend?**

Answer: Agree on contracts early (OpenAPI/GraphQL), use mocks, shared types where possible, and contract tests to prevent drift.

**55. How to maintain API contracts?**

Answer: Prefer backward-compatible changes, version when needed, enforce schema validation/contract tests, and publish deprecation timelines.

**56. How to measure reliability?**

Answer: Track SLOs (availability/latency/error rate), incident rate, change failure rate, and MTTR—then act on the biggest drivers.

**57. How to enforce DR strategy?**

Answer: Define RPO/RTO, automate backups, regularly test restores, document failover steps, and run DR drills.

**58. How to manage multi-team coordination?**

Answer: Clear owners, shared timeline/RFC, single source of truth, and recurring checkpoints. Surface risks early and track action items.

**59. How to handle cross-team dependency?**

Answer: Make interfaces explicit, agree on deadlines, provide early mocks, and validate with integration/contract tests and frequent communication.

**60. How to manage code freeze?**

Answer: Freeze by risk: allow only critical fixes, raise testing requirements, require approvals, and communicate release criteria clearly.

**61. How to run sprint planning?**

Answer: Start with sprint goal, confirm capacity, pull prioritized work with clear acceptance criteria, then break into tasks and call out risks.

**62. How to handle scope creep?**

Answer: Re-anchor on goals and make tradeoffs explicit: add X means remove Y or extend timeline. Document changes and get alignment.

**63. How to ensure testability?**

Answer: Design with clear interfaces, separation of concerns, and dependency injection. Keep side effects isolated and mockable.

**64. How to improve code readability?**

Answer: Prioritize naming, small functions, clear module boundaries, and consistent patterns. Add comments for “why” on non-obvious logic.

**65. How to conduct root cause analysis?**

Answer: Build an evidence-based timeline, apply “5 whys,” confirm the root cause, then implement prevention actions with owners and deadlines.

**66. How to design review checklist?**

Answer: Include requirements, contracts, data model, security, performance, failure modes, observability, rollout/rollback, and testing plan.

**67. How to encourage innovation?**

Answer: Make space for small experiments, time-box spikes, measure results, and scale what works. Keep a safe environment for learning.

**68. How to handle legacy code?**

Answer: Stabilize with characterization tests, refactor in small safe steps, and modernize gradually (strangler pattern) rather than big rewrites.

**69. How to plan tech roadmap?**

Answer: Balance product features with reliability/security/DX, prioritize top risks, and tie work to measurable outcomes with quarterly reviews.

**70. How to build reusable libraries?**

Answer: Extract only after repeated patterns, design a stable API, version it, provide docs/examples/tests, and assign clear ownership.

**71. How to enforce DRY principle?**

Answer: Remove true duplication with shared utilities, but avoid premature abstraction. DRY the behavior and invariants, not just code shape.

**72. How to implement SOLID?**

Answer: Keep responsibilities small, define boundaries via interfaces, and invert dependencies for testability. Prefer composition over fragile inheritance.

**73. How to measure maintainability?**

Answer: Track change lead time, defect trends, churn hotspots, and onboarding feedback; use static analysis as support—not the only signal.

**74. How to balance speed vs quality?**

Answer: Keep quality gates non-negotiable, ship smaller increments, and cut scope when needed. Don’t trade short-term speed for long-term instability.

**75. How to manage release cycle?**

Answer: Use predictable cadence, feature flags, incremental rollouts, automated checks, and strong post-release monitoring/alerts.

**76. How to ensure data consistency?**

Answer: Choose consistency model deliberately, use idempotency and safe retries, use transactions where needed, and run reconciliation for eventual flows.

**77. How to handle audit compliance?**

Answer: Enforce least privilege, log access/changes, maintain traceability (tickets/approvals), and periodically review controls and evidence.

**78. How to manage API deprecation?**

Answer: Announce early, provide timeline and migration guide, support dual versions, monitor usage, and remove only after adoption.

**79. How to handle breaking change?**

Answer: Avoid if possible; otherwise version, provide adapters, communicate clearly, and enforce contract tests for consumers.

**80. How to design scalable team structure?**

Answer: Organize around domains with clear ownership, minimize coupling, and use platform/paved-path teams to reduce repeated work.

**81. How to handle knowledge silos?**

Answer: Pairing, rotations, shared ownership, documentation, and internal sessions. Aim for “bus factor > 1” in every critical area.

**82. How to encourage documentation culture?**

Answer: Make docs easy (templates) and required (DoD), keep them short, and recognize/celebrate good docs as engineering output.

**83. How to plan capacity?**

Answer: Start with actual availability, subtract overhead and support load, keep buffer for unplanned work, and adjust using historical velocity.

**84. How to handle security review?**

Answer: Threat model the flow, review authn/authz/data exposure/dependencies, run scans, and document fixes and decisions in ADRs/tickets.

**85. How to manage vendor dependency?**

Answer: Evaluate SLA, cost, security, lock-in, support, and exit strategy. Monitor vendor health and add fallbacks for critical paths.

**86. How to reduce operational overhead?**

Answer: Automate repetitive ops, standardize deployment patterns, reduce alert noise, and build self-service tooling to reduce toil.

**87. How to enforce logging standards?**

Answer: Use structured logging with required fields (requestId, service, latency), a shared logging library, and CI checks + review enforcement.

**88. How to improve incident response?**

Answer: Better alerts/runbooks, clear roles, drills/game-days, and tracking postmortem action items to completion.

**89. How to conduct post-mortem?**

Answer: Run a blameless review with timeline, contributing factors, what worked, and actionable follow-ups (owner + deadline + verification).

**90. How to handle quality gate?**

Answer: Define gates (lint/tests/scans/coverage) and block merges on failure. Allow exceptions only with explicit approval + a debt ticket.

**91. How to enforce branching strategy?**

Answer: Document the flow, protect main, require PR reviews and passing checks, and keep branches short-lived (prefer trunk-based if possible).

**92. How to manage feature flags?**

Answer: Use flags for safe rollout, ensure both paths are tested, track ownership, and remove flags on a deadline to avoid flag debt.

**93. How to manage rollback?**

Answer: Keep deployments reversible with versioned artifacts and safe DB migrations. Automate smoke checks and practice rollback playbooks.

**94. How to build DevOps culture?**

Answer: Share responsibility for build+run, invest in automation, and have engineers participate in incidents to improve systems continuously.

**95. How to measure deployment frequency?**

Answer: Track deploys per week/month and correlate with stability metrics. Use it as feedback to improve process, not to pressure teams.

**96. How to reduce change failure rate?**

Answer: Smaller PRs/releases, strong automated tests, canary rollout, better monitoring, and pre-mortems for risky changes.

**97. How to measure MTTR?**

Answer: Track detect → mitigate → recover time, then reduce it with better alerts, runbooks, training, and automation.

**98. How to manage cost optimization?**

Answer: Attribute costs per service, identify top drivers, optimize hotspots (right-sizing/autoscale/cache), and set budgets/alerts with monthly reviews.

**99. How to handle production hotfix?**

Answer: Make the smallest safe fix, add tests, deploy via the normal pipeline if possible, then follow with a proper prevention fix and RCA.

**100. How to improve team morale?**

Answer: Clear priorities, realistic commitments, recognition, autonomy, reduced toil, and a sustainable pace with support when things get heavy.

**101. How to coach underperformer?**

Answer: Diagnose the real gap (skill/clarity/support), set measurable goals, provide pairing/training, and do frequent check-ins with concrete feedback.

**102. How to resolve architecture conflict?**

Answer: Align on requirements/constraints, compare options with a decision matrix, time-box debate, prototype if needed, and record decision in ADR.

**103. How to handle stakeholder pressure?**

Answer: Convert pressure into tradeoffs: scope/time/risk. Agree on MVP, protect critical quality gates, and give clear updates with a plan.

**104. How to communicate tradeoffs?**

Answer: Explain what we gain, what we risk, and what it costs (time/money/complexity) in plain language, then recommend an option with rationale.

**105. How to measure SLA compliance?**

Answer: Map SLA terms to SLIs, monitor continuously, report compliance, and alert/escalate when error budgets are burning.

**106. How to handle client escalation?**

Answer: Acknowledge impact, provide immediate status + next update time, mitigate quickly, then share RCA and prevention plan.

**107. How to manage risk register?**

Answer: Track risks with owner, likelihood, impact, mitigation, and review cadence. Keep it visible in planning and close only when mitigated.

**108. How to implement review automation?**

Answer: Use CI bots for lint/type/tests/scans, enforce required approvals, automate labels/templates, and auto-create dependency/security PRs.

**109. How to enforce linting?**

Answer: Run lint locally (pre-commit) and in CI, and block merges on failure. Use autofix and shared configs across repos.

**110. How to manage dependency upgrade?**

Answer: Upgrade on a cadence, automate PRs, prioritize security patches, and test thoroughly; handle majors with a migration plan.

**111. How to maintain code modularity?**

Answer: Enforce boundaries, prevent circular deps, keep modules cohesive, and expose minimal public APIs with clear contracts.

**112. How to introduce observability?**

Answer: Start with correlation IDs + structured logs + baseline metrics, then add tracing for critical flows. Build dashboards and alert on user impact.

**113. How to reduce bottleneck?**

Answer: Identify the constraint using data (CI, review, unclear specs, dependencies), then remove it via automation, ownership, and WIP limits.

**114. How to measure tech health?**

Answer: Track incidents, lead time, CI stability, change failure rate, dependency freshness, and developer friction/toil—then prioritize top pain.

**115. How to evaluate third-party tool?**

Answer: Assess fit, security, reliability, cost, support, lock-in, and exit plan; pilot it with success metrics before committing.

**116. How to implement secure SDLC?**

Answer: Embed security in every stage: threat modeling, secure coding standards, scans, secret management, and review gates plus training.

**117. How to improve onboarding speed?**

Answer: One-command setup, golden-path docs, buddy support, and curated starter tasks. Remove environment friction aggressively.

**118. How to measure team output?**

Answer: Focus on delivered value + predictability + quality signals. Use flow metrics (lead time) and reliability metrics rather than activity counts.

**119. How to scale engineering culture?**

Answer: Establish shared principles, consistent rituals (design reviews/postmortems/demos), paved paths, strong onboarding, and leadership development.

**120. How to plan long-term architecture?**

Answer: Start with business goals and non-functional targets, then evolve with incremental milestones. Prioritize simplicity, clear boundaries, observability, and a migration path for future growth.
