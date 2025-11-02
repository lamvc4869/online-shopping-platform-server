import Cart from "../../models/Cart.model.js";
import { calculateCartTotal } from "../../lib/calcs/priceCalculation.service.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";

const deleteProductFromCartService = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) return "Giỏ hàng không tồn tại";
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.totalAmount = await calculateCartTotal(cart.products);
    await cart.save();

    const populatedCart = await populateCart(cart._id);
    return populatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteProductFromCartService;
