import getOrderByIdService from "../../services/orderServices/getOrderById.service.js";

const getOrderByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const order = await getOrderByIdService(userId, orderId);

    if (!order) {
      return res.status(404).json({
        message: "Đơn hàng không tồn tại",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Lấy đơn hàng thành công",
      success: true,
      order: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

export default getOrderByIdController;
