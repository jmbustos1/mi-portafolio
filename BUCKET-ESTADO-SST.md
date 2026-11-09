# 🔍 ¿Qué es el Bucket de Estado de SST?

## Tu Pregunta

> "El bucket de estado es infra que debería eliminarse, ¿no?"

**Respuesta:** Técnicamente SÍ, pero SST lo necesita para funcionar.

---

## 🎯 ¿Qué es el Bucket de Estado?

Es como el `.tfstate` de Terraform, pero en S3. Guarda:

- Qué recursos AWS creó SST
- IDs de recursos (Lambda, CloudFront, etc.)
- Configuración de la aplicación
- Estado actual del deployment

**Sin él:** SST no sabe qué tiene creado y no puede gestionar recursos.

**Con él:** SST puede actualizar, destruir y recrear recursos correctamente.

---

## 🤔 ¿Debe Eliminarse?

### Opción A: Mantenerlo (Recomendado)

**Ventajas:**
- ✅ Puedes hacer `sst remove` y `sst deploy` sin problemas
- ✅ SST sabe qué destruir correctamente
- ✅ Más rápido para deployments futuros

**Desventajas:**
- ⚠️ Un bucket S3 adicional (casi sin costo, ~$0.01/mes)

### Opción B: Eliminarlo También

**Ventajas:**
- ✅ Infraestructura completamente limpia
- ✅ No dejas "basura" en AWS

**Desventajas:**
- ❌ Cada vez que quieras deployar, necesitas recrearlo
- ❌ Más lento y complejo

---

## 💡 Mi Recomendación

**Mantén el bucket de estado** a menos que realmente quieras eliminar TODO y empezar desde cero.

**Razón:** Es como el `.git` de tu repo - sin él, pierdes el historial y estado.

---

## 🗑️ Si Quieres Eliminar TODO (Incluyendo Estado)

```bash
# 1. Destruir aplicación
pnpm exec sst remove --stage prod

# 2. Buscar bucket de estado
aws s3 ls | grep sst

# 3. Eliminar bucket de estado (si existe)
aws s3 rb s3://nombre-del-bucket-sst --force

# 4. Eliminar parámetros de Systems Manager
aws ssm delete-parameter --name "/sst/bootstrap"

# 5. Verificar que todo esté limpio
aws s3 ls | grep sst
aws ssm describe-parameters --query "Parameters[?contains(Name, 'sst')]"
```

**Después:** Cada deploy recreará el bucket automáticamente.

---

## 📊 Estructura de Recursos SST

```
AWS Resources:
├── Bucket de Estado (sst-state-*) ← SST lo necesita
│   └── Guarda estado de deployments
│
└── Recursos de tu App
    ├── Lambda Functions
    ├── CloudFront
    ├── API Gateway
    └── S3 Buckets de aplicación
```

**Cuando haces `sst remove`:**
- ✅ Elimina recursos de tu app
- ❌ NO elimina bucket de estado (por diseño)

**Cuando haces `terraform destroy`:**
- ✅ Elimina TODO (incluyendo bucket de estado si está gestionado)
- ❌ SST queda sin estado

---

## ✅ Flujo Recomendado

### Desarrollo Normal:

```bash
# Destruir app (mantiene estado)
sst remove --stage prod

# Recrear app (usa estado existente)
sst deploy --stage prod
```

### Empezar Completamente desde Cero:

```bash
# 1. Destruir app
sst remove --stage prod

# 2. Eliminar bucket de estado manualmente
aws s3 rb s3://sst-state-xxx --force

# 3. Eliminar parámetros
aws ssm delete-parameter --name "/sst/bootstrap"

# 4. Deploy limpio (recreará todo)
sst deploy --stage prod
```

---

## 🎓 Conclusión

**El bucket de estado es infraestructura** que SST necesita para funcionar.

**Opciones:**
1. **Mantenerlo** → Más fácil para deployments futuros
2. **Eliminarlo** → Infraestructura completamente limpia, pero más trabajo

**Para tu caso (portafolio personal):** Mantenerlo es más práctico.

**Costo:** ~$0.01/mes (casi nada)

