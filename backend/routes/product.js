import express from "express";
import {
  getProduct,
  deleteProduct,
  productCreate,
  update,
  getAllProducts,
  getProductsByUserId,
} from "../controllers/product.js";

const productRouters = express.Router();

productRouters.post("/create/:userId", productCreate);
productRouters.put("/update/:Id", update);
productRouters.delete("/delete/:Id", deleteProduct);
productRouters.get("/getProduct/:Id", getProduct);
productRouters.get("/getAllProducts", getAllProducts);
productRouters.get("/getProducts/:userId", getProductsByUserId);

export default productRouters;