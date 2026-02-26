import cancelOrderService from "../../services/orderServices/cancelOrder.service.js";

const cancelOrderController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const result = await cancelOrderService(userId, orderId);

    return res.status(200).json({
      message: result,
      success: true,
    });
  } catch (error) {
    if (
      error.message === "This order has already been cancelled" ||
      error.message === "Orders can only be cancelled while in pending status"
    ) {
      return res.status(400).json({
        message: error.message,
        success: false,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

export default cancelOrderController;
