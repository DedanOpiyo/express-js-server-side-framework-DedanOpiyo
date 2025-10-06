const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const { validateProduct } = require('../middleware/validateProduct');

// Use authentication middleware for all routes
router.use(authMiddleware);

// Only applying validation on POST and PUT

// GET product stats
router.get('/stats', productController.getProductStats);

// POST create a product
router.post('/', validateProduct, productController.createProduct);

// PUT update a product
router.put('/:id', validateProduct, productController.updateProduct);

// GET all products
router.get('/', productController.getProducts);

// GET a product by ID
router.get('/:id', productController.getProductById);

// DELETE a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;