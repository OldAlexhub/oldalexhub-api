import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import connectToDB from "./db/connectToDB.js";
import router from "./routes/routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "32mb", extended: true }));
app.use(express.urlencoded({ limit: "32mb", extended: true }));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
connectToDB();
app.use("/", router);
