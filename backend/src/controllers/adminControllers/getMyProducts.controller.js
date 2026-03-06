import getProductsByAdminService from "../../services/adminServices/getProductsByAdmin.service.js";
import { AppError } from "../../utils/error.js";

const getMyProductsController = async (req, res) => {
  try {
    const adminId = req.user.id;
    const adminEmail = req.user.email;

    const products = await getProductsByAdminService(adminId);

    return res.status(200).json({
      message: `Products for ${adminEmail} fetched successfully`,
      success: true,
      count: products.length,
      data: products,
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
      error: error.message,
    });
  }
};

export default getMyProductsController;
