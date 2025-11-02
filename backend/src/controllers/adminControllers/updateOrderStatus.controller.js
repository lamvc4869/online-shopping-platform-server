import updateOrderStatusService from "../../services/adminServices/updateOrderStatus.service.js";

const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newStatus } = req.body;
    const updatedOrder = await updateOrderStatusService(orderId, newStatus);
    return res.status(200).json({
      message: "Cập nhật trạng thái đơn hàng thành công",
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    if (
      error.message === "Không tìm thấy đơn hàng" ||
      error.message === "Đơn hàng đã bị hủy, không thể cập nhật trạng thái" ||
      error.message === "Trạng thái đơn hàng không thay đổi" ||
      error.message === "Đơn hàng đã hoàn thành, không thể cập nhật trạng thái"
    ) {
      return res.status(404).json({
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

export default updateOrderStatusController;
