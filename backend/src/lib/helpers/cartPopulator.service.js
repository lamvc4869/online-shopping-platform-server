import Cart from "../../models/cart.model.js";

const populateCart = async (cartId) => {
    return await Cart.findById(cartId)
        .populate('userId', 'email firstName lastName')
        .populate('products.productId', 'name price offerPrice image stock');
};

export { populateCart };
