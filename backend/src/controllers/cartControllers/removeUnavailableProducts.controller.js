import removeUnavailableProductsService from "../../services/cartServices/removeUnavailableProducts.service.js";
import { AppError } from "../../utils/error.js";

const removeUnavailableProductsController = async (req, res) => {
  try {
    const userId = req.user.id;
    await removeUnavailableProductsService(userId);
    return res.status(200).json({
      message: "Unavailable products removed from cart successfully",
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
      message: "Internal Server Error",
      success: false,
    });
  }
};

export default removeUnavailableProductsController;
