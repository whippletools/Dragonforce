# Schema Backend - Inscripcion de Padres

## Tabla: `parent_registrations`

```sql
CREATE TABLE parent_registrations (
  id              SERIAL PRIMARY KEY,
  full_name       VARCHAR(150) NOT NULL,
  email           VARCHAR(150) NOT NULL,
  phone           VARCHAR(30)  NOT NULL,
  message         TEXT,

  -- Estado del registro
  status          VARCHAR(20)  NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','processing','completed','rejected')),

  -- Cuando administracion crea el usuario en el portal
  portal_username VARCHAR(50),
  portal_password_hash VARCHAR(255), -- bcrypt (NUNCA guardar la contraseña en texto plano)
  portal_url VARCHAR(255),           -- Ej: https://padres.dragonforce.com
  portal_created_at TIMESTAMP,

  -- Metadatos
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  source_lang     VARCHAR(2) DEFAULT 'es' -- 'es' | 'en'
);

-- Indices utiles
CREATE INDEX idx_parent_registrations_email ON parent_registrations(email);
CREATE INDEX idx_parent_registrations_status ON parent_registrations(status);
CREATE INDEX idx_parent_registrations_created_at ON parent_registrations(created_at);
```

## Campos del formulario frontend -> Columnas DB

| Campo Frontend     | name=""           | Tipo DB      | Nullable | Notas                                    |
|--------------------|-------------------|--------------|----------|------------------------------------------|
| Nombre completo    | parentName        | VARCHAR(150) | NOT NULL | Nombre del padre/madre                   |
| Correo electronico | email             | VARCHAR(150) | NOT NULL | Usado para enviar credenciales del portal|
| Telefono           | phone             | VARCHAR(30)  | NOT NULL | Contacto directo                         |
| Mensaje adicional  | message           | TEXT         | NULL     | Opcional                                 |

## Estado (`status`)

| Valor       | Significado                                              |
|-------------|----------------------------------------------------------|
| `pending`   | Recibido, aun no revisado por administracion             |
| `processing`| En revision, administracion esta creando el portal       |
| `completed` | Usuario y password del portal creados y enviados         |
| `rejected`  | Rechazado (email invalido, duplicado, etc.)              |

## Flujo de trabajo

1. **Padre llena formulario** -> INSERT con status='pending'
2. **Admin revisa panel** -> UPDATE status='processing'
3. **Admin crea usuario portal** -> UPDATE portal_username, portal_password_hash, portal_created_at, status='completed'
4. **Sistema envia email** al padre con sus credenciales

## API Endpoints sugeridos

```
POST   /api/v1/parent-registrations        -- Crear nuevo registro (desde frontend)
GET    /api/v1/parent-registrations        -- Listar todos (panel admin)
GET    /api/v1/parent-registrations/:id     -- Ver detalle
PATCH  /api/v1/parent-registrations/:id    -- Actualizar status / datos
DELETE /api/v1/parent-registrations/:id    -- Eliminar
```

## Ejemplo payload POST (desde frontend)

```json
{
  "full_name": "Juan Perez",
  "email": "juan@ejemplo.com",
  "phone": "+52 81 2345 6789",
  "message": "Me interesa inscribir a mi hijo",
  "source_lang": "es"
}
```

## Respuesta exitosa

```json
{
  "success": true,
  "data": {
    "id": 42,
    "full_name": "Juan Perez",
    "email": "juan@ejemplo.com",
    "phone": "+52 81 2345 6789",
    "status": "pending",
    "created_at": "2026-05-18T19:45:00Z"
  }
}
```

---

## Plantilla de email de bienvenida (HTML)

El backend debe enviar este email cuando `status` cambie a `completed`. La contraseña se genera en ese momento, se envía en el email y solo se guarda el `bcrypt` en la base de datos.

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

| Variable | Fuente DB | Ejemplo |
|----------|-----------|---------|
| `{{full_name}}` | `full_name` | `Juan Perez` |
| `{{portal_username}}` | `portal_username` | `juanperez123` |
| `{{portal_password_plain}}` | **Generada en backend** (no se guarda en DB) | `Df2026$Xy` |
| `{{portal_url}}` | `portal_url` o constante | `https://padres.dragonforce.com` |

### Flujo de envío de credenciales

1. Admin aprueba registro en panel
2. Backend genera contraseña aleatoria segura
3. Backend hashea con bcrypt → guarda `portal_password_hash`
4. Backend envía email con contraseña **en texto** (solo esta vez)
5. Padre recibe email con usuario, contraseña y link directo
6. Padre inicia sesión y cambia contraseña
7. Después del primer login, el portal fuerza cambio de contraseña
