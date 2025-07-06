const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  verifyUser,
} = require("../controllers/authController");

const authRoutes = express.Router();

// Register route
authRoutes.post("/register", registerUser);

// Login router
authRoutes.post("/login", loginUser);

// Logout route
authRoutes.post("/logout", logoutUser);

// Verify user route
authRoutes.get("/verify", verifyUser);

module.exports = authRoutes;
