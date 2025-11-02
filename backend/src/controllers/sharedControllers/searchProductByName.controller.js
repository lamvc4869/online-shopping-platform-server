import searchProductByNameService from "../../services/sharedServices/searchProductByName.service.js";

const searchProductByNameController = async (req, res) => {
  try {
    const { name } = req.query;
    const result = await searchProductByNameService(name);

    if (typeof result === "string") {
      return res.status(404).json({
        message: result,
        success: false,
        data: [],
      });
    }

    return res.status(200).json({
      message: `Danh sách sản phẩm "${name}"`,
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
      error: error.message,
      data: [],
    });
  }
};

export default searchProductByNameController;
