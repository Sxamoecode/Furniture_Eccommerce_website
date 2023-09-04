const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ["Table", "Chair", "Dresser", "Bed Frame", "Sofa", "Ottoman", "Shelf", "Rug", "Stands"]
  },
},
  {
    timestamps: true
  }
);

// Create the product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;