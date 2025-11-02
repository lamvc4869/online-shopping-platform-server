import getOrderByIdService from "./getOrderById.service.js";
import { increaseProductStock } from "../../lib/calcs/updateStock.js";
import { decreaseSoldOfProducts } from "../../lib/calcs/updateSold.js";

const cancelOrderService = async (userId, orderId) => {
  const order = await getOrderByIdService(userId, orderId);

  if (order.orderStatus === "cancelled") {
    throw new Error("Đơn hàng đã được hủy trước đó");
  }

  if (order.orderStatus !== "pending") {
    throw new Error("Đơn hàng chỉ có thể hủy khi ở trạng thái đang chờ xử lý");
  }

  order.orderStatus = "cancelled";
  if (order.paymentStatus === "paid") {
    order.paymentStatus = "refunded";
  }
  else if (order.paymentStatus === "pending") {
    order.paymentStatus = "failed";
  }

  await order.save();

  await increaseProductStock(order.products);

  await decreaseSoldOfProducts(order.products);

  return "Đơn hàng đã được hủy thành công";
};

export default cancelOrderService;
