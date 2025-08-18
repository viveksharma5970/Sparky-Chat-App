import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/database.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import path from "path";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

console.log("Loading auth routes...");
app.use("/api/auth", authRoutes);

console.log("Loading message routes...");
app.use("/api/messages", messageRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello!");
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(5001, () => {
  console.log(`Server started at port ${PORT}`);
  connectDB();
});
