const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Rutas públicas
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas (requieren autenticación)
router.post('/', [verifyToken, isAdmin], productController.createProduct);
router.put('/:id', [verifyToken, isAdmin], productController.updateProduct);
router.delete('/:id', [verifyToken, isAdmin], productController.deleteProduct);

module.exports = router; 