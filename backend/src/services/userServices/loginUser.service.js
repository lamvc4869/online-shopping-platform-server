import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUserService = async (payload) => {
  try {
    const { email, password } = payload;
    if (!email || !password) {
      return "Nhập thiếu thông tin";
    }

    const existingAccount = await User.findOne({ email });
    if (!existingAccount) {
      return "Tài khoản không tồn tại!\nVui lòng đăng ký tài khoản";
    }

    const isValid = await bcrypt.compare(password, existingAccount.password);
    if (!isValid) {
      return "Sai mật khẩu";
    }

    const tokenSecret = existingAccount.role === 'admin'
      ? process.env.ADMIN_ACCESS_TOKEN_SECRET
      : process.env.USER_ACCESS_TOKEN_SECRET;

    const accessToken = jwt.sign(
      {
        id: existingAccount._id,
        email: existingAccount.email,
        role: existingAccount.role,
      },
      tokenSecret,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
      }
    );

    const { password: _pw, __v, ...safeUser } = existingAccount.toObject();

    return {
        user: safeUser,
        accessToken,
    }
  } catch (error) {
    return error.message;
  }
};

export default loginUserService;
