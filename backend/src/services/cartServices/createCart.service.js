import Cart from "../../models/cart.model.js";

export const createCartService =  async (userId) => {
    let cart = await Cart.findOne({userId});
    if (cart) {
        cart = await Cart.findById(cart._id).populate('userId', 'firstName lastName email phoneNumber');
        return { cart, created: false};
    }

    cart = await Cart.create({
        userId,
        products: [],
        totalAmount: 0,
    });

    cart = await Cart.findById(cart._id).populate('userId', 'firstName lastName email phoneNumber');
    return { cart, created: true};
}
