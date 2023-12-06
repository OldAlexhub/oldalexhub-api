import mongoose from "mongoose";
import validator from "validator";

const TicketSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  ticketNumber: { type: Number, unique: true },
  userId: { type: String },
  product: {
    type: String,
    enum: [
      "management",
      "hr",
      "accounting",
      "data",
      "training",
      "compliance",
      "web",
      "startup",
      "bundle",
      "others",
    ],
    default: "other",
    required: true,
  },
  message: { type: String, maxlength: 120 },
  companyName: { type: String },
  phoneNumber: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Email is not correct"],
  },
  preferedContact: { type: String, enum: ["email", "phone"], default: "email" },
  price: { type: Number },
  preferedContract: { type: String },
});
TicketSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastTicket = await TicketModel.findOne().sort("-ticketNumber"); // find the last ticket
    this.ticketNumber = lastTicket ? lastTicket.ticketNumber + 1 : 147963; // increment or initialize
  }
  next();
});

const TicketModel = mongoose.model("tickets", TicketSchema);
export default TicketModel;
