import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import { verifyUserOrAdmin } from "../middlewares/verifyRole.middleware.js";
import createCartController from "../controllers/cartControllers/createCart.controller.js";
import getAllCartsController from "../controllers/cartControllers/getAllCarts.controller.js";
import addProductToCartController from "../controllers/cartControllers/addProductToCart.controller.js";
import deleteProductFromCartController from "../controllers/cartControllers/deleteProductFromCart.controller.js";
import getCartController from "../controllers/cartControllers/getCart.controller.js";
import updateProductInCartController from "../controllers/cartControllers/updateProductInCart.controller.js";
import clearCartController from "../controllers/cartControllers/clearCart.controller.js";

const router = express.Router();

router.get("/myCart", verifyToken, getCartController);
router.get("/", verifyToken, verifyUserOrAdmin, getAllCartsController);
router.post("/", verifyToken, verifyUserOrAdmin, createCartController);
router.post("/items", verifyToken, verifyUserOrAdmin, addProductToCartController);
router.delete("/clear", verifyToken, verifyUserOrAdmin, clearCartController);
router.delete("/:productId", verifyToken, verifyUserOrAdmin, deleteProductFromCartController);
router.patch("/:productId", verifyToken, verifyUserOrAdmin, updateProductInCartController);

export default router;
