import getAllProductsService from "./getAllProducts.service.js";
import getProductByNameService from "./getProductByName.service.js";

const searchProductByNameService = async (productName) => {
  try {
    if (!productName) {
      return `Product name is required`;
    }

    const listProducts = await getAllProductsService();
    const result = await getProductByNameService(listProducts, productName);

    return result;
  } catch (error) {
    return error.message;
  }
};

export default searchProductByNameService;
