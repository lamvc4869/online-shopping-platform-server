import createOrderService from "../../services/orderServices/createOrder.service.js";

const createOrderController = async (req, res) => {
  try {
    const userId = req.user.id;

    const orderData = req.body;

    const result = await createOrderService(userId, orderData);

    if (typeof result === "string") {
      return res.status(400).json({
        message: result,
        success: false,
      });
    }

    return res.status(201).json({
      message: "Tạo đơn hàng thành công",
      success: true,
      order: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

export default createOrderController;
