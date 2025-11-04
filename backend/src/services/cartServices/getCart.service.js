import Cart from "../../models/cart.model.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";

const getCartService = async (userId) => {
  const cart = await Cart.findOne({ userId, status: 1 });
  if (!cart) {
    throw new Error("Active cart not found for the user");
  }
  const populatedCart = await populateCart(cart._id);
  return populatedCart;
};

export default getCartService;
