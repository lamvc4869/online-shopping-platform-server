import getCartService from "../../services/cartServices/getCart.service.js";
import { AppError } from "../../utils/error.js";

const getCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await getCartService(userId);
    return res.status(200).json({
      message: "Get cart successfully",
      success: true,
      cart: cart,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
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
