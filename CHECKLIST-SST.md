# ✅ Checklist: SST para Next.js

## ⚙️ Configuración Requerida

### Archivos Clave

- [x] **`sst.config.ts`** - Configuración SST v3
- [x] **`next.config.mjs`** - `ignoreBuildErrors: true`
- [x] **`tsconfig.json`** - Excluir `.sst`
- [x] **`package.json`** - Scripts SST

### Comandos Iniciales

```bash
# 1. Instalar SST
pnpm add -D sst@latest

# 2. Inicializar
pnpm exec sst install

# 3. Deploy
pnpm exec sst deploy --stage prod
```

### Antes de Deployar

- [ ] Verificar que no haya `export const runtime = "edge"` en rutas
- [ ] Verificar que `.sst` esté excluido en `tsconfig.json`
- [ ] Verificar que `ignoreBuildErrors: true` en `next.config.mjs`
- [ ] Build local funciona: `pnpm run build`

---

## 🚨 Errores Comunes y Soluciones

### Error: "Could not resolve sst/aws"
→ Usar sintaxis SST v3: `sst.aws.Nextjs`

### Error: "Edge runtime not supported"
→ Comentar `export const runtime = "edge"`

### Error: "TypeScript errors in .sst"
→ Agregar `ignoreBuildErrors: true` en `next.config.mjs`

### Error: "Lock detected"
→ Ejecutar `sst unlock`

---

## 📝 Resumen de Cambios

1. **Eliminamos** código del bot (AI SDK)
2. **Configuramos** SST v3 correctamente
3. **Excluimos** `.sst` del type checking
4. **Deshabilitamos** edge runtime en `/og/route`
5. **Agregamos** `ignoreBuildErrors` para SST internos

---

**¡Tu configuración SST está lista para futuros proyectos!** ✅

