import createReviewService from "../../services/reviewServices/createReview.service.js";

const createReviewController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { rating } = req.body;

        const result = await createReviewService(userId, productId, rating);

        if (typeof result === "string") {
            return res.status(400).json({
                message: result,
                success: false,
            });
        }

        return res.status(201).json({
            message: "Đánh giá sản phẩm thành công",
            success: true,
            review: result,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

export default createReviewController;