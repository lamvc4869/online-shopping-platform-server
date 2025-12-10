import Cart from "../../models/cart.model.js";
import { AppError } from "../../utils/error.js";
import { calculateCartTotal } from "../../lib/calcs/priceCalculation.service.js";

const updateAllproductsInCartService = async (userId, selected) => {
    if (selected === undefined) throw new AppError("Selected status is required", 400);
    const cart = await Cart.findOne({ userId, status: 1 });
    if (!cart) throw new AppError("Cart not found", 404);
    const products = cart.products;
    products.forEach((item) => {
        item.selected = selected;
    });
    cart.totalAmount = calculateCartTotal(products);
    await cart.save();
    return cart;
};

export default updateAllproductsInCartService;