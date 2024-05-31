import express from "express";
import path from "path"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
// console.log(typeof authRoutes)-> function 

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();



app.use(express.json())
// 

app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send(`CMON BUDDY, YOU CAN DO IT. Have faith in GOD and Yourself.`);
});


app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
