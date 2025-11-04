import updateProductInCartService from "../../services/cartServices/updateProductInCart.service.js";

const updateProductInCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;
    if (quantity < 0) {
      return res.status(400).json({
        message: "Quantity must be a non-negative integer",
        success: false,
      });
    }
    const result = await updateProductInCartService(userId, productId, quantity);
    return res.status(200).json({
      message: "Updated product quantity in cart successfully",
      success: true,
      cart: result,
    });
  } catch (error) {
    if (
      error.message === "Cart not found" ||
      error.message === "Product not found in cart" ||
      error.message === "Insufficient stock available"
    ) {
      return res.status(404).json({
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
