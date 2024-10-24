import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/user.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    connectDB();
    console.log("Serer started at http://localhost:"+ PORT)
})