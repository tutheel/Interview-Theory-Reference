# Terraform Reference Guide

A practical Terraform reference for learning, interviews, and day-to-day use.

This document covers:

- What Terraform is and where it fits
- Architecture and workflow
- Core HCL building blocks
- State, backends, locking, and security
- Variables, locals, outputs, modules, and workspaces
- Drift, import, debugging, and common production scenarios

---

## Table of Contents

- 1. Terraform in one minute
- 2. Terraform architecture
- 3. Core workflow and commands
- 4. Terraform configuration anatomy
- 5. State, backends, locking, and secrets
- 6. Variables, locals, outputs, and `.tfvars`
- 7. Modules and project structure
- 8. `count`, `for_each`, dependencies, lifecycle, and dynamic blocks
- 9. Environments, workspaces, and team workflows
- 10. Drift, import, troubleshooting, and debugging
- 11. Common interview scenarios
- 12. Best practices checklist
- 13. Quick command reference

---

## 1. Terraform in one minute

Terraform is an Infrastructure as Code (IaC) tool from HashiCorp.
You describe the desired state of infrastructure in code, and Terraform figures out what to create, update, or destroy to reach that state.

Typical resources Terraform manages:

- Virtual machines
- Networks and subnets
- Load balancers
- Databases
- DNS records
- IAM roles and policies
- SaaS resources such as GitHub, Datadog, Cloudflare, or Vault

### Why teams use Terraform

- Infrastructure is version controlled
- Environments become repeatable
- Reviews happen before changes are applied
- Multi-cloud and hybrid environments can be managed with one workflow
- Manual console drift is reduced

### Declarative vs imperative

| Style | Focus | Example |
| --- | --- | --- |
| Declarative | Describe the end state | "I want 3 app servers in this subnet" |
| Imperative | Describe the exact steps | "Create VM 1, then VM 2, then install X" |

Terraform is declarative.
You define what infrastructure should exist, not every API call required to build it.

### Terraform vs configuration management tools

| Tool type | Primary job |
| --- | --- |
| Terraform | Provision and manage infrastructure resources |
| Ansible / Chef / Puppet | Configure software on machines that already exist |

Simple rule:

- Terraform is strongest at provisioning
- Configuration tools are strongest at software setup inside hosts

Terraform can work with cloud and on-prem environments as long as there is a provider for the target platform.

---

## 2. Terraform architecture

Terraform works through a small set of core building blocks:

- Configuration files written in HCL
- Terraform CLI / core engine
- Provider plugins
- State file
- Backend for storing state
- Registry for downloading providers and modules
- Target platform APIs such as AWS, Azure, GCP, VMware, GitHub, or Kubernetes

### Architecture diagram

```text
Developer / CI / Terraform Cloud
              |
              v
      Terraform CLI / Core
       |       |        |
       |       |        +--> downloads providers and modules
       |       |             from the Terraform Registry
       |       |
       |       +--> reads and writes state
       |
       +--> parses HCL configuration (.tf files)
                      |
                      v
               Provider plugins
      (AWS / Azure / GCP / VMware / SaaS)
                      |
                      v
                 Remote APIs
                      |
                      v
              Real infrastructure
```

### Terraform architecture in plain English

- You write `.tf` files
- Terraform reads that configuration
- Terraform loads the required providers
- Terraform compares desired state with current state
- Terraform calls provider APIs to make changes
- Terraform writes the updated state back to the backend

### Core components

#### 1. CLI

The CLI is the entry point.
You use commands like `terraform init`, `terraform plan`, and `terraform apply`.

#### 2. Core engine

Terraform core:

- Parses HCL
- Builds a dependency graph
- Compares configuration with state
- Produces a plan
- Executes the graph in dependency order

#### 3. Providers

Providers are plugins that know how to talk to a specific API.

Examples:

- `hashicorp/aws`
- `hashicorp/azurerm`
- `hashicorp/google`
- `hashicorp/kubernetes`
- `hashicorp/vault`

#### 4. State

State is Terraform's record of what it manages.
It maps your configuration to real infrastructure and helps Terraform calculate changes accurately.

#### 5. Registry

The Terraform Registry is where providers and reusable modules are downloaded from.

### Optional image placement

If you want to embed the architecture image you shared, save it as `Terraform/assets/terraform-architecture.png` and use:

```md
![Terraform Architecture](./assets/terraform-architecture.png)
```

---

## 3. Core workflow and commands

The Terraform workflow is usually:

```text
Write -> Format -> Init -> Validate -> Plan -> Apply -> Verify
```

### Workflow diagram

```text
1. Write HCL
      |
      v
2. terraform fmt
      |
      v
3. terraform init
      |
      v
4. terraform validate
      |
      v
5. terraform plan
      |
      v
6. terraform apply
      |
      v
7. State updated
```

### Most common commands

| Command | Purpose |
| --- | --- |
| `terraform fmt` | Format configuration files |
| `terraform init` | Initialize providers, modules, and backend |
| `terraform validate` | Validate syntax and configuration structure |
| `terraform plan` | Preview changes |
| `terraform apply` | Apply changes |
| `terraform destroy` | Remove managed infrastructure |
| `terraform output` | Show outputs |
| `terraform state list` | List resources in state |
| `terraform state show` | Show details for one state object |
| `terraform workspace list` | Show workspaces |

### Example workflow

```bash
terraform fmt -recursive
terraform init
terraform validate
terraform plan -out=tfplan
terraform apply tfplan
```

### Why `terraform init` matters

`terraform init` prepares the working directory by:

- Downloading providers
- Downloading modules
- Initializing the configured backend
- Creating the `.terraform` working directory

You must run it:

- In a new Terraform project
- After changing providers
- After changing backend settings
- After adding or updating modules

### `terraform plan` vs `terraform apply`

| Command | What it does |
| --- | --- |
| `terraform plan` | Shows what Terraform wants to change |
| `terraform apply` | Executes those changes |

### `terraform apply` vs `terraform apply tfplan`

`terraform apply` without a saved plan:

- Creates a new plan
- Prompts for approval
- Applies the plan

`terraform apply tfplan`:

- Applies the exact saved plan file
- Avoids plan drift between review and apply
- Is better for CI/CD workflows

---

## 4. Terraform configuration anatomy

Terraform configurations are written in HCL, which is a human-readable language designed for infrastructure configuration.

### Main building blocks

- `terraform` block
- `provider` block
- `resource` block
- `data` block
- `variable` block
- `locals` block
- `output` block
- `module` block

### Starter example

```hcl
terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

locals {
  common_tags = {
    Project     = "terraform-reference"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

resource "aws_s3_bucket" "logs" {
  bucket = "terraform-reference-${var.environment}-logs-demo"
  tags   = local.common_tags
}

output "bucket_name" {
  value = aws_s3_bucket.logs.id
}
```

### What each block does

#### `terraform`

Defines Terraform-wide settings such as:

- Minimum required Terraform version
- Required providers
- Backend configuration

#### `provider`

Tells Terraform which API to talk to and how.

#### `resource`

Declares an actual infrastructure object to create or manage.

#### `data`

Reads information from an external system without creating the resource.

Example:

```hcl
data "aws_caller_identity" "current" {}

output "account_id" {
  value = data.aws_caller_identity.current.account_id
}
```

#### `variable`

Defines an input to your configuration.

#### `locals`

Defines named expressions to avoid repetition and improve readability.

#### `output`

Exposes values after `apply` or returns values from a child module to its parent.

---

## 5. State, backends, locking, and secrets

### What is the Terraform state file?

The state file is Terraform's record of the infrastructure it manages.
It is usually stored as JSON and commonly named `terraform.tfstate` when using local state.

Terraform uses state to:

- Track resource IDs
- Map resources in code to real resources
- Understand dependencies
- Compare previous and desired state
- Detect drift

### Why state matters

Without state, Terraform cannot safely understand what already exists and what needs to change.

### Local state vs remote state

| Storage type | Typical use |
| --- | --- |
| Local state | Small personal experiments |
| Remote state | Team environments and production |

### Why remote state is a best practice

- Shared source of truth
- Better collaboration
- State locking
- Versioning and recovery
- Encryption at rest
- Centralized access control

### State lifecycle diagram

```text
Configuration (.tf files)
         +
Current state
         +
Provider reads real infrastructure
         |
         v
   terraform plan
         |
         v
 Execution plan
         |
         v
  terraform apply
         |
         v
Infrastructure updated
         |
         v
State written back to backend
```

### Backend example with S3

```hcl
terraform {
  backend "s3" {
    bucket       = "company-terraform-state"
    key          = "networking/prod.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}
```

Recommended additions around that backend:

- Enable S3 bucket versioning
- Enable encryption
- Restrict access with IAM
- Do not hardcode credentials in the backend block

### What is state locking?

State locking prevents two people or pipelines from updating the same state at the same time.
That avoids race conditions and state corruption.

### Why you should not manually edit `terraform.tfstate`

Manual edits can:

- Corrupt the file
- Break Terraform's mapping to real resources
- Cause destructive plans
- Make future changes unreliable

If you must manipulate state, prefer safe commands such as:

- `terraform state list`
- `terraform state show`
- `terraform state rm`
- `terraform state mv`

### Sensitive values and state

Important rule:

- Marking a variable as `sensitive = true` hides it in CLI output
- It does not automatically keep it out of state

Example:

```hcl
variable "db_password" {
  type      = string
  sensitive = true
}
```

Best practices for secrets:

- Use a secrets manager such as AWS Secrets Manager, Vault, or Azure Key Vault
- Keep state in an encrypted remote backend
- Restrict who can read the state
- Avoid hardcoding secrets in `.tf` files or `.tfvars`

Modern Terraform note:

- In newer Terraform versions, `ephemeral = true` can be used in supported places to omit temporary sensitive values from state and plan files

Example of reading a secret:

```hcl
data "aws_secretsmanager_secret_version" "db" {
  secret_id = "prod/database/password"
}
```

Important note:

- If a secret is used in managed resources, that value may still end up in state
- Treat state as sensitive data

### Recovering from state issues

If the state becomes corrupted or lost:

- Recover it from remote backend versioning if possible
- Re-import resources if necessary
- Avoid rebuilding state manually unless there is no safer option

---

## 6. Variables, locals, outputs, and `.tfvars`

### Input variables

Input variables parameterize your configuration.
They are the external inputs to a module.

```hcl
variable "environment" {
  type        = string
  description = "Environment name such as dev, stage, or prod"
}
```

### Local values

Locals are named expressions used only inside the current module.
They help avoid duplication.

```hcl
locals {
  name_prefix = "app-${var.environment}"
}
```

### Outputs

Outputs expose values after apply or pass values from child modules to parent modules.

```hcl
output "vpc_id" {
  value = aws_vpc.main.id
}
```

### Input variables vs locals

| Feature | Input variable | Local value |
| --- | --- | --- |
| Source | Passed from outside the module | Defined inside the module |
| Purpose | Parameterize configuration | Simplify repeated expressions |
| Similar to | Function parameter | Local variable inside a function |

### Ways to assign variable values

Common options:

- Default value in the `variable` block
- `terraform.tfvars`
- `*.auto.tfvars`
- `-var` on the command line
- `-var-file`
- Environment variables prefixed with `TF_VAR_`

### Example `.tfvars`

```hcl
environment   = "prod"
aws_region    = "us-east-1"
instance_type = "t3.medium"
```

### Using a variable file

```bash
terraform plan -var-file=prod.tfvars
```

### Environment variable example

```bash
$env:TF_VAR_environment = "dev"
$env:TF_VAR_aws_region = "us-east-1"
```

---

## 7. Modules and project structure

### What is a module?

A module is a container for a set of related resources.
Terraform modules are used to organize, reuse, and standardize infrastructure code.

### Why modules matter

- Reduce duplication
- Improve maintainability
- Standardize patterns across teams
- Hide implementation details behind clear inputs and outputs

### Root module vs child module

| Type | Meaning |
| --- | --- |
| Root module | The directory where you run Terraform commands |
| Child module | A module called from another module using a `module` block |

### Typical Terraform project structure

```text
terraform-project/
|-- main.tf
|-- variables.tf
|-- outputs.tf
|-- terraform.tfvars
|-- versions.tf
|-- providers.tf
`-- modules/
    |-- network/
    |   |-- main.tf
    |   |-- variables.tf
    |   `-- outputs.tf
    `-- app/
        |-- main.tf
        |-- variables.tf
        `-- outputs.tf
```

### Local module example

```hcl
module "network" {
  source     = "./modules/network"
  cidr_block = "10.0.0.0/16"
}
```

### Registry module example

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "main"
  cidr = "10.0.0.0/16"
}
```

### Why version pinning matters

Without version pinning, a future `terraform init` may download a newer module version with breaking changes.

Pin versions for:

- Providers
- Modules
- Terraform CLI version

---

## 8. `count`, `for_each`, dependencies, lifecycle, and dynamic blocks

These are some of the most important Terraform patterns for real-world code.

### `count` vs `for_each`

| Feature | `count` | `for_each` |
| --- | --- | --- |
| Input type | Number | Map or set |
| Identity | Index-based | Key-based |
| Best for | Near-identical copies | Resources with stable identities |
| Risk | Re-indexing can recreate resources | More stable when collection changes |

### `count` example

```hcl
resource "aws_instance" "web" {
  count         = 2
  ami           = "ami-1234567890abcdef0"
  instance_type = "t3.micro"
}
```

### `for_each` example

```hcl
resource "aws_instance" "web" {
  for_each = {
    api    = "t3.micro"
    worker = "t3.small"
  }

  ami           = "ami-1234567890abcdef0"
  instance_type = each.value

  tags = {
    Name = each.key
  }
}
```

### When to choose `for_each`

Prefer `for_each` when:

- Resources have unique names
- Resources may be added or removed later
- You want stable identity based on keys instead of indexes

### Conditional resource creation

```hcl
resource "aws_instance" "bastion" {
  count         = var.create_bastion ? 1 : 0
  ami           = "ami-1234567890abcdef0"
  instance_type = "t3.micro"
}
```

### Implicit dependencies

Terraform automatically creates a dependency when one resource references another.

```hcl
resource "aws_security_group" "web" {
  name = "web-sg"
}

resource "aws_instance" "app" {
  ami             = "ami-1234567890abcdef0"
  instance_type   = "t3.micro"
  security_groups = [aws_security_group.web.name]
}
```

### Explicit dependencies with `depends_on`

Use `depends_on` only when Terraform cannot infer the dependency from references.

```hcl
resource "aws_instance" "app" {
  ami           = "ami-1234567890abcdef0"
  instance_type = "t3.micro"

  depends_on = [aws_security_group.web]
}
```

### Dynamic blocks

Dynamic blocks help generate repeated nested blocks.

Common use case: security group rules.

```hcl
variable "ingress_ports" {
  type    = list(number)
  default = [80, 443]
}

resource "aws_security_group" "web" {
  name = "web-sg"

  dynamic "ingress" {
    for_each = var.ingress_ports

    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}
```

### Lifecycle rules

Lifecycle rules influence how Terraform treats a resource.

Useful options:

- `prevent_destroy`
- `create_before_destroy`
- `ignore_changes`

Example:

```hcl
resource "aws_s3_bucket" "important" {
  bucket = "company-prod-audit-logs"

  lifecycle {
    prevent_destroy = true
  }
}
```

### Provisioners

Provisioners run scripts during create or destroy operations.
They are considered a last resort because Terraform cannot model their internal actions well.

Prefer:

- Cloud-init / `user_data`
- Prebuilt images with Packer
- Configuration management tools

---

## 9. Environments, workspaces, and team workflows

### Managing environments

Common environments:

- `dev`
- `stage`
- `prod`

Popular patterns:

- Separate root modules or folders per environment
- Shared modules plus environment-specific variable files
- Separate remote state per environment

### Workspaces

Terraform workspaces let you keep multiple state snapshots for the same configuration.

Common commands:

```bash
terraform workspace list
terraform workspace new dev
terraform workspace select prod
```

### Workspaces vs modules

| Concept | Purpose |
| --- | --- |
| Workspaces | Separate state for the same configuration |
| Modules | Reusable pieces of configuration |

### Important workspace nuance

Workspaces are useful, but they are not a complete environment strategy.
For serious production setups, teams often prefer separate root modules, separate state, and explicit environment directories instead of relying only on workspaces, especially when environments require separate credentials or access controls.

### Team-safe workflow

```text
Git change
   |
   v
terraform fmt + validate
   |
   v
terraform plan
   |
   v
review and approval
   |
   v
terraform apply saved plan
```

### CI/CD recommendations

- Run `terraform fmt -check`
- Run `terraform validate`
- Run `terraform plan`
- Require review for plan output
- Apply the reviewed plan
- Use remote state with locking

---

## 10. Drift, import, troubleshooting, and debugging

### What is drift?

Drift happens when real infrastructure no longer matches Terraform code or state.

Common causes:

- Manual console changes
- External automation outside Terraform
- Failed or partial applies
- Provider-side defaults changing over time

### How to detect drift

Run:

```bash
terraform plan
```

If Terraform shows changes but your code did not change, investigate for drift.

### How to remediate drift

Choose one of these paths:

- Update Terraform code to match the real-world change
- Run `terraform apply` to move infrastructure back to the declared state

### Importing existing infrastructure

Import lets Terraform start managing resources that already exist.

Example:

```bash
terraform import aws_s3_bucket.logs my-existing-logs-bucket
```

Important note:

- Import updates state
- It does not fully write the matching configuration for you
- Your `.tf` configuration must match the imported resource or Terraform may want to change or recreate it later

### Useful troubleshooting commands

```bash
terraform validate
terraform plan
terraform state list
terraform state show aws_instance.web
terraform output
terraform console
```

### Debug logging

```bash
$env:TF_LOG = "DEBUG"
terraform apply
```

Reset after use:

```bash
Remove-Item Env:TF_LOG
```

### Common reasons Terraform wants to recreate a resource

- You changed a ForceNew argument for that resource type
- A resource was renamed without moving state
- `count` indexes shifted
- The provider sees the change as immutable

### Important correction: duplicate resource handling

There is no general `terraform apply -ignore_duplicate` flag for ignoring duplicate resource errors.

If Terraform says a resource already exists, the correct fixes are usually:

- Import the existing resource
- Change your naming or uniqueness logic
- Use a data source if the resource should be read, not created

---

## 11. Common interview scenarios

### Scenario 1: A team member changed infrastructure manually in the cloud console

What to do:

- Run `terraform plan`
- Identify whether the manual change should stay or be reverted
- Update code if the change is valid
- Run `terraform apply` if Terraform should restore the declared state

Prevention:

- Restrict manual console changes
- Require Terraform-based changes through Git and review

### Scenario 2: A critical resource is about to be deleted accidentally

Use lifecycle protection:

```hcl
resource "aws_s3_bucket" "important" {
  bucket = "company-prod-backups"

  lifecycle {
    prevent_destroy = true
  }
}
```

### Scenario 3: Multiple engineers are applying changes at the same time

Fix:

- Use remote state
- Enable state locking
- Review plans before apply
- Avoid ad hoc local applies against production

### Scenario 4: You need secrets in Terraform

Safe approach:

- Retrieve them from a secrets manager
- Mark input variables as `sensitive`
- Secure the backend because state may still contain sensitive values

### Scenario 5: `terraform apply` wants to recreate a production database

What to check:

- Did you modify an immutable argument?
- Does the provider mark that field as ForceNew?
- Can the change be made in place instead?

Safer recovery pattern:

- Create the replacement resource
- Migrate traffic or data
- Remove the old resource after cutover

### Scenario 6: A resource already exists, but Terraform wants to create it

Common fix:

- Import the resource into state
- Add or correct the corresponding `.tf` configuration
- Re-run `terraform plan`

### Scenario 7: You want reusable infrastructure across many projects

Use modules:

- Create a reusable child module
- Expose inputs with variables
- Expose outputs for parent modules
- Pin module versions for repeatability

### Scenario 8: You want Terraform in CI/CD

Good pipeline shape:

```text
fmt/check -> validate -> plan -> human approval -> apply saved plan
```

---

## 12. Best practices checklist

- Keep Terraform code in version control
- Use remote state for shared environments
- Enable locking and backend versioning
- Review `terraform plan` before apply
- Apply saved plans in CI/CD
- Pin Terraform, provider, and module versions
- Use modules to remove duplication
- Prefer `for_each` when resource identity matters
- Avoid manual edits to state
- Treat state as sensitive data
- Avoid provisioners unless there is no better option
- Restrict manual cloud-console changes in managed environments
- Separate environments clearly with state isolation

---

## 13. Quick command reference

### Core commands

```bash
terraform fmt -recursive
terraform init
terraform validate
terraform plan
terraform plan -out=tfplan
terraform apply
terraform apply tfplan
terraform destroy
```

### State commands

```bash
terraform state list
terraform state show aws_instance.web
terraform state rm aws_instance.old_web
terraform state mv aws_instance.old aws_instance.new
```

### Workspace commands

```bash
terraform workspace list
terraform workspace new dev
terraform workspace select prod
terraform workspace delete dev
```

### Variable usage examples

```bash
terraform plan -var="environment=dev"
terraform plan -var-file=prod.tfvars
```

### Import example

```bash
terraform import aws_s3_bucket.logs my-existing-logs-bucket
```

---

## Final summary

Terraform is strongest when you treat infrastructure like application code:

- Define desired state in HCL
- Review every change through `plan`
- Keep state secure and shared properly
- Reuse modules instead of copy-pasting infrastructure
- Prefer safe, predictable workflows over manual cloud changes

If you are preparing for interviews, the most important topics to speak clearly about are:

- Declarative IaC
- State and remote backends
- Providers and resources
- Modules and reuse
- `count` vs `for_each`
- Drift, import, and debugging
- Collaboration, locking, and CI/CD safety
