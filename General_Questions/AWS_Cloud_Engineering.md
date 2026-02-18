# AWS Cloud Engineering Interview Questions

## Detailed Answers (Interview + Real-World Depth)

This file keeps your original 1-180 list, but expands each item into practical interview-level answers.
Use this as a speaking guide: define the concept, explain how it works, discuss tradeoffs, and give one production example.

## Quick ASCII Architecture Diagrams

### 1) Typical Highly Available Web Tier
```text
Users
  |
Route53 (DNS + health checks)
  |
CloudFront (+ WAF)
  |
ALB (multi-AZ)
  |
Auto Scaling Group (EC2 in private subnets)
  |
RDS Multi-AZ + Read Replica(s)
```

### 2) VPC Public/Private Design
```text
VPC 10.0.0.0/16
+--------------------------------------------------+
| Public Subnet (10.0.1.0/24)                      |
|  ALB, NAT Gateway, Bastion/SSM endpoint          |
|        |                                         |
|        +--> Internet Gateway (IGW)               |
|                                                  |
| Private App Subnet (10.0.2.0/24)                 |
|  EC2/ECS/EKS/Lambda ENIs                         |
|        | outbound via route to NAT GW            |
|                                                  |
| Private DB Subnet (10.0.3.0/24)                  |
|  RDS/Aurora (no direct internet route)           |
+--------------------------------------------------+
```

### 3) Event-Driven Serverless Flow
```text
Client -> API Gateway -> Lambda -> DynamoDB
                        |
                        +-> EventBridge/SNS -> SQS -> Lambda Worker -> DLQ
```

### 4) Multi-Region DR Pattern (Warm Standby)
```text
Region A (Primary)                 Region B (DR)
ALB + ASG + RDS/Aurora  ----replication---->  Scaled-down stack
        |                                          |
        +---------------- Route53 Failover -------+
```

## 1-20. Compute, Network, IAM Foundations

1. **What is EC2?**  
   Amazon EC2 (Elastic Compute Cloud) is AWS virtual server infrastructure where you choose AMI, instance type, storage, and network settings. It is used when you need OS-level control, custom runtimes, or long-running services. It is not serverless, so you are responsible for patching, right-sizing, and capacity strategy.

2. **What are EC2 instance types?**  
   Instance types are predefined hardware profiles (`t`, `m`, `c`, `r`, `i`, `p`, `g`, etc.) optimized for different workloads. Selection is based on CPU, memory, network, storage throughput, and cost profile. Strong interview answers mention benchmarking and Graviton for better price/performance in many cases.

3. **What is Auto Scaling Group?**  
   An ASG keeps a desired number of healthy EC2 instances across one or more Availability Zones. It scales capacity using metrics/schedules/predictive rules and replaces unhealthy instances automatically. It is a core high-availability and elasticity mechanism.

4. **How does ALB work?**  
   Application Load Balancer works at Layer 7 and routes HTTP/HTTPS requests by host/path/header/query rules to target groups. It performs health checks, TLS termination, sticky sessions, and integrates with WAF and authentication flows. It is ideal for web apps and microservice routing.

5. **What is NLB?**  
   Network Load Balancer is Layer 4 (TCP/UDP/TLS) and designed for very high throughput and low latency. It supports static IP and preserves source IP, making it good for non-HTTP protocols and high-volume traffic bursts. Choose NLB when raw network performance and connection handling are priorities.

6. **What is ELB?**  
   ELB (Elastic Load Balancing) is the service family that includes ALB, NLB, and GWLB. In interviews, clarify that "ELB" is often used generically, but architecture decisions should be specific to ALB vs NLB use cases. Each type addresses different layers and routing needs.

7. **What is VPC?**  
   A VPC is your logically isolated AWS network where you define CIDR ranges, subnets, route tables, and security controls. It is the foundational boundary for workload segmentation and connectivity. Good design starts with future CIDR growth, not just current needs.

8. **What is subnet?**  
   A subnet is a CIDR block segment of a VPC tied to one Availability Zone. Subnet placement controls where resources run and how traffic is routed/secured. Typical designs separate public ingress, private app, and private data subnets.

9. **What is CIDR?**  
   CIDR (Classless Inter-Domain Routing) expresses IP ranges like `10.0.0.0/16`, where prefix length defines network size. Smaller prefixes mean larger address pools. Correct CIDR planning prevents overlap issues with peering, TGW, and hybrid networking.

10. **Public vs private subnet?**  
    Public subnet has route to Internet Gateway and usually hosts internet-facing components. Private subnet has no direct route to IGW and is used for app/data tiers, often with outbound-only internet via NAT. Private-by-default is a common security baseline.

11. **What is Internet Gateway?**  
    Internet Gateway is a VPC attachment that enables internet routing for resources with proper route/public IP configuration. It is managed and highly available. Attaching IGW alone does nothing unless routes and addressing are correct.

12. **What is NAT Gateway?**  
    NAT Gateway allows private subnet resources to access internet/services outbound without inbound exposure. It sits in a public subnet and is referenced by private subnet route tables. For resilience and AZ-local routing, deploy NAT gateways per AZ.

13. **What is route table?**  
    A route table maps destination CIDRs to next-hop targets (local, IGW, NAT, TGW, VPC endpoint, peering). It is the core L3 forwarding policy for each associated subnet. Many network outages are route-table mistakes, so IaC and review are essential.

14. **What is Security Group?**  
    Security Group is a stateful virtual firewall attached to ENIs/resources. You define allow rules only; return traffic for established flows is automatically permitted. Best practice is SG-to-SG referencing rather than broad CIDR ranges.

15. **What is NACL?**  
    Network ACL is stateless subnet-level filtering with ordered allow/deny rules. Because it is stateless, you must allow both request and response port directions. It is useful for broad subnet boundaries and explicit deny requirements.

16. **What is IAM role?**  
    IAM role is an assumable identity with permissions and temporary credentials, not long-lived static keys. Services, users, and federated identities can assume roles. This pattern reduces secret sprawl and supports least privilege.

17. **What is IAM policy?**  
    IAM policy is a JSON permission document defining allowed/denied actions, resources, and conditions. Effective access is computed across identity policy, resource policy, boundaries, SCPs, and explicit deny precedence. Interview depth includes knowing evaluation logic, not only JSON shape.

18. **What is least privilege?**  
    Least privilege means granting only the minimum actions/resources/conditions needed for a job. In AWS, that includes scoping by ARN, condition keys, tags, source network, and session context. It limits blast radius from misconfigurations and compromised identities.

19. **What is STS?**  
    AWS STS issues temporary credentials for assumed roles and federation. Tokens expire, reducing risk compared to static keys. Common APIs include `AssumeRole` and identity federation variants.

20. **What is cross-account access?**  
    Cross-account access typically uses role assumption: a principal in Account A assumes a role in Account B. Correct setup requires both trust policy on target role and caller permissions in source account. Mature setups add `ExternalId`, MFA, session tags, and CloudTrail monitoring.

**AWS Docs (1-20):**  
- https://docs.aws.amazon.com/ec2/  
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html  
- https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html  
- https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html  
- https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html  
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html  
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html

## 21-40. Storage, Databases, and Lambda Fundamentals

21. **What is S3?**  
    Amazon S3 is durable object storage built around buckets and object keys, not filesystem semantics. It is used for backups, static assets, logs, media, and data lake workloads. S3 design decisions usually include encryption, versioning, lifecycle, and access policy strategy.

22. **What are S3 storage classes?**  
    Storage classes optimize cost vs retrieval frequency: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant Retrieval, Glacier Flexible Retrieval, and Glacier Deep Archive. Access pattern drives class selection. Lifecycle rules automate transitions to reduce manual cost management.

23. **What is S3 lifecycle policy?**  
    Lifecycle policies transition or expire objects based on age, prefix, or tags. Example: logs stay 30 days in Standard, then move to Glacier, then delete at retention end. This is a key cost and compliance control.

24. **What is S3 versioning?**  
    Versioning keeps multiple object versions under a single key, helping recover accidental overwrite/delete. Deletes create markers instead of permanent removal unless version-specific deletion is used. It is foundational for rollback and data protection patterns.

25. **What is S3 replication?**  
    Replication automatically copies objects to another bucket (same-region or cross-region) with policy controls. It supports DR, data sovereignty, and account isolation. Versioning must be enabled on both source and destination.

26. **What is RDS?**  
    Amazon RDS is managed relational database infrastructure service handling backups, patching, and operational automation. You still own schema, query design, and workload performance behavior. It reduces undifferentiated DB operations while preserving relational capabilities.

27. **What engines does RDS support?**  
    RDS supports engines including PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, and Db2 (regional/edition variance). Engine choice depends on compatibility, licensing, operational expertise, and feature needs. Aurora is available as AWS-optimized MySQL/PostgreSQL-compatible family.

28. **What is Multi-AZ?**  
    Multi-AZ keeps synchronous standby in another AZ and provides automatic failover for availability. It improves resilience and durability, not read throughput. Applications must be retry-aware during failover transitions.

29. **What is read replica?**  
    Read replicas are asynchronous copies used to offload read traffic, reporting, or analytics queries. They scale reads and can promote during incidents, but replication lag can affect consistency-sensitive reads. Routing strategy should account for lag tolerance.

30. **What is Aurora?**  
    Aurora is an AWS-built relational engine architecture compatible with MySQL/PostgreSQL and backed by distributed multi-AZ storage. It provides fast failover, reader endpoints, and high throughput characteristics. It is often selected for cloud-native scale and availability targets.

31. **Aurora vs RDS?**  
    Aurora uses AWS custom storage/replication internals and cluster semantics, while standard RDS engines are closer to native engine deployments. Aurora generally offers better failover/read scale patterns; standard RDS can be better for strict engine behavior/licensing requirements. Decision depends on performance, portability, and operational priorities.

32. **What is DynamoDB?**  
    DynamoDB is serverless NoSQL database optimized for single-digit millisecond performance at large scale. It supports key-value/document access, autoscaling/on-demand capacity, TTL, streams, global tables, and secondary indexes. Modeling starts from access patterns, not normalized joins.

33. **DynamoDB partition key?**  
    Partition key determines data placement and throughput distribution across partitions. Poor key cardinality creates hot partitions and throttling even with high table capacity. Good design spreads writes while keeping efficient query access.

34. **What is GSI?**  
    Global Secondary Index provides alternate query paths with different partition/sort keys than base table. It enables new read patterns without table redesign. GSIs have separate capacity and add write amplification/cost.

35. **What is LSI?**  
    Local Secondary Index shares partition key with base table but uses alternate sort key for query variation within a partition. LSI must be created when table is created and has item-collection constraints. It is useful when partition locality is important.

36. **What is DynamoDB TTL?**  
    TTL uses timestamp attribute to mark items for background deletion. Removal is asynchronous and not immediate, so apps should tolerate short grace visibility. It is ideal for session data, temporary auth records, and retention cleanup.

37. **What is Lambda?**  
    Lambda is event-driven serverless compute where you run functions without managing servers. AWS handles runtime infrastructure, scaling, and patching; you focus on handler code and permissions. It is cost-effective for bursty/event workloads.

38. **How Lambda scaling works?**  
    Lambda scales by increasing concurrent execution environments with incoming demand, subject to account/function limits. Different event sources scale differently (request-driven for API, poll/batch for queues/streams). Concurrency limits and downstream capacity must be aligned.

39. **What is cold start?**  
    Cold start is latency added when Lambda creates a new execution environment before invoking handler. It includes runtime startup, code package load, and init logic execution. It mostly affects low-traffic or bursty synchronous endpoints.

40. **What affects cold start?**  
    Runtime, artifact size, dependency graph, initialization work, VPC attachment behavior, architecture, and burst scale affect cold starts. Provisioned Concurrency mitigates this by pre-initializing environments. Keep initialization lean and move heavy setup off critical path.

**AWS Docs (21-40):**  
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html  
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html  
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html  
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html  
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html  
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html  
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html  
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html  
- https://docs.aws.amazon.com/lambda/latest/dg/welcome.html  
- https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html

## 41-60. API, Observability, Messaging, Containers

41. **What is API Gateway?**  
    API Gateway is AWS managed API front door for REST, HTTP, and WebSocket APIs with auth, throttling, monitoring, and integration controls. It reduces custom gateway maintenance and standardizes ingress behavior. It integrates with Lambda, HTTP backends, and private VPC targets.

42. **REST vs HTTP API Gateway?**  
    REST APIs support broader legacy feature set and mature ecosystem, but usually with higher cost/overhead. HTTP APIs are simpler, lower-cost, and lower-latency for common modern patterns. Choose based on required features like usage plans/advanced transformations vs lean operations.

43. **What is usage plan?**  
    Usage plan links API keys to quotas and throttling limits (primarily REST APIs). It helps product-tier control and consumer governance. It should not be treated as strong authorization by itself.

44. **What is throttling?**  
    Throttling limits request rate and burst to protect backend stability and fairness. API Gateway enforces limits and returns `429` when exceeded. Clients should use retry with exponential backoff and jitter.

45. **What is CloudWatch?**  
    CloudWatch is AWS observability platform for metrics, logs, alarms, dashboards, and events. It powers autoscaling triggers, monitoring, and operational response. Effective usage requires clear SLI/SLO-aligned metrics and actionable alerts.

46. **What are CloudWatch logs?**  
    CloudWatch Logs stores service/app logs in groups and streams with configurable retention. Logs Insights enables query-based troubleshooting and analytics. Centralized log strategy is essential for incident response and compliance.

47. **What is CloudWatch metric?**  
    A metric is a timestamped measurement such as latency, error count, CPU, queue depth, or custom business KPI. Dimensions add filtering context (service, env, endpoint). Metrics are the basis for alarms and scaling policies.

48. **What is alarm?**  
    Alarm evaluates metric thresholds, anomaly bands, or math expressions and triggers actions (SNS, Auto Scaling, incident workflows). Strong alarms detect user impact quickly without excessive noise. State transitions (`OK`, `ALARM`, `INSUFFICIENT_DATA`) should map to runbooks.

49. **What is EventBridge?**  
    EventBridge is managed event bus that routes AWS/service/custom events using pattern-based rules. It supports decoupled event architectures, schedules, archive/replay, and cross-account buses. It improves extensibility vs hard-coded synchronous chains.

50. **What is SQS?**  
    SQS is durable message queue service for asynchronous decoupling and spike smoothing. It provides at-least-once delivery (standard) and integrates well with Lambda/ECS workers. Consumers must be idempotent because duplicates can occur.

51. **What is FIFO queue?**  
    FIFO queue preserves strict order per message group and supports deduplication semantics. It is used when ordering correctness matters (financial/event sequencing). Throughput depends on message-group parallelism and queue mode.

52. **What is DLQ?**  
    Dead-letter queue stores messages that repeatedly fail processing beyond receive threshold. It isolates poison messages and protects throughput of healthy workload. Teams should alert on DLQ growth and implement safe redrive tooling.

53. **What is SNS?**  
    SNS is pub/sub messaging for fan-out to multiple subscribers (SQS, Lambda, HTTP/S, email/SMS, etc.). It is ideal for broadcasting events and notifications. Delivery semantics differ from queues, so consumer design must reflect that.

54. **SNS vs SQS?**  
    SNS pushes same event to many subscribers; SQS buffers work for pull-based processing and retry control. A common pattern is SNS topic fan-out into service-specific SQS queues. This balances decoupling with independent consumer scaling.

55. **What is Step Functions?**  
    Step Functions orchestrates multi-step workflows with retries, catch/fallback, branching, and state tracking. It externalizes orchestration logic from code and gives visual execution history. It is preferred for complex, long-running distributed business processes.

56. **What is state machine?**  
    A state machine is a graph of states (`Task`, `Choice`, `Map`, `Parallel`, `Wait`, etc.) with transition logic and data flow. It formalizes workflow behavior and failure handling. This reduces brittle custom orchestration code.

57. **What is ECR?**  
    ECR is AWS managed container registry for storing Docker/OCI images. It integrates with IAM, vulnerability scanning, lifecycle policies, and cross-region/account replication. It is standard artifact source for ECS and EKS workloads.

58. **What is ECS?**  
    ECS is AWS-native container orchestration for deploying and scaling containerized services/tasks. It supports EC2 and Fargate launch types and integrates tightly with ALB, IAM, and CloudWatch. Operational overhead is lower than self-managed Kubernetes in many teams.

59. **ECS vs EKS?**  
    ECS is simpler and AWS-centric; EKS offers Kubernetes ecosystem portability and advanced K8s controls. ECS favors faster operational onboarding, EKS favors standard Kubernetes API/tooling. Decision depends on team skills, portability, and control requirements.

60. **What is Fargate?**  
    Fargate is serverless compute engine for ECS/EKS tasks/pods where AWS manages host infrastructure. You specify CPU/memory and pay per running resource/time. It removes node management and improves operational focus.

**AWS Docs (41-60):**  
- https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html  
- https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html  
- https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html  
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html  
- https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-tutorial.html  
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html  
- https://docs.aws.amazon.com/sns/latest/dg/welcome.html  
- https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html  
- https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html  
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html

## 61-80. Kubernetes, IaC, Security, Core Networking

61. **What is EKS?**  
    EKS is AWS managed Kubernetes control plane service. You run workloads on managed node groups, self-managed nodes, or Fargate, while AWS runs control plane availability and patching. It is chosen when Kubernetes API portability and ecosystem tooling are required.

62. **What is CloudFormation?**  
    CloudFormation is AWS-native IaC service using templates and stacks to provision/update resources declaratively. It handles dependency ordering and rollback on failed updates. It is key for repeatable, auditable environment management.

63. **What is Terraform?**  
    Terraform is provider-based IaC tooling that supports AWS and multi-cloud resources with HCL configuration. It uses state to track infrastructure reality and plan changes safely. Teams need secure remote state and locking to avoid drift/conflicts.

64. **What is Infrastructure as Code?**  
    IaC means defining infrastructure in code instead of manual console changes. It enables version control, peer review, automated testing, and reproducible provisioning. IaC is foundational for platform reliability and compliance at scale.

65. **What is blue-green deployment?**  
    Blue-green uses two parallel environments and shifts traffic from old (blue) to new (green) after validation. Rollback is fast by switching traffic back. Tradeoff is temporary duplicate infrastructure cost.

66. **What is canary deployment?**  
    Canary sends a small traffic percentage to new version first, observes metrics, then gradually increases exposure. It limits blast radius of bad releases. Automated rollback based on SLO guardrails is best practice.

67. **What is CodePipeline?**  
    CodePipeline orchestrates CI/CD stages from source to build, test, and deploy. It provides auditable release flow and integration with AWS/third-party tools. It helps standardize delivery governance.

68. **What is CodeBuild?**  
    CodeBuild is managed build service for compiling code, running tests, and producing artifacts. It scales build workers on demand and avoids managing custom build infrastructure. Buildspec files keep build logic deterministic.

69. **What is CodeDeploy?**  
    CodeDeploy automates deployments to EC2, Lambda, and ECS with strategies like in-place or blue/green. It supports lifecycle hooks, traffic shifting, and rollback. It reduces deployment risk and manual drift.

70. **What is Secrets Manager?**  
    Secrets Manager stores sensitive credentials and supports rotation workflows. It integrates with IAM, KMS, and CloudTrail for access control/auditability. Prefer runtime retrieval over embedding secrets in code or AMIs.

71. **What is Parameter Store?**  
    Parameter Store (SSM) manages hierarchical config values and secure strings. It is commonly used for app settings, environment flags, and lightweight secret references. It is simple and cost-effective for many configuration use cases.

72. **Secrets Manager vs Parameter Store?**  
    Secrets Manager is stronger for secret lifecycle and automatic rotation. Parameter Store is better for broad config management and simpler secure values. Many architectures use both based on sensitivity and rotation needs.

73. **What is KMS?**  
    KMS is managed key service for encryption/decryption/signing integrated across AWS services. It controls key policies, grants, rotation, and usage audit trails. Secure design separates key administrators and key users.

74. **What is encryption at rest?**  
    Encryption at rest protects stored data in S3/EBS/RDS/backups by encrypting media with managed keys. It reduces risk if storage snapshots/media are exposed. Full solution also needs strict key access policy and monitoring.

75. **What is encryption in transit?**  
    Encryption in transit protects network data using TLS/mTLS/IPsec between clients and services. It prevents eavesdropping and tampering during transfer. Strong implementations include certificate automation and secure cipher policy.

76. **What is WAF?**  
    AWS WAF is web application firewall for filtering malicious HTTP patterns (SQLi, XSS, bots, bad IPs, excessive rates). It can attach to CloudFront, ALB, and API Gateway. WAF complements secure coding, not replaces it.

77. **What is Shield?**  
    AWS Shield protects against DDoS attacks; Shield Standard is baseline and Shield Advanced adds broader protections/support. It works best with resilient architecture and edge services like CloudFront. DDoS defense is layered, not single-control.

78. **What is CloudTrail?**  
    CloudTrail captures API activity/events across AWS accounts for auditing and forensics. It answers who changed what and when. Production landing zones centralize CloudTrail into dedicated log archives with guardrails.

79. **What is VPC peering?**  
    VPC peering creates private IP connectivity between two VPCs. It is low-latency and simple but non-transitive and does not scale well in full-mesh topologies. CIDR overlap is not allowed.

80. **What is Transit Gateway?**  
    Transit Gateway is centralized hub for connecting multiple VPCs, VPNs, and Direct Connect attachments. It simplifies large-scale routing and policy management. It is preferred for multi-account enterprise network architecture.

**AWS Docs (61-80):**  
- https://docs.aws.amazon.com/eks/latest/userguide/clusters.html  
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html  
- https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html  
- https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html  
- https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html  
- https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html  
- https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html  
- https://docs.aws.amazon.com/kms/latest/developerguide/overview.html  
- https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html  
- https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html  
- https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html  
- https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html  
- https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-centralized-router.html

## 81-100. Advanced Network, DNS, Ops, Backup, DR

81. **What is PrivateLink?**  
    PrivateLink provides private connectivity to AWS services or SaaS endpoints through interface endpoints, without traversing public internet. It is heavily used for secure service consumption across VPCs/accounts. It reduces exposure and simplifies egress control.

82. **What is Elastic IP?**  
    Elastic IP is a static public IPv4 address that can be re-associated to another resource quickly. It helps with fixed-IP allowlist integrations and rapid failover scenarios. Because IPv4 is scarce, unnecessary EIPs increase cost and should be minimized.

83. **What is NAT instance?**  
    NAT instance is an EC2-based NAT alternative managed by you (patching, scaling, failover). It can be cheaper at very small scale but adds operational risk and maintenance burden. NAT Gateway is usually preferred for production reliability.

84. **What is Bastion host?**  
    Bastion host is a hardened jump server for administrative access into private networks. Modern AWS best practice often replaces bastions with SSM Session Manager to avoid inbound SSH exposure. If used, bastions need strict network/identity controls and logging.

85. **What is IAM trust policy?**  
    Trust policy defines who can assume a role (`Principal`) and under what conditions. It is separate from permission policy that defines what actions are allowed after assumption. Secure role design requires both parts aligned.

86. **What is Cognito?**  
    Cognito is AWS managed identity service for user sign-up/sign-in and token issuance. It supports user pools, identity federation, and JWT-based app authorization flows. It reduces custom auth implementation complexity.

87. **What is federated identity?**  
    Federated identity lets users authenticate via external providers (OIDC/SAML/social) and access AWS/app resources without local passwords. It centralizes identity governance and supports SSO. In AWS, federation usually maps to temporary role-based credentials.

88. **What is CloudFront?**  
    CloudFront is AWS CDN/edge delivery network that caches content close to users. It improves latency, protects origin, and integrates with WAF and signed access controls. It is central for global web performance.

89. **What is CDN?**  
    CDN is geographically distributed cache and edge network for faster content delivery and origin offload. It lowers latency and improves resilience during traffic spikes. CDNs can also enforce edge security and request filtering.

90. **What is Route 53?**  
    Route 53 is AWS managed DNS with routing policies, health checks, and domain registration support. It routes users to healthy endpoints based on latency/weights/failover logic. DNS strategy is a major availability control plane.

91. **What is health check?**  
    Health checks test endpoint availability and influence routing/failover decisions. Good health checks probe meaningful paths and use sensible intervals/thresholds. Poorly tuned checks can cause false failovers.

92. **What is hosted zone?**  
    Hosted zone stores DNS records for a domain in Route 53 (public or private). Public zones serve internet DNS; private zones resolve within associated VPCs. Split-horizon designs often use both.

93. **What is latency-based routing?**  
    Latency-based routing directs clients to region expected to provide lowest latency. It improves user performance globally but does not alone guarantee resilience. Health checks and regional capacity still matter.

94. **What is weighted routing?**  
    Weighted routing distributes DNS responses by percentage across targets. It is used for gradual migration, canary at DNS layer, and traffic experiments. Weight changes are operationally simple and reversible.

95. **What is failover routing?**  
    Failover routing uses primary/secondary records with health checks to shift traffic automatically during outages. It is common in active-passive DR. Success depends on tested data replication and recovery playbooks.

96. **What is Global Accelerator?**  
    Global Accelerator gives static anycast IPs and routes traffic through AWS global network to nearest healthy endpoint. It often reacts faster than DNS-only failover because it bypasses DNS cache propagation limits. It improves global application availability and performance.

97. **What is SSM?**  
    Systems Manager is AWS operations hub for fleet management, session access, command execution, automation, inventory, and patching. It reduces need for bastions and ad-hoc scripts. It is a core platform operations service in mature AWS environments.

98. **What is patch manager?**  
    Patch Manager automates patch baselines, scheduling, and compliance reporting for managed instances. It standardizes patching across fleets with auditability. This reduces security risk from manual patch drift.

99. **What is backup strategy?**  
    Backup strategy defines frequency, retention, encryption, immutability, cross-account/region copies, and restore testing. Backups are only useful if recovery is validated regularly. Strategy should align with data criticality and regulatory needs.

100. **What is DR strategy?**  
     DR strategy defines how services recover from major failure using patterns like backup/restore, pilot light, warm standby, or active-active. Choice is based on business RTO/RPO and budget. Mature DR includes runbooks, drills, and automated failover where justified.

**AWS Docs (81-100):**  
- https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html  
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_update-role-trust-policy.html  
- https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html  
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html  
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html  
- https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html  
- https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html  
- https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html  
- https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-database-disaster-recovery/defining.html

## 101-120. Resilience Metrics, Cost Models, Scaling Controls

101. **RTO vs RPO?**  
     RTO (Recovery Time Objective) is maximum acceptable downtime; RPO (Recovery Point Objective) is maximum acceptable data loss window. Lower RTO/RPO means higher engineering and infrastructure cost. These metrics drive architecture and DR pattern choice.

102. **What is multi-region setup?**  
     Multi-region setup deploys workload capability in more than one AWS region for resilience, latency, or compliance. Patterns include active-passive and active-active with data replication strategies. Complexity increases significantly in consistency, release, and failover operations.

103. **What is Lambda concurrency?**  
     Lambda concurrency is the number of function invocations running simultaneously. It drives scaling behavior and can impact downstream systems if not controlled. Concurrency planning is critical for predictable performance.

104. **What is reserved concurrency?**  
     Reserved concurrency sets guaranteed and maximum concurrency for a specific function. It prevents noisy-neighbor functions from consuming all account concurrency and caps function blast radius. It is an important control for critical workloads.

105. **What is provisioned concurrency?**  
     Provisioned concurrency pre-initializes Lambda execution environments to reduce cold-start latency. It is best for latency-sensitive APIs with predictable traffic windows. Tradeoff is additional cost for pre-warmed capacity.

106. **What is API caching?**  
     API caching stores recent responses at API layer to reduce backend load and latency. It is useful for read-heavy and moderately static responses. Cache key design and TTL tuning determine effectiveness and consistency behavior.

107. **What is DynamoDB auto scaling?**  
     DynamoDB auto scaling adjusts provisioned read/write capacity based on utilization targets. It helps absorb traffic changes while controlling cost. Proper min/max bounds and alarm visibility are necessary to avoid under/over-provisioning.

108. **What is burst capacity?**  
     Burst capacity is short-term throughput above baseline using accrued unused capacity credits (service-specific behavior, e.g., DynamoDB partitions or burstable EC2 CPU credits). It handles brief spikes but is not a long-term scaling plan. Sustainable traffic needs proper steady capacity design.

109. **What is IAM permission boundary?**  
     Permission boundary is managed policy that sets maximum permissions an IAM principal can receive, even if identity policy allows more. It is a delegation guardrail for safe self-service IAM creation. It does not grant permissions by itself.

110. **What is service control policy?**  
     SCP is AWS Organizations policy that defines permission guardrails at account/OU level. It limits what identities in member accounts can ever do, regardless of local IAM allows. SCPs are preventive governance controls.

111. **What is organization unit?**  
     OU is a logical grouping of AWS accounts inside Organizations for governance and policy inheritance. You attach SCPs and apply controls at OU scope. It enables scalable multi-account management.

112. **What is cost explorer?**  
     Cost Explorer is AWS billing analytics tool for spend visualization, trend analysis, and forecasting by account/service/tag. It supports budgeting and anomaly investigation workflows. Tag hygiene is required for meaningful charge visibility.

113. **What is reserved instance?**  
     Reserved Instances are commitment-based pricing discounts for steady-state compute usage (term and payment options). They lower cost versus On-Demand when utilization is predictable. They are financial commitments, not capacity reservations in every case.

114. **What is spot instance?**  
     Spot Instances use spare AWS capacity at steep discount with interruption risk. They are excellent for fault-tolerant/stateless/batch workloads with checkpointing. Do not use as sole capacity for critical non-interruptible systems.

115. **What is on-demand pricing?**  
     On-Demand is pay-per-use pricing without long-term commitment. It offers maximum flexibility and simplest planning, but highest per-unit cost. It is commonly used for baseline unknown workloads and buffer capacity.

116. **What is container registry?**  
     A container registry stores versioned container images and metadata for deployment pipelines. In AWS, ECR is the managed registry service with IAM/scanning/lifecycle controls. Registry governance affects supply-chain security.

117. **What is scaling policy?**  
     Scaling policy defines when and how capacity should change based on metrics/schedules/events. Examples include target tracking, step scaling, and scheduled scaling. Good policies include cooldown/warmup and safe scale-in protections.

118. **What is target tracking?**  
     Target tracking keeps a metric near a target value (for example CPU 50%) by automatically adjusting capacity. It behaves like a thermostat and is often easiest default policy. Metric quality and warmup settings strongly influence stability.

119. **What is rolling deployment?**  
     Rolling deployment updates instances/tasks gradually while keeping some old capacity serving traffic. It limits release blast radius and avoids full cutover risk. Health checks and minimum healthy capacity settings are crucial.

120. **What is load balancer health check?**  
     Health checks probe target endpoints and determine whether traffic should be routed to them. Path/port/interval/threshold choices must match app startup and dependency behavior. Bad tuning can cause flapping and cascading failures.

**AWS Docs (101-120):**  
- https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html  
- https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html  
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html  
- https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html  
- https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html  
- https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html  
- https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html  
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html  
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html  
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scaling-cooldowns.html

## 121-140. Runtime Tuning, IAM Details, Observability, Tracing

121. **What is ephemeral storage?**  
     Ephemeral storage is temporary local storage tied to lifecycle of compute instance/task/function environment. Data is lost when environment is terminated/recycled. It is suitable for scratch data, not durable state.

122. **What is Lambda layer?**  
     Lambda layer is reusable package (libraries/runtime assets) shared across functions. Layers reduce duplicate packaging and improve dependency consistency. They should be versioned and security-reviewed like code artifacts.

123. **What is Lambda timeout?**  
     Lambda timeout is maximum execution duration before function is terminated. It should be set slightly above expected p99 processing time, not maximum possible. Wrong timeout either causes premature failures or long resource lock/wait behavior.

124. **What is Lambda memory tuning?**  
     Lambda memory setting controls allocated memory and proportionally affects CPU/network throughput. Increasing memory can reduce execution time and even total cost for CPU-heavy tasks. Right-sizing requires measurement across realistic payloads.

125. **What is VPC endpoint?**  
     VPC endpoint allows private access to AWS services without internet/NAT path. Gateway endpoints are for S3/DynamoDB; interface endpoints are ENI-based for many services. They improve security posture and can reduce NAT data processing costs.

126. **What is private DNS?**  
     Private DNS maps service names to private IPs inside VPC/private hosted zones. It enables internal service resolution without public DNS exposure. It is critical for private endpoint usability and clean service discovery.

127. **What is IAM condition?**  
     IAM condition adds contextual constraints to permissions, such as source IP, MFA, tags, request time, or VPC endpoint. Conditions make policies precise and enforce least privilege contextually. They are powerful and often underused.

128. **What is MFA?**  
     MFA (multi-factor authentication) requires an additional verification factor beyond password/key. In AWS it is especially important for privileged IAM users and role assumption protection. Strong org policies enforce MFA for sensitive actions.

129. **What is session token?**  
     Session token is part of temporary credentials from STS (access key + secret + token). It proves temporary session context and expires automatically. Applications must refresh it before expiry.

130. **What is EC2 user data?**  
     User data is bootstrap script/config passed at launch, often used by cloud-init to install and configure software. It enables immutable provisioning workflows and consistent startup behavior. Keep it idempotent and avoid embedding long-term secrets.

131. **What is AMI?**  
     AMI (Amazon Machine Image) is a template for launching EC2 instances, including OS and optional prebuilt software. Golden AMI pipelines improve deployment speed and consistency. AMIs should be versioned, patched, and scanned.

132. **What is CloudWatch insights?**  
     CloudWatch Logs Insights is query engine for log analysis using purpose-built query language. It supports fast filtering, aggregation, and troubleshooting across large log volumes. It is useful for incident triage and trend analysis.

133. **What is log retention?**  
     Log retention is policy defining how long logs are stored before deletion or archival. It balances forensic/compliance needs against storage cost. Retention should be explicitly configured, not left to defaults.

134. **What is cost optimization?**  
     Cost optimization is continuous process of rightsizing, pricing-model selection, storage lifecycle, architecture efficiency, and waste elimination. It requires both engineering and FinOps discipline. "Cheapest now" is not always "lowest total cost over time."

135. **What is tag policy?**  
     Tag policy in AWS Organizations standardizes allowed tag keys/values across accounts for governance and reporting. It improves cost allocation, ownership tracking, and automation targeting. Consistent tagging is prerequisite for mature cloud operations.

136. **What is S3 event notification?**  
     S3 event notifications publish object-level events (create/delete/restore, etc.) to SNS, SQS, EventBridge, or Lambda triggers. They enable event-driven pipelines like ingestion/transcoding/audit flows. Implement idempotent handlers because duplicate notifications can occur.

137. **What is CloudWatch dashboard?**  
     CloudWatch dashboard visualizes key metrics/log widgets in shared operational views. Dashboards help NOC/SRE teams monitor system health quickly. Useful dashboards are service-oriented and include latency, errors, saturation, and business KPIs.

138. **What is X-Ray?**  
     AWS X-Ray collects and visualizes request traces across distributed components. It shows service maps, segment timelines, and latency bottlenecks. It is valuable for debugging microservice performance issues.

139. **What is distributed tracing?**  
     Distributed tracing follows a request through multiple services with correlated trace IDs and spans. It helps locate latency hotspots and cross-service failures. It complements logs/metrics rather than replacing them.

140. **What is API Gateway authorizer?**  
     API Gateway authorizer is auth mechanism that validates caller identity/permissions before invoking backend. Types include IAM, Lambda authorizer, and JWT/Cognito authorizers (depending on API type). It centralizes access control at API edge.

**AWS Docs (121-140):**  
- https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html  
- https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html  
- https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html  
- https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html  
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html  
- https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html  
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html  
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html  
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html  
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html  
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html  
- https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html  
- https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html

## 141-160. Security Enforcement, Queue Controls, Storage, Data Streaming

141. **What is Cognito JWT validation?**  
     Cognito JWT validation means verifying token signature, issuer, audience/client ID, expiry, and scopes/claims before granting access. Never trust token contents without signature/key validation. API Gateway JWT authorizers or app middleware typically enforce this.

142. **What is SNS topic policy?**  
     SNS topic policy is resource-based policy controlling who can publish/subscribe/manage topic actions. It enables cross-account pub/sub patterns securely. Policy conditions should restrict source accounts/services where possible.

143. **What is SQS visibility timeout?**  
     Visibility timeout is period after a message is received during which it is hidden from other consumers. It should exceed normal processing time to avoid duplicate parallel processing. Long tasks may need heartbeat/visibility extension patterns.

144. **What is SQS long polling?**  
     Long polling waits up to configured seconds for messages before returning, reducing empty receives and API cost. It improves consumer efficiency and latency for sporadic traffic. Enable it by queue setting or receive parameter.

145. **What is autoscaling lifecycle hook?**  
     Lifecycle hooks pause instance launch/termination transitions so custom actions can run (bootstrap, drain, snapshot, notify). They improve graceful scaling behavior and data safety. Hooks usually integrate with EventBridge/Lambda/SSM automation.

146. **What is capacity planning?**  
     Capacity planning forecasts resource demand and sets scaling/quotas/headroom to meet performance goals. It combines historical metrics, growth assumptions, seasonality, and failure scenarios. Good planning prevents both outages and overprovisioning waste.

147. **What is ELB stickiness?**  
     Stickiness (session affinity) routes a client to same target for a period, typically using cookies at ALB. It is useful for stateful legacy apps but can create uneven load distribution. Stateless session design is generally preferred.

148. **What is CloudWatch anomaly detection?**  
     Anomaly detection builds dynamic expected metric bands from historical behavior and alarms on deviations. It reduces static-threshold tuning burden for seasonal patterns. Still requires validation to avoid noise in rapidly changing systems.

149. **What is EBS?**  
     EBS is persistent block storage for EC2 with volume types tuned for IOPS/throughput/cost. It behaves like network-attached disk and survives instance stop/start (unless deleted). Choose gp3/io2/st1/sc1 types based on workload profile.

150. **What is EFS?**  
     EFS is managed elastic NFS file system shared across many instances/containers. It scales storage automatically and supports multi-AZ access. It is suitable for shared POSIX file workloads and content repositories.

151. **What is instance store?**  
     Instance store is physically attached ephemeral storage on host hardware. It offers high performance but data is lost when instance stops/terminates or host fails. Use it for cache/scratch/temp data only.

152. **What is snapshot?**  
     Snapshot is point-in-time backup of EBS volumes stored in S3-managed backend. It is incremental after first full snapshot and used for restore, cloning, and DR. Consistent snapshots may require filesystem/app quiescing.

153. **What is storage gateway?**  
     AWS Storage Gateway is hybrid service connecting on-prem environments to AWS storage via file/volume/tape interfaces. It enables migration and backup modernization without immediate app rewrites. Local caching improves access latency for active data.

154. **What is S3 presigned URL?**  
     Presigned URL grants time-limited access to specific S3 object operation using signer permissions. It enables secure direct upload/download without exposing long-term credentials. URL scope and expiration should be tightly controlled.

155. **What is bucket policy?**  
     Bucket policy is resource-based JSON policy controlling access to S3 bucket and objects. It supports cross-account access, conditional restrictions, and service integrations. Combine with block public access, IAM policies, and encryption controls.

156. **What is cross-region replication?**  
     Cross-region replication copies S3 objects to another region automatically for DR/compliance/latency needs. It improves resilience against regional disruption. Replication has cost/latency implications and requires versioning.

157. **What is Kinesis?**  
     Amazon Kinesis is managed real-time data streaming platform (Data Streams, Firehose, etc.). It ingests high-throughput event streams for analytics, ETL, monitoring, and near-real-time processing. It is key for event pipelines beyond simple queue semantics.

158. **What is data stream?**  
     A data stream is ordered sequence of records partitioned into shards for scalable ingestion/consumption. Producers write records; consumers process using shard iteration semantics. Retention window enables replay scenarios.

159. **What is shard?**  
     Shard is the throughput unit in Kinesis Data Streams with specific read/write capacity limits. More shards increase parallelism and capacity. Partition key selection controls distribution and hot-shard risk.

160. **What is Glue?**  
     AWS Glue is serverless data integration/ETL service with crawlers, data catalog, jobs, and workflow orchestration. It prepares and transforms data for analytics services such as Athena/Redshift/S3 lakes. It reduces ETL infrastructure management overhead.

**AWS Docs (141-160):**  
- https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html  
- https://docs.aws.amazon.com/sns/latest/dg/sns-access-policy-use-cases.html  
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html  
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html  
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html  
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html  
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html  
- https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html  
- https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html  
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html  
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html  
- https://docs.aws.amazon.com/streams/latest/dev/introduction.html  
- https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html

## 161-180. Analytics, Kubernetes Ops, Governance, HA Best Practices

161. **What is Athena?**  
     Athena is serverless SQL query service for data in S3 using schema-on-read. It is useful for ad-hoc analytics, logs exploration, and lake querying without managing clusters. Performance/cost improve with partitioning, compression, and columnar formats.

162. **What is Redshift?**  
     Redshift is managed data warehouse optimized for large-scale analytical SQL workloads. It uses columnar storage, MPP execution, and integrations with lake and BI tooling. It is suited for complex analytics beyond simple ad-hoc queries.

163. **What is Aurora Serverless?**  
     Aurora Serverless automatically adjusts database capacity based on demand and can pause/resume in some modes. It is good for variable or intermittent workloads. Evaluate cold-start/resume behavior and connection patterns before production adoption.

164. **What is Lambda alias?**  
     Lambda alias is named pointer to a specific function version (for example `prod`, `beta`). It enables stable invocation targets while underlying versions change. Aliases support weighted traffic shifting for safer deployments.

165. **What is Lambda versioning?**  
     Lambda versions are immutable snapshots of function code/config. Publishing versions enables reproducible deployments and rollback safety. Common practice: deploy version, then move alias gradually.

166. **What is EKS node group?**  
     EKS node group is managed set of worker nodes (EC2 instances) for running Kubernetes pods. AWS manages lifecycle operations like updates and health replacement for managed node groups. Workload isolation often uses multiple node groups by workload class.

167. **What is pod autoscaling?**  
     Pod autoscaling (typically HPA) adjusts pod replicas based on CPU/memory/custom metrics. Cluster Autoscaler/Karpenter may scale nodes when pods cannot be scheduled. Effective tuning requires requests/limits and realistic metrics.

168. **What is Fargate task?**  
     Fargate task is an ECS task (or EKS pod profile) running on serverless infrastructure without managing EC2 nodes. You define resource requirements and networking; AWS handles host operations. It simplifies operations for containerized workloads.

169. **What is container health check?**  
     Container health checks verify liveness/readiness of containerized services and drive restart/traffic decisions. Poor health endpoints can trigger restart loops or send traffic to unhealthy tasks. Health logic should reflect real dependency readiness.

170. **What is CloudFormation stack?**  
     A stack is deployable unit of CloudFormation resources created from a template. Stack updates are change-set driven and can roll back on failure. Stack boundaries should match lifecycle ownership and blast-radius concerns.

171. **What is drift detection?**  
     Drift detection compares current resource state with IaC-declared state to identify manual/config drift. It helps governance and prevents surprise behavior during updates. Continuous drift checks improve infra reliability.

172. **What is AWS CLI?**  
     AWS CLI is command-line tool for managing AWS services via API operations. It supports automation scripts, debugging, and repeatable operational tasks. Profiles and role assumption patterns are important for secure usage.

173. **What is IAM inline policy?**  
     Inline policy is policy embedded directly into one IAM user/group/role and not reusable elsewhere. It is tightly coupled and useful for one-off cases, but managed policies are preferred for reuse/governance. Excessive inline policy usage can hurt maintainability.

174. **What is SCP restriction?**  
     SCP restriction means actions blocked by Organization SCP cannot be performed even if account IAM allows them. This creates central guardrails for all accounts in OU/root scope. Explicit denies in SCP are powerful governance controls.

175. **What is VPC flow log?**  
     VPC Flow Logs capture metadata about IP traffic to/from ENIs, subnets, or VPCs (not packet payload). They help troubleshoot connectivity and support security analytics. Logs are sent to CloudWatch Logs or S3 for analysis.

176. **What is NAT cost optimization?**  
     NAT cost optimization reduces NAT data processing/hourly charges using architecture choices: keep traffic in-region with VPC endpoints, deploy NAT per AZ to avoid cross-AZ data, and minimize internet egress. Workload-aware routing and endpoint usage are biggest levers.

177. **What is cross-account S3 access?**  
     Cross-account S3 access is controlled using bucket policy/resource policy + IAM role/user policy in accessing account. Ownership, ACL settings, and KMS key permissions must align for success. Prefer role-based access and explicit bucket policy conditions.

178. **What is serverless architecture?**  
     Serverless architecture uses managed event-driven services (Lambda, API Gateway, DynamoDB, SQS, EventBridge, etc.) with minimal server management. It improves agility and scales automatically, but needs careful observability and service-limit design. Event-driven decoupling is core pattern.

179. **What is edge computing?**  
     Edge computing runs logic closer to users/devices (for example CloudFront edge functions) to reduce latency and offload origin. It improves responsiveness for geo-distributed workloads. Data locality, consistency, and security controls become key design tradeoffs.

180. **What is AWS best practice for high availability?**  
     High availability on AWS is a layered pattern: multi-AZ deployment, stateless app tiers behind load balancers, automated scaling/healing, resilient data stores, monitored failover, and tested DR. Eliminate single points of failure in compute, data, and network paths. Design for failure explicitly, then test recovery regularly.

```text
HA Checklist (practical):
- Multi-AZ everywhere possible
- Health checks + auto healing
- Decouple with queues/events
- Backups + restore drills
- Infrastructure as Code + drift control
- Clear alarms and runbooks
```

**AWS Docs (161-180):**  
- https://docs.aws.amazon.com/athena/latest/ug/what-is.html  
- https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html  
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html  
- https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html  
- https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html  
- https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html  
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/healthcheck.html  
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html  
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/detect-drift-stack.html  
- https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html  
- https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html  
- https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html  
- https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-pricing.html  
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-walkthroughs-managing-access-example4.html  
- https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html

## In-Depth Scaling Notes (High-Value Interview Section)

### A) EC2 Auto Scaling behavior in practice

```text
CloudWatch Metric (CPU/ReqPerTarget/Custom)
          |
      Scaling Policy
   (Target/Step/Scheduled)
          |
 Launch/Terminate via ASG
          |
   ELB health check + warmup
```

- `Target tracking`: easiest default, like thermostat (for example CPU target 50%).
- `Step scaling`: good when you want different reactions for different alarm breach sizes.
- `Scheduled scaling`: best for predictable traffic spikes (business hours, events).
- `Warmup + cooldown` tuning matters to avoid oscillation (thrash) and under-reaction.
- Always combine with multi-AZ, health checks, and minimum capacity floor.

### B) Lambda scaling math

- Approximation: `Concurrency = Requests per second * Avg duration (seconds)`.
- Example: 2,000 RPS with 120 ms avg duration -> `2,000 * 0.12 = 240` concurrency.
- Use `Reserved Concurrency` to protect critical functions and isolate noisy neighbors.
- Use `Provisioned Concurrency` for synchronous low-latency workloads.
- Validate downstream limits (DB connections, third-party APIs), not just Lambda limits.

### C) DynamoDB scaling essentials

```text
Client traffic -> Partition key hash -> Physical partitions
                         |
        uneven keys => hot partitions => throttling
```

- Table capacity may look sufficient while one hot partition throttles requests.
- Design high-cardinality partition keys and consider write sharding where needed.
- Use auto scaling or on-demand mode, but still monitor hot-key patterns.
- GSIs scale independently and can become hidden bottlenecks if ignored.

### D) Queue-driven worker scaling (SQS + Lambda/ECS)

```text
Producers -> SQS Queue -> Consumers (Lambda/ECS workers)
                 |
              DLQ for poison messages
```

- Queue depth and age are better scale signals than CPU for async workers.
- Long polling lowers empty receives and API cost.
- Tune visibility timeout > normal processing duration.
- DLQ alarms are mandatory to detect poison-message loops.

### E) Kubernetes (EKS) scaling

- HPA scales pods by metrics (CPU/memory/custom).
- Cluster Autoscaler/Karpenter scales nodes when pods are unschedulable.
- Set realistic `requests/limits`; autoscaling is unreliable without them.
- Use PodDisruptionBudgets and rolling-update parameters to keep availability.

### F) Common scaling anti-patterns

- Scaling app tier without verifying DB/queue/cache bottlenecks.
- Using only average latency, ignoring p95/p99.
- No load testing before production events.
- No scale-in protections, causing connection churn and cache cold misses.
- Treating retries as free; they can amplify overload if not bounded.

**Scaling Deep-Dive Docs:**  
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html  
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html  
- https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html  
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html  
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-best-practices.html  
- https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html
