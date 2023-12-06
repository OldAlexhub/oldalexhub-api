import TicketModel from "../models/Tickets.js";

const GetMyTickets = async (req, res) => {
  try {
    const { userId } = req.query;
    // console.log(userId);
    const myTickets = await TicketModel.find({ userId: userId });
    res.status(200).json({ message: `View your tickets`, myTickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error!` });
  }
};
export default GetMyTickets;
