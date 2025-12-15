import removeSelectedProductsService from "../../services/cartServices/removeSelectedProducts.service.js";
import { AppError } from "../../utils/error.js";

const removeSelectedProductsController = async (req, res) => {
  try {
    const userId = req.user.id;
    await removeSelectedProductsService(userId);
    return res.status(200).json({
      message: "Selected products removed from cart successfully",
      success: true,
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
      success: false,
    });
  }
};

export default removeSelectedProductsController;
