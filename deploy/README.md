# Despliegue — S3 + CloudFront + Route 53 (Terraform)

Sitio 100% estático en `https://jose.aetern.dev`: S3 privado, CloudFront con
cabeceras de seguridad y un registro dentro de la zona `aetern.dev`. No hay
servidor ni formulario. Es el Nivel 0 de `ESTRATEGIA-ESCALADO.md`.

La alerta de presupuesto de Aetern ya cubre esta cuenta completa.

## 1. Requisitos

`terraform` >= 1.10, `aws` CLI, `node` y `pnpm`. Usa un perfil IAM, **no root**:

```bash
aws sts get-caller-identity --profile <perfil>
```

## 2. State remoto (una sola vez por cuenta)

El bucket `tfstate-262623998832` guarda el state de Aetern y de este proyecto.
Lo crea el paso 1 del README de despliegue de Aetern.

## 3. Levantar la infraestructura

```bash
cd deploy/terraform
echo 'aws_profile = "<perfil>"' > terraform.tfvars
AWS_PROFILE=<perfil> terraform init
terraform apply
```

## 4. Publicar

```bash
cd deploy && ./deploy.sh <perfil>
```

Repite este paso cada vez que cambie el contenido. `terraform apply` solo hace
falta si cambia la infraestructura.

## 5. Destruir

```bash
terraform -chdir=deploy/terraform destroy
```

Borra el sitio, su certificado y sus registros DNS, sin dejar registros colgando
en `aetern.dev`. No toca nada más de esa zona.

## 6. Analytics

Si defines `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`, agrega también los dominios de Google
a la CSP en `terraform/main.tf`, o el navegador lo bloqueará.
