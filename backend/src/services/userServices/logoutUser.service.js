import Session from "../../models/session.model.js";
import { addTokenToBlacklist, isBlacklisted } from "../../utils/tokenBlacklist.js";

const logoutUserService = async (accessToken, refreshToken, res) => {
    if (!refreshToken) {
        return res.status(400).json({
            message: "Missing refresh token",
            success: false,
        });
    }
    const session = await Session.findOneAndDelete({ refreshToken });
    if (!session) {
        return res.status(404).json({
            message: "Session not found",
            success: false,
        });
    }
    if (accessToken && !(await isBlacklisted(accessToken))) {
        await addTokenToBlacklist(accessToken);
    }
};

export default logoutUserService;
