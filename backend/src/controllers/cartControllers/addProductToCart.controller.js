import { addProductToCartService } from "../../services/cartServices/addProductToCart.service.js";
import { AppError } from "../../utils/error.js";

const addProductToCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;
    const result = await addProductToCartService(userId, products);
    return res.status(200).json({
      message: result.message,
      success: true,
      data: result.cart,
    });
  } catch (error) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
        });
    }
    return res.status(500).json({
      message: "Error adding products to cart",
      success: false,
      error: error.message,
    });
  }
};

export default addProductToCartController;
