import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { uploadToCloudinary } from "../../utils/cloudinary.js";

const updateUserService = async (userId, updateData, updateFile) => {
  try {
    if (!userId) return "ID user không được để trống";
    if (!updateData && !updateFile) return "Không có dữ liệu để cập nhật";

    const user = await User.findById(userId);
    if (!user) return "User không tồn tại";

    const allowedFields = ["firstName", "lastName", "email", "password", "role", "age", "address",
      "phoneNumber",
    ];

    if (updateData && Object.keys(updateData).length > 0) {
      for (const [key, value] of Object.entries(updateData)) {
        if (allowedFields.includes(key)) {
          if (key === "password") {
            user[key] = await bcrypt.hash(value, 10);
          } else if (key === "email") {
            const existingEmail = await User.findOne({
              email: value,
              _id: { $ne: userId },
            });
            if (existingEmail) return "Email đã được sử dụng bởi user khác";
            user[key] = value;
          } else {
            user[key] = value;
          }
        }
      }
    }

    if (updateFile) user.avatar = await uploadToCloudinary(updateFile.path);

    await user.save();

    const { password, __v, ...safeUser } = user.toObject();
    return safeUser;
  } catch (error) {
    return error.message;
  }
};

export default updateUserService;
