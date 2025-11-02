import Order from "../../models/order.model.js";

const populateOrder = async (orderId) => {
    return await Order.findById(orderId)
        .populate("userId", "firstName lastName email phoneNumber")
        .populate("products.productId", "name price offerPrice image stock");
};

export { populateOrder };