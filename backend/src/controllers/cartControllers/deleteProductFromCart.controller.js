import deleteProductFromCartService from "../../services/cartServices/deleteProductFromCart.service.js";
import { AppError } from "../../utils/error.js";

const deleteProductFromCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const result = await deleteProductFromCartService(userId, productId);
    return res.status(200).json({
      message: "Delete product from cart successfully",
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

export default deleteProductFromCartController;
