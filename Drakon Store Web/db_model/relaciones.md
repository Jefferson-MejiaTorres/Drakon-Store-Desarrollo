# Relaciones y Llaves Foráneas - Drakon Store

## Relaciones principales

- **usuarios** 1---N **direcciones_envio**
- **usuarios** 1---N **contactos**
- **usuarios** 1---N **pagos**
- **usuarios** 1---N **favoritos**
- **usuarios** 1---N **carritos**
- **usuarios** 1---N **pedidos**
- **productos** 1---N **historial_producto**
- **productos** 1---N **imagenes_producto** (opcional)
- **productos** 1---N **variantes_producto** (opcional)
- **productos** N---M **carritos** (vía carrito_productos)
- **productos** N---M **pedidos** (vía pedido_productos)
- **productos** N---M **favoritos**
- **categorias** 1---N **productos**
- **carritos** 1---N **carrito_productos**
- **pedidos** 1---N **pedido_productos**
- **pedidos** 1---N **seguimiento_pedido**
- **pedidos** 1---1 **pagos**
- **pedidos** 1---1 **direcciones_envio**
- **pagos** 1---N **detalle_pago**

## Ejemplo de llaves foráneas

- `carrito_productos.id_carrito` → `carritos.id_carrito`
- `carrito_productos.id_producto` → `productos.id_producto`
- `pedido_productos.id_pedido` → `pedidos.id_pedido`
- `pedido_productos.id_producto` → `productos.id_producto`
- `favoritos.id_usuario` → `usuarios.id_usuario`
- `favoritos.id_producto` → `productos.id_producto`
- `productos.id_categoria` → `categorias.id_categoria`
- `pedidos.id_usuario` → `usuarios.id_usuario`
- `pedidos.id_direccion_envio` → `direcciones_envio.id_direccion_envio`
- `pedidos.id_pago` → `pagos.id_pago`
- `seguimiento_pedido.id_pedido` → `pedidos.id_pedido`
- `historial_producto.id_producto` → `productos.id_producto`
- `historial_producto.usuario_responsable` → `usuarios.id_usuario`
