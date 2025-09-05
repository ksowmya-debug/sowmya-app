import express from "express";
import {
  getUser,
  deleteUser,
  userCreate,
  updateUser,
  getAllUsers,
  getUserId,
} from "../controllers/user.js";

const userRouters = express.Router();

userRouters.post("/create", userCreate);
userRouters.put("/update/:Id", updateUser);
userRouters.delete("/delete/:Id", deleteUser);
userRouters.get("/getUserid/:Id", getUserId);
userRouters.get("/getAllUsers", getAllUsers);

export default userRouters;
