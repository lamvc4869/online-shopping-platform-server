import updateAllproductsInCartService from "../../services/cartServices/updateAllproductsInCart.service.js";
import { AppError } from "../../utils/error.js";

const updateAllproductsInCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { selected } = req.body;
        const result = await updateAllproductsInCartService(userId, selected);
        return res.status(200).json({
            message: "Updated all products selected status in cart successfully",
            success: true,
            cart: result,
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
            error: error.message,
        });
    }
};

export default updateAllproductsInCartController;