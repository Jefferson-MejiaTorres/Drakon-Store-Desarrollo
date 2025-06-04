# Enumeración de Tablas y Subtablas - Drakon Store

## 1. usuarios
- Subtabla: direcciones_envio
- Subtabla: contactos
- Subtabla: pagos
- Subtabla: favoritos
- Subtabla: carritos
- Subtabla: pedidos

## 2. productos
- Subtabla: historial_producto
- Subtabla: imagenes_producto (si se implementa galería)
- Subtabla: variantes_producto (si se implementa tallas/colores)

## 3. categorias

## 4. favoritos

## 5. carritos
- Subtabla: carrito_productos

## 6. pedidos
- Subtabla: pedido_productos
- Subtabla: seguimiento_pedido

## 7. direcciones_envio

## 8. pagos
- Subtabla: detalle_pago

## 9. historial_producto

## 10. contactos

---

### Resumen de subtablas clave
- **carrito_productos**: productos en cada carrito
- **pedido_productos**: productos en cada pedido
- **seguimiento_pedido**: historial de estados del pedido
- **detalle_pago**: detalles de cada pago (tarjeta, pse, etc)
- **historial_producto**: movimientos de inventario
- **imagenes_producto**: imágenes adicionales por producto (opcional)
- **variantes_producto**: tallas, colores, etc (opcional)
