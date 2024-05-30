import path from 'path'
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from  "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
// console.log(typeof authRoutes)-> function 

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send(`listening on port ${PORT}`);
});


app.listen(PORT, (req, res) => {
  connectToMongoDB();
  console.log(`listening on port ${PORT}`);
});
