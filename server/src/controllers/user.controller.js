import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserModel } from '../models/user.model.js';
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET

export const createUser = async (req,res)=>{
    const {username,password}=req.body;
    const user = await UserModel.findOne({username})
    
    if (user) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = new UserModel({ username, password: hashedPassword });
      await newUser.save();
  
      res.json({message:"User registered successfully"});
     // res.json(user)
};

export const userLogin = async(req, res)=>{
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
  
    if(!user){
      return res.json({message:"User Doesn't Exist"})
    }
  
    const isPasswordValid= await bcrypt.compare(password, user.password);
  
    if(!isPasswordValid){
      return res.json({message:"Username or Password Is Incorrect"})
    }
  
    const token = jwt.sign({id:user._id}, TOKEN_SECRET);
    res.json({token, userId:user._id})
  
  
  
  }
