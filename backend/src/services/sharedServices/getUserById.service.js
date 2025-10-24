// Làm nhanh, sau này cần chỉnh sửa
import User from "../../models/user.model.js";

const getUserByIdService = async (userId) => {
    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            throw new Error('Không tồn tại user');
        }
        return existingUser;

    } catch (error) {
        throw new Error(error.message);
    }
};

export default getUserByIdService;