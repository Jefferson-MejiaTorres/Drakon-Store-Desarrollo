# Lógica del BackEnd - Drakon Store

## Arquitectura General

El BackEnd de Drakon Store está diseñado siguiendo una arquitectura en capas, con una clara separación de responsabilidades:

### 1. Capa de Base de Datos
- Utiliza MariaDB/MySQL como sistema de gestión de base de datos
- Implementa un modelo relacional completo con tablas principales y subtablas
- Maneja transacciones para operaciones críticas (compras, pagos, etc.)

### 2. Capa de Servicios
- **Gestión de Usuarios**
  - Registro y autenticación
  - Gestión de perfiles y direcciones
  - Control de roles (cliente/admin)

- **Gestión de Productos**
  - CRUD de productos
  - Control de inventario
  - Gestión de variantes y categorías
  - Sistema de imágenes

- **Gestión de Pedidos**
  - Proceso de compra
  - Seguimiento de pedidos
  - Gestión de estados
  - Historial de transacciones

- **Sistema de Pagos**
  - Integración con pasarelas de pago
  - Gestión de transacciones
  - Registro de detalles de pago

### 3. Capa de API
- Endpoints RESTful para todas las operaciones
- Autenticación mediante JWT
- Validación de datos
- Manejo de errores estandarizado

## Flujos Principales

### 1. Proceso de Compra
1. Usuario agrega productos al carrito
2. Sistema valida stock y precios
3. Usuario selecciona dirección de envío
4. Sistema procesa el pago
5. Se genera el pedido
6. Se actualiza el inventario
7. Se inicia el seguimiento del pedido

### 2. Gestión de Inventario
1. Registro de productos con variantes
2. Control de stock en tiempo real
3. Historial de movimientos
4. Alertas de stock bajo

### 3. Sistema de Usuarios
1. Registro y login
2. Gestión de favoritos
3. Historial de compras
4. Gestión de direcciones

## Consideraciones Técnicas

### Seguridad
- Contraseñas hasheadas con bcrypt
- Tokens JWT para autenticación
- Validación de datos en todas las capas
- Protección contra inyección SQL
- Manejo seguro de pagos

### Escalabilidad
- Diseño modular para fácil expansión
- Optimización de consultas
- Caché para datos frecuentes
- Manejo eficiente de recursos

### Mantenibilidad
- Código documentado
- Patrones de diseño establecidos
- Logs para debugging
- Tests automatizados

## Integración con FrontEnd
- API RESTful para comunicación
- Formato JSON para intercambio de datos
- Manejo de CORS
- Autenticación mediante tokens

## Próximos Pasos
1. Implementación de sistema de notificaciones
2. Integración con servicios de envío
3. Sistema de reseñas y calificaciones
4. Panel de administración avanzado

# BackEnd

Esta carpeta está destinada a contener el código fuente y recursos relacionados con la lógica de servidor, base de datos y API del proyecto Drakon Store.

## Sugerencias de contenido:
- Código de servidor (por ejemplo, Node.js, Python, Java, etc.)
- Archivos de configuración de base de datos
- Documentación técnica del backend
- Scripts de despliegue

Actualmente, el desarrollo del backend puede planificarse aquí y documentarse conforme avance el proyecto.

---

> **Nota:** Por el momento, el proyecto Drakon Store Web está enfocado en el frontend. Cuando se inicie el desarrollo backend, los archivos y carpetas correspondientes se agregarán aquí.

---

## Nota sobre el BackEnd
Actualmente, el proyecto Drakon Store está enfocado en el desarrollo del FrontEnd. Esta carpeta está reservada para la futura implementación del BackEnd, donde se incluirán:
- Código de servidor (Node.js, Python, etc.)
- Configuración de base de datos
- API y lógica de negocio
- Documentación técnica del backend
