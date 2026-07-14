import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Chat server is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});