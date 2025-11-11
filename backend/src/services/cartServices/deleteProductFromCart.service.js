import Cart from "../../models/cart.model.js";
import { calculateCartTotal } from "../../lib/calcs/priceCalculation.service.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";
import { AppError } from "../../utils/error.js"

const deleteProductFromCartService = async (userId, productId) => {
  const cart = await Cart.findOneAndUpdate({ userId, status: 1 });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  cart.products = cart.products.filter(item => item.productId.toString() !== productId);
  cart.totalAmount = await calculateCartTotal(cart.products);
  await cart.save();
  const populatedCart = await populateCart(cart._id);
  return populatedCart;
};

export default deleteProductFromCartService;
