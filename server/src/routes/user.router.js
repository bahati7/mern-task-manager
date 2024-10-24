import express from 'express';
import jwt from "jsonwebtoken";
import { createUser, userLogin } from '../controllers/user.controller.js';


const router = express.Router();

router.post("/register",createUser );

router.post("/login", userLogin)

export {router as userRouter}