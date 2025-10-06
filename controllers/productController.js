const Product = require("../models/Product");
const { NotFoundError } = require('../utils/errors');

// Get all products (with pagination & Search support)

// GET /api/products?category=Food&search=apple&page=1&limit=5
exports.getProducts = async (req, res, next) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: 'i' }; // case-insensitive search
        }

        const skip = (page - 1) * limit;

        const products = await Product.find(filter).skip(skip).limit(Number(limit));
        const total = await Product.countDocuments(filter);

        res.json({
            data: products,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/products/:id - Get a specific product
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw new NotFoundError("Product not found"); // Using Custom error class for different types of error
        res.json(product);
    } catch (error) {
        next(error);
    }
};

// POST /api/products - Create a new product
exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

// PUT /api/products/:id - Update a product
exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/products/:id - Delete a product
exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) throw new NotFoundError("Product not found");
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Product Stats Endpoint

// GET /api/products/stats
exports.getProductStats = async (req, res, next) => {
    try {
        const stats = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);
        res.json(stats);
    } catch (error) {
        next(error);
    }
};


