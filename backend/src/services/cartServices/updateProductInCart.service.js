import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import deleteProductFromCartService from "./deleteProductFromCart.service.js";
import { calculateCartTotal } from "../../lib/calcs/priceCalculation.service.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";
import { AppError } from "../../utils/error.js";

const updateProductInCartService = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId, status: 1 });
  if (!cart) throw new AppError("Cart not found", 404);
  if (quantity < 0) throw new AppError("Quantity must be a non-negative integer", 400);
  const product = await Product.findById(productId);
  const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
  if (productIndex === -1) throw new AppError("Product not found in cart", 404);
  if (quantity > product.stock) throw new AppError("Insufficient stock available", 400);
  if (quantity === 0) return await deleteProductFromCartService(userId, productId);
  cart.products[productIndex].quantity = quantity;
  cart.totalAmount = calculateCartTotal(cart.products);
  await cart.save();
  const populatedCart = await populateCart(cart._id);
  return populatedCart;
};

export default updateProductInCartService;
