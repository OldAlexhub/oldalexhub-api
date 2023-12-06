import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";

const SignUp = async (req, res) => {
  try {
    const {
      fname,
      lname,
      companyName,
      title,
      email,
      password,
      confirmPassword,
    } = req.body;

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(401).json({ message: `User already exists!` });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({ message: `Passwords don't match!` });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel({
      fname,
      lname,
      companyName,
      title,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: `User created successfully!` });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error!` });
  }
};
export default SignUp;
