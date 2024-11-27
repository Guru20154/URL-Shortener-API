import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`Mongo connected: ${connectionInstance.connection.host}  ${DB_NAME}`)
    } catch (error) {
        console.log("MONGODB conection FAILED: ",error)
        process.exit(1)
    }
}

export default connectDB