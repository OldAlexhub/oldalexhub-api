import TicketModel from "../models/Tickets.js";

const OpenTicket = async (req, res) => {
  try {
    const {
      userId,
      product,
      message,
      companyName,
      phoneNumber,
      email,
      preferedContact,
    } = req.body;

    const newOpenTicket = await TicketModel({
      userId,
      product,
      message,
      companyName,
      phoneNumber,
      email,
      preferedContact,
    });
    await newOpenTicket.save();
    res.status(201).json({ message: `Ticket Opened!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error!` });
  }
};
export default OpenTicket;
