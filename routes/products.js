const express = require('express');
const router = express.Router();
const fs = require('fs');

// Ruta GET /api/products/
router.get('/', (req, res) => {
  try {
    const productsData = fs.readFileSync('productos.json', 'utf-8');
    const products = JSON.parse(productsData);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de productos.' });
  }
});

// Ruta GET /api/products/:pid
router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    const productsData = fs.readFileSync('productos.json', 'utf-8');
    const products = JSON.parse(productsData);
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar el producto.' });
  }
});

// Ruta POST /api/products/
router.post('/', (req, res) => {
  const newProduct = req.body;
  try {
    const productsData = fs.readFileSync('productos.json', 'utf-8');
    const products = JSON.parse(productsData);
    // Generar un ID único (puedes usar un paquete como 'uuid')
    newProduct.id = generateUniqueId();
    products.push(newProduct);
    fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto.' });
  }
});

// Ruta PUT /api/products/:pid
router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  try {
    const productsData = fs.readFileSync('productos.json', 'utf-8');
    const products = JSON.parse(productsData);
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));
      res.json(products[index]);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
});

// Ruta DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    const productsData = fs.readFileSync('productos.json', 'utf-8');
    let products = JSON.parse(productsData);
    const initialLength = products.length;
    products = products.filter((p) => p.id !== productId);
    if (products.length !== initialLength) {
      fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));
      res.json({ message: 'Producto eliminado correctamente.' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});

module.exports = router;
