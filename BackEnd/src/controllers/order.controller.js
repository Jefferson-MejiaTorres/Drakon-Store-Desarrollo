const { Order, OrderProduct, OrderTracking } = require('../models/order.model');
const Product = require('../models/product.model');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { products, shipping_address_id, payment_id } = req.body;
    const user_id = req.user.id;

    // Calcular el total
    let total = 0;
    for (const item of products) {
      const product = await Product.findByPk(item.product_id);
      if (!product) {
        throw new Error(`Producto ${item.product_id} no encontrado`);
      }
      total += product.price * item.quantity;
    }

    // Crear la orden
    const order = await Order.create({
      user_id,
      shipping_address_id,
      payment_id,
      total,
      status: 'pending'
    }, { transaction });

    // Crear los productos de la orden
    for (const item of products) {
      await OrderProduct.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }, { transaction });
    }

    // Crear el primer registro de seguimiento
    await OrderTracking.create({
      order_id: order.id,
      status: 'pending',
      observation: 'Orden creada'
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({
      status: 'error',
      message: error.message || 'Error al crear la orden'
    });
  }
};

// Obtener todas las órdenes del usuario
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: OrderProduct,
          include: [{ model: Product }]
        },
        {
          model: OrderTracking,
          order: [['created_at', 'DESC']]
        }
      ]
    });

    res.json({
      status: 'success',
      data: { orders }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener las órdenes'
    });
  }
};

// Obtener una orden específica
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
      include: [
        {
          model: OrderProduct,
          include: [{ model: Product }]
        },
        {
          model: OrderTracking,
          order: [['created_at', 'DESC']]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Orden no encontrada'
      });
    }

    res.json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener la orden'
    });
  }
};

// Actualizar el estado de una orden (solo admin)
exports.updateOrderStatus = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { status, observation } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Orden no encontrada'
      });
    }

    // Actualizar estado de la orden
    await order.update({ status }, { transaction });

    // Crear nuevo registro de seguimiento
    await OrderTracking.create({
      order_id: order.id,
      status,
      observation
    }, { transaction });

    await transaction.commit();

    res.json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({
      status: 'error',
      message: 'Error al actualizar el estado de la orden'
    });
  }
}; 