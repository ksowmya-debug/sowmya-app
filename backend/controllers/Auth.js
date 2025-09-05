import User from "../models/User.js";
import bcrypt from "bcryptjs";

const Register = async (req, res) => {
  console.log('Register request received:', req.body);
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill all the fields" });
    }
    const ExistUser = await User.findOne({ email });
    if (ExistUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      msg: "User Registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};
const Login = async (req, res) => {
  console.log('Login request received:', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill all the fields" });
    }
    const FindUser = await User.findOne({ email });
    if (!FindUser) {
      return res.status(400).json({ success: false, msg: "User not found" });
    }
    const checkPassword = await bcrypt.compare(password, FindUser.password);
    if (!checkPassword) {
      return res.status(400).json({ success: false, msg: "Invalid Password" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Login Successful", user: FindUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};
export { Register, Login };
