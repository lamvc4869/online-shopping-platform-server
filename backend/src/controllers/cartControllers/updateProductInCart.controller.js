import updateProductInCartService from "../../services/cartServices/updateProductInCart.service.js";
import { AppError } from "../../utils/error.js";

const updateProductInCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const payload = req.body;
    const result = await updateProductInCartService(userId, productId, payload);
    return res.status(200).json({
      message: "Updated product quantity in cart successfully",
      success: true,
      cart: result,
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

export default updateProductInCartController;
