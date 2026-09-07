# Videos del Hero

Coloca aquí los dos archivos con estos nombres exactos:

| Archivo                | Formato | Uso                          | Recomendación                    |
|------------------------|---------|------------------------------|----------------------------------|
| `hero-horizontal.mp4`  | 16:9    | Escritorio y tablet (≥768px) | 1920×1080, H.264, < 10 MB        |
| `hero-vertical.mp4`    | 9:16    | Smartphone (<768px)          | 1080×1920, H.264, < 8 MB         |

Notas:

- Los videos se reproducen en automático, **en silencio y en loop** (los
  navegadores móviles bloquean el autoplay con sonido). Si el video depende del
  audio para entenderse, conviene activar el popup con botón de sonido.
- Usa H.264 (perfil baseline/main) + AAC en `.mp4` para máxima compatibilidad
  con iOS y Android.
- Comprimir con: `ffmpeg -i entrada.mov -vcodec libx264 -crf 26 -preset slow -movflags +faststart salida.mp4`
  (`+faststart` es importante: permite que empiece a reproducirse antes de
  descargar el archivo completo).

La configuración (qué slide usa estos videos, y el popup de bienvenida) está en
`src/data/heroMedia.ts`.
