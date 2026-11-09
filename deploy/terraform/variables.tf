variable "aws_region" {
  description = "Región AWS. CloudFront y su certificado ACM viven en us-east-1"
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "Perfil de AWS CLI a usar. No uses root"
  type        = string
  default     = "default"
}

variable "project_name" {
  description = "Prefijo para nombrar los recursos"
  type        = string
  default     = "mi-portafolio"
}

variable "zone_name" {
  description = "Zona existente en Route 53 donde se crea el subdominio"
  type        = string
  default     = "aetern.dev"
}

variable "domain_name" {
  description = "Dominio público del sitio"
  type        = string
  default     = "jose.aetern.dev"
}
