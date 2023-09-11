const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Rutas de productos
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Rutas de carritos
const cartsRouter = require('./routes/carts');
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
