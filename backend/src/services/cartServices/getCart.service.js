import Cart from "../../models/cart.model.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";
import { AppError } from "../../utils/error.js";

const getCartService = async (userId) => {
  const cart = await Cart.findOne({ userId, status: 1 });
  if (!cart) {
    throw new AppError("Active cart not found for the user", 404);
  }
  const populatedCart = await populateCart(cart._id);
  return populatedCart;
};

export default getCartService;
