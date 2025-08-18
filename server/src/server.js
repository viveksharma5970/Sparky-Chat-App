import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/database.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://sparky-chat-app.vercel.app"],
    credentials: true,
  })
);

console.log("Loading auth routes...");
app.use("/api/auth", authRoutes);

console.log("Loading message routes...");
app.use("/api/messages", messageRoutes);


app.get("/", (req, res) => {
  res.send("Hello from server!");
});


server.listen(5001, () => {
  console.log(`Server started at port ${PORT}`);
  connectDB();
});
