import express from "express";
import createUserController from "../controllers/userControllers/registerUser.controller.js";
import loginUserController from "../controllers/userControllers/loginUser.controller.js";
import logoutUserController from "../controllers/userControllers/logoutUser.controller.js";
import searchProductByNameController from "../controllers/sharedControllers/searchProductByName.controller.js";
import getAllProductsController from "../controllers/sharedControllers/getAllProducts.controller.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import { upload } from "../utils/multer.js";
import updateUserController from "../controllers/sharedControllers/updateUser.controller.js";
import { verifyUserOrAdmin } from "../middlewares/verifyRole.middleware.js";
import getUserByIdController from "../controllers/sharedControllers/getUserById.controller.js";
import getProductByIdController from "../controllers/sharedControllers/getProductById.controller.js";
import changePasswordController from "../controllers/sharedControllers/changePassword.controller.js";
import createReviewController from "../controllers/reviewControllers/createReview.controller.js";

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.post("/logout", verifyToken, logoutUserController);
router.get("/product/search", searchProductByNameController);
router.get("/products", getAllProductsController);
router.patch("/user/changePassword", verifyToken, verifyUserOrAdmin, changePasswordController);

router.post("/product/:productId/review", verifyToken, createReviewController);
router.patch("/user/:userId", verifyToken, verifyUserOrAdmin, upload.single("avatar"), updateUserController);
router.get("/user/:userId", verifyToken, getUserByIdController);
router.get("/product/:productId", getProductByIdController);

export default router;
