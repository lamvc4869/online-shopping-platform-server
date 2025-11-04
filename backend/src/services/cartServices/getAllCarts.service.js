import Cart from "../../models/cart.model.js";
import { populateCart } from "../../lib/helpers/cartPopulator.service.js";

const getAllCartsService = async () => {
    try {
        const carts = await Cart.find().sort({ createdAt: -1 });
        const populatedCarts = await Promise.all(
            carts.map(async (cart) => await populateCart(cart._id))
        );
        return {
            success: true,
            carts: populatedCarts,
            total: populatedCarts.length
        };
    } catch (error) {
        throw new Error(`Error fetching carts: ${error.message}`);
    }
};

export { getAllCartsService };
