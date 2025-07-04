const Product = require("../models/Product");

// Controller for Create product
const createProduct = async (req, res) => {
  try {
    // Create product using model
    const product = await Product.create(req.body);

    // Send created product in response
    res.status(201).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Get all products from DB
const getAllProducts = async (req, res) => {
  try {
    // get all products using find method
    const products = await Product.find();

    // Send all products in response
    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Get product by ID from DB
const getProductById = async (req, res) => {
  try {
    // Get productId from request parameters
    const productId = req.params.id;

    // Get product by ID using findById method
    const product = await Product.findById(productId);

    // If product not found, return 404
    if (!product) {
      // Return 404 status code with message
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Send product in response
    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Update product by ID in DB
const updateProduct = async (req, res, next) => {
  try {
    // Get productId from request parameters
    const productId = req.params.id;

    // Update product using findByIdAndUpdate method
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    // If product not found, return 404
    if (!product) {
      // Return 404 status code with message
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Send updated product in response
    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Delete product by ID from DB
const deleteProduct = async (req, res, next) => {
  try {
    // Get productId from request parameters
    const productId = req.params.id;

    // Delete product using findByIdAndDelete method
    const product = await Product.findByIdAndDelete(productId);

    // If product not found, return 404
    if (!product) {
      // Return 404 status code with message
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Send success message in response
    res.json({
      message: "Product deleted",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Export all controller functions
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
