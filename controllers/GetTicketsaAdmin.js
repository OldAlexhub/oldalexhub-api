import TicketModel from "../models/Tickets.js";

const GetTicketAdmin = async (req, res) => {
  try {
    const tickets = await TicketModel.find();
    res.status(200).json({ message: `Tickers`, tickets });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error!` });
  }
};
export default GetTicketAdmin;
