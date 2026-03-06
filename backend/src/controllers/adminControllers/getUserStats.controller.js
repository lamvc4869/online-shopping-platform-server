import getUserStatsService from "../../services/adminServices/getUserStats.service.js";

const getUserStatsController = async (req, res) => {
  try {
    const result = await getUserStatsService();

    return res.status(200).json({
      message: "User stats fetched successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export default getUserStatsController;
