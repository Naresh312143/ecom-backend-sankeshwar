const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware for converting Body JSON to Object
app.use(express.json());

// Middleware for converting Cookie JSON to Object
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "Server is running fine and good",
  });
});

// Products Routes
app.use("/products", productRoutes);

// Auth routes
app.use("/auth", authRoutes);

// Cart routes
app.use("/cart", cartRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");

    // Starting the server in PORT
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
