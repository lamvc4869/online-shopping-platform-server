import Order from "../../models/order.model.js";
import { populateOrder } from "../../lib/helpers/orderPopulator.js";

const getAllOrdersService = async () => {
  const orders = await Order.find().sort({ createdAt: -1 });
  if (!orders || orders.length === 0) {
    return "Không có đơn hàng nào";
  }

  const populatedOrders = await Promise.all(
    orders.map((order) => populateOrder(order._id))
  );

  return populatedOrders;
};

export default getAllOrdersService;
