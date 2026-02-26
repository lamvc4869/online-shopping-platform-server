import getAllProductsService from "../../services/sharedServices/getAllProducts.service.js";

const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProductsService();
    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default getAllProductsController;
