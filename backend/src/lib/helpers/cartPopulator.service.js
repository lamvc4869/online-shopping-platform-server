import Cart from "../../models/cart.model.js";

const populateCart = async (cartId) => {
    return await Cart.findById(cartId)
        .populate('userId', 'email firstName lastName')
        .populate('orderId', 'orderNumber status')
        .populate({
            path: 'products.productId',
            select: 'name price offerPrice image stock category brandId',
            populate: {
                path: 'brandId',
                select: 'brandName',
            }
        });
};

export {populateCart};
