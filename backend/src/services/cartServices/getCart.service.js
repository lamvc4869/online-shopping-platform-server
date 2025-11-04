import Cart from "../../models/Cart.model.js";

const getCartService = async (userId) => {
    const cart = await Cart.findOne({ userId, status: 'active' }).populate('products.productId');
    if (!cart) return "Giỏ hàng không tồn tại";
    return cart;
};

export default getCartService;