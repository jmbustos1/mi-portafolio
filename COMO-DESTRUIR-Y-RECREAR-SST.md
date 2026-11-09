# 🔄 Cómo Destruir y Recrear Infraestructura con SST

## ⚠️ El Problema Actual

Cuando ejecutaste `terraform destroy`, eliminaste **TODOS** los recursos de AWS, incluyendo:
- ✅ Tu aplicación (Lambda, CloudFront, etc.) 
- ❌ El bucket de estado de SST (que SST necesita)

**Por eso ahora SST no puede hacer deploy** - necesita ese bucket para saber qué tiene creado.

---

## 🗑️ Cómo Destruir Correctamente

### Opción A: Solo SST (RECOMENDADO)

```bash
# Destruir solo recursos de tu aplicación
# Mantiene el bucket de estado (para futuros deploys)
pnpm exec sst remove --stage prod
```

**Esto elimina:**
- ✅ Lambda functions
- ✅ CloudFront distributions
- ✅ API Gateway
- ✅ S3 buckets de tu app
- ✅ IAM roles de tu app
- ❌ **NO elimina** el bucket de estado de SST

**Ventaja:** Puedes hacer deploy de nuevo después sin problemas.

---

### Opción B: Todo (Bucket de Estado Incluido)

Si realmente quieres eliminar TODO, incluido el bucket de estado:

```bash
# 1. Destruir aplicación
pnpm exec sst remove --stage prod

# 2. Eliminar parámetro de Systems Manager
aws ssm delete-parameter --name "/sst/bootstrap/mi-portafolio" 2>/dev/null || true

# 3. Eliminar bucket de estado manualmente (si existe)
# Buscar nombre del bucket en Systems Manager primero
```

**Desventaja:** Necesitarás recrear el bucket de estado después.

---

## 🔧 Cómo Arreglar el Problema Actual

### Paso 1: Eliminar Parámetro de Bootstrap

```bash
# Ver qué parámetros existen
aws ssm describe-parameters --query "Parameters[?contains(Name, 'sst')].Name" --output table

# Eliminar el parámetro que causa el problema
aws ssm delete-parameter --name "/sst/bootstrap/mi-portafolio"
```

### Paso 2: Recrear Bucket de Estado

```bash
# SST recreará el bucket automáticamente
pnpm exec sst deploy --stage prod
```

**SST creará el bucket automáticamente** cuando intentes hacer deploy.

---

## 🚀 Flujo Completo: Destruir y Recrear

### Escenario 1: Destruir Solo Aplicación (Normal)

```bash
# 1. Destruir aplicación
pnpm exec sst remove --stage prod

# 2. Hacer cambios en código

# 3. Deploy de nuevo (usa el mismo bucket de estado)
pnpm exec sst deploy --stage prod
```

**Ventaja:** Rápido, no necesitas recrear estado.

---

### Escenario 2: Destruir TODO (Incluyendo Estado)

```bash
# 1. Destruir aplicación
pnpm exec sst remove --stage prod

# 2. Eliminar parámetro de bootstrap
aws ssm delete-parameter --name "/sst/bootstrap/mi-portafolio"

# 3. Deploy (recreará bucket de estado)
pnpm exec sst deploy --stage prod
```

**Uso:** Cuando quieres empezar completamente desde cero.

---

## 📊 Qué Se Elimina con Cada Comando

### `sst remove`

**Elimina:**
- ✅ Lambda functions
- ✅ CloudFront distributions  
- ✅ API Gateway
- ✅ S3 buckets de aplicación
- ✅ IAM roles de aplicación
- ✅ CloudWatch Logs

**NO elimina:**
- ❌ Bucket de estado de SST
- ❌ Parámetros de Systems Manager

---

### `terraform destroy` (si lo usas)

**Elimina TODO:**
- ✅ Todos los recursos de Terraform
- ✅ **También el bucket de estado de SST** (si está gestionado por Terraform)
- ✅ Todo lo demás

**⚠️ Problema:** Si SST necesita ese bucket, tendrás que recrearlo.

---

## 🎯 Flujo Recomendado para tu Caso

### Para Destruir y Recrear:

```bash
# 1. Destruir solo aplicación SST
pnpm exec sst remove --stage prod

# 2. Esperar confirmación
# 3. Si quieres recrear:
pnpm exec sst deploy --stage prod
```

**Si el bucket de estado fue eliminado:**

```bash
# 1. Eliminar parámetro de bootstrap
aws ssm delete-parameter --name "/sst/bootstrap/mi-portafolio"

# 2. Deploy (recreará todo)
pnpm exec sst deploy --stage prod
```

---

## 🔍 Verificar Estado Actual

```bash
# Ver qué stage está desplegado
pnpm exec sst state list

# Ver información del deploy
pnpm exec sst console
```

---

## ✅ Comandos para tu Situación Actual

Ejecuta estos comandos en orden:

```bash
# 1. Eliminar parámetro de bootstrap
aws ssm delete-parameter --name "/sst/bootstrap/mi-portafolio"

# 2. Deploy (recreará bucket de estado automáticamente)
pnpm exec sst deploy --stage prod
```

---

## 💡 Por Qué SST Necesita el Bucket de Estado

**El bucket de estado guarda:**
- Qué recursos creó SST
- IDs de recursos AWS
- Configuración de la aplicación
- Historial de deploys

**Sin él:** SST no sabe qué tiene creado y no puede hacer deploy.

**Con él:** SST puede actualizar solo lo que cambió y destruir limpiamente.

---

## 🎓 Resumen

**Para destruir:**
```bash
pnpm exec sst remove --stage prod
```

**Para recrear:**
```bash
pnpm exec sst deploy --stage prod
```

**Si el bucket fue eliminado:**
```bash
aws ssm delete-parameter --name "/sst/bootstrap/mi-portafolio"
pnpm exec sst deploy --stage prod
```

**NO uses `terraform destroy`** si estás usando SST, porque eliminará recursos que SST necesita.

