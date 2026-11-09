# Jose Bustos — portafolio

Sitio personal y blog: **https://jose.aetern.dev**

- **Framework:** Next.js 15 (export estático) + Tailwind CSS
- **Contenido:** MDX con Contentlayer (`src/content/`)
- **Infraestructura:** S3 + CloudFront + Route 53, con Terraform (Nivel 0 de `ESTRATEGIA-ESCALADO`)

## Correr en local

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

## Desplegar

Ver [`deploy/README.md`](deploy/README.md). En resumen:

```bash
cd deploy && ./deploy.sh <aws_profile>
```

## Créditos

Basado en [adarsha.dev](https://github.com/adarshaacharya/adarsha.dev) de Adarsha
Acharya, bajo licencia MIT. Ver [`LICENSE`](LICENSE).
