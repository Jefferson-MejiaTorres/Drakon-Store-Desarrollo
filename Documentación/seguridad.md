# Seguridad en Drakon Store

## 🔒 Sistema de Autenticación

### 1. Registro de Usuarios
- Validación de datos en el frontend y backend
- Contraseñas hasheadas con bcrypt (salt rounds: 10)
- Verificación de email único
- Validación de formato de contraseña
- Protección contra ataques de fuerza bruta

### 2. Login y Sesiones
- Autenticación mediante JWT (JSON Web Tokens)
- Tokens con tiempo de expiración configurable
- Almacenamiento seguro de tokens en localStorage
- Renovación automática de tokens
- Protección contra XSS y CSRF

### 3. Manejo de Contraseñas
```javascript
// Ejemplo de hasheo de contraseña
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Ejemplo de verificación
const isMatch = await bcrypt.compare(password, hashedPassword);
```

## 🛡️ Protección de Rutas

### 1. Middleware de Autenticación
```javascript
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
```

### 2. Roles y Permisos
- Cliente: Acceso a sus propios datos y órdenes
- Administrador: Acceso completo al sistema
- Validación de roles en cada ruta protegida

## 🔐 Seguridad de Datos

### 1. Encriptación
- Datos sensibles encriptados en la base de datos
- Uso de variables de entorno para secretos
- Conexiones HTTPS/TLS

### 2. Validación de Datos
- Sanitización de inputs
- Validación de tipos de datos
- Prevención de inyección SQL
- Límites de tamaño en payloads

## 🚨 Prevención de Ataques

### 1. Protección contra XSS
- Sanitización de datos en el frontend
- Headers de seguridad configurados
- Content Security Policy (CSP)

### 2. Protección contra CSRF
- Tokens CSRF en formularios
- Validación de origen de peticiones
- Cookies seguras y HttpOnly

### 3. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5 // 5 intentos
});
```

## 📝 Logs y Monitoreo

### 1. Registro de Actividad
- Logs de autenticación
- Registro de acciones críticas
- Monitoreo de intentos fallidos

### 2. Alertas
- Notificaciones de accesos sospechosos
- Alertas de cambios en datos sensibles
- Monitoreo de uso de API

## 🔄 Actualizaciones de Seguridad

### 1. Mantenimiento
- Actualizaciones regulares de dependencias
- Escaneo de vulnerabilidades
- Revisión de logs de seguridad

### 2. Buenas Prácticas
- Desarrollo siguiendo OWASP Top 10
- Code review con enfoque en seguridad
- Testing de seguridad regular

## 📚 Recursos Adicionales

### 1. Documentación
- [OWASP Security Cheat Sheet](https://cheatsheetseries.owasp.org/)
- [JWT Best Practices](https://auth0.com/blog/jwt-security-best-practices/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

### 2. Herramientas
- npm audit para escaneo de vulnerabilidades
- ESLint con reglas de seguridad
- SonarQube para análisis de código

## 🎓 Agradecimientos
Este documento de seguridad ha sido desarrollado bajo la supervisión de la **Ing. Fanny Casadiego**, docente tutora de la asignatura, siguiendo las mejores prácticas de seguridad en el desarrollo web. 