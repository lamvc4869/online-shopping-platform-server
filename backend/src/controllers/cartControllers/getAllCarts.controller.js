import { getAllCartsService } from "../../services/cartServices/getAllCarts.service.js";

const getAllCartsController = async (req, res) => {
    try {
        const result = await getAllCartsService();
        return res.status(200).json({
            message: 'Get all carts successfully',
            success: true,
            carts: result
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default getAllCartsController;
