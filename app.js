const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Requiere tu ProductManager
const ProductManager = require('./ProductManager');

// Función para generar un ID único
function generateUniqueId() {
    // Implementa la lógica para generar un ID único aquí
}

// Rutas de productos
const productManager = new ProductManager('products.json'); // Reemplaza 'products.json' con tu ruta
app.get('/api/products', (req, res) => {
    const limit = parseInt(req.query.limit); // Transforma a número
    let products = productManager.getAllProducts();

    if (!isNaN(limit)) {
        products = products.slice(0, limit);
    }

    res.json({ limitedProducts: products });
});

app.get('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid); // Transforma a número
    const product = productManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.post('/api/products', (req, res) => {
    // Parsea el ID a número si es necesario
    const newProduct = {
        id: parseInt(req.body.id),
        name: req.body.name,
        price: parseFloat(req.body.price),
    };

    // Lógica para agregar el nuevo producto a la lista existente
    // ...

    res.json({ message: 'Product created successfully' });
});

app.put('/api/products/:pid', (req, res) => {
    // Parsea el ID a número si es necesario
    const productId = parseInt(req.params.pid);

    // Lógica para actualizar el producto por ID
    // ...

    res.json({ message: 'Product updated successfully' });
});

app.delete('/api/products/:pid', (req, res) => {
    // Parsea el ID a número si es necesario
    const productId = parseInt(req.params.pid);

    // Lógica para eliminar el producto por ID
    // ...

    res.json({ message: 'Product deleted successfully' });
});

// Rutas de carritos (debes implementarlas similarmente)

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
