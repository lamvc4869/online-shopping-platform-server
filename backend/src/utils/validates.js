import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Brand from "../models/brand.model.js";
import bcrypt from "bcrypt";
import { AppError } from "./error.js";

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
      throw new AppError(
        `Insufficient stock for product: ${dbProduct.name}`,
        400
      );
    }
  }
  return existingProducts;
};

const validateEmail = (email) => {
  if (typeof email !== "string") return false;
  return /^[^@]+@[^@]+$/.test(email);
};

const isDuplicateEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? true : false;
};

const validatePasswordRegister = (password) => {
  return !password || !password.trim() || password.length < 8 ? false : true;
};

const validatePasswordLogin = async (inputPassword, currentPassword) => {
  return await bcrypt.compare(inputPassword, currentPassword);
};

const validateUserDataRegister = async (userData) => {
  const {
    email,
    password,
    confirmPassword,
    role = 0,
    firstName,
    lastName,
  } = userData;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new AppError("Don't leave any information blank", 400);
  }
  if (role === 2 && userData?.adminKey !== process.env.ADMIN_CREATION_SECRET) {
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


const validateProductData = async (productData, files) => {
  const { name, price, category, brandId, offerPrice, stock } = productData;

  if (!name || !price || !category || !brandId) {
    throw new AppError(
      "Thiếu thông tin bắt buộc: name, price, category, brandId",
      400
    );
  }

  if (!files || files.length === 0) {
    throw new AppError("Cần ít nhất 1 hình ảnh sản phẩm", 400);
  }

  if (files.length > 4) {
    throw new AppError("Tối đa 4 hình ảnh", 400);
  }

  if (typeof price !== "number" && isNaN(Number(price))) {
    throw new AppError("Giá phải là số", 400);
  }

  if (Number(price) <= 0) {
    throw new AppError("Giá sản phẩm phải lớn hơn 0", 400);
  }

  if (offerPrice) {
    if (typeof offerPrice !== "number" && isNaN(Number(offerPrice))) {
      throw new AppError("Giá khuyến mãi phải là số", 400);
    }
    if (Number(offerPrice) >= Number(price)) {
      throw new AppError("Giá khuyến mãi phải nhỏ hơn giá gốc", 400);
    }
  }

  if (stock !== undefined && stock !== null) {
    if (typeof stock !== "number" && isNaN(Number(stock))) {
      throw new AppError("Số lượng tồn kho phải là số", 400);
    }
    if (Number(stock) < 0) {
      throw new AppError("Số lượng tồn kho không thể âm", 400);
    }
  }
};

const validateBrandExists = async (brandId) => {
  if (!brandId) {
    throw new AppError("Brand ID là bắt buộc", 400);
  }

  const brand = await Brand.findById(brandId);
  if (!brand) {
    throw new AppError("Brand không tồn tại", 404);
  }
  return brand;
};

const validateProductNameUnique = async (name, excludeProductId = null) => {
  if (!name || !name.trim()) {
    throw new AppError("Tên sản phẩm không được để trống", 400);
  }

  const query = { name: name.trim() };
  if (excludeProductId) {
    query._id = { $ne: excludeProductId };
  }

  const existingProduct = await Product.findOne(query);
  if (existingProduct) {
    throw new AppError("Sản phẩm với tên này đã tồn tại", 409);
  }
};

const validateBrandData = async (brandData) => {
  const { brandName, brandAdress } = brandData;

  if (!brandName || !brandName.trim()) {
    throw new AppError("Tên thương hiệu không được để trống", 400);
  }

  if (!brandAdress || !brandAdress.trim()) {
    throw new AppError("Địa chỉ thương hiệu không được để trống", 400);
  }

  const existingBrand = await Brand.findOne({ brandName: brandName.trim() });
  if (existingBrand) {
    throw new AppError("Thương hiệu với tên này đã tồn tại", 409);
  }
};

export {
  validateProducts,
  validateEmail,
  validatePasswordRegister,
  validatePasswordLogin,
  validateUserDataRegister,
  validateProductData,
  validateBrandExists,
  validateProductNameUnique,
  validateBrandData,
};
