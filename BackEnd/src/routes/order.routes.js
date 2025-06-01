const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Rutas protegidas
router.post('/', verifyToken, orderController.createOrder);
router.get('/my-orders', verifyToken, orderController.getUserOrders);
router.get('/:id', verifyToken, orderController.getOrderById);

// Rutas de administrador
router.put('/:id/status', [verifyToken, isAdmin], orderController.updateOrderStatus);

module.exports = router; 