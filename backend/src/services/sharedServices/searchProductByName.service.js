import getAllProductsService from "./getAllProducts.service.js";
import getProductByNameService from "./getProductByName.service.js";

const searchProductByNameService = async (productName) => {
  try {
    if (!productName) {
      return `Vui lòng nhập tên sản phẩm cần tìm`;
    }

    const listProducts = await getAllProductsService();
    const result = await getProductByNameService(listProducts, productName);

    return result;
  } catch (error) {
    return error.message;
  }
};

export default searchProductByNameService;
