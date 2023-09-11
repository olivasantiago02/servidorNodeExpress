const express = require('express');
const router = express.Router();
const fs = require('fs');

// Ruta POST /api/carts/
router.post('/', (req, res) => {
  const newCart = {
    id: generateUniqueId(),
    products: [],
  };

  try {
    const cartsData = fs.readFileSync('carrito.json', 'utf-8');
    const carts = JSON.parse(cartsData);
    carts.push(newCart);
    fs.writeFileSync('carrito.json', JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el carrito.' });
  }
});

// Ruta GET /api/carts/:cid
router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  try {
    const cartsData = fs.readFileSync('carrito.json', 'utf-8');
    const carts = JSON.parse(cartsData);
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar el carrito.' });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1; // Por defecto, agrega 1 producto

  try {
    const cartsData = fs.readFileSync('carrito.json', 'utf-8');
    let carts = JSON.parse(cartsData);
    const cart = carts.find((c) => c.id === cartId);

    if (cart) {
      // Verificar si el producto ya está en el carrito
      const existingProduct = cart.products.find((p) => p.id === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        // Agregar el producto al carrito
        cart.products.push({ id: productId, quantity });
      }

      fs.writeFileSync('carrito.json', JSON.stringify(carts, null, 2));
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
  }
});

module.exports = router;
