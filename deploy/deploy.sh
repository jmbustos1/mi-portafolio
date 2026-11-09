#!/usr/bin/env bash
# Construye el sitio, lo sube a S3 e invalida CloudFront. Correr DESPUÉS de
# `terraform apply`.
#
#   ./deploy.sh [aws_profile]
#
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
APP="$(cd "$HERE/.." && pwd)"
TFDIR="$HERE/terraform"
PROFILE="${1:-${AWS_PROFILE:-default}}"
export AWS_PROFILE="$PROFILE"   # también lo usa el backend remoto de Terraform

BUCKET="$(terraform -chdir="$TFDIR" output -raw site_bucket)"
DIST="$(terraform -chdir="$TFDIR" output -raw distribution_id)"
URL="$(terraform -chdir="$TFDIR" output -raw site_url)"

echo "→ Build estático…"
cd "$APP"
pnpm install --frozen-lockfile
pnpm run build

echo "→ Sync a S3…"
# Archivos con hash: cache inmutable. El resto: revalidar siempre.
aws s3 sync out/_next/static "s3://$BUCKET/_next/static" --profile "$PROFILE" \
  --cache-control "public,max-age=31536000,immutable"
aws s3 sync out/ "s3://$BUCKET/" --delete --exclude "_next/static/*" --profile "$PROFILE" \
  --cache-control "public,max-age=0,must-revalidate"
# Quita los chunks de builds anteriores sin haber dejado huecos durante la subida.
aws s3 sync out/_next/static "s3://$BUCKET/_next/static" --delete --size-only \
  --profile "$PROFILE" --cache-control "public,max-age=31536000,immutable"

echo "→ Invalidando CloudFront…"
aws cloudfront create-invalidation --distribution-id "$DIST" --paths '/*' --profile "$PROFILE" >/dev/null

echo "✓ Listo: $URL"
