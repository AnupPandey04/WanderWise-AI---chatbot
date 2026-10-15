terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = "ap-south-1"
  profile = "terraform"
}

resource "aws_instance" "wanderwise" {
  ami                    = "ami-0388e3ada3d9812da"
  instance_type          = "t3.micro"
  subnet_id              = "subnet-03d27f8e4e8776cb1"
  vpc_security_group_ids = ["sg-029a13d32063782a6"]
  key_name               = "wanderwise-key"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name = "WanderWise-Server"
  }
}
