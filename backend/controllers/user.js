import User from "../models/User.js";
import mongoose from "mongoose";

const userCreate = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all the fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User already exists",
      });
    }

    const newUser = new User({
      userName,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      msg: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.Id;
    const { userName, email, isAdmin } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid user ID format",
      });
    }

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userName, email, isAdmin },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.Id;
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    return res.status(200).json({
      success: true,
      msg: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.Id;
    console.log("Searching for user with ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid user ID format",
      });
    }

    const findUser = await User.findById(userId);
    console.log("User found:", findUser);

    if (!findUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    return res.status(200).json({
      success: true,
      msg: "User found successfully",
      user: findUser,
    });
  } catch (error) {
    console.log("Error in getUser:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const getUserId = async (req, res) => {
  try {
    const userId = req.params.Id;
    console.log("Getting user ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid user ID format",
      });
    }

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.status(200).json({
      success: true,
      msg: "User ID retrieved successfully",
      userId: findUser._id,
      user: findUser,
    });
  } catch (error) {
    console.log("Error in getUserId:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    console.log("All users:", users);
    return res.status(200).json({
      success: true,
      msg: "Users retrieved successfully",
      count: users.length,
      users: users,
    });
  } catch (error) {
    console.log("Error in getAllUsers:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export { userCreate, updateUser, deleteUser, getUser, getAllUsers, getUserId };
