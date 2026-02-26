import getOrderByIdService from "./getOrderById.service.js";
import { increaseProductStock } from "../../lib/calcs/updateStock.js";
import { decreaseSoldOfProducts } from "../../lib/calcs/updateSold.js";

const cancelOrderService = async (userId, orderId) => {
  const order = await getOrderByIdService(userId, orderId);

  if (order.orderStatus === "cancelled") {
    throw new Error("This order has already been cancelled");
  }

  if (order.orderStatus !== "pending") {
    throw new Error("Orders can only be cancelled while in pending status");
  }

  order.orderStatus = "cancelled";
  if (order.paymentStatus === "paid") {
    order.paymentStatus = "refunded";
  } else if (order.paymentStatus === "pending") {
    order.paymentStatus = "failed";
  }

  await order.save();

  await increaseProductStock(order.products);

  await decreaseSoldOfProducts(order.products);

  return "Order cancelled successfully";
};

export default cancelOrderService;
