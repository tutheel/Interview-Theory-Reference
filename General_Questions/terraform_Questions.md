# Terraform Interview Q&A (AWS Focus) - 50 Questions

## Core Concepts and Workflow

### 1) What is Terraform, and how is it different from CloudFormation?

**Answer:**

- Terraform is an Infrastructure as Code tool by HashiCorp that uses HCL.
- CloudFormation is AWS-native IaC using JSON/YAML templates.
- Terraform supports multi-cloud and a large provider ecosystem.
- CloudFormation has deeper AWS-native integrations (for example StackSets, some day-0 AWS feature support).
- Terraform state is explicit and central to operations; CloudFormation tracks stack state internally.

---

### 2) Explain the Terraform workflow: init -> plan -> apply (and where validate/fmt fit).

**Answer:**

- `terraform fmt` formats code (style/consistency).
- `terraform init` installs providers/modules and initializes backend.
- `terraform validate` checks syntax and internal consistency (typically after `init`).
- `terraform plan` shows proposed changes without applying.
- `terraform apply` executes approved changes.

```text
Author HCL
   |
   v
terraform fmt -> terraform init -> terraform validate -> terraform plan -> terraform apply
                                                          |
                                                          +-> review/approval in CI
```

---

### 3) What is the purpose of `terraform init -upgrade`?

**Answer:**

- Re-checks and upgrades provider and module versions to newer allowed versions.
- Honors version constraints in your code (it does not ignore constraints).
- Updates `.terraform.lock.hcl` with new selected provider versions and checksums.
- Use it intentionally (for example dependency upgrade PR), not on every pipeline run.

---

### 4) What is `.terraform.lock.hcl` and why is it important?

**Answer:**

- It locks exact provider versions and checksums.
- Makes runs reproducible across laptops and CI.
- Protects against unexpected provider upgrades and checksum mismatch issues.
- Should be committed to git for shared projects.

---

### 5) What are providers and how do you pin provider versions safely?

**Answer:**

- Providers are plugins Terraform uses to talk to APIs (AWS, Azure, GitHub, etc.).
- Pin versions in `required_providers` and commit lock file.
- Prefer bounded constraints (`~>`, or explicit tested ranges) to avoid surprise breaking changes.

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
```

---

### 6) What are resources vs data sources? Give AWS examples for both.

**Answer:**

- `resource` creates/manages infrastructure.
- `data` reads existing infrastructure without managing lifecycle.

```hcl
resource "aws_s3_bucket" "logs" {
  bucket = "my-team-logs-prod"
}

data "aws_caller_identity" "current" {}
```

- Example:
- `aws_s3_bucket` is managed by Terraform.
- `aws_caller_identity` is just looked up.

---

### 7) What are variables, locals, and outputs - when do you use each?

**Answer:**

- `variable`: external input into a module (env-specific values).
- `locals`: internal derived values to reduce repetition.
- `output`: values a module exposes to callers/other systems.

```hcl
variable "environment" {
  type = string
}

locals {
  name_prefix = "payments-${var.environment}"
}

output "name_prefix" {
  value = local.name_prefix
}
```

---

### 8) What is the difference between `terraform plan` and `terraform apply` in a CI pipeline?

**Answer:**

- `plan` is read + diff; no infrastructure change.
- `apply` mutates real infrastructure and state.
- Common pipeline pattern:
- PR pipeline runs `fmt`, `validate`, `plan`.
- Merge-to-main pipeline runs approved `apply`.
- Teams often save a plan artifact and apply that exact artifact.

---

### 9) How do you structure Terraform code for readability and reusability in a team?

**Answer:**

- Keep reusable modules in `modules/`.
- Keep environment stacks in separate folders (or repos if needed).
- Standard files: `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf`, `versions.tf`.
- Use naming conventions, tagging standards, and README per module.
- Add CI checks (`fmt -check`, `validate`, `tflint`, `tfsec` or equivalent).

```text
terraform/
  modules/
    vpc/
    lambda_api/
  envs/
    dev/
    stage/
    prod/
```

---

### 10) What are common causes of "works on my machine" issues in Terraform?

**Answer:**

- Different Terraform CLI versions.
- Different provider versions or missing lock file.
- Different credentials/account/region/profile.
- Local state on one machine instead of shared remote backend.
- Hidden local environment variables changing behavior.
- Manual cloud changes (drift) not reflected in expectations.

---

## State, Backends, Locking, Drift

### 11) What is the Terraform state file and why is it critical?

**Answer:**

- State maps Terraform addresses to real cloud resource IDs.
- Terraform uses it to calculate create/update/destroy actions.
- It stores metadata and dependency graph details.
- Losing or corrupting state can cause duplicate resources or accidental destroys.
- State often contains sensitive values, so it must be protected.

---

### 12) Local state vs remote state - tradeoffs and when to use which.

**Answer:**

- Local state:
- Simple for quick experiments.
- Not safe for team collaboration.
- Remote state:
- Shared, auditable, lockable, and safer for CI/team use.
- Required for serious environments (stage/prod).

Use local only for personal sandbox work; use remote for shared workloads.

---

### 13) How do you configure a backend, and what does a backend actually control?

**Answer:**

- Backend is configured in `terraform { backend "..." {} }`.
- Backend controls where state is stored and how locking/state operations happen.
- Backend does not control provider auth or resource behavior.

```hcl
terraform {
  backend "s3" {
    bucket         = "tf-state-prod"
    key            = "network/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tf-state-locks"
    encrypt        = true
  }
}
```

---

### 14) Why is remote state considered best practice for teams?

**Answer:**

- Single source of truth for all operators and CI.
- Supports locking to prevent concurrent state writes.
- Enables history/versioning and disaster recovery.
- Easier to secure (encryption, IAM, audit logging).
- Eliminates fragile local machine dependence.

---

### 15) What is state locking and how do you prevent state corruption?

**Answer:**

- Locking ensures only one write operation (`apply`, `state mv`, etc.) can mutate state at a time.
- Prevents race conditions where two runs overwrite each other.
- Use remote backend with locking support and keep CI applies serialized.
- Avoid bypassing locks except emergency recovery.

---

### 16) In AWS, how would you implement remote state + locking (S3 + DynamoDB conceptually)?

**Answer:**

- Store state in S3 bucket with encryption and versioning enabled.
- Use DynamoDB table for lock records.
- Restrict backend access with least-privilege IAM.
- Optionally enable bucket access logging/CloudTrail for audit.

```text
Terraform CLI/CI
      |
      | read/write state
      v
   +------------------+        acquire/release lock       +-------------------+
   | S3 state bucket  | <-------------------------------> | DynamoDB lock tbl |
   | versioned, SSE   |                                   | key: LockID (S)   |
   +------------------+                                   +-------------------+
```

---

### 17) What is "drift"? How do you detect and fix drift?

**Answer:**

- Drift means real infrastructure changed outside Terraform.
- Detect with `terraform plan` (or `plan -refresh-only` for state sync view).
- Fix by either:
- Updating Terraform code to match desired real-world state, then apply.
- Reverting manual cloud changes via Terraform apply.
- Importing unmanaged resources if needed.

---

### 18) When would you use `terraform refresh` (or refresh-like behavior) and what are the risks?

**Answer:**

- `terraform refresh` is deprecated behavior in modern workflows.
- Prefer `terraform plan -refresh-only` and optionally `terraform apply -refresh-only`.
- Use when you need to sync state with real infrastructure without changing config.
- Risk: refreshing state can hide unexpected manual changes if reviewed poorly.
- Always review diff before applying refresh-only updates.

---

### 19) What is `terraform state list` / `terraform state show` used for?

**Answer:**

- `terraform state list`: lists resource addresses tracked in state.
- `terraform state show <address>`: shows stored attributes for one state object.
- Useful for debugging imports, address refactors, and state troubleshooting.

---

### 20) Difference between `terraform state mv` vs `terraform state rm` (use cases).

**Answer:**

- `state mv` moves state address mapping (for refactors/renames/module moves).
- `state rm` removes object from state but does not destroy cloud resource.

Use `mv` when resource still managed but address changes.  
Use `rm` when you intentionally stop managing a resource (or before re-importing cleanly).

---

### 21) How do you recover if state is lost/corrupted?

**Answer:**

- Stop all applies immediately.
- Restore latest valid backend snapshot/version (for example S3 object version).
- Run `terraform init` and verify with `terraform state list`.
- Re-import missing resources if required.
- Validate with `plan` before any `apply`.
- Add stronger backup/versioning + access controls to prevent repeat.

---

### 22) What happens if two engineers run apply at the same time on the same state?

**Answer:**

- With proper locking: one run acquires lock, second waits or fails.
- Without locking: race conditions can produce corrupted/outdated state and unsafe infra changes.
- Team fix: enforce remote backend lock + single deployment pipeline path.

---

## Workspaces and Multi-Environment Patterns

### 23) What are Terraform workspaces and what problem do they solve?

**Answer:**

- Workspaces give multiple state files for the same configuration.
- They help isolate environments that share almost identical topology.
- Useful for ephemeral environments (feature branches, short-lived sandboxes).

```text
same code
   |
   +--> workspace: dev   -> state A
   +--> workspace: stage -> state B
   +--> workspace: prod  -> state C
```

---

### 24) When are workspaces a bad idea (multi-account/prod complexity)?

**Answer:**

- Bad when environments differ significantly in architecture.
- Risky when prod uses different account/permissions/guardrails.
- Easy to accidentally run in wrong workspace.
- Harder governance when compliance boundaries require strict separation.

---

### 25) Preferred pattern for dev/stage/prod: workspaces vs separate backends vs separate repos - why?

**Answer:**

- Most teams: one codebase + separate environment directories + separate backend/state per env.
- For strong isolation: separate AWS accounts per env and separate backend per account.
- Workspaces are best for lightweight same-shape environments, not complex prod isolation.
- Separate repos only when ownership/release cadence/security boundaries differ heavily.

---

### 26) How do you reference outputs from another environment (remote state/data source strategy)?

**Answer:**

- Option 1: `terraform_remote_state` to read outputs from another stack.
- Option 2: publish values into SSM Parameter Store/Secrets Manager and read via data sources.
- Prefer explicit contracts (stable outputs) to reduce brittle coupling.

```hcl
data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "tf-state-prod"
    key    = "network/terraform.tfstate"
    region = "us-east-1"
  }
}
```

---

### 27) How does HCP Terraform / Terraform Enterprise handle workspace state (high level)?

**Answer:**

- State is remote and managed per workspace automatically.
- Runs are queued, state locking is built in.
- Provides state history, RBAC, audit trails, policy checks, and variable management.
- Removes manual backend plumbing from local CLI workflows.

---

## Modules and Reusable Design

### 28) What is a module? How do you design a "good" module boundary?

**Answer:**

- Module = reusable Terraform package (`.tf` files) with inputs/outputs.
- Good boundary is capability-based (for example `vpc`, `lambda_service`, `rds_instance`).
- Keep interface small and stable; avoid exposing every low-level knob.
- Avoid giant "do everything" modules.

```text
root stack
  |
  +-- module.vpc
  +-- module.compute_service
  +-- module.observability
```

---

### 29) How do you version modules (git tags, registry) and roll out safely?

**Answer:**

- Version modules with semantic tags (`v1.2.3`) or registry releases.
- Pin module versions in callers.
- Roll out in sequence: dev -> stage -> prod.
- Use changelog + upgrade notes for each version.

```hcl
module "vpc" {
  source  = "git::https://github.com/org/tf-modules.git//vpc?ref=v1.4.2"
  cidr    = var.vpc_cidr
}
```

---

### 30) How do you pass variables into modules and expose outputs cleanly?

**Answer:**

- Define typed inputs with defaults/validation in `variables.tf`.
- Pass only needed values from root module.
- Expose minimal outputs needed by consumers.
- Mark sensitive outputs/variables as `sensitive = true` when required.

```hcl
module "api" {
  source      = "../../modules/lambda_api"
  environment = var.environment
  tags        = local.tags
}

output "api_url" {
  value = module.api.invoke_url
}
```

---

### 31) How do you avoid duplicating code across multiple services (Lambda/API/DB stacks)?

**Answer:**

- Build shared modules for repeated patterns.
- Use maps + `for_each` to instantiate similar services.
- Keep environment-specific values in `*.tfvars` or env folders.
- Compose modules rather than copy/paste stacks.

---

### 32) How do you handle breaking changes in modules without breaking prod?

**Answer:**

- Use semantic versioning; breaking change => major version bump.
- Keep old major version available while migrating callers.
- Test upgrade path in non-prod first.
- Document migration steps and rollback plan.
- Avoid forced one-shot migration across all stacks.

---

## Meta-Arguments and Dependency Control

### 33) `count` vs `for_each` - when do you choose which?

**Answer:**

- Use `count` for simple N identical instances.
- Use `for_each` for keyed instances where identity must be stable.
- `for_each` avoids index-shift churn when one element is removed.

```hcl
resource "aws_iam_user" "users" {
  for_each = toset(["alice", "bob", "carol"])
  name     = each.key
}
```

---

### 34) What is `depends_on` and when is it actually necessary?

**Answer:**

- Terraform usually infers dependencies from references.
- `depends_on` is for hidden/side-effect dependencies not visible in expressions.
- Use sparingly; overuse creates slower, less parallel plans/applies.

```hcl
resource "aws_lambda_function" "fn" {
  # ...
  depends_on = [aws_iam_role_policy_attachment.lambda_basic]
}
```

---

### 35) Explain `lifecycle`: `create_before_destroy`, `prevent_destroy`, `ignore_changes`.

**Answer:**

- `create_before_destroy`: create replacement first, then destroy old.
- `prevent_destroy`: blocks accidental destroys.
- `ignore_changes`: ignore diffs for specific attributes managed externally.

```hcl
resource "aws_launch_template" "app" {
  # ...
  lifecycle {
    create_before_destroy = true
    ignore_changes        = [description]
  }
}
```

---

### 36) What is the "replace" behavior (force recreation) and when would you use it?

**Answer:**

- Replace means Terraform destroys and recreates a resource.
- Triggered automatically for immutable attribute changes, or manually using `-replace`.
- Use when resource is unhealthy, immutable field changed, or state/resource mismatch is irreparable.

```bash
terraform apply -replace=aws_instance.web
```

---

### 37) How do you manage "immutable" infra changes (for example replacing ASG/Launch Template patterns)?

**Answer:**

- Use Launch Template versioning.
- Roll ASG instances gradually (instance refresh or blue/green approach).
- Keep old capacity until new instances pass health checks.
- Avoid in-place mutation for risky changes.

```text
new Launch Template version
          |
          v
ASG starts rolling replacement
old instances -> drain -> terminate
new instances -> health check -> serve traffic
```

---

## Importing Existing AWS Resources

### 38) How do you bring existing AWS resources under Terraform management?

**Answer:**

1. Write resource blocks that match the real resource config.
2. Run import for each object (CLI import or import blocks).
3. Run `terraform plan` and reconcile differences.
4. Iterate until plan is clean.

---

### 39) `terraform import` vs newer "import blocks" workflow - what is the difference?

**Answer:**

- `terraform import` (CLI): imperative one-off command, updates state directly.
- `import` block: declarative in code, reviewable in PR, applied through normal workflow.

```hcl
import {
  to = aws_s3_bucket.logs
  id = "my-team-logs-prod"
}
```

```text
Old flow: write code -> run CLI import manually -> plan
New flow: write code + import block -> plan/apply in CI -> import recorded in workflow
```

---

### 40) What are the common pitfalls after import (diff noise, missing arguments, drift)?

**Answer:**

- Missing required arguments in code lead to planned updates/destroys.
- Provider defaults differ from real settings.
- Unmanaged tags/policies create unexpected diffs.
- Address mistakes during import map wrong object to wrong resource block.
- Fix by incrementally adding exact config until plan is stable.

---

## AWS-Focused Terraform

### 41) How do you configure AWS provider for multiple accounts (assume role, multiple providers with aliases)?

**Answer:**

- Define one provider per account/region with aliases.
- Use `assume_role` for cross-account access.
- Pass provider aliases into modules explicitly.

```hcl
provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  alias  = "prod"
  region = "us-east-1"
  assume_role {
    role_arn = "arn:aws:iam::123456789012:role/terraform-prod-role"
  }
}

module "prod_network" {
  source    = "../../modules/vpc"
  providers = { aws = aws.prod }
  cidr      = "10.20.0.0/16"
}
```

```text
CI OIDC/User -> Mgmt account role -> AssumeRole -> Target account role(s)
```

---

### 42) How do you manage IAM least-privilege for Terraform execution (CI user/role)?

**Answer:**

- Use dedicated Terraform execution role, not personal users.
- Scope permissions by service, account, region, and environment.
- Split permissions by pipeline stage if needed (read-heavy plan vs write apply).
- Use short-lived credentials (OIDC/STS), not long-lived static keys.
- Log and monitor AssumeRole events.

---

### 43) How do you manage secrets in Terraform (and what NOT to do)?

**Answer:**

- Pull secrets from AWS Secrets Manager or SSM Parameter Store at runtime.
- Mark sensitive values as `sensitive = true` where possible.
- Remember: `sensitive` hides CLI output but does not remove the value from state.
- Encrypt remote state and tightly restrict state access.
- Do not hardcode secrets in `.tf` or commit `.tfvars` with secrets.
- Do not output secret values in plain outputs/logs.

---

### 44) How would you provision Lambda + API Gateway with Terraform (key resources involved)?

**Answer:**

- Package/deploy Lambda (`aws_lambda_function`, IAM role/policies, log group).
- Create API Gateway HTTP API or REST API resources/routes/integrations.
- Add invoke permissions from API Gateway to Lambda.
- Optionally add custom domain, WAF, throttling, alarms.

```text
Client
  |
  v
API Gateway -----> Lambda -----> DynamoDB/SQS/other services
    |                 |
    |                 +-> CloudWatch Logs
    +-> Access logs/metrics
```

---

### 45) How would you provision DynamoDB with best practices (keys, TTL, autoscaling, encryption)?

**Answer:**

- Model partition/sort keys for access patterns first.
- Enable Point-in-Time Recovery.
- Enable server-side encryption (AWS owned or KMS CMK).
- Use TTL for expiring ephemeral items.
- Choose billing mode intentionally (`PAY_PER_REQUEST` or provisioned with autoscaling).
- Add GSIs only when query patterns require them.

---

### 46) How do you manage tagging standards across all AWS resources via Terraform?

**Answer:**

- Set global tags with provider `default_tags`.
- Merge module/resource-specific tags with required baseline tags.
- Enforce required tags via policy checks or lint rules.

```hcl
provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      owner       = "platform-team"
      environment = var.environment
      managed_by  = "terraform"
    }
  }
}
```

---

### 47) How do you handle region-specific deployments and multi-region patterns?

**Answer:**

- Use provider aliases per region.
- Instantiate modules per region (`for_each` over region map).
- Keep state separated per region/environment.
- Design for failover/data replication explicitly (not just duplicate compute).

```text
           +---------------------------+
           | shared module definition  |
           +---------------------------+
                    /           \
                   /             \
            provider.aws.use1   provider.aws.usw2
                 |                   |
             stack us-east-1     stack us-west-2
```

---

## Troubleshooting and Debugging

### 48) Why might Terraform show changes every time ("perpetual diff") and how do you fix it?

**Answer:**

- Unstable/computed values (timestamps, random ordering, latest AMI).
- External systems mutating managed attributes.
- Provider bugs or API normalization differences.
- Fixes:
- Pin deterministic inputs.
- Normalize data structures (sorting/maps).
- Use `ignore_changes` only for truly external attributes.
- Upgrade provider if issue is known/fixed.

---

### 49) How do you debug provider/auth errors and state lock issues in CI?

**Answer:**

- Verify identity first (`aws sts get-caller-identity` equivalent in pipeline step).
- Check region/profile/env var mismatch.
- Enable Terraform logs when needed:

```bash
export TF_LOG=DEBUG
terraform init
terraform plan
```

- For lock issues, inspect lock holder and confirm stuck job before any unlock.
- Use `terraform force-unlock <LOCK_ID>` only after verifying no active apply.

---

### 50) What steps do you take when plan looks correct but apply fails halfway?

**Answer:**

- Do not panic or manually "fix everything" immediately.
- Read exact failing resource/error and correct root cause (permissions, quota, dependency, API limit).
- Re-run `terraform plan` to inspect partial progress from first apply.
- Re-run `apply`; Terraform resumes based on updated state.
- Use targeted apply only as controlled emergency action, then return to full plan/apply.

```text
apply failed mid-run
      |
      v
inspect error -> fix cause -> plan again -> apply again
                         |
                         +-> if partial resources exist, Terraform reconciles from state
```
