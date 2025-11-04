import Cart from "../../models/Cart.model.js";
import User from "../../models/user.model.js";
import Product from "../../models/product.model.js";
import Order from "../../models/order.model.js";

const getAllCartsService = async () => {
    try {
        const carts = await Cart.find()
            .populate('userId', 'username email firstName lastName')
            .populate('products.productId', 'name price image description')
            .populate('orderId', 'orderNumber status')
            .sort({ createdAt: -1 });

        return {
            success: true,
            carts: carts,
            total: carts.length
        };
    } catch (error) {
        throw new Error(`Error fetching carts: ${error.message}`);
    }
};

export { getAllCartsService };
