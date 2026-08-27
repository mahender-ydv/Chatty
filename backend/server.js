import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.route.js';
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
  : ["http://localhost:3000"];

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Alternatively allow origin dynamically if matching Vercel pattern
      }
    },
    credentials: true,
  })
);

// Routes
console.log("hiii");
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB(); 
});
