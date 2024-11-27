import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express";

const app = express()

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n Mongo connected: ${connectionInstance}`)
    } catch (error) {
        console.log("MONGODB conection FAILED: ",error)
        process.exit(1)
    }
}

export default connectDB