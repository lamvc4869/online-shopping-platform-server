import Cart from "../../models/Cart.model.js";

const clearCartService = async (userId) => {
  const cart = await Cart.findOne({ userId, status: "active" });
  if (!cart) {
    throw new Error("Giỏ hàng không tồn tại");
  }
  
  cart.products = [];
  cart.totalAmount = 0;

  await cart.save();
  return cart;
};

export default clearCartService;
