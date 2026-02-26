import getAllProductsService from "../../services/adminServices/getAllProducts.service.js";
import getProductByNameService from "../../services/sharedServices/getProductByName.service.js";

const getProductByNameController = async (req, res) => {
  try {
    const { name } = req.query;

    const allProducts = await getAllProductsService();
    const result = await getProductByNameService(allProducts, name);

    if (typeof result === "string") {
      return res.status(404).json({
        success: false,
        message: result,
      });
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default getProductByNameController;
