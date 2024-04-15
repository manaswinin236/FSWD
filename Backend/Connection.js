import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function Connection(){
    try{
        await mongoose.connect(process.env.MY_API)
        console.log("Database connected")
    } catch (error) {
        console.error(error, "Problem connecting database");
    }
}