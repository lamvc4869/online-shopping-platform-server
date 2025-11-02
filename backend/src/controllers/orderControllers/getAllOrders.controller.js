import getAllOrdersService from "../../services/orderServices/getAllOrders.service.js";

const getAllOrdersController = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await getAllOrdersService(userId);

    if (typeof orders === "string") {
      return res.status(404).json({
        message: orders,
        success: false,
        orders: [],
      });
    }

    return res.status(200).json({
      message: "Lấy danh sách đơn hàng thành công",
      success: true,
      orders: orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

export default getAllOrdersController;
