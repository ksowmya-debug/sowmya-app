import express from "express";
import { Register, Login } from "../controllers/Auth.js";
import User from "../models/User.js";


const AuthRouters = express.Router();
AuthRouters.post("/register", Register);
AuthRouters.post("/login", Login);

// Temporary route to check existing users
AuthRouters.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error fetching users" });
  }
});

// Temporary route to clear all users (for testing only)
AuthRouters.delete("/clear-users", async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ success: true, msg: "All users deleted" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error clearing users" });
  }
});

export default AuthRouters;
