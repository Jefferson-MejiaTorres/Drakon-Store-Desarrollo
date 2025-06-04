-- Script de creación de base de datos para Drakon Store (MariaDB/MySQL) Talvez no se. 😡
-- Ejecutar en MySQL Workbench si quiero Y.

CREATE DATABASE IF NOT EXISTS drakon_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE drakon_store;

-- =============================
-- 1. TABLA PRINCIPAL: usuarios
-- =============================
-- Aquí guardo los datos de los usuarios registrados (clientes y admins)
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY, -- PK única para cada usuario
    nombre VARCHAR(60), -- Nombre real del usuario
    apellido VARCHAR(60), -- Apellido real
    email VARCHAR(120) UNIQUE, -- Email único (login)
    password_hash VARCHAR(255), -- Contraseña hasheada (nunca en texto plano)
    telefono VARCHAR(30), -- Teléfono de contacto
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro
    rol ENUM('cliente','admin') DEFAULT 'cliente', -- Rol del usuario
    activo BOOLEAN DEFAULT 1 -- Si el usuario está activo o no
);

-- =========================================
-- 1.1 SUBTABLA: direcciones_envio (de usuario)
-- =========================================
-- Cada usuario puede tener varias direcciones de envío
CREATE TABLE direcciones_envio (
    id_direccion_envio INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_usuario INT, -- FK al usuario dueño
    direccion VARCHAR(255), -- Dirección completa
    ciudad VARCHAR(60),
    departamento VARCHAR(60),
    pais VARCHAR(60),
    codigo_postal VARCHAR(20),
    telefono VARCHAR(30),
    predeterminada BOOLEAN DEFAULT 0, -- Si es la dirección principal
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- =============================
-- 2. TABLA PRINCIPAL: categorias
-- =============================
-- Aquí guardo las categorías de productos (ej: Gorras, Camisetas, etc)
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    nombre VARCHAR(60) UNIQUE, -- Nombre de la categoría
    descripcion TEXT -- Descripción opcional
);

-- =============================
-- 3. TABLA PRINCIPAL: productos
-- =============================
-- Aquí van los productos que vendo en la tienda
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_categoria INT, -- FK a la categoría
    nombre VARCHAR(120), -- Nombre del producto
    descripcion TEXT, -- Descripción larga
    precio DECIMAL(10,2), -- Precio actual
    stock INT, -- Stock disponible
    activo BOOLEAN DEFAULT 1, -- Si el producto está visible
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- =========================================
-- 3.1 SUBTABLA: imagenes_producto (de producto)
-- =========================================
-- Aquí guardo las imágenes adicionales de cada producto
CREATE TABLE imagenes_producto (
    id_imagen INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_producto INT, -- FK al producto
    url_imagen VARCHAR(255), -- Ruta o URL de la imagen
    descripcion VARCHAR(120), -- Descripción opcional
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- =========================================
-- 3.2 SUBTABLA: variantes_producto (de producto)
-- =========================================
-- Si el producto tiene variantes (talla, color, etc), van aquí
CREATE TABLE variantes_producto (
    id_variante INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_producto INT, -- FK al producto
    tipo VARCHAR(40), -- Ej: 'talla', 'color'
    valor VARCHAR(40), -- Ej: 'M', 'Negro'
    stock INT, -- Stock de esta variante
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- =========================================
-- 3.3 SUBTABLA: historial_producto (de producto)
-- =========================================
-- Aquí registro los movimientos de inventario (entradas/salidas)
CREATE TABLE historial_producto (
    id_historial INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_producto INT, -- FK al producto
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha del movimiento
    tipo ENUM('entrada','salida'), -- Tipo de movimiento
    cantidad INT, -- Cantidad movida
    usuario_responsable INT, -- FK al usuario que hizo el cambio
    observacion VARCHAR(255), -- Nota opcional
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (usuario_responsable) REFERENCES usuarios(id_usuario)
);

-- =============================
-- 4. TABLA PRINCIPAL: favoritos
-- =============================
-- Relaciona usuarios con productos que marcaron como favoritos
CREATE TABLE favoritos (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_usuario INT, -- FK al usuario
    id_producto INT, -- FK al producto
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP, -- Cuándo lo marcó
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- =============================
-- 5. TABLA PRINCIPAL: carritos
-- =============================
-- Cada usuario puede tener un carrito activo
CREATE TABLE carritos (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_usuario INT, -- FK al usuario dueño
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    activo BOOLEAN DEFAULT 1, -- Si el carrito está activo
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- =========================================
-- 5.1 SUBTABLA: carrito_productos (de carrito)
-- =========================================
-- Relaciona productos con carritos (N:M)
CREATE TABLE carrito_productos (
    id_carrito_producto INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_carrito INT, -- FK al carrito
    id_producto INT, -- FK al producto
    cantidad INT, -- Cuántos de ese producto
    FOREIGN KEY (id_carrito) REFERENCES carritos(id_carrito),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- =============================
-- 6. TABLA PRINCIPAL: pedidos
-- =============================
-- Aquí se registran los pedidos realizados
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_usuario INT, -- FK al usuario que compra
    id_direccion_envio INT, -- FK a la dirección de envío
    id_pago INT, -- FK al pago realizado
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha del pedido
    estado ENUM('pendiente','pagado','enviado','entregado','cancelado') DEFAULT 'pendiente', -- Estado actual
    total DECIMAL(10,2), -- Total del pedido
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_direccion_envio) REFERENCES direcciones_envio(id_direccion_envio),
    FOREIGN KEY (id_pago) REFERENCES pagos(id_pago) -- FK directa a pagos
);

-- =========================================
-- 6.1 SUBTABLA: pedido_productos (de pedido)
-- =========================================
-- Relaciona productos con pedidos (N:M)
CREATE TABLE pedido_productos (
    id_pedido_producto INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_pedido INT, -- FK al pedido
    id_producto INT, -- FK al producto
    cantidad INT, -- Cuántos de ese producto
    precio_unitario DECIMAL(10,2), -- Precio en el momento de la compra
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- =========================================
-- 6.2 SUBTABLA: seguimiento_pedido (de pedido)
-- =========================================
-- Aquí guardo el historial de estados del pedido
CREATE TABLE seguimiento_pedido (
    id_seguimiento INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_pedido INT, -- FK al pedido
    estado ENUM('pendiente','pagado','enviado','entregado','cancelado'), -- Estado en ese momento
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha del cambio
    observacion VARCHAR(255), -- Nota opcional
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
);

-- =============================
-- 7. TABLA PRINCIPAL: pagos
-- =============================
-- Aquí registro los pagos realizados por los usuarios
CREATE TABLE pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_usuario INT, -- FK al usuario que paga
    metodo ENUM('tarjeta','pse','efectivo'), -- Método de pago
    referencia VARCHAR(120), -- Referencia del pago (token, número, etc)
    monto DECIMAL(10,2), -- Monto pagado
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha del pago
    estado ENUM('pendiente','aprobado','rechazado') DEFAULT 'pendiente', -- Estado del pago
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- =========================================
-- 7.1 SUBTABLA: detalle_pago (de pago)
-- =========================================
-- Aquí guardo detalles adicionales del pago (ej: últimos 4 dígitos, banco, etc)
CREATE TABLE detalle_pago (
    id_detalle_pago INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_pago INT, -- FK al pago
    tipo VARCHAR(40), -- Ej: 'banco', 'ultimos4', etc
    valor VARCHAR(80), -- Valor del detalle
    FOREIGN KEY (id_pago) REFERENCES pagos(id_pago)
);

-- =============================
-- 8. TABLA PRINCIPAL: contactos
-- =============================
-- Aquí guardo los mensajes enviados por el formulario de contacto
CREATE TABLE contactos (
    id_contacto INT AUTO_INCREMENT PRIMARY KEY, -- PK única
    id_usuario INT NULL, -- FK opcional al usuario (si está logueado)
    nombre VARCHAR(60), -- Nombre de quien escribe
    email VARCHAR(120), -- Email de contacto
    mensaje TEXT, -- Mensaje enviado
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de envío
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
