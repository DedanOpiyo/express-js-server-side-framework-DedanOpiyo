// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// connect Database
connectDB();

// Middleware setup
app.use(bodyParser.json());
app.use(logger); // Log every request

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productRoutes);

// Error handler (after all routes)
app.use(errorHandler);

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// // Example route implementation for GET /api/products
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 