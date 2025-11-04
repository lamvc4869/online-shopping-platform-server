import createOrderService from "../../services/orderServices/createOrder.service.js";

const createOrderController = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderData = req.body;
    const result = await createOrderService(userId, orderData);
    return res.status(201).json({
      message: "Create order successfully",
      success: true,
      order: result,
    });
  } catch (error) {
    if (
      error.message === "Cart is empty" ||
      error.message === "Insufficient stock available" ||
      error.message === "Shipping address is required"
    ) {
      return res.status(400).json({
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

export default createOrderController;
