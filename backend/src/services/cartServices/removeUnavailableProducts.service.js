import { AppError } from "../../utils/error.js";
import { validateCartExistingOrEmpty } from "../../lib/validates/validateCart.js";
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";

const removeUnavailableProductsService = async (userId) => {
  const cart = await Cart.findOne({ userId, status: 1 });
  await validateCartExistingOrEmpty(cart);
  const productIds = cart.products.map((item) => item.productId);
  const unavailableProducts = await Product.find(
    {
      _id: { $in: productIds },
      isActive: false,
    },
    { _id: 1 }
  );
  const unavailableProductIds = unavailableProducts.map((item) => item._id);
  if (unavailableProductIds.length === 0) {
    throw new AppError("No unavailable products to remove", 400);
  }
  await Cart.updateOne(
    { userId, status: 1 },
    {
      $pull: {
        products: {
          productId: { $in: unavailableProductIds },
        },
      },
    }
  );
};

export default removeUnavailableProductsService;
