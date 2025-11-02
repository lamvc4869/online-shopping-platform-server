import Cart from "../../models/Cart.model.js";
import Product from "../../models/product.model.js";
import deleteProductFromCartService from "./deleteProductFromCart.service.js";
import { calculateCartTotal } from "../../lib/calcs/priceCalculation.service.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";

const updateProductInCartService = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId, status: "active" });
  if (!cart) return "Giỏ hàng không tồn tại";

  const product = await Product.findById(productId);

  const productIndex = cart.products.findIndex(
    (p) => p.productId.toString() === productId
  );
  if (productIndex === -1) return "Sản phẩm không tồn tại trong giỏ hàng";

  if (quantity > product.stock) return "Số lượng vượt quá tồn kho";
  
  if (quantity === 0)
    return await deleteProductFromCartService(userId, productId);

  cart.products[productIndex].quantity = quantity;
  cart.totalAmount = calculateCartTotal(cart.products);
  await cart.save();

  const populatedCart = await populateCart(cart._id);
  return populatedCart;
};

export default updateProductInCartService;
