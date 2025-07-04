// Middleware for checking logged-in user
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  try {
    // Extract token from Cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided, authorization denied",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Exclude password from user object
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      message: "Invalid token, authorization denied",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied, admin privileges required",
    });
  }
};

module.exports = { isAuth, isAdmin };
