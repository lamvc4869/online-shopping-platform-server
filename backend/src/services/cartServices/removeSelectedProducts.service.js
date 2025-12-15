import Cart from "../../models/cart.model.js";
import { AppError } from "../../utils/error.js";
import { validateCartExistingOrEmpty } from "../../lib/validates/validateCart.js";

const removeSelectedProductsService = async (userId) => {
  const cart = await Cart.findOne({ userId, status: 1 });
  await validateCartExistingOrEmpty(cart);
  const hasSelectedProducts = cart.products.some((item) => item.selected);
  if (!hasSelectedProducts) throw new AppError("No selected products to remove", 400);
  await Cart.updateOne(
    { userId, status: 1 },
    { $pull: { products: { selected: true } } }
  );
};

export default removeSelectedProductsService;
