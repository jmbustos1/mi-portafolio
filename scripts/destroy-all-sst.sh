#!/bin/bash

echo "🗑️  Eliminando TODA la infraestructura SST..."

# 1. Destruir aplicación
echo ""
echo "1️⃣  Destruyendo aplicación..."
pnpm exec sst remove --stage prod || echo "⚠️  No hay aplicación para eliminar"

# 2. Desbloquear (por si acaso)
echo ""
echo "2️⃣  Desbloqueando stage..."
pnpm exec sst unlock --stage prod 2>/dev/null || true

# 3. Buscar y eliminar bucket de estado
echo ""
echo "3️⃣  Buscando bucket de estado..."
BUCKETS=$(aws s3 ls 2>/dev/null | grep -i sst | awk '{print $3}')

if [ -z "$BUCKETS" ]; then
    echo "   ✅ No se encontraron buckets SST"
else
    echo "   📦 Buckets encontrados:"
    echo "$BUCKETS" | sed 's/^/      - /'
    for BUCKET in $BUCKETS; do
        echo "   🗑️  Eliminando bucket: $BUCKET"
        aws s3 rb s3://$BUCKET --force 2>/dev/null || echo "   ⚠️  No se pudo eliminar $BUCKET"
    done
fi

# 4. Eliminar parámetros de Systems Manager
echo ""
echo "4️⃣  Eliminando parámetros de Systems Manager..."
aws ssm delete-parameter --name "/sst/bootstrap" 2>/dev/null && echo "   ✅ Eliminado /sst/bootstrap" || echo "   ⚠️  /sst/bootstrap no existe"
aws ssm delete-parameter --name "/sst/passphrase/mi-portafolio/prod" 2>/dev/null && echo "   ✅ Eliminado /sst/passphrase/mi-portafolio/prod" || echo "   ⚠️  /sst/passphrase/mi-portafolio/prod no existe"
aws ssm delete-parameter --name "/sst/passphrase/mi-portafolio/tecob" 2>/dev/null && echo "   ✅ Eliminado /sst/passphrase/mi-portafolio/tecob" || echo "   ⚠️  /sst/passphrase/mi-portafolio/tecob no existe"

# 5. Verificar limpieza
echo ""
echo "5️⃣  Verificando limpieza..."
echo ""
echo "📊 Buckets SST restantes:"
REMAINING_BUCKETS=$(aws s3 ls 2>/dev/null | grep -i sst)
if [ -z "$REMAINING_BUCKETS" ]; then
    echo "   ✅ Ninguno"
else
    echo "$REMAINING_BUCKETS"
fi

echo ""
echo "📊 Parámetros SST restantes:"
REMAINING_PARAMS=$(aws ssm describe-parameters --query "Parameters[?contains(Name, 'sst')].Name" --output text 2>/dev/null)
if [ -z "$REMAINING_PARAMS" ]; then
    echo "   ✅ Ninguno"
else
    echo "$REMAINING_PARAMS" | tr '\t' '\n' | sed 's/^/   - /'
fi

echo ""
echo "✅ Proceso completado!"
echo ""
echo "💡 Para deployar de nuevo: pnpm exec sst deploy --stage prod"

