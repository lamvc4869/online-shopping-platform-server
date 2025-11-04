import Cart from "../../models/cart.model.js";

const findCartByUserId = async (userId) => {
    return await Cart.findOne({ userId, status: 'active' });
};

const findOrCreateCart = async (userId) => {
    let cart = await findCartByUserId(userId);
    
    if (!cart) {
        cart = new Cart({
            userId,
            products: [],
            totalAmount: 0
        });
    }

    return cart;
};

export { findCartByUserId, findOrCreateCart };
