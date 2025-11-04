import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../../models/session.model.js";
import { validatePasswordLogin } from "../../utils/validates.js";

const loginUserService = async (payload, res) => {
  const { email, password } = payload;
  if (!email || !password) {
    return res.status(400).json({
      message: "Don't leave any fields blank",
      success: false,
    });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({
      message: "Account does not exist! Please register",
      success: false,
    });
  }
  if (!(await validatePasswordLogin(password, existingUser.password))) {
    return res.status(401).json({
      message: "Invalid password! Please try again",
      success: false,
    });
  }
  const accessToken = jwt.sign(
    {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    }
  );
  const refreshToken = crypto.randomBytes(64).toString("hex");
  const refreshTokenExpires = parseInt(process.env.REFRESH_TOKEN_EXPIRES) * 60 * 1000;
  await Session.create({
    userId: existingUser._id,
    refreshToken,
    expiresAt: new Date(Date.now() + refreshTokenExpires),
  });
  const { password: _pw, ...userWithoutPassword } = existingUser.toObject();
  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
    refreshTokenExpires,
  };
};

export default loginUserService;
