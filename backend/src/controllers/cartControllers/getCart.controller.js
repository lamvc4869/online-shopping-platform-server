import getCartService from "../../services/cartServices/getCart.service.js";

const getCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await getCartService(userId);
        if (typeof cart === "string") {
            return res.status(404).json({
                message: cart,
                success: false,
            });
        }
        return res.status(200).json({
            message: "Lấy giỏ hàng thành công",
            success: true,
            cart: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

export default getCartController;