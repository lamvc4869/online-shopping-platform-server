import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "../utils/tokenBlacklist.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Không có token, vui lòng đăng nhập",
        success: false,
      });
    }

    const token = authHeader.substring("Bearer ".length);

    if (isTokenBlacklisted(token)) {
      return res.status(401).json({
        message: "Token đã bị vô hiệu hóa, vui lòng đăng nhập lại",
        success: false,
      });
    }

    let decoded;


    const adminSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
    const userSecret = process.env.USER_ACCESS_TOKEN_SECRET;
    const legacySecret = process.env.ACCESS_TOKEN_SECRET;

    if (!adminSecret || !userSecret || !legacySecret) {
      return res.status(500).json({
        message: "Cấu hình server chưa đầy đủ",
        success: false,
      });
    }

    try {
      decoded = jwt.verify(token, adminSecret);
    } catch (adminError) {
      try {
        decoded = jwt.verify(token, userSecret);
      } catch (userError) {
        try {
          decoded = jwt.verify(token, legacySecret);
        } catch (legacyError) {
          return res.status(401).json({
            message: "Token không hợp lệ hoặc đã hết hạn",
            success: false,
          });
        }
      }
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Token không hợp lệ hoặc đã hết hạn",
      success: false,
    });
  }
};

export default verifyToken;
