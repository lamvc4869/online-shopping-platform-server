import getAllOrdersService from "./getAllOrders.service.js";
import { increaseProductStock } from "../../lib/calcs/updateStock.js";
import { decreaseSoldOfProducts } from "../../lib/calcs/updateSold.js";

const updateOrderStatusService = async (orderId, newStatus) => {
  const orders = await getAllOrdersService();
  const orderIndex = orders.findIndex((order) => order.id === orderId);
  if (orderIndex === -1) {
    throw new Error("Order not found");
  }

  if (orders[orderIndex].orderStatus === "cancelled") {
    throw new Error("Cannot update status — this order has been cancelled");
  }

  if (orders[orderIndex].orderStatus === newStatus) {
    throw new Error("Order status is already set to that value");
  }

  if (orders[orderIndex].orderStatus === "delivered") {
    throw new Error(
      "Cannot update status — this order has already been delivered",
    );
  }

  if (newStatus === "cancelled") {
    orders[orderIndex].cancelledAt = new Date();

    if (orders[orderIndex].paymentMethod === "online") {
      orders[orderIndex].paymentStatus = "refunded";
    } else {
      orders[orderIndex].paymentStatus = "failed";
    }

    increaseProductStock(orders[orderIndex].products);
    decreaseSoldOfProducts(orders[orderIndex].products);
  }
  orders[orderIndex].orderStatus = newStatus;
  await orders[orderIndex].save();
  return orders[orderIndex];
};

export default updateOrderStatusService;
