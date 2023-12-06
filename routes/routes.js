import { Router } from "express";
import SignUp from "../controllers/Signup.js";
import Login from "../controllers/Login.js";
import OpenTicket from "../controllers/OpenTicket.js";
import protectRoute from "../middleware/protectRoutes.js";
import restrictTo from "../middleware/RestrictTo.js";
import GetMyTickets from "../controllers/GetMyTickets.js";
import GetTicketAdmin from "../controllers/GetTicketsaAdmin.js";
import EditTicket from "../controllers/EditTicket.js";

const router = Router();
const adminOnly = restrictTo("admin");

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/openaticket", protectRoute, OpenTicket);
router.get("/admintickets", protectRoute, adminOnly, GetTicketAdmin);
router.patch("/tickets/:ticketId", protectRoute, adminOnly, EditTicket);

router.get("/mytickets", protectRoute, GetMyTickets);

export default router;
