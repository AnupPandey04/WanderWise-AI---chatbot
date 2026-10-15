# WanderWise AI — Terraform Infrastructure

Terraform configuration for tracking the existing WanderWise AI EC2 instance on AWS.

## Infrastructure

- **Provider:** AWS
- **Region:** `ap-south-1` (Mumbai)
- **Instance type:** `t3.micro`
- **Resource:** Existing EC2 instance

## Prerequisites

- Terraform installed
- AWS CLI authenticated with suitable permissions

## Commands

Initialize Terraform:

```bash
terraform init
```

Import the existing EC2 instance into a new local Terraform state:

```bash
terraform import aws_instance.wanderwise i-0d386aa85c28be4b9
```

Review proposed changes:

```bash
terraform plan
```

View outputs:

```bash
terraform output
```

**Important:** Import only when initializing a new state. Do not repeat it when the instance is already tracked.

## State security

Do not commit Terraform state files, credentials, or secret files. Review every plan before applying infrastructure changes.

This configuration manages the EC2 instance resource only; the referenced subnet and security group are not managed as Terraform resources.