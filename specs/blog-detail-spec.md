# Blog Detail Component - UX/UI Specification

> **Specs Driven Development Document**
> **Fecha:** 3 Marzo 2026
> **Versión:** 1.0

---

## 1. Resumen Ejecutivo

### 1.1 Objetivo
Diseñar y especificar el componente de **detalle de entrada de blog** para el portal Dragon Force, siguiendo principios de usabilidad, accesibilidad y diseño responsive.

### 1.2 Contexto
El componente presenta el contenido completo de una entrada de blog con jerarquía visual clara, optimización para lectura y elementos interactivos.

---

## 2. Wireframe / Estructura Visual

```
┌─────────────────────────────────────────────────────────┐
│                    [NAVBAR]                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                    [TAG PILL]                           │
│              "NOTICIAS • DRAGON FORCE"                  │
│                                                          │
│  [TÍTULO PRINCIPAL - H1]                                 │
│  "A PARTIR DESTA SEGUNDA-FEIRA FICAM                    │
│   ABERTAS AS INSCRIÇÕES PARA 2025/26"                  │
│                                                          │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │            [IMAGEN HERO FULL-WIDTH]             │    │
│  │              aspect-ratio: 16/9                 │    │
│  │            object-fit: cover                    │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  [METADATA ROW]                                          │
│  ┌──────────┬────────────┬────────────────────────┐     │
│  │ 📅 DATE  │  👤 AUTHOR │  ⏱️ READ TIME         │     │
│  │8JULHO,25│ DragonForce│ 5 min de lectura      │     │
│  └──────────┴────────────┴────────────────────────┘     │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │           [RICH TEXT CONTENT]                   │    │
│  │                                                 │    │
│  │  ## Subtítulo H2                              │    │
│  │  Parrafo de texto con formato...                │    │
│  │                                                 │    │
│  │  • Lista con viñetas                            │    │
│  │  • Otro item                                   │    │
│  │                                                 │    │
│  │  **Texto en negrita** y *cursiva*              │    │
│  │                                                 │    │
│  │  [LINK: Leer más →]                            │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                    [FOOTER]                              │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Requerimientos Funcionales (FR)

### FR-001: Hero Image Full-Screen
- **Descripción:** La imagen destacada debe ocupar el 100% del ancho de la pantalla (viewport width)
- **Prioridad:** Alta
- **Criterios de Aceptación:**
  - La imagen debe tener `width: 100vw` en móvil y tablet
  - En desktop, debe estar contenida dentro del `max-width` del contenedor principal
  - Aspect ratio recomendado: `16:9` o `21:9` para pantallas widescreen
  - Soporte para lazy loading con placeholder de baja resolución

### FR-002: Jerarquía Visual - Tag sobre Título
- **Descripción:** El tag/categoría debe posicionarse visualmente encima del título principal
- **Prioridad:** Alta
- **Criterios de Aceptación:**
  - El tag debe ser un componente "pill" o "badge" con estilo distintivo
  - Separación entre tag y título: `margin-bottom: 0.5rem`
  - El tag debe ser clickeable y navegar al listado filtrado por esa categoría

### FR-003: Metadata del Autor
- **Descripción:** Mostrar información del autor debajo de la imagen hero
- **Prioridad:** Media
- **Criterios de Aceptación:**
  - Campos requeridos: Nombre del autor, Fecha de publicación, Tiempo de lectura estimado
  - Opcional: Avatar del autor
  - Formato de fecha: Localizado según el idioma del sitio

### FR-004: Rich Text Content
- **Descripción:** El cuerpo del blog debe soportar formato enriquecido
- **Prioridad:** Alta
- **Criterios de Aceptación:**
  - Soporte para: párrafos, headings (H2, H3), listas (ul, ol), bold, italic, links
  - Imágenes incrustadas dentro del contenido
  - Bloques de cita (blockquote)
  - Tablas con datos (opcional)
  - Código inline y bloques de código (opcional)

### FR-005: Compartir en Redes Sociales
- **Descripción:** Botones para compartir el artículo
- **Prioridad:** Media
- **Estado:** ELIMINADO - No requerido para esta versión
- **Criterios de Aceptación:** N/A

### FR-006: Artículos Relacionados
- **Descripción:** Sección al final con artículos relacionados
- **Prioridad:** Baja
- **Estado:** ELIMINADO - No requerido para esta versión
- **Criterios de Aceptación:** N/A

---

## 4. Requerimientos No Funcionales (NFR)

### NFR-001: Performance
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint) < 2.5s para la imagen hero
  - CLS (Cumulative Layout Shift) < 0.1
- **Optimización de imágenes:**
  - Formatos: WebP con fallback JPG
  - Resoluciones: srcset para 480w, 768w, 1200w, 1920w
  - Lazy loading para imágenes debajo del fold

### NFR-002: Accesibilidad (a11y)
- Nivel de conformidad: **WCAG 2.1 AA**
- **Requerimientos específicos:**
  - Título H1 único y descriptivo
  - Alt text obligatorio para todas las imágenes
  - Contraste de color: mínimo 4.5:1 para texto normal
  - Navegación por teclado completa
  - Skip link para ir al contenido principal
  - Labels semánticos para botones de compartir

### NFR-003: SEO
- Schema.org Article markup en JSON-LD
- Meta tags: title, description, og:title, og:description, og:image, twitter:card
- URL canónica
- Breadcrumbs con Schema markup

### NFR-004: Responsive
- **Breakpoints:**
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- **Comportamientos:**
  - Imagen hero: 100% width en mobile, max-width container en desktop
  - Tamaño de fuente título: fluid typography (clamp)
  - Padding lateral: 16px mobile, 24px tablet, 32px desktop

---

## 5. Componentes de UI

### 5.1 Blog Hero Section
```typescript
interface BlogHeroProps {
  title: string;
  tag: {
    label: string;
    slug: string;
  };
  heroImage: {
    src: string;
    srcSet: string;
    alt: string;
    placeholder: string; // Base64 blur
  };
  publishDate: string; // ISO 8601
  author: {
    name: string;
    avatar?: string;
    slug: string;
  };
  readTime: number; // minutes
}
```

### 5.2 Rich Text Renderer
```typescript
interface RichTextContent {
  blocks: Array<{
    type: 'paragraph' | 'heading' | 'list' | 'image' | 'quote' | 'embed';
    content: string | Array<string> | {
      level: 2 | 3 | 4;
      text: string;
    };
    metadata?: {
      src?: string;
      alt?: string;
      caption?: string;
      url?: string;
    };
  }>;
}
```


---

## 6. Diseño Visual (Mockup Específico)

### 6.1 Paleta de Colores
| Uso | Color | Hex | Variable CSS |
|-----|-------|-----|--------------|
| Fondo | Blanco | `#FFFFFF` | `--bg-primary` |
| Fondo alt | Gris claro | `#F5F5F5` | `--bg-secondary` |
| Texto primario | Gris oscuro | `#1A1A1A` | `--text-primary` |
| Texto secundario | Gris medio | `#666666` | `--text-secondary` |
| Acento azul | Azul Dragon | `#1A4F8A` | `--color-accent` |
| Tag bg | Azul claro | `#E8F0F8` | `--tag-bg` |
| Tag texto | Azul medio | `#2563EB` | `--tag-text` |
| Bordes | Gris suave | `#E5E5E5` | `--border-color` |

### 6.2 Tipografía
| Elemento | Fuente | Peso | Tamaño | Line-height |
|----------|--------|------|--------|-------------|
| Tag | Inter | 600 | 12px | 1.2 |
| Título H1 | Inter | 800 | clamp(32px, 5vw, 56px) | 1.1 |
| Metadata | Inter | 400 | 14px | 1.4 |
| Body | Inter | 400 | 18px | 1.7 |
| H2 Content | Inter | 700 | 24px | 1.3 |
| H3 Content | Inter | 600 | 20px | 1.4 |

### 6.3 Espaciado (8px grid)
- Tag to Title: 8px
- Title to Image: 32px
- Image to Metadata: 24px
- Metadata to Content: 48px
- Content paragraphs: 24px
- Section to Share: 48px
- Share to Related: 64px

---

## 7. Interacciones y Animaciones

### 7.1 On Page Load
- Imagen hero: Fade in + scale desde 1.02 a 1.0 (duración: 600ms, easing: ease-out)
- Título: Slide up + fade in (delay: 100ms, duración: 500ms)
- Tag: Fade in (delay: 200ms, duración: 400ms)
- Contenido: Stagger children fade in (delay: 300ms entre elementos)

### 7.2 Hover States
- Links del contenido: Underline animado de izquierda a derecha
- Tag: Background darken 10%

### 7.3 Scroll Interactions
- Scroll progress bar en top (opcional)
- Imágenes dentro del contenido: Lazy load con blur fade

---

## 8. Data Fetching

### 8.1 API Endpoint
```
GET /api/blog/:slug
```

### 8.2 Response Schema
```json
{
  "id": "uuid",
  "slug": "string",
  "title": "string",
  "tag": {
    "label": "string",
    "slug": "string"
  },
  "heroImage": {
    "src": "string",
    "srcSet": "string",
    "alt": "string",
    "placeholder": "string"
  },
  "author": {
    "name": "string",
    "avatar": "string",
    "slug": "string"
  },
  "publishDate": "2024-03-15T00:00:00Z",
  "readTime": 5,
  "content": {
    "blocks": [...]
  },
  "meta": {
    "description": "string",
    "keywords": ["string"]
  }
}
```

---

## 9. Estados de Error y Loading

### 9.1 Loading State
- Skeleton para el hero image (shimmer effect)
- Skeleton para título y metadata
- Spinner para contenido rich text

### 9.2 Error State
- Mensaje: "No se pudo cargar el artículo"
- Botón: "Intentar de nuevo"
- Fallback: Volver al listado de noticias

### 9.3 Not Found (404)
- Mensaje: "Artículo no encontrado"
- Link: "Ver todas las noticias"

---

## 10. Testing Checklist

### 10.1 Unit Tests
- [ ] Renderizado correcto con props válidos
- [ ] Manejo de estados loading/error/empty
- [ ] Formato de fecha según locale
- [ ] Cálculo de tiempo de lectura

### 10.2 Integration Tests
- [ ] Navegación desde listado a detalle
- [ ] Lazy loading de imágenes

### 10.3 E2E Tests
- [ ] Flujo completo de lectura
- [ ] Responsive en diferentes viewports
- [ ] Performance (Lighthouse score > 90)
- [ ] Accesibilidad (axe-core sin violations)

### 10.4 Visual Regression
- [ ] Desktop 1920x1080
- [ ] Desktop 1366x768
- [ ] Tablet iPad (768x1024)
- [ ] Mobile iPhone (375x667)

---

## 11. Notas de Implementación

### 11.1 Consideraciones Técnicas
- Usar `next/image` o equivalente para optimización automática de imágenes
- Implementar `react-intersection-observer` para lazy loading
- Usar `date-fns` o `dayjs` para formateo de fechas
- Rich text: considerar `@portabletext/react` para Sanity o similar

### 11.2 Performance Budget
- JavaScript: < 100KB gzipped para el componente
- Imagen hero: < 200KB WebP
- Total page weight: < 1MB

### 11.3 Accessibility Checklist
- [ ] Skip to content link
- [ ] Focus indicators visibles
- [ ] Alt text en todas las imágenes
- [ ] Heading hierarchy correcto (H1 → H2 → H3)
- [ ] Links con texto descriptivo (no "click here")
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Reduced motion support

---

## 12. Referencias

- **Diseño de referencia:** [Imágenes adjuntas del portal Dragon Force]
- **Guía de estilos:** Dragon Force Brand Guidelines v2.0
- **Componentes base:** Tailwind CSS + shadcn/ui
- **Diseño UX:** Mobile First, Progressive Enhancement

---

## 13. Historial de Revisiones

| Fecha | Versión | Autor | Cambios |
|-------|---------|-------|---------|
| 03-03-2026 | 1.0 | UX/UI Team | Creación inicial del documento |

---

**Fin del Documento**
