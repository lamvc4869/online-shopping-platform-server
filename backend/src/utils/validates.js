import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { AppError } from "./error.js"

const validateProducts = async (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new AppError("Products array is required and cannot be empty", 400);
  }

  const productIds = products.map((p) => p.productId);
  const existingProducts = await Product.find({
    _id: { $in: productIds },
    isActive: true,
  });

  if (existingProducts.length !== productIds.length) {
    throw new AppError("Some products not found or not available", 404);
  }

  for (const product of products) {
    if (product.quantity < 1) {
      throw new AppError("Quantity must be at least 1 for all products", 400);
    }
    const dbProduct = existingProducts.find(
      (p) => p._id.toString() === product.productId
    );
    if (dbProduct.stock < product.quantity) {
      throw new AppError(`Insufficient stock for product: ${dbProduct.name}`, 400);
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

const validateUserDataRegister = async (userData) => {
  const { email, password, confirmPassword, role = 0, firstName, lastName } = userData;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new AppError("Don't leave any information blank", 400);
  }
  if (role === 1 && userData?.adminKey !== process.env.ADMIN_CREATION_SECRET) {
    throw new AppError("No permission to create admin account", 403);
  }
  if (!validateEmail(email)) {
    throw new AppError("Invalid email", 400);
  }
  if (await isDuplicateEmail(email)) {
    throw new AppError("Email already in use", 409);
  }
  if (!validatePasswordRegister(password)) {
    throw new AppError("Password must be at least 8 characters long", 400);
  } 
  if (password !== confirmPassword) {
    throw new AppError("Passwords do not match", 400);
  }
};  

export {
  validateProducts,
  validateEmail,
  validatePasswordRegister,
  validatePasswordLogin,
  validateUserDataRegister,
};
