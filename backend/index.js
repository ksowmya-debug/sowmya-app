import express from "express";
import dotenv from "dotenv";
import DbCon from "./libs/db.js";
import AuthRouters from "./routes/Auth.js";
import userRouters from "./routes/user.js";
import productRouters from "./routes/product.js";
import cartRouters from "./routes/cart.js";
import userManagementRouters from "./routes/userManagement.js";
import orderRouters from "./routes/order.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
DbCon();
app.use(cors("*")); // Enable CORS for all routes
app.use(express.json());

// Serve static files from images directory
app.use("/images", express.static(path.join(__dirname, "..", "images")));

app.use("/auth", AuthRouters);
app.use("/user", userRouters);
app.use("/product", productRouters);
app.use("/cart", cartRouters);
app.use("/users", userManagementRouters);
app.use("/order", orderRouters);

app.get("/", (req, res) => {
  res.send("Hello World backend");
});

app.listen(PORT, () => {
  console.log(`It's alive!!! at ${PORT}`);
});