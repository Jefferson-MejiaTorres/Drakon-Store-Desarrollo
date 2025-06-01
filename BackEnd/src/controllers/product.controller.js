const Product = require('../models/product.model');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { is_active: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener los productos'
    });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Producto no encontrado'
      });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener el producto'
    });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al crear el producto'
    });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Producto no encontrado'
      });
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al actualizar el producto'
    });
  }
};

// Eliminar un producto (soft delete)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Producto no encontrado'
      });
    }
    await product.update({ is_active: false });
    res.json({
      status: 'success',
      message: 'Producto eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar el producto'
    });
  }
}; 