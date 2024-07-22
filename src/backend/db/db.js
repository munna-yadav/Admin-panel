import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const DB_NAME = "jjyc"

const connectDB = async()=>{
    try {
        const instance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("mongodb connected",instance.connection.host);
    } catch (error) {
        console.log("mongo connection failed",error);
    }
}

export {connectDB}