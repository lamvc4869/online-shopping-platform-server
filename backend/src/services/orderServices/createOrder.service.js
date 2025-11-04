import Order from "../../models/order.model.js";
import Cart from "../../models/Cart.model.js";
import clearCartService from "../cartServices/clearCart.service.js";
import { isStockAvailable } from "../../utils/stockValidator.js";
import { generateOrderNumber } from "../../lib/helpers/orderNumberGenerator.js";
import {
  calculateItemPrice,
  calculateItemTotal,
  calculateCartTotal,
} from "../../lib/calcs/priceCalculation.service.js";
import { decreaseProductStock } from "../../lib/calcs/updateStock.js";
import { increaseSoldOfProducts } from "../../lib/calcs/updateSold.js";
import { populateOrder } from "../../lib/helpers/orderPopulator.js";

const createOrderService = async (userId, orderData) => {
  // Bước 1: Lấy id của user hiện tại (req.user.id)

  // Bước 2: Lấy giỏ hàng hiện tại của user (cart)
  const cart = await Cart.findOne({ userId, status: "active" }).populate(
    "products.productId"
  );
  if (!cart || cart.products.length === 0) {
    throw new Error("Giỏ hàng trống");
  }

  // Bước 3: Kiểm tra tồn kho của các đơn hàng trong giỏ hàng
  if (!isStockAvailable(cart.products)) {
    throw new Error("Sản phẩm trong giỏ hàng không đủ số lượng");
  }

  const { shippingAddress, paymentMethod, discount = 0, notes } = orderData;

  if (!shippingAddress) {
    throw new Error("Cần phải có địa chỉ giao hàng");
  }

  // Bước 4: Tính tổng giá trị đơn hàng (subtotal)
  // @Todo Cần điều chỉnh logic của discount
  const subtotal = calculateCartTotal(cart.products);
  const totalAmount = subtotal - discount;

  // @Todo sau xong thì bỏ mã đơn hàng
  // Bước 5: Sinh mã đơn hàng
  const orderNumber = generateOrderNumber();

  // Bước 6: Chuẩn bị products theo đúng schema của Order model
  const orderProducts = cart.products.map((item) => ({
    productId: item.productId._id,
    name: item.productId.name,
    image: item.productId.image[0],
    quantity: item.quantity,
    price: calculateItemPrice(item),
    total: calculateItemTotal(calculateItemPrice(item), item.quantity),
  }));

  // Bước 7: Tạo 1 đơn hàng mới (new Order)
  const newOrder = new Order({
    userId,
    orderNumber,
    cartId: cart._id,
    products: orderProducts,
    shippingAddress,
    paymentMethod,
    paymentStatus: paymentMethod === "online" ? "paid" : "pending",
    orderStatus: "pending",
    subtotal,
    discount,
    totalAmount,
    notes: notes || "",
  });
  await newOrder.save();

  // Bước 8: Trừ tồn kho
  await decreaseProductStock(cart.products);

  // Bước 9: Tăng số lượng được bán của sản phẩm
  await increaseSoldOfProducts(cart.products);

  // Bước 10: Xóa giỏ hàng của user
  // @Todo: Cần chỉnh logic ở đây sau này
  await clearCartService(userId);

  const populatedOrder = await populateOrder(newOrder._id);
  
  return populatedOrder;
};

export default createOrderService;
