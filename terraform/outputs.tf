output "instance_id" {
  description = "WanderWise EC2 instance ID"
  value       = aws_instance.wanderwise.id
}

output "public_ip" {
  description = "WanderWise EC2 public IP address"
  value       = aws_instance.wanderwise.public_ip
}
