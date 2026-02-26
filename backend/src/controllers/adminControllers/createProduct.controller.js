import createProductService from "../../services/adminServices/createProduct.service.js";
import { AppError } from "../../utils/error.js";

const createProductController = async (req, res) => {
  try {
    const productData = req.body;
    const files = req.files;
    const adminId = req.user.id;

    const product = await createProductService(productData, files, adminId);

    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      data: product,
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

export default createProductController;
