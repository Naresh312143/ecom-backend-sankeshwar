const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add to cart
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [
          {
            productId,
            quantity: quantity || 1,
          },
        ],
        totalPrice: product.price * (quantity || 1),
      });
    } else {
      const prodIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (prodIndex > -1) {
        cart.products[prodIndex].quantity += quantity || 1;
      } else {
        cart.products.push({ productId, quantity: quantity || 1 });
      }
      // Recalculate total price
      cart.totalPrice = await calculateTotalPrice(cart.products);
    }

    await cart.save();
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      message: "Error adding to cart",
    });
  }
};

// Update quantity
const updateQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const prodIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (prodIndex === -1) {
      return res.status(404).json({
        message: "Product not in cart",
      });
    }

    cart.products[prodIndex].quantity = quantity;
    cart.totalPrice = await calculateTotalPrice(cart.products);

    await cart.save();
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({
      message: "Error updating quantity",
    });
  }
};

// Get products in cart
const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      cart = new Cart({
        userId,
        products: [],
        totalPrice: 0,
      });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      message: "Error fetching cart",
    });
  }
};

// Remove product
const removeProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({
        message: "Cart not found",
      });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.totalPrice = await calculateTotalPrice(cart.products);

    await cart.save();
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({
      message: "Error removing product",
    });
  }
};

// Clear cart
const clearCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      message: "Error clearing cart",
    });
  }
};

// Helper to calculate total price
async function calculateTotalPrice(products) {
  let total = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
}

module.exports = {
  addToCart,
  updateQuantity,
  getCart,
  removeProduct,
  clearCart,
};
