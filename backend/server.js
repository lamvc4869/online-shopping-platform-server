import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {GENERAL_API, ADMIN_API, CART_API, ORDER_API} from "./src/utils/constants.js";
import { connectDB } from "./src/utils/db.js";
import userRoute from "./src/routes/user.route.js";
import adminRoute from "./src/routes/admin.route.js";
import cartRoute from "./src/routes/cart.route.js";
import orderRoute from "./src/routes/order.route.js";
import { connectCloudinary } from "./src/utils/cloudinary.js";

dotenv.config();
const app = express();
const PORT_BE = process.env.PORT_BE;
const PORT_FE = process.env.PORT_FE;

const corsOptions = {
  origin: `http://localhost:${PORT_FE}`,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(GENERAL_API, userRoute);
app.use(ADMIN_API, adminRoute);
app.use(CART_API, cartRoute);
app.use(ORDER_API, orderRoute);

Promise.all([connectDB(), connectCloudinary()])
  .then(() => {
    console.log("Connected to database and Cloudinary");
    app.listen(PORT_BE, () => console.log(`Server is running on port ${PORT_BE}`));
  })
  .catch((err) => {
    console.error("Startup failed:", err?.message || err);
    process.exit(1);
  });
