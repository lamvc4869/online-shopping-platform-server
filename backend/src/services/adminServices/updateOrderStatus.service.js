import getAllOrdersService from "./getAllOrders.service.js";
import { increaseProductStock } from "../../lib/calcs/updateStock.js";
import { decreaseSoldOfProducts } from "../../lib/calcs/updateSold.js";

const updateOrderStatusService = async (orderId, newStatus) => {
    const orders = await getAllOrdersService();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
        throw new Error("Không tìm thấy đơn hàng");
    }

    if (orders[orderIndex].orderStatus === "cancelled") {
        throw new Error("Đơn hàng đã bị hủy, không thể cập nhật trạng thái");
    }

    if (orders[orderIndex].orderStatus === newStatus) {
        throw new Error("Trạng thái đơn hàng không thay đổi");
    }

    if (orders[orderIndex].orderStatus === "delivered") {
        throw new Error("Đơn hàng đã hoàn thành, không thể cập nhật trạng thái");
    }

    if (newStatus === "cancelled") {
        orders[orderIndex].cancelledAt = new Date();
        
        if (orders[orderIndex].paymentMethod === "online") {
            orders[orderIndex].paymentStatus = "refunded";
        }
        else {
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
