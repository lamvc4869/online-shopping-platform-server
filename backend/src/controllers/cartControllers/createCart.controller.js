import { createCartService } from "../../services/cartServices/createCart.service.js";

const createCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cart, created } = await createCartService(userId);
    return res.status(created ? 201 : 200).json({
      message: created ? "Create cart successfully" : "Cart already exists",
      success: true,
      cart: cart,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default createCartController;
