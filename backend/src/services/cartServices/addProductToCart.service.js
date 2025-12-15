import { validateProducts } from "../../utils/validates.js";
import { processCartItems } from "../../lib/helpers/itemProcessor.service.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";
import { findOrCreateCart } from "./cartManagement.service.js";
import { calculateCartTotal } from "../../lib/calcs/priceCalculation.service.js";
import { validateProductExistingInCart } from "../../lib/validates/validateCart.js";

const addProductToCartService = async (userId, products) => {
  const existingProducts = await validateProducts(products);
  const cart = await findOrCreateCart(userId);
  processCartItems(cart, products, existingProducts);
  products.forEach(async (product) => {
    await validateProductExistingInCart(cart, product);
  });
  cart.totalAmount = calculateCartTotal(cart.products);
  await cart.save();
  const populatedCart = await populateCart(cart._id);
  return {
    success: true,
    cart: populatedCart,
    message: `Processed ${products.length} products`,
  };
};

export { addProductToCartService };
