import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {GENERAL_API, ADMIN_API, CART_API} from "./src/utils/constants.js";
import { connectDB } from "./src/utils/db.js";
import userRoute from "./src/routes/user.route.js";
import adminRoute from "./src/routes/admin.route.js";
import cartRoute from "./src/routes/cart.route.js";
import { connectCloudinary } from "./src/utils/cloudinary.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// FE port
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(GENERAL_API, userRoute);
app.use(ADMIN_API, adminRoute);
app.use(CART_API, cartRoute);

Promise.all([connectDB(), connectCloudinary()])
  .then(() => {
    console.log("Connected to database and Cloudinary");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Startup failed:", err?.message || err);
    process.exit(1);
  });
