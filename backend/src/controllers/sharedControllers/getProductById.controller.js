import getProductByIdService from "../../services/sharedServices/getProductById.service.js";

const getProductByIdController = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await getProductByIdService(productId);
        if (typeof product === 'string') {
            return res.status(404).json({
                message: product,
                success: false,
            });
        }

        return res.status(200).json({
            message: 'Lấy sản phẩm thành công',
            success: true,
            product: product,
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi server',
            error: error.message,
        });
    }
};

export default getProductByIdController;