import getCartService from "../../services/cartServices/getCart.service.js";

const getCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await getCartService(userId);
    return res.status(200).json({
      message: "Lấy giỏ hàng thành công",
      success: true,
      cart: cart,
    });
  } catch (error) {
    if (error.message === "Active cart not found for the user") {
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

export default getCartController;
