import TicketModel from "../models/Tickets.js";

const EditTicket = async (req, res) => {
  const ticketId = req.params.ticketId; // Assuming the ID is passed in the URL
  const updateData = req.body; // The data for the update
  try {
    const updatedTicket = await TicketModel.findByIdAndUpdate(
      ticketId,
      updateData,
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res
      .status(200)
      .json({ message: "Ticket updated successfully", updatedTicket });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export default EditTicket;
