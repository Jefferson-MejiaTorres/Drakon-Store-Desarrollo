# Consideraciones y Buenas Prácticas - Drakon Store

## General
- Todas las tablas usan PK autoincremental (INT).
- Todas las FK tienen ON DELETE RESTRICT o CASCADE según el caso.
- Los ENUM se usan para estados y roles, pero pueden migrar a tablas si se requiere flexibilidad.
- Los campos de fecha usan DATETIME.
- Los precios usan DECIMAL(10,2).
- Los emails y campos únicos tienen índices únicos.

## Escalabilidad
- Subtablas para relaciones N:M y para historial (seguimiento, inventario, pagos).
- Tablas de imágenes y variantes permiten ampliar catálogo sin modificar la tabla principal.
- El historial de producto permite trazabilidad de inventario y auditoría.
- El seguimiento de pedido permite ver el historial de estados (útil para usuarios y admins).

## Seguridad
- Nunca almacenar datos sensibles de tarjetas, solo referencias o tokens.
- Contraseñas siempre hasheadas (bcrypt recomendado).
- Los roles de usuario permiten separar privilegios (cliente, admin).

## Migración y mantenimiento
- El modelo es compatible con MariaDB y MySQL Workbench.
- Se recomienda usar scripts de migración para cambios futuros.
- Las tablas pueden ser extendidas para multi-tienda, multi-idioma, etc.
