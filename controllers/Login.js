import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: `User doesn't exist!` });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: `Invalid Credentials!` });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    const userId = user._id;
    const name = user.fname + " " + user.lname;
    const companyName = user.companyName;
    const role = user.role;
    res.status(200).header("Authorization", `Bearer ${token}`).json({
      message: `Login Successfull`,
      token,
      userId,
      name,
      companyName,
      role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error!` });
  }
};
export default Login;
