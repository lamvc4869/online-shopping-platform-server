import Cart from "../../models/cart.model.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";

const getAllCartsService = async () => {
  const carts = await Cart.find().sort({ createdAt: -1 });
  const populatedCarts = await Promise.all(
    carts.map(async (cart) => await populateCart(cart._id))
  );
  return {
    success: true,
    carts: populatedCarts,
    total: populatedCarts.length,
  };
};

export { getAllCartsService };
