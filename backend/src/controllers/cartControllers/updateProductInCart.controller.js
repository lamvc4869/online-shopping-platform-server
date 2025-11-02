import updateProductInCartService from "../../services/cartServices/updateProductInCart.service.js";

const updateProductInCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (quantity < 0) {
            return res.status(400).json({
                message: "Số lượng không hợp lệ",
                success: false,
            });
        }

        const result = await updateProductInCartService(userId, productId, quantity);
        if (typeof result === "string") {
            return res.status(400).json({
                message: result,
                success: false,
            });
        }
        return res.status(200).json({
            message: "Cập nhật sản phẩm trong giỏ hàng thành công",
            success: true,
            cart: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            success: false,
            error: error.message,
        });
    }
};

export default updateProductInCartController