const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const validateProduct = require("../utils/validateProduct");

// Create a new router for product routes
const productRoutes = express.Router();

// Create product route with validation middleware
productRoutes.post("/", validateProduct, createProduct);

// get all products route
productRoutes.get("/", getAllProducts);

// Get product by ID route
productRoutes.get("/:id", getProductById);

// Update product by ID route with validation middleware
productRoutes.put("/:id", validateProduct, updateProduct);

// Delete product by ID route
productRoutes.delete("/:id", deleteProduct);

// Export the product routes
module.exports = productRoutes;
