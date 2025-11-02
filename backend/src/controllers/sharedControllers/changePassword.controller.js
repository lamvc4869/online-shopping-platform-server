import changePasswordService from "../../services/sharedServices/changePassword.service.js";

const changePasswordController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const result = await changePasswordService(userId, currentPassword, newPassword);

        if (result === "Đổi mật khẩu thành công") {
            return res.status(200).json({
                message: result,
                success: true,
            });
        }
        
        return res.status(400).json({
            message: result,
            success: false,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

export default changePasswordController;