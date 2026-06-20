# Schema Backend - Inscripcion de Padres (FLUJO AUTOMATICO)

## Tabla: `parent_registrations`

```sql
CREATE TABLE parent_registrations (
  id              SERIAL PRIMARY KEY,
  full_name       VARCHAR(150) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  phone           VARCHAR(30)  NOT NULL,

  -- Credenciales del portal (generadas automaticamente al registrar)
  portal_username VARCHAR(50)  NOT NULL,
  portal_password_hash VARCHAR(255) NOT NULL, -- bcrypt (NUNCA guardar la contraseña en texto plano)
  portal_url VARCHAR(255) NOT NULL DEFAULT 'https://padres.dragonforce.com',

  -- Metadatos
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  source_lang     VARCHAR(2) DEFAULT 'es' -- 'es' | 'en'
);

-- Indices utiles
CREATE INDEX idx_parent_registrations_email ON parent_registrations(email);
CREATE INDEX idx_parent_registrations_created_at ON parent_registrations(created_at);
```

## Campos del formulario frontend -> Columnas DB

| Campo Frontend     | name=""           | Tipo DB      | Nullable | Notas                                    |
|--------------------|-------------------|--------------|----------|------------------------------------------|
| Nombre completo    | parentName        | VARCHAR(150) | NOT NULL | Nombre del padre/madre                   |
| Correo electronico | email             | VARCHAR(150) | NOT NULL | Usado para enviar credenciales del portal|
| Telefono           | phone             | VARCHAR(30)  | NOT NULL | Contacto directo                         |

## Flujo de trabajo (AUTOMATICO - sin aprobacion manual)

1. **Padre llena formulario** -> POST al backend
2. **Backend valida email unico** -> Si existe, retorna error
3. **Backend genera automaticamente:**
   - `portal_username`: basado en nombre + numero aleatorio (ej: juanperez123)
   - `portal_password_plain`: contraseña segura aleatoria (ej: Df2026$Xy)
   - `portal_password_hash`: bcrypt de la contraseña
4. **Backend INSERTA registro** con todos los datos
5. **Backend envia email de bienvenida** inmediatamente al correo proporcionado con usuario, contraseña en texto y link al portal
6. **Frontend muestra pantalla de exito** indicando que revisen su correo

## API Endpoints sugeridos

```
POST   /api/v1/parent-registrations        -- Crear nuevo registro + generar credenciales + enviar email
GET    /api/v1/parent-registrations        -- Listar todos (panel admin)
GET    /api/v1/parent-registrations/:id     -- Ver detalle
PATCH  /api/v1/parent-registrations/:id    -- Actualizar datos
DELETE /api/v1/parent-registrations/:id    -- Eliminar
```

## Ejemplo payload POST (desde frontend)

```json
{
  "fullName": "Juan Perez",
  "email": "juan@ejemplo.com",
  "phone": "+52 81 2345 6789",
  "sourceLang": "es"
}
```

## Respuesta exitosa

```json
{
  "success": true,
  "message": "Registro exitoso. Revisa tu correo para tus credenciales.",
  "data": {
    "id": 42,
    "full_name": "Juan Perez",
    "email": "juan@ejemplo.com",
    "phone": "+52 81 2345 6789",
    "portal_username": "juanperez123",
    "created_at": "2026-05-18T19:45:00Z"
  }
}
```

**IMPORTANTE:** La contraseña en texto plano (`portal_password_plain`) debe enviarse solo en el email, NUNCA en la respuesta JSON de la API.

---

## Plantilla de email de bienvenida (HTML)

El backend debe enviar este email **automaticamente e inmediatamente** despues de crear el registro. La contraseña se genera en ese momento, se envia en el email y solo se guarda el `bcrypt` en la base de datos.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .header { background: #1a4f8a; color: #fff; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .body { padding: 32px 24px; color: #333; }
    .body p { font-size: 16px; line-height: 1.6; }
    .credentials { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0; }
    .credentials p { margin: 8px 0; font-size: 15px; }
    .credentials strong { color: #1a4f8a; }
    .btn { display: inline-block; background: #1a4f8a; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: bold; margin-top: 16px; }
    .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Bienvenido a DragonForce</h1>
    </div>
    <div class="body">
      <p>Hola <strong>{{full_name}}</strong>,</p>
      <p>Tu cuenta ha sido creada exitosamente. Ya puedes acceder al <strong>Portal de Padres</strong> con las siguientes credenciales:</p>

      <div class="credentials">
        <p><strong>Usuario:</strong> {{portal_username}}</p>
        <p><strong>Contraseña:</strong> {{portal_password_plain}}</p>
      </div>

      <p style="text-align:center;">
        <a href="{{portal_url}}" class="btn">Ingresar al Portal de Padres</a>
      </p>

      <p style="font-size:13px; color:#666; margin-top:24px;">
        Recomendamos cambiar tu contraseña después del primer inicio de sesión. Si tienes alguna duda, contacta a administración.
      </p>
    </div>
    <div class="footer">
      <p>Este es un mensaje automático de DragonForce. Por favor no respondas a este correo.</p>
    </div>
  </div>
</body>
</html>
```

### Variables a reemplazar (desde backend)

| Variable | Fuente DB / Generacion | Ejemplo |
|----------|------------------------|---------|
| `{{full_name}}` | `full_name` | `Juan Perez` |
| `{{portal_username}}` | Generado automaticamente | `juanperez123` |
| `{{portal_password_plain}}` | **Generada automaticamente** (NO guardar en DB, solo enviar por email) | `Df2026$Xy` |
| `{{portal_url}}` | Constante de config | `https://padres.dragonforce.com` |

### Flujo de envío de credenciales (AUTOMATICO)

1. Frontend envia POST con datos del padre
2. Backend valida que el email no exista ya
3. Backend genera username unico y contraseña segura aleatoria
4. Backend hashea contraseña con bcrypt → guarda `portal_password_hash`
5. Backend INSERTA registro completo en DB
6. Backend envia email de bienvenida con contraseña en texto (solo esta vez)
7. Frontend muestra mensaje de exito pidiendo revisar el correo
8. Padre recibe email con usuario, contraseña y link directo
9. Padre ingresa al portal de padres e inicia sesion
