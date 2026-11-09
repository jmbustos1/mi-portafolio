# 💰 Costos AWS con SST - Análisis Detallado

## Tu Escenario: 5 Visitas al Mes

Con **solo 5 visitas al mes**, tu sitio estará prácticamente **GRATIS**.

---

## 📊 Servicios que SST Crea (y sus Costos)

### 1. AWS Lambda

**Qué hace:** Ejecuta tu código Next.js

**Uso estimado:**
- CloudFront cachea agresivamente
- Con 5 visitas: Lambda se invoca ~1-2 veces (primera vez de cada página)
- Después, CloudFront sirve desde cache

**Costos:**
```
Free Tier:
- Primer 1M requests/mes: GRATIS ✅
- 400K GB-segundos/mes: GRATIS ✅

Tu uso:
- Requests: ~1-2 invocaciones/mes
- Compute: ~5-10 GB-segundos/mes
= $0 ✅
```

---

### 2. CloudFront (CDN)

**Qué hace:** Cachea tu sitio y lo sirve globalmente

**Uso estimado:**
- 5 visitas al mes
- ~2-5 MB de transfer por visita (con cache)
- Total: ~10-25 MB/mes

**Costos:**
```
Free Tier:
- Primer 1TB/mes: GRATIS ✅

Tu uso:
- ~10-25 MB/mes
= $0 ✅
```

---

### 3. API Gateway

**Qué hace:** Maneja las peticiones HTTP

**Uso estimado:**
- Solo se usa cuando CloudFront no tiene cache
- Con 5 visitas: ~1-2 requests al mes

**Costos:**
```
Free Tier:
- Primer 1M requests/mes: GRATIS ✅

Tu uso:
- ~1-2 requests/mes
= $0 ✅
```

---

### 4. S3 Storage

**Qué hace:** Almacena assets estáticos y código

**Uso estimado:**
- Tu sitio: ~50-100 MB
- Assets (imágenes, fonts): ~20-30 MB
- Total: ~70-130 MB

**Costos:**
```
Free Tier:
- Primer 5GB/mes: GRATIS ✅

Tu uso:
- ~100 MB
= $0 ✅
```

---

### 5. CloudWatch Logs

**Qué hace:** Guarda logs de Lambda

**Uso estimado:**
- Con 1-2 invocaciones: ~1-5 MB de logs/mes

**Costos:**
```
Free Tier:
- Primer 5GB/mes: GRATIS ✅

Tu uso:
- ~1-5 MB/mes
= $0 ✅
```

---

## 💵 Costo Total Mensual

### Con Free Tier (Primer Año)

| Servicio | Uso | Costo |
|----------|-----|-------|
| Lambda | 1-2 invocaciones | **$0** ✅ |
| CloudFront | 10-25 MB | **$0** ✅ |
| API Gateway | 1-2 requests | **$0** ✅ |
| S3 Storage | ~100 MB | **$0** ✅ |
| CloudWatch | ~1-5 MB | **$0** ✅ |
| **TOTAL** | | **$0/mes** ✅ |

**Conclusión:** Con 5 visitas al mes, **NO pagas NADA** durante el primer año (free tier).

---

### Después del Free Tier (Año 2+)

Con tu uso mínimo, aún estarías en rangos muy bajos:

| Servicio | Uso | Costo |
|----------|-----|-------|
| Lambda | 1-2 invocaciones | **$0.0000004** |
| CloudFront | 10-25 MB | **$0.001** |
| API Gateway | 1-2 requests | **$0.000007** |
| S3 Storage | ~100 MB | **$0.002** |
| CloudWatch | ~1-5 MB | **$0.003** |
| **TOTAL** | | **~$0.01/mes** |

**Conclusión:** Después del free tier, pagarías aproximadamente **$0.01/mes** (un centavo).

---

## 📈 Escalabilidad: Si tu Sitio Crece

### 100 visitas/mes

```
Lambda: ~10-20 invocaciones = $0
CloudFront: ~100-200 MB = $0
API Gateway: ~10-20 requests = $0
S3: ~100 MB = $0
CloudWatch: ~10-20 MB = $0
TOTAL: $0/mes ✅
```

### 1,000 visitas/mes

```
Lambda: ~50-100 invocaciones = $0 (free tier)
CloudFront: ~500 MB = $0 (free tier)
API Gateway: ~50-100 requests = $0 (free tier)
S3: ~100 MB = $0 (free tier)
CloudWatch: ~50-100 MB = $0 (free tier)
TOTAL: $0/mes ✅
```

### 10,000 visitas/mes

```
Lambda: ~200-500 invocaciones = $0 (free tier)
CloudFront: ~2-5 GB = $0 (free tier)
API Gateway: ~200-500 requests = $0 (free tier)
S3: ~100 MB = $0 (free tier)
CloudWatch: ~200-500 MB = $0 (free tier)
TOTAL: $0/mes ✅
```

### 100,000 visitas/mes (Portafolio Popular)

```
Lambda: ~1,000-2,000 invocaciones = $0.0002
CloudFront: ~20-50 GB = $0.002
API Gateway: ~1,000-2,000 requests = $0.000007
S3: ~100 MB = $0.002
CloudWatch: ~500 MB - 1 GB = $0.50
TOTAL: ~$0.50/mes ✅
```

---

## 🎯 Por Qué CloudFront es Clave

**Sin CloudFront (cada visita llama Lambda):**
- 5 visitas = 5 invocaciones Lambda
- Si crece a 10,000 visitas = 10,000 invocaciones = Más costo

**Con CloudFront (cachea agresivamente):**
- 5 visitas = 1-2 invocaciones Lambda (primera vez)
- Si crece a 10,000 visitas = ~100-200 invocaciones (solo cuando cache expira)

**CloudFront reduce las invocaciones de Lambda en ~99%**

---

## 💡 Comparación con Otros Proveedores

| Proveedor | 5 visitas/mes | 10K visitas/mes | 100K visitas/mes |
|-----------|---------------|-----------------|------------------|
| **SST/AWS** | **$0** ✅ | **$0** ✅ | **~$0.50** ✅ |
| Vercel Free | $0 | $0 | $20 (Pro) |
| Cloudflare | $0 | $0 | $0 |
| Netlify Free | $0 | $0 | $19 (Pro) |

**Conclusión:** AWS con SST es **gratis** hasta niveles muy altos de tráfico.

---

## ⚠️ Costos Ocultos a Evitar

### CloudWatch Logs (el más común)

**Problema:** Logs pueden acumularse y costar si no los limitas.

**Solución:** Configurar retención de logs (por defecto SST lo hace bien).

**Tu caso:** Con 5 visitas, logs serán mínimos.

---

## ✅ Conclusión para tu Caso

**Con 5 visitas al mes:**

**Primer año:** **$0/mes** (completamente gratis con free tier)  
**Después:** **~$0.01/mes** (un centavo)

**Incluso con 10,000 visitas al mes:** Sigue siendo **$0/mes** (free tier)

**Solo empezarías a pagar** si superas los límites del free tier, lo cual con un portafolio personal es muy difícil.

---

## 🎓 Resumen

**Tu portafolio con SST en AWS:**

✅ **Primer año:** Completamente gratis  
✅ **Después:** Centavos al mes  
✅ **Escalable:** Puede manejar millones de visitas  
✅ **CloudFront cachea todo:** Minimiza costos dramáticamente  

**No te preocupes por los costos** - con tu tráfico esperado será prácticamente gratis siempre.

