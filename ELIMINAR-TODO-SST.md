# 🗑️ Cómo Eliminar TODA la Infraestructura SST

## 🔒 ¿Qué es el "Unlock"?

**El lock es un mecanismo de seguridad** que SST usa para evitar que dos personas hagan deploy al mismo tiempo.

**Cómo funciona:**
- Cuando haces `sst deploy`, SST crea un "lock" en el bucket de estado
- Si otro proceso intenta deployar, detecta el lock y falla
- Si el proceso se interrumpe (Ctrl+C), el lock queda activo

**Por eso ves:**
```
|  Locked      A concurrent update was detected on the app.
```

**Solución:**
```bash
pnpm exec sst unlock --stage prod
```

**Es solo una medida de seguridad**, no es un recurso AWS real.

---

## 🗑️ Eliminar TODA la Infraestructura SST

### Paso 1: Destruir Aplicación

```bash
pnpm exec sst remove --stage prod
```

**Esto elimina:**
- ✅ Lambda functions
- ✅ CloudFront distributions
- ✅ API Gateway
- ✅ S3 buckets de aplicación
- ✅ IAM roles
- ❌ NO elimina bucket de estado

---

### Paso 2: Buscar Bucket de Estado

```bash
# Listar buckets que contienen "sst"
aws s3 ls | grep -i sst
```

O buscar por nombre:
```bash
# Buscar buckets que empiecen con "sst"
aws s3 ls | grep "^sst"
```

---

### Paso 3: Eliminar Bucket de Estado

```bash
# Reemplaza NOMBRE_BUCKET con el nombre real
aws s3 rb s3://NOMBRE_BUCKET --force
```

**El `--force` elimina todo el contenido** del bucket primero.

---

### Paso 4: Eliminar Parámetros de Systems Manager

```bash
# Eliminar parámetro de bootstrap
aws ssm delete-parameter --name "/sst/bootstrap" 2>/dev/null || true

# Eliminar parámetros de passphrase (si existen)
aws ssm delete-parameter --name "/sst/passphrase/mi-portafolio/prod" 2>/dev/null || true
aws ssm delete-parameter --name "/sst/passphrase/mi-portafolio/tecob" 2>/dev/null || true
```

---

### Paso 5: Verificar que Todo Esté Limpio

```bash
# Verificar buckets SST
aws s3 ls | grep -i sst

# Verificar parámetros SST
aws ssm describe-parameters --query "Parameters[?contains(Name, 'sst')].Name"
```

**Si no aparece nada, todo está eliminado.** ✅

---

## 🚀 Script Completo para Eliminar TODO

Copia y pega esto:

```bash
#!/bin/bash

echo "🗑️  Eliminando TODA la infraestructura SST..."

# 1. Destruir aplicación
echo "1️⃣  Destruyendo aplicación..."
pnpm exec sst remove --stage prod || echo "⚠️  No hay aplicación para eliminar"

# 2. Desbloquear (por si acaso)
echo "2️⃣  Desbloqueando stage..."
pnpm exec sst unlock --stage prod 2>/dev/null || true

# 3. Buscar y eliminar bucket de estado
echo "3️⃣  Buscando bucket de estado..."
BUCKETS=$(aws s3 ls | grep -i sst | awk '{print $3}')

if [ -z "$BUCKETS" ]; then
    echo "   ✅ No se encontraron buckets SST"
else
    echo "   📦 Buckets encontrados:"
    echo "$BUCKETS"
    for BUCKET in $BUCKETS; do
        echo "   🗑️  Eliminando bucket: $BUCKET"
        aws s3 rb s3://$BUCKET --force 2>/dev/null || echo "   ⚠️  No se pudo eliminar $BUCKET"
    done
fi

# 4. Eliminar parámetros de Systems Manager
echo "4️⃣  Eliminando parámetros de Systems Manager..."
aws ssm delete-parameter --name "/sst/bootstrap" 2>/dev/null || echo "   ⚠️  Parámetro bootstrap no existe"
aws ssm delete-parameter --name "/sst/passphrase/mi-portafolio/prod" 2>/dev/null || echo "   ⚠️  Parámetro passphrase/prod no existe"
aws ssm delete-parameter --name "/sst/passphrase/mi-portafolio/tecob" 2>/dev/null || echo "   ⚠️  Parámetro passphrase/tecob no existe"

# 5. Verificar limpieza
echo "5️⃣  Verificando limpieza..."
echo ""
echo "📊 Buckets SST restantes:"
aws s3 ls | grep -i sst || echo "   ✅ Ninguno"

echo ""
echo "📊 Parámetros SST restantes:"
aws ssm describe-parameters --query "Parameters[?contains(Name, 'sst')].Name" --output text || echo "   ✅ Ninguno"

echo ""
echo "✅ Proceso completado!"
```

---

## 📋 Comandos Manuales (Paso a Paso)

Si prefieres hacerlo manualmente:

```bash
# 1. Destruir app
pnpm exec sst remove --stage prod

# 2. Desbloquear
pnpm exec sst unlock --stage prod

# 3. Listar buckets SST
aws s3 ls | grep sst

# 4. Eliminar cada bucket encontrado
aws s3 rb s3://NOMBRE_DEL_BUCKET --force

# 5. Eliminar parámetros
aws ssm delete-parameter --name "/sst/bootstrap"
aws ssm delete-parameter --name "/sst/passphrase/mi-portafolio/prod"
aws ssm delete-parameter --name "/sst/passphrase/mi-portafolio/tecob"

# 6. Verificar
aws s3 ls | grep sst
aws ssm describe-parameters --query "Parameters[?contains(Name, 'sst')]"
```

---

## ⚠️ Importante

**Después de eliminar TODO:**

Si quieres hacer deploy de nuevo, SST recreará el bucket de estado automáticamente:

```bash
pnpm exec sst deploy --stage prod
```

**Tardará un poco más** porque tiene que crear el bucket desde cero.

---

## 🎯 Diferencias

| Comando | Elimina App | Elimina Estado | Puedes Deployar Después |
|---------|-------------|----------------|-------------------------|
| `sst remove` | ✅ Sí | ❌ No | ✅ Sí (rápido) |
| `sst remove` + eliminar bucket | ✅ Sí | ✅ Sí | ✅ Sí (lento) |

---

## ✅ Resumen

**Para eliminar TODO:**

1. `sst remove --stage prod` → Elimina app
2. `sst unlock --stage prod` → Desbloquea
3. Eliminar buckets SST manualmente
4. Eliminar parámetros de Systems Manager
5. Verificar que todo esté limpio

**Para deployar después:**

```bash
pnpm exec sst deploy --stage prod
```

SST recreará el bucket de estado automáticamente.

