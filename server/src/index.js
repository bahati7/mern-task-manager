import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT

app.listen(PORT,()=>{
    connectDB();
    console.log("Serer started at http://localhost:"+ PORT)
})