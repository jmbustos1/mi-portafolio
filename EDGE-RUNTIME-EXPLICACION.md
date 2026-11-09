# 🌐 ¿Qué es Edge Runtime?

## 📚 Conceptos Clave

### Edge Runtime vs Node.js Runtime

**Edge Runtime:**
- ✅ Más rápido (inicio ~0ms)
- ✅ Más barato (sin cold starts)
- ✅ Corre en **múltiples ubicaciones** cerca del usuario
- ❌ APIs limitadas (solo Web APIs estándar)
- ❌ Sin acceso a Node.js APIs (`fs`, `crypto`, etc.)

**Node.js Runtime:**
- ✅ Acceso completo a Node.js APIs
- ✅ Puede usar cualquier paquete npm
- ❌ Más lento (cold start ~100-500ms)
- ❌ Corre en menos ubicaciones
- ❌ Más caro

---

## 🎯 ¿Por Qué Usabas Edge Runtime?

En tu archivo `src/app/og/route.tsx`:

```typescript
export const runtime = "edge";  // ← Esto (ya comentado)
```

**Razón:** Generar imágenes Open Graph (OG) es una operación ligera que beneficia de:
- ⚡ Inicio rápido
- 🌍 Servir desde ubicaciones cercanas al usuario
- 💰 Menor costo

---

## ❌ ¿Por Qué Lo Comentamos?

**Problema con SST/OpenNext:**

```
app/og/route cannot use the edge runtime. 
OpenNext requires edge runtime function to be defined in a separate function.
```

**Razón:** 
- SST usa **OpenNext** para convertir Next.js a Lambda
- OpenNext tiene limitaciones con edge runtime en Lambda
- Lambda Edge Functions tienen un manejo diferente que no está totalmente soportado

**Solución:** Comentar el edge runtime para usar Node.js runtime (más compatible)

---

## 🔍 Dónde Se Usa Edge Runtime

### Casos de Uso Comunes:

1. **API Routes simples**
   ```typescript
   // src/app/api/hello/route.ts
   export const runtime = "edge";
   
   export async function GET() {
     return Response.json({ message: "Hello" });
   }
   ```

2. **Middleware**
   ```typescript
   // src/middleware.ts
   export const runtime = "edge";
   
   export function middleware(request: Request) {
     // Redirecciones, headers, etc.
   }
   ```

3. **Open Graph Images** (tu caso)
   ```typescript
   // src/app/og/route.tsx
   export const runtime = "edge";
   
   export async function GET() {
     // Generar imagen OG
   }
   ```

---

## 🌍 Edge Runtime en la Práctica

### Con Vercel (Edge Network):

```
Usuario en España → Edge Server en Madrid
Usuario en USA → Edge Server en Nueva York
Usuario en Japón → Edge Server en Tokio
```

**Ventaja:** Respuesta más rápida desde ubicación cercana

### Con AWS Lambda (SST):

```
Usuario en España → Lambda en us-east-1 (Virginia)
Usuario en USA → Lambda en us-east-1 (Virginia)
Usuario en Japón → Lambda en us-east-1 (Virginia)
```

**CloudFront** mejora esto cacheando respuestas cerca del usuario.

---

## 📊 Comparación Rápida

| Característica | Edge Runtime | Node.js Runtime |
|----------------|--------------|-----------------|
| **Cold Start** | ~0ms | ~100-500ms |
| **Costo** | Más barato | Más caro |
| **APIs Disponibles** | Web APIs | Node.js completo |
| **Paquetes npm** | Limitados | Todos |
| **Locaciones** | Muchas | Pocas |
| **Compatible SST** | ❌ Limitado | ✅ Sí |

---

## ⚠️ Limitaciones de Edge Runtime

### No Puedes Usar:

```typescript
// ❌ NO funciona en Edge Runtime
import fs from "fs";
import crypto from "crypto";
import { writeFile } from "fs/promises";

// ✅ SÍ funciona en Edge Runtime
fetch("https://api.example.com");
Response.json({ data: "test" });
new Headers();
```

### Paquetes que NO funcionan:

- `fs`, `path`, `crypto` (Node.js)
- Librerías que dependen de Node.js APIs
- Algunos paquetes de procesamiento de imágenes

---

## 🔧 Qué Pasó en Tu Proyecto

### Antes (Edge Runtime):

```typescript
// src/app/og/route.tsx
export const runtime = "edge";  // ❌ Causaba error con SST

export async function GET() {
  // Generar imagen OG
}
```

**Error:**
```
app/og/route cannot use the edge runtime. 
OpenNext requires edge runtime function to be defined in a separate function.
```

### Después (Node.js Runtime):

```typescript
// src/app/og/route.tsx
// export const runtime = "edge";  // ✅ Comentado

export async function GET() {
  // Generar imagen OG (ahora con Node.js runtime)
}
```

**Resultado:** ✅ Funciona con SST/Lambda

---

## 💡 ¿Cuándo Usar Cada Uno?

### Usa Edge Runtime cuando:

- ✅ API routes simples (sin Node.js APIs)
- ✅ Middleware de redirecciones
- ✅ Transformaciones de datos simples
- ✅ Operaciones sin dependencias pesadas
- ✅ **Y** estás en Vercel/Cloudflare Pages

### Usa Node.js Runtime cuando:

- ✅ Necesitas Node.js APIs (`fs`, `crypto`, etc.)
- ✅ Usas paquetes que requieren Node.js
- ✅ Procesamiento pesado de imágenes
- ✅ Acceso a bases de datos complejas
- ✅ **O** estás en AWS Lambda (SST)

---

## 🎯 En tu Caso Específico

**Tu archivo `og/route.tsx`:**

- **Idealmente:** Edge Runtime (más rápido para generar imágenes)
- **Realidad:** Node.js Runtime (porque SST/Lambda tiene limitaciones)

**¿Es un problema?** No realmente:
- CloudFront cachea las imágenes OG agresivamente
- El impacto es mínimo porque se generan una vez y se cachean
- La diferencia de velocidad es imperceptible para el usuario

---

## 📚 Resumen

**Edge Runtime:**
- Corre cerca del usuario (múltiples ubicaciones)
- Más rápido y barato
- APIs limitadas (solo Web APIs)
- No compatible completamente con SST/Lambda

**Node.js Runtime:**
- Acceso completo a Node.js
- Más lento (cold starts)
- Compatible con SST/Lambda
- Más costoso

**Para tu proyecto:** Usamos Node.js Runtime porque SST no soporta completamente Edge Runtime en Lambda.

---

## 🔗 Recursos

- [Next.js Edge Runtime Docs](https://nextjs.org/docs/app/api-reference/edge)
- [AWS Lambda Edge Functions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html)
- [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)

