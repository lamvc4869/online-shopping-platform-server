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
      error.message === "Đơn hàng đã được hủy trước đó" ||
      error.message === "Đơn hàng chỉ có thể hủy khi ở trạng thái đang chờ xử lý"
    ) {
      return res.status(400).json({
        message: error.message,
        success: false,
      });
    }

    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
      success: false,
    });
  }
};

export default cancelOrderController;
