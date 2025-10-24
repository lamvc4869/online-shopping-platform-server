import getUserByIdService from "../../services/sharedServices/getUserById.service.js";

const getUserByIdController = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await getUserByIdService(userId);
        
        if (typeof result === 'string') {
            return res.status(404).json({
                message: result,
                success: false,
            });
        }

        return res.status(200).json({
            message: 'Lấy user thành công',
            success: true,
            user: result,
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi server',
            error: error.message,
        });
    }
};

export default getUserByIdController;