import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const validateProducts = async (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("Products array is required and cannot be empty");
  }

  const productIds = products.map((p) => p.productId);
  const existingProducts = await Product.find({
    _id: { $in: productIds },
    isActive: true,
  });

  if (existingProducts.length !== productIds.length) {
    throw new Error("Some products not found or not available");
  }

  for (const product of products) {
    const dbProduct = existingProducts.find(
      (p) => p._id.toString() === product.productId
    );
    if (dbProduct.stock < product.quantity) {
      throw new Error(`Insufficient stock for product: ${dbProduct.name}`);
    }
  }
  return existingProducts;
};

const validateEmail = (email) => {
  const regex = /^[^\s@]{4,}@gmail\.com$/i;
  return !email || !regex.test(email) ? false : true;
};

const isDuplicateEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? true : false;
}

const validatePasswordRegister = (password) => {
  return !password || !password.trim() || password.length < 8 ? false : true;
};

const validatePasswordLogin = async (inputPassword, currentPassword) => {
  return await bcrypt.compare(inputPassword, currentPassword);
};

const validateUserDataRegister = (userData, res) => {
  const { email, password, role = 0, firstName, lastName } = userData;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "Don't leave any information blank",
      success: false,
    });
  }
  if (role === 1 && userData?.adminKey !== process.env.ADMIN_CREATION_SECRET) {
    return res.status(403).json({
      message: "No permission to create admin account",
      success: false,
    });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "Invalid email",
      success: false,
    });
  }
  if (isDuplicateEmail(email)) {
    return res.status(409).json({
      message: "Email already in use",
      success: false,
    });
  }
  if (!validatePasswordRegister(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
      success: false,
    });
  }
};

export {
  validateProducts,
  validateEmail,
  validatePasswordRegister,
  validatePasswordLogin,
  validateUserDataRegister,
};
