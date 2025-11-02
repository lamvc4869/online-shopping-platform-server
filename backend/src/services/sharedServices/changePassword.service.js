import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

const changePasswordService = async(userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) 
        return "User không tồn tại";

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) 
        return "Mật khẩu cũ không đúng";

    const comparePassword = (currentPassword === newPassword);
    if (comparePassword) 
        return "Mật khẩu mới không được trùng với mật khẩu cũ";

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return "Đổi mật khẩu thành công";
};

export default changePasswordService;