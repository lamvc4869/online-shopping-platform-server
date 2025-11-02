const getProductByNameService = async (ListProduct, productName) => {
  try {
    if (!productName) return ListProduct;

    const keyWord = productName.toLowerCase();

    const result = ListProduct.filter((product) =>
      product.name.toLowerCase().includes(keyWord)
    );

    if (result.length === 0) {
      return `Không tìm thấy sản phẩm "${productName}"`;
    }
    return result;
  } catch (error) {
    return error.message;
  }
};

export default getProductByNameService;
