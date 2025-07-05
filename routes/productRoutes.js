const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const validateProduct = require("../utils/validateProduct");
const { isAuth, isAdmin } = require("../middlewares/authMiddlewares");

// Create a new router for product routes
const productRoutes = express.Router();

// Create product route with validation middleware
productRoutes.post("/", isAuth, isAdmin, validateProduct, createProduct);

// get all products route
productRoutes.get("/", isAuth, getAllProducts);

// Get product by ID route
productRoutes.get("/:id", isAuth, getProductById);

// Update product by ID route with validation middleware
productRoutes.put("/:id", isAuth, isAdmin, validateProduct, updateProduct);

// Delete product by ID route
productRoutes.delete("/:id", isAuth, isAdmin, deleteProduct);

// Export the product routes
module.exports = productRoutes;
