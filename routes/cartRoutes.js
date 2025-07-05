const express = require("express");
const {
  getCart,
  addToCart,
  updateQuantity,
  removeProduct,
  clearCart,
} = require("../controllers/cartController");
const { isAuth } = require("../middlewares/authMiddlewares");

const cartRoutes = express.Router();

// Get cart route
cartRoutes.get("/", isAuth, getCart);

// Add product to cart route
cartRoutes.post("/add", isAuth, addToCart);

// Update quantity route
cartRoutes.put("/", isAuth, updateQuantity);

// Remove product route
cartRoutes.delete("/product", isAuth, removeProduct);

// Clear cart route
cartRoutes.delete("/", isAuth, clearCart);

module.exports = cartRoutes;
