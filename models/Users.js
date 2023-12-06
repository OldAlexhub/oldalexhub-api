import mongoose, { mongo } from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  companyName: { type: String, required: true },
  title: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Email is not correct"],
  },
  password: { type: String, required: true, minlength: 6 },
  confirmPassword: {
    type: String,
    select: false,
    default: undefined,
    validate: [
      function (value) {
        return value === this.password;
      },
      "Passwords don't match!",
    ],
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});
const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
