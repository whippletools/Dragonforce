# PDFs de Escuelas de Fútbol

Esta carpeta contiene los archivos PDF con información detallada de cada escuela de fútbol.

## Cómo agregar PDFs

1. Coloca tus archivos PDF en esta carpeta (`public/pdfs/schools/`)
2. Asegúrate de que el nombre del archivo coincida exactamente con el especificado en `src/data/schools.json`

## Archivos requeridos actualmente

Según la configuración en `src/data/schools.json`, necesitas los siguientes archivos:

- `colegio-dragoes-sandinenses.pdf` - Dragões Sandinenses
- `colegio-gondomar.pdf` - Gondomar
- `colegio-maia.pdf` - Maia
- `colegio-trofa.pdf` - Trofa
- `colegio-internacional-porto.pdf` - Colegio Internacional de Porto

## Formato de URL en el JSON

En `src/data/schools.json`, las URLs deben seguir este formato:

```json
{
  "pdfUrl": "/pdfs/schools/nombre-del-archivo.pdf"
}
```

## Notas importantes

- Los archivos PDF deben estar en la carpeta `public/pdfs/schools/`
- La ruta en el JSON debe empezar con `/pdfs/schools/`
- Los nombres de archivo deben coincidir exactamente (case-sensitive)
- Los PDFs se abrirán en una nueva pestaña del navegador cuando el usuario haga clic en "Más información"

## Ejemplo

Si tienes un PDF llamado `mi-escuela.pdf`:

1. Colócalo en: `public/pdfs/schools/mi-escuela.pdf`
2. En el JSON usa: `"pdfUrl": "/pdfs/schools/mi-escuela.pdf"`
