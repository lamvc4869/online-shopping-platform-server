import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import deleteProductFromCartService from "./deleteProductFromCart.service.js";
import { calculateCartTotal } from "../../lib/calcs/priceCalculation.service.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";

const updateProductInCartService = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId, status: 1 });
  if (!cart) {
    throw new Error("Cart not found");
  }
  const product = await Product.findById(productId);
  const productIndex = cart.products.findIndex(
    (p) => p.productId.toString() === productId
  );
  if (productIndex === -1) {
    throw new Error("Product not found in cart");
  }
  if (quantity > product.stock) {
    throw new Error("Insufficient stock available");
  }
  if (quantity === 0) {
    return await deleteProductFromCartService(userId, productId);
  }
  cart.products[productIndex].quantity = quantity;
  cart.totalAmount = calculateCartTotal(cart.products);
  await cart.save();
  const populatedCart = await populateCart(cart._id);
  return populatedCart;
};

export default updateProductInCartService;
