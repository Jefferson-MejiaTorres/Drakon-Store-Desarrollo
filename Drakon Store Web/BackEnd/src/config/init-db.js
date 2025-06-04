const { sequelize } = require('./database');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const bcrypt = require('bcryptjs');

async function initializeDatabase() {
    try {
        // Sincronizar modelos con la base de datos
        await sequelize.sync({ force: true });
        console.log('Base de datos sincronizada');

        // Crear usuario administrador
        const adminPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'Admin',
            lastname: 'System',
            email: 'admin@drakonstore.com',
            password: adminPassword,
            role: 'admin',
            phone: '1234567890'
        });
        console.log('Usuario administrador creado');

        // Crear productos de ejemplo
        const products = [
            {
                name: 'Gorra Drakon Classic',
                description: 'Gorra clásica con logo bordado',
                price: 29.99,
                stock: 100,
                image_url: '/images/gorra1.png',
                category: 'Gorras',
                is_limited: false
            },
            {
                name: 'Gorra Drakon Premium',
                description: 'Edición limitada con detalles exclusivos',
                price: 39.99,
                stock: 50,
                image_url: '/images/gorra2.png',
                category: 'Gorras',
                is_limited: true
            },
            {
                name: 'Camiseta Drakon Basic',
                description: 'Camiseta básica con logo minimalista',
                price: 24.99,
                stock: 200,
                image_url: '/images/gorra3.png',
                category: 'Camisetas',
                is_limited: false
            },
            {
                name: 'Camiseta Drakon Premium',
                description: 'Edición limitada con diseño exclusivo',
                price: 34.99,
                stock: 75,
                image_url: '/images/gorra5.png',
                category: 'Camisetas',
                is_limited: true
            }
        ];

        await Product.bulkCreate(products);
        console.log('Productos de ejemplo creados');

        console.log('Base de datos inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
}

// Ejecutar la inicialización
initializeDatabase(); 