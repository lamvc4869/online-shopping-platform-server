import getAllOrdersService from "../../services/adminServices/getAllOrders.service.js";

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrdersService();

    if (typeof orders === "string") {
      return res.status(404).json({
        message: orders,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      orders: orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default getAllOrdersController;
