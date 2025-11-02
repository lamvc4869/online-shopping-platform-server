import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import { verifyUser } from "../middlewares/verifyRole.middleware.js";
import createOrderController from "../controllers/orderControllers/createOrder.controller.js";
import getAllOrdersController from "../controllers/orderControllers/getAllOrders.controller.js";
import getOrderByIdController from "../controllers/orderControllers/getOrderById.controller.js";
import cancelOrderController from "../controllers/orderControllers/cancelOrder.controller.js";

const router = express.Router();

router.post("/", verifyToken, verifyUser, createOrderController);
router.get("/orders", verifyToken, verifyUser, getAllOrdersController);
router.get("/:orderId", verifyToken, verifyUser, getOrderByIdController);
router.patch("/:orderId/cancel", verifyToken, verifyUser, cancelOrderController);

export default router;
