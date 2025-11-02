import getAllOrdersService from "./getAllOrders.service.js";
import { populateOrder } from "../../lib/helpers/orderPopulator.js";

const getOrderByIdService = async (userId, orderId) => {
  const orders = await getAllOrdersService(userId);
  const order = orders.find((ord) => ord._id.toString() === orderId);
  if (!order) {
    throw new Error("Đơn hàng không tồn tại");
  }
  const populatedOrder = await populateOrder(order._id);
  return populatedOrder;
};

export default getOrderByIdService;
