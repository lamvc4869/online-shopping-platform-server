import getProductsService from "../../services/sharedServices/getProducts.service.js";
import { AppError } from "../../utils/error.js";

const getProductsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const result = await getProductsService(page, limit);
    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      ...result,
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

export default getProductsController;
