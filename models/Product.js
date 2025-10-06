// models/Product.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define schema
const productSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, trim: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    category: { type: String, required: false },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

// Auto-increment plugin
productSchema.plugin(AutoIncrement, { inc_field: 'id' });

// Create the model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;