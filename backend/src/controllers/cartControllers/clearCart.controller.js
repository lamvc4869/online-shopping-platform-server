import clearCartService from "../../services/cartServices/clearCart.service.js";

const clearCartController = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await clearCartService(userId);

    if (typeof result === "string") {
      return res.status(400).json({
        message: result,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Giỏ hàng đã được làm trống thành công",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

export default clearCartController;
