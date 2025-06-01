/*script.js
Archivo JavaScript principal para la tienda Drakon Store. Implementa la lógica de interacción, carrito de compras, favoritos y animaciones de la interfaz.
Copia aquí el archivo `script.js` desde la carpeta `Drakon Store Web` para centralizar el desarrollo del FrontEnd.
*/

// Configuración de la API
const API_URL = 'http://localhost:3000/api';

// Estado global de la aplicación
let currentUser = null;
let products = [];
let cart = [];

// Funciones de utilidad
const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');

// Funciones de autenticación
async function register(userData) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (data.status === 'success') {
            setToken(data.data.token);
            currentUser = data.data.user;
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error en registro:', error);
        return false;
    }
}

async function login(credentials) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (data.status === 'success') {
            setToken(data.data.token);
            currentUser = data.data.user;
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error en login:', error);
        return false;
    }
}

async function logout() {
    removeToken();
    currentUser = null;
    window.location.href = '/';
}

// Funciones de productos
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        if (data.status === 'success') {
            products = data.data.products;
            renderProducts();
        }
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

function renderProducts() {
    const productsContainer = document.getElementById('products');
    if (!productsContainer) return;

    productsContainer.innerHTML = products.map(product => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${product.image_url}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>$${product.price}</strong></p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones del carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticación
    const token = getToken();
    if (token) {
        // Verificar token y obtener datos del usuario
        fetch(`${API_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                currentUser = data.data.user;
                updateUIForLoggedUser();
            } else {
                logout();
            }
        })
        .catch(() => logout());
    }

    // Cargar productos
    fetchProducts();
});

function updateUIForLoggedUser() {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <span class="me-3">Hola, ${currentUser.name}</span>
            <button class="btn btn-outline-danger" onclick="logout()">Cerrar sesión</button>
        `;
    }
}

// Control del header sticky con sombra al hacer scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
