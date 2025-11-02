import deleteProductFromCartService from "../../services/cartServices/deleteProductFromCart.service.js";

const deleteProductFromCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const result = await deleteProductFromCartService(userId, productId);

        if (result === "Giỏ hàng không tồn tại") {
            return res.status(404).json({
                message: result,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Xóa sản phẩm khỏi giỏ hàng thành công",
            success: true,
            cart: result,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

export default deleteProductFromCartController;