# 🔧 Reparar: State Bucket Faltante

## El Problema

Cuando ejecutaste `terraform destroy`, eliminaste todos los recursos de AWS, incluyendo el **bucket de estado de SST**.

SST necesita ese bucket para:
- Guardar el estado de tu aplicación
- Saber qué recursos creó
- Actualizar/destruir recursos correctamente

## Solución

### Opción 1: Recrear el Estado (Recomendado)

```bash
# SST recreará el bucket automáticamente
pnpm exec sst install
```

Luego deploy:

```bash
pnpm exec sst deploy --stage prod
```

**Esto:** Recrea el bucket de estado y hace deploy limpio.

---

### Opción 2: Verificar y Limpiar en AWS Console

Si quieres verificar qué pasó:

1. Ve a AWS Console → Systems Manager → Parameter Store
2. Busca parámetros que empiecen con `/sst/bootstrap`
3. Verifica si el bucket mencionado existe
4. Si no existe, ejecuta `sst install` para recrearlo

---

## ¿Qué se Levanta con SST?

Cuando ejecutas `sst deploy`, SST crea:

1. **Bucket de Estado** (nuevo) - Para guardar estado de SST
2. **Lambda Functions** - Tu código Next.js
3. **CloudFront Distribution** - CDN global
4. **API Gateway** - Maneja HTTP requests
5. **S3 Buckets** - Para assets y código
6. **IAM Roles** - Permisos necesarios
7. **CloudWatch Logs** - Para debugging

**El bucket de estado es necesario** para que SST sepa qué creó y pueda gestionarlo.

---

## Para Futuro: Destroy Solo SST

Si quieres destruir solo lo de SST:

```bash
# Destruir solo recursos de SST (mantiene bucket de estado)
pnpm exec sst remove --stage prod
```

**NO uses `terraform destroy`** si estás usando SST, porque eliminará recursos que SST necesita.

---

## Próximo Paso

Ejecuta:

```bash
pnpm exec sst install
pnpm exec sst deploy --stage prod
```

Esto recreará todo desde cero, limpio.

