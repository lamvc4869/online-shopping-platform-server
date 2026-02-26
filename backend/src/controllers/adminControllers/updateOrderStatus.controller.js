import updateOrderStatusService from "../../services/adminServices/updateOrderStatus.service.js";

const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newStatus } = req.body;
    const updatedOrder = await updateOrderStatusService(orderId, newStatus);
    return res.status(200).json({
      message: "Order status updated successfully",
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    if (
      error.message === "Order not found" ||
      error.message ===
        "Cannot update status — this order has been cancelled" ||
      error.message === "Order status is already set to that value" ||
      error.message ===
        "Cannot update status — this order has already been delivered"
    ) {
      return res.status(404).json({
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default updateOrderStatusController;
